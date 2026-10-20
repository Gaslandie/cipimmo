"""Forced SSH command. Only CIP IMMO export and validated releases are accepted."""
import fcntl
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import time
import urllib.request

ROOT = Path('/home2/fnksrwmy/cipimmo')
PHP = '/opt/cpanel/ea-php85/root/usr/bin/php'
SHARED = ROOT / 'shared'
CURRENT = ROOT / 'current'

def php(release, *args, capture=False):
    return subprocess.run([PHP, 'artisan', *args], cwd=release, check=True,
                          stdout=subprocess.PIPE if capture else sys.stderr,
                          stderr=sys.stderr, timeout=300)

def validate_members(members):
    total = 0
    names = set()
    for member in members:
        path = PurePosixPath(member.name)
        allowed = {'app', 'bootstrap', 'config', 'routes', 'resources', 'database', 'vendor', 'public', 'luminor', 'artisan', 'composer.json', 'composer.lock'}
        if not member.isfile() or path.is_absolute() or '..' in path.parts or not path.parts or path.parts[0] not in allowed or member.name in names:
            raise RuntimeError('Unsafe archive entry')
        if any(part.startswith('.') for part in path.parts) and member.name != 'public/.htaccess':
            raise RuntimeError('Hidden archive entry')
        total += member.size
        if total > 1500 * 1024 * 1024:
            raise RuntimeError('Expanded archive too large')
        names.add(member.name)


def run():
    os.umask(0o077)
    command = os.environ.get('SSH_ORIGINAL_COMMAND', '')
    if command == 'export':
        if not CURRENT.is_symlink():
            if not (SHARED / '.env').is_file():
                raise RuntimeError('Initial configuration missing')
            sys.stdout.write(json.dumps({'initial': True}))
            return
        result = php(CURRENT, 'cip:catalogue-export', capture=True)
        value = json.loads(result.stdout)
        if not isinstance(value, list) or len(value) > 2000:
            raise RuntimeError('Invalid catalogue')
        sys.stdout.write(json.dumps(value, ensure_ascii=False))
        return
    match = re.fullmatch(r'deploy ([a-f0-9]{64})', command)
    if not match:
        raise RuntimeError('Command refused')
    if not SHARED.is_dir() or not (SHARED / '.env').is_file() or not Path(PHP).is_file():
        raise RuntimeError('Initial configuration missing')
    with (SHARED / 'deployment.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        if shutil.disk_usage(ROOT).free < 1024 * 1024 * 1024:
            raise RuntimeError('At least 1 GB free is required')
        with tempfile.TemporaryDirectory(prefix='incoming-', dir=ROOT) as temporary:
            archive = Path(temporary) / 'release.tar.gz'
            digest = hashlib.sha256()
            size = 0
            with archive.open('wb') as output:
                while True:
                    chunk = sys.stdin.buffer.read(1024 * 1024)
                    if not chunk:
                        break
                    size += len(chunk)
                    if size > 700 * 1024 * 1024:
                        raise RuntimeError('Archive too large')
                    digest.update(chunk)
                    output.write(chunk)
            if digest.hexdigest() != match[1]:
                raise RuntimeError('Archive digest mismatch')
            release = ROOT / 'releases' / (str(int(time.time())) + '-' + match[1][:12])
            release.mkdir(parents=True, mode=0o755)
            with tarfile.open(archive, 'r:gz') as source:
                validate_members(source.getmembers())
                for member in source.getmembers():
                    target = release / member.name
                    target.parent.mkdir(parents=True, exist_ok=True, mode=0o755)
                    with source.extractfile(member) as src, target.open('xb') as dst:
                        shutil.copyfileobj(src, dst)
                    target.chmod(0o644)
            (ROOT / 'releases').chmod(0o755)
            release.chmod(0o755)
            for directory in release.rglob('*'):
                if directory.is_dir():
                    directory.chmod(0o755)
            for required in ['artisan', 'vendor/autoload.php', 'public/index.php', 'public/index.html', 'public/build/manifest.json']:
                if not (release / required).is_file():
                    raise RuntimeError('Incomplete release')
            (release / '.env').symlink_to(SHARED / '.env')
            (release / 'storage').symlink_to(SHARED / 'storage', target_is_directory=True)
            (release / 'bootstrap/cache').mkdir(parents=True, exist_ok=True, mode=0o755)
            uploads = release / 'public/assets/images/properties/admin'
            if uploads.exists():
                raise RuntimeError('Uploads must not be included in code releases')
            uploads.parent.mkdir(parents=True, exist_ok=True, mode=0o755)
            uploads.symlink_to(ROOT / 'uploads-public', target_is_directory=True)
            # Back up using the new command, before any schema or data change.
            php(release, 'cip:backup')
            php(release, 'migrate', '--force', '--no-interaction')
            php(release, 'cip:admin', 'seed', '--no-interaction')
            php(release, 'config:cache')
            php(release, 'view:cache')
            target = ROOT / 'current-next'
            if target.exists() or target.is_symlink():
                target.unlink()
            target.symlink_to(release, target_is_directory=True)
            public = ROOT / 'public'
            if public.is_symlink() and os.readlink(public) != str(CURRENT / 'public'):
                raise RuntimeError('Unexpected public directory link')
            previous = os.readlink(CURRENT) if CURRENT.is_symlink() else None
            original_public = None
            os.replace(target, CURRENT)
            if not public.is_symlink():
                if public.exists():
                    original_public = ROOT / ('public-before-' + str(int(time.time())))
                    public.rename(original_public)
                public.symlink_to(CURRENT / 'public', target_is_directory=True)
            try:
                request = urllib.request.Request('https://cipimmo.com/admin?deployment=' + match[1][:12], headers={'User-Agent': 'Mozilla/5.0 CIPIMMO-Deployment'})
                with urllib.request.urlopen(request, timeout=30) as response:
                    body = response.read(100000).decode('utf-8')
                    if response.status != 200 or 'cip-admin' not in body or 'csrf-token' not in body:
                        raise RuntimeError('Public administration health check failed')
            except Exception:
                if original_public:
                    public.unlink()
                    original_public.rename(public)
                if previous:
                    target.symlink_to(previous, target_is_directory=True)
                    os.replace(target, CURRENT)
                else:
                    CURRENT.unlink()
                raise RuntimeError('Public check failed; previous code restored. Data preserved.')
            print('CIP IMMO release activated and HTTPS checked. Previous releases and data preserved.')

if __name__ == '__main__':
    try:
        run()
    except Exception as error:
        print('Deployment stopped: ' + str(error), file=sys.stderr)
        sys.exit(1)
