const assert = require('node:assert/strict');
const fs = require('node:fs');
const { test } = require('node:test');
const ts = require('../luminor/node_modules/typescript');

const previousLoader = require.extensions['.ts'];
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText, filename);
const { rentalPhotos } = require('../luminor/src/data/cipRentals.ts');
if (previousLoader) require.extensions['.ts'] = previousLoader;
else delete require.extensions['.ts'];

const photo = index => ({ src: `/assets/images/properties/admin/photo-${index}.webp`, alt: `Vue ${index}`, width: 800, height: 600 });

test('the public gallery retains all 30 photos allowed by the administration, in order', () => {
    const photos = Array.from({ length: 30 }, (_, index) => photo(index));
    assert.deepEqual(rentalPhotos({ photos }), photos);
    assert.deepEqual(rentalPhotos({ photos: [...photos, photo(30)] }), photos);
});

test('the gallery still rejects duplicate, unsafe, unlabelled and invalid images', () => {
    const valid = photo(1);
    const photos = [valid, valid, { ...photo(2), src: '/.env' }, { ...photo(3), alt: ' ' }, { ...photo(4), width: 0 }, photo(5)];
    assert.deepEqual(rentalPhotos({ photos }), [valid, photo(5)]);
});

test('the main image remains available when the gallery is empty', () => {
    const main = photo(1);
    assert.deepEqual(rentalPhotos({ photos: [], imgSrc: main.src, imageAlt: main.alt, imgWidth: main.width, imgHeight: main.height }), [main]);
});
