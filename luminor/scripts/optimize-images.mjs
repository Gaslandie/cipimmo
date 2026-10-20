import { readdir, mkdir, rm, lstat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = path.resolve("public/assets/images");
const target = path.resolve("public/assets/optimized");
const widths = [96, 192, 384, 480, 768, 1280, 1920];

// These files are derived copies. The original client photos stay untouched.
await rm(target, { recursive: true, force: true });
let count = 0;
async function optimize(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
        const filename = path.join(directory, entry.name);
        if (entry.isSymbolicLink() || (await lstat(filename)).isSymbolicLink()) continue;
        if (entry.isDirectory()) {
            // Live uploads are managed separately on Bluehost, never packaged here.
            if (directory === path.join(source, "properties") && entry.name === "admin") continue;
            await optimize(filename);
        } else if (/\.(?:jpe?g|png|webp)$/i.test(entry.name)) {
            const destination = path.join(target, path.relative(source, filename));
            await mkdir(path.dirname(destination), { recursive: true });
            for (const width of widths) {
                await sharp(filename).rotate().resize({ width, withoutEnlargement: true })
                    .webp({ quality: 78, effort: 4 }).toFile(`${destination}.w${width}.webp`);
            }
            count++;
        }
    }
}
await optimize(source);
console.log(`${count} images préparées en formats adaptés, sans modifier les originaux.`);
