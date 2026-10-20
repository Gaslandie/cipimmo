import contextlib
import importlib.util
import io
from pathlib import Path
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('monitor', Path(__file__).resolve().parents[1] / 'scripts/monitor-site.py')
monitor = importlib.util.module_from_spec(spec)
spec.loader.exec_module(monitor)


class SiteMonitorTest(unittest.TestCase):
    def test_certificate_expiring_soon_is_a_failure(self):
        for expiry, fails in [('Jan 02 00:00:00 1970 GMT', True), ('Jan 31 00:00:00 1970 GMT', False)]:
            with self.subTest(expiry=expiry), patch.object(monitor.socket, 'create_connection'), \
                 patch.object(monitor.ssl, 'create_default_context') as context, patch.object(monitor.time, 'time', return_value=0):
                context.return_value.wrap_socket.return_value.__enter__.return_value.getpeercert.return_value = {'notAfter': expiry}
                if fails:
                    with self.assertRaisesRegex(RuntimeError, '14 jours'):
                        monitor.certificate()
                else:
                    monitor.certificate()

    def test_fetch_refuses_a_redirect_to_another_domain(self):
        response = io.BytesIO(b'wrong site')
        response.geturl = lambda: 'https://other.example/'
        with patch.object(monitor.urllib.request, 'urlopen', return_value=response):
            with self.assertRaisesRegex(RuntimeError, 'autre domaine'):
                monitor.fetch('/')

    def test_http_errors_wrong_content_and_false_health_are_failures(self):
        cases = [
            ((503, b'Unavailable', {}), {}, 'HTTP 503'),
            ((200, b'wrong page', {}), {'marker': 'CIP IMMO'}, 'Contenu attendu'),
            ((200, b'{"status":"down"}', {}), {'json_status': 'up'}, 'indisponible'),
            ((401, b'<html>error</html>', {'Content-Type': 'text/html'}), {'status': 401}, 'privée incorrecte'),
        ]
        for response, options, message in cases:
            with self.subTest(message=message), patch.object(monitor, 'fetch', return_value=response):
                with self.assertRaisesRegex(RuntimeError, message):
                    monitor.page('/admin/api/rentals', **options)

    def test_expected_private_access_refusal_is_a_success(self):
        with patch.object(monitor, 'fetch', return_value=(401, b'{"message":"Connexion requise"}', {'Content-Type': 'application/json'})):
            self.assertEqual(b'{"message":"Connexion requise"}', monitor.page('/admin/api/rentals', status=401))

    def test_missing_or_broken_static_assets_are_failures(self):
        home = b'<img src="/image.webp"><script src="/app.js"></script><link rel="stylesheet" href="/app.css">'
        with patch.object(monitor, 'page', side_effect=[home, b'photo', b'<!DOCTYPE html>error']):
            with self.assertRaisesRegex(RuntimeError, 'script inaccessible'):
                monitor.assets()
        with patch.object(monitor, 'page', return_value=b'<img src="https://other.example/photo.webp">'):
            with self.assertRaisesRegex(RuntimeError, 'image absente'):
                monitor.assets()

    def test_persistent_failures_return_nonzero_and_all_other_checks_still_run(self):
        with patch.object(monitor, 'certificate'), patch.object(monitor, 'assets'), \
             patch.object(monitor, 'page', side_effect=RuntimeError('site indisponible')) as page, \
             patch.object(monitor.time, 'sleep') as sleep, \
             contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            self.assertEqual(1, monitor.run())
            self.assertEqual(12, page.call_count)
            self.assertEqual(6, sleep.call_count)

    def test_transient_failure_retries_and_success_returns_zero(self):
        with patch.object(monitor, 'certificate', side_effect=[OSError('réseau'), None]) as certificate, \
             patch.object(monitor, 'assets'), patch.object(monitor, 'page'), \
             patch.object(monitor.time, 'sleep') as sleep, contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(0, monitor.run())
            self.assertEqual(2, certificate.call_count)
            sleep.assert_called_once_with(5)


if __name__ == '__main__':
    unittest.main()
