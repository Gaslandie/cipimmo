"""Read-only external checks, run by the scheduled GitHub workflow."""
import json
import socket
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser

ORIGIN = 'https://cipimmo.com'


class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = {}

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        path = attributes.get('src' if tag in ('img', 'script') else 'href', '')
        kind = 'image' if tag == 'img' else 'script' if tag == 'script' else 'style' if tag == 'link' and attributes.get('rel') == 'stylesheet' else None
        if kind and path.startswith('/') and not path.startswith('//'):
            self.paths.setdefault(kind, path)


def fetch(path):
    request = urllib.request.Request(ORIGIN + path, headers={
        'User-Agent': 'Mozilla/5.0 CIPIMMO-Monitor',
        'Accept': 'application/json' if '/api/' in path or path == '/up' else '*/*',
        'Cache-Control': 'no-cache',
    })
    try:
        response = urllib.request.urlopen(request, timeout=15)
    except urllib.error.HTTPError as error:
        response = error
    with response:
        if urllib.parse.urlsplit(response.geturl()).netloc != 'cipimmo.com':
            raise RuntimeError('Redirection vers un autre domaine')
        return response.status, response.read(2 * 1024 * 1024), response.headers


def page(path, status=200, marker=None, json_status=None):
    actual, body, headers = fetch(path)
    if actual != status:
        raise RuntimeError(f'HTTP {actual}, attendu {status}')
    if marker and marker not in body.decode('utf-8'):
        raise RuntimeError('Contenu attendu absent')
    if json_status and json.loads(body).get('status') != json_status:
        raise RuntimeError('Application indisponible')
    if '/admin/api/' in path and 'application/json' not in headers.get('Content-Type', ''):
        raise RuntimeError('Réponse privée incorrecte')
    return body


def certificate():
    context = ssl.create_default_context()
    with socket.create_connection(('cipimmo.com', 443), timeout=15) as connection:
        with context.wrap_socket(connection, server_hostname='cipimmo.com') as secure:
            expires = ssl.cert_time_to_seconds(secure.getpeercert()['notAfter'])
    if expires - time.time() < 14 * 86400:
        raise RuntimeError('Certificat HTTPS à renouveler dans moins de 14 jours')


def assets():
    parser = Assets()
    parser.feed(page('/', marker='CIP IMMO').decode('utf-8'))
    for kind in ('image', 'script', 'style'):
        if kind not in parser.paths:
            raise RuntimeError(f'Ressource {kind} absente')
        body = page(parser.paths[kind])
        if not body or body.lstrip().lower().startswith(b'<!doctype html'):
            raise RuntimeError(f'Ressource {kind} inaccessible')


def run():
    checks = {
        'Certificat HTTPS': certificate,
        'Accueil et ressources': assets,
        'Catalogue': lambda: page('/listing-left-sidebar/', marker='Nos logements'),
        'Administration': lambda: page('/admin', marker='cip-admin'),
        'Application et base de données': lambda: page('/up', json_status='up'),
        'Protection des données privées': lambda: page('/admin/api/rentals', status=401),
        'Sitemap': lambda: page('/sitemap.xml', marker='<urlset'),
        'Page introuvable': lambda: page('/cip-surveillance-page-absente', status=404, marker='Page introuvable'),
    }
    failures = 0
    for label, check in checks.items():
        started = time.monotonic()
        for attempt in range(2):
            try:
                check()
                print(f'OK — {label} ({time.monotonic() - started:.1f} s)')
                break
            except (OSError, ValueError, RuntimeError) as error:
                if attempt == 0:
                    time.sleep(5)
                else:
                    failures += 1
                    print(f'ERREUR — {label} : {error}', file=sys.stderr)
    return 1 if failures else 0


if __name__ == '__main__':
    sys.exit(run())
