// GitHub Pages serves this project under /cipimmo. Next prefixes Link routes,
// but public image paths also occur in data, CSS and native image elements.
import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = new URL('../.next-pages/', import.meta.url);
const base = '/cipimmo';
async function prepare(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isFile() && entry.name.endsWith('.map')) { await rm(path); continue; }
        if (entry.isSymbolicLink()) throw new Error(`Unexpected symbolic link: ${path}`);
        if (/^(\.env(?:\..*)?|\.git|.*\.(?:pem|key|sqlite|zip|tar|gz|map))$/.test(entry.name)) throw new Error(`Private or unexpected export: ${path}`);
        if (entry.isDirectory()) await prepare(path);
        else if (/\.(?:html|js|json|txt|css)$/.test(entry.name)) {
            const content = await readFile(path, 'utf8');
            const updated = content.replace(/(["'`(\s=]|&quot;|&#x27;)\/assets\//g, `$1${base}/assets/`);
            if (updated !== content) await writeFile(path, updated);
        }
    }
}
await prepare(fileURLToPath(root));
await rm(new URL('assets/scss/', root), { recursive: true, force: true });
await writeFile(new URL('.nojekyll', root), '');
await writeFile(new URL('robots.txt', root), 'User-agent: *\nDisallow: /\n');
// Preserve the public entry points of the previous Laravel preview.
for (const [oldPath, newPath] of Object.entries({ contact: 'contacts', 'a-propos': 'about-us', logements: 'listing-left-sidebar' })) {
    const dir = new URL(`${oldPath}/`, root);
    await mkdir(dir, { recursive: true });
    await writeFile(new URL('index.html', dir), `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${base}/${newPath}/"><title>CIP IMMO</title></head><body><a href="${base}/${newPath}/">Continuer vers CIP IMMO</a></body></html>`);
}
console.log('GitHub Pages export ready: .next-pages/ (public static files only).');
