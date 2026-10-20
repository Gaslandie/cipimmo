"""Package only the application and its public builds, never local data or keys."""
import pathlib
import io
import secrets
import sys
import tarfile

root = pathlib.Path(__file__).resolve().parents[1]
destination = pathlib.Path(sys.argv[1])
entries = {}
for source in ['app', 'bootstrap', 'config', 'routes', 'resources/views', 'database/migrations', 'vendor']:
    for file in (root / source).rglob('*'):
        relative = file.relative_to(root).as_posix()
        if file.is_symlink():
            continue
        if not file.is_file() or relative.startswith(('bootstrap/cache/', 'vendor/bin/')):
            continue
        if any(part.startswith('.') for part in file.relative_to(root).parts):
            continue
        entries[relative] = file
for relative in ['artisan', 'composer.json', 'composer.lock', 'public/index.php', 'public/.htaccess', 'public/admin-logo.svg', 'public/admin-style.css', 'luminor/src/data/catalogue.json']:
    entries[relative] = root / relative
for source, target in [('public/build', 'public/build'), ('luminor/.next-pages', 'public')]:
    for file in (root / source).rglob('*'):
        if file.is_symlink():
            raise RuntimeError('Symlink in public build')
        if file.is_file():
            name = file.relative_to(root / source)
            if any(part.startswith('.') for part in name.parts):
                continue
            entries[(pathlib.Path(target) / name).as_posix()] = file
if not (root / 'luminor/.next-pages/index.html').is_file():
    raise RuntimeError('Public build missing')
with tarfile.open(destination, 'w:gz') as archive:
    # A unique front controller prevents shared-host PHP realpath caches from
    # booting a previous release after the atomic public-directory switch.
    controller = 'index-' + secrets.token_hex(12) + '.php'
    htaccess = (root / 'public/.htaccess').read_text().replace('index.php', controller)
    htaccess = htaccess.replace('RewriteEngine On', 'RewriteEngine On\n    RewriteRule ^index\\.php$ ' + controller + ' [L]')
    for relative, file in sorted(entries.items()):
        if file.suffix in ['.sqlite', '.pem', '.key'] or relative.endswith('.map'):
            raise RuntimeError('Private file in package: ' + relative)
        if relative == 'public/.htaccess':
            continue
        archive.add(file, arcname=relative, recursive=False)
    for relative, data in [('public/.htaccess', htaccess.encode()), ('public/' + controller, (root / 'public/index.php').read_bytes())]:
        member = tarfile.TarInfo(relative)
        member.size = len(data)
        member.mode = 0o644
        archive.addfile(member, io.BytesIO(data))
print(f'Production package: {len(entries)} files')
