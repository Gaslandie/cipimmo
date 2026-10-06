<?php

// PHP's local server doesn't process Apache's production .htaccess.
// Only allow public static assets; never serve dotfiles or arbitrary PHP files.
$public = realpath(__DIR__.'/../public');
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/');
if (preg_match('~(^|/)\.~', $path) || str_contains($path, "\0")) {
    http_response_code(404);
    exit;
}
$file = realpath($public.'/'.$path);
$extensions = ['css', 'js', 'jpg', 'jpeg', 'png', 'webp', 'svg', 'ico', 'woff', 'woff2', 'txt'];
if ($file && str_starts_with($file, $public.DIRECTORY_SEPARATOR) && is_file($file)
    && in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), $extensions, true)) {
    return false;
}
require $public.'/index.php';
