<?php

// Export only fictional public content and explicitly allowlisted static assets.
// Usage: ./scripts/php-local scripts/export-pages.php /tmp/cipimmo-preview https://gaslandie.github.io/cipimmo
use App\Support\ListingCatalog;
use Database\Seeders\DemoListingSeeder;
use Illuminate\Contracts\Console\Kernel as ConsoleKernel;
use Illuminate\Contracts\Http\Kernel as HttpKernel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\URL;

require __DIR__.'/../vendor/autoload.php';

$output = $argv[1] ?? '';
$baseUrl = rtrim($argv[2] ?? '', '/');
if (! str_starts_with($output, '/') || ! filter_var($baseUrl, FILTER_VALIDATE_URL)
    || parse_url($baseUrl, PHP_URL_SCHEME) !== 'https' || parse_url($baseUrl, PHP_URL_QUERY)
    || parse_url($baseUrl, PHP_URL_FRAGMENT) || parse_url($baseUrl, PHP_URL_USER)) {
    throw new InvalidArgumentException('Provide an absolute empty output directory and an HTTPS site URL.');
}
if (is_dir($output) && count(scandir($output)) > 2) {
    throw new RuntimeException('The export directory must be empty.');
}
if (! is_dir($output) && ! mkdir($output, 0755, true)) {
    throw new RuntimeException('Cannot create the export directory.');
}

$app = require __DIR__.'/../bootstrap/app.php';
$app->make(ConsoleKernel::class)->bootstrap();
// Use an isolated temporary catalogue. Never read or change the real database.
$app['env'] = 'local';
config([
    'app.debug' => false,
    'app.url' => $baseUrl,
    'database.default' => 'sqlite',
    'database.connections.sqlite.url' => null,
    'database.connections.sqlite.database' => ':memory:',
    'session.driver' => 'array',
    'cache.default' => 'array',
    'cipimmo.demo' => true,
    'cipimmo.placeholder_contact' => false,
]);
Artisan::call('migrate', ['--path' => 'database/migrations/2026_10_07_000001_create_listings_table.php', '--force' => true]);
Artisan::call('db:seed', ['--class' => DemoListingSeeder::class, '--force' => true]);
URL::forceRootUrl($baseUrl);
URL::forceScheme('https');
$basePath = rtrim(parse_url($baseUrl, PHP_URL_PATH) ?? '', '/');
$listings = app(ListingCatalog::class)->search([]);
$bySlug = array_column($listings, null, 'slug');
$paths = ['/', '/logements', '/comment-louer', '/a-propos', '/contact'];
foreach ($listings as $listing) {
    $paths[] = '/logements/'.$listing['slug'];
}
$kernel = $app->make(HttpKernel::class);
foreach ($paths as $path) {
    $request = Request::create('https://preview.internal'.$path);
    $response = $kernel->handle($request);
    if ($response->getStatusCode() !== 200) {
        throw new RuntimeException('Cannot export page: '.$path);
    }
    $html = str_replace($baseUrl, $basePath, $response->getContent());
    $document = new DOMDocument;
    @$document->loadHTML('<?xml encoding="UTF-8">'.$html, LIBXML_HTML_NODEFDTD);
    $xpath = new DOMXPath($document);
    foreach ($xpath->query('//*[@href or @action]') as $node) {
        foreach (['href', 'action'] as $attribute) {
            $value = $node->getAttribute($attribute);
            $target = parse_url($value, PHP_URL_PATH);
            if ($target && in_array(substr($target, strlen($basePath)), $paths, true) && ! str_ends_with($target, '/')) {
                $node->setAttribute($attribute, substr_replace($value, $target.'/', 0, strlen($target)));
            }
        }
    }
    if ($path === '/logements') {
        foreach ($xpath->query('//article[contains(concat(" ", normalize-space(@class), " "), " listing-card ")]') as $card) {
            $link = $xpath->query('.//h3/a', $card)->item(0);
            $slug = basename(parse_url($link->getAttribute('href'), PHP_URL_PATH));
            foreach (['city', 'duration', 'furnished'] as $field) {
                $card->setAttribute('data-'.$field, $bySlug[$slug][$field]);
            }
        }
        $script = $document->createElement('script');
        $script->setAttribute('src', $basePath.'/preview-search.js');
        $script->setAttribute('defer', '');
        $document->getElementsByTagName('head')->item(0)->appendChild($script);
        $noscript = $document->createElement('noscript');
        $notice = $document->createElement('p', 'Activez JavaScript pour utiliser les filtres de cet aperçu. Tous les logements restent consultables ci-dessous.');
        $notice->setAttribute('class', 'notice');
        $noscript->appendChild($notice);
        $form = $xpath->query('//form')->item(0);
        $form->parentNode->insertBefore($noscript, $form);
    }
    $directory = $output.($path === '/' ? '' : $path);
    if (! is_dir($directory)) {
        mkdir($directory, 0755, true);
    }
    // Remove the temporary encoding processing instruction used by DOMDocument.
    file_put_contents($directory.'/index.html', preg_replace('/<\?xml[^>]*>/', '', $document->saveHTML()));
    $kernel->terminate($request, $response);
}

// Copy only assets needed by the rendered public pages, never all of public/.
$assets = [
    'images/apartment-interior.jpg', 'images/hero-interior.jpg', 'images/hero-mobile.jpg',
    'images/cip-immo-symbol.svg',
];
$manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true, flags: JSON_THROW_ON_ERROR);
foreach ($manifest as $entry) {
    $assets[] = 'build/'.$entry['file'];
    foreach ($entry['assets'] ?? [] as $asset) {
        $assets[] = 'build/'.$asset;
    }
}
foreach (array_unique($assets) as $asset) {
    if (! preg_match('~\A(?:images|build/assets)/[a-zA-Z0-9_.-]+\.(?:jpg|svg|css|js|woff2)\z~D', $asset)) {
        throw new RuntimeException('Unapproved asset: '.$asset);
    }
    $target = $output.'/'.$asset;
    if (! is_dir(dirname($target))) {
        mkdir(dirname($target), 0755, true);
    }
    if (! copy(public_path($asset), $target)) {
        throw new RuntimeException('Cannot copy asset: '.$asset);
    }
}
copy(__DIR__.'/preview-search.js', $output.'/preview-search.js');
foreach (['Manrope-OFL.txt', 'Outfit-OFL.txt'] as $license) {
    copy(resource_path('fonts/'.$license), $output.'/build/assets/'.$license);
}
file_put_contents($output.'/.nojekyll', '');
file_put_contents($output.'/robots.txt', "User-agent: *\nDisallow: /\n");
file_put_contents($output.'/404.html', '<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>Page introuvable — CIP IMMO</title><h1>Page introuvable</h1><a href="'.htmlspecialchars($basePath.'/', ENT_QUOTES).'">Retour à l’accueil</a></html>');
echo count($paths)." pages exported to $output\n";
