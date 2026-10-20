import hashlib
import io
import os
import sqlite3
import tempfile
from types import SimpleNamespace
from unittest.mock import patch
import importlib.util
from pathlib import Path
import tarfile
import unittest

spec = importlib.util.spec_from_file_location('receiver', Path(__file__).resolve().parents[1] / 'scripts/bluehost-receiver.py')
receiver = importlib.util.module_from_spec(spec)
spec.loader.exec_module(receiver)

class DeploymentTest(unittest.TestCase):
    def entry(self, name, kind=tarfile.REGTYPE):
        value = tarfile.TarInfo(name)
        value.type = kind
        value.size = 10
        return value

    def test_valid_application_paths_are_accepted(self):
        receiver.validate_members([self.entry('public/index.html'), self.entry('public/.htaccess'), self.entry('app/Models/User.php')])

    def test_private_paths_traversal_links_and_duplicate_paths_are_rejected(self):
        for entry in [self.entry('../other-site/index.php'), self.entry('/public/index.php'), self.entry('public/.env'), self.entry('storage/database.sqlite'), self.entry('public/link', tarfile.SYMTYPE), self.entry('public/link', tarfile.LNKTYPE)]:
            with self.subTest(path=entry.name, kind=entry.type), self.assertRaises(RuntimeError):
                receiver.validate_members([entry])
        with self.assertRaises(RuntimeError):
            receiver.validate_members([self.entry('public/index.html'), self.entry('public/index.html')])

    def test_expanded_size_is_bounded(self):
        entry = self.entry('public/file')
        entry.size = 1501 * 1024 * 1024
        with self.assertRaises(RuntimeError):
            receiver.validate_members([entry])

class ReleaseRecoveryTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix='cip-recovery-')
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.shared = self.root / 'shared'
        (self.shared / 'storage').mkdir(parents=True)
        (self.shared / '.env').write_text('APP_KEY=isolated-test-only')
        self.uploads = self.root / 'uploads-public'
        self.uploads.mkdir()
        (self.uploads / 'photo.webp').write_bytes(b'original-test-photo')
        self.previous = self.root / 'releases/previous'
        (self.previous / 'public').mkdir(parents=True)
        (self.previous / 'public/index.html').write_text('previous site')
        self.current = self.root / 'current'
        self.current.symlink_to(self.previous)
        (self.root / 'public').symlink_to(self.current / 'public')
        self.php = self.root / 'php'
        self.php.touch()
        self.database = self.shared / 'live.sqlite'
        with sqlite3.connect(self.database) as database:
            database.execute('CREATE TABLE records (value TEXT)')
            database.execute("INSERT INTO records VALUES ('before deployment')")
        self.backup = self.shared / 'storage/backup.sqlite'
        self.commands = []
        self.fail_backup = False
        archive = io.BytesIO()
        with tarfile.open(fileobj=archive, mode='w:gz') as target:
            for name in ['artisan', 'vendor/autoload.php', 'public/index.php', 'public/index.html', 'public/build/manifest.json']:
                data = b'new site'
                member = tarfile.TarInfo(name)
                member.size = len(data)
                target.addfile(member, io.BytesIO(data))
        self.archive = archive.getvalue()
        self.digest = hashlib.sha256(self.archive).hexdigest()

    def fake_php(self, release, *args, **kwargs):
        self.commands.append(args[0])
        if args[0] == 'cip:backup':
            if self.fail_backup:
                raise RuntimeError('Simulated backup failure')
            with sqlite3.connect(self.database) as source, sqlite3.connect(self.backup) as destination:
                source.backup(destination)
        elif args[0] == 'migrate':
            with sqlite3.connect(self.database) as database:
                database.execute("INSERT INTO records VALUES ('after backup')")

    def deploy(self, healthy=True, digest=None):
        response = io.BytesIO(b'cip-admin csrf-token' if healthy else b'broken site')
        response.status = 200
        previous_umask = os.umask(0o077)
        self.addCleanup(os.umask, previous_umask)
        with patch.multiple(receiver, ROOT=self.root, SHARED=self.shared, CURRENT=self.current, PHP=str(self.php)), \
             patch.dict(os.environ, {'SSH_ORIGINAL_COMMAND': 'deploy ' + (digest or self.digest)}), \
             patch.object(receiver.sys, 'stdin', SimpleNamespace(buffer=io.BytesIO(self.archive))), \
             patch.object(receiver.sys, 'stdout', io.StringIO()), \
             patch.object(receiver, 'php', side_effect=self.fake_php), \
             patch.object(receiver.shutil, 'disk_usage', return_value=SimpleNamespace(free=2 * 1024**3)), \
             patch.object(receiver.urllib.request, 'urlopen', return_value=response) as health:
            try:
                receiver.run()
            finally:
                self.health_calls = health.call_count

    def rows(self, path):
        with sqlite3.connect(path) as database:
            self.assertEqual('ok', database.execute('PRAGMA integrity_check').fetchone()[0])
            return database.execute('SELECT value FROM records').fetchall()

    def assert_shared_preserved(self):
        self.assertEqual('APP_KEY=isolated-test-only', (self.shared / '.env').read_text())
        self.assertEqual(b'original-test-photo', (self.uploads / 'photo.webp').read_bytes())

    def test_successful_release_keeps_shared_files_and_backs_up_before_migration(self):
        self.deploy()
        self.assertNotEqual(self.previous, self.current.resolve())
        self.assertEqual('new site', (self.root / 'public/index.html').read_text())
        self.assertEqual(self.shared / '.env', (self.current / '.env').resolve())
        self.assertEqual(self.shared / 'storage', (self.current / 'storage').resolve())
        self.assertEqual(self.uploads, (self.current / 'public/assets/images/properties/admin').resolve())
        self.assertEqual(['cip:backup', 'migrate'], self.commands[:2])
        self.assertEqual([('before deployment',)], self.rows(self.backup))
        self.assert_shared_preserved()

    def test_failed_public_check_restores_previous_code_and_preserves_recent_data(self):
        with self.assertRaisesRegex(RuntimeError, 'previous code restored'):
            self.deploy(healthy=False)
        self.assertEqual(self.previous, self.current.resolve())
        self.assertEqual('previous site', (self.root / 'public/index.html').read_text())
        self.assertEqual([('before deployment',), ('after backup',)], self.rows(self.database))
        self.assertEqual([('before deployment',)], self.rows(self.backup))
        self.assert_shared_preserved()

    def test_backup_failure_stops_migrations_and_keeps_previous_site(self):
        self.fail_backup = True
        with self.assertRaisesRegex(RuntimeError, 'backup failure'):
            self.deploy()
        self.assertEqual(['cip:backup'], self.commands)
        self.assertEqual(0, self.health_calls)
        self.assertEqual(self.previous, self.current.resolve())
        self.assertEqual([('before deployment',)], self.rows(self.database))
        self.assert_shared_preserved()

    def test_corrupted_archive_is_refused_before_backup_or_activation(self):
        with self.assertRaisesRegex(RuntimeError, 'digest mismatch'):
            self.deploy(digest='0' * 64)
        self.assertEqual([], self.commands)
        self.assertEqual(0, self.health_calls)
        self.assertEqual(self.previous, self.current.resolve())
        self.assert_shared_preserved()

if __name__ == '__main__':
    unittest.main()
