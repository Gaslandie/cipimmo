<?php

use Illuminate\Contracts\Console\Kernel;

/** One-time CLI setup for CIP IMMO only. Never callable through the web. */
if (PHP_SAPI !== 'cli' || PHP_VERSION_ID < 80500) {
    exit("Utiliser PHP 8.5 en ligne de commande. Aucune modification effectuée.\n");
}
$root = '/home2/fnksrwmy/cipimmo';
$revision = $argv[1] ?? '';
if (! preg_match('/^[a-f0-9]{40}$/', $revision) || ! is_file($root.'/.env') || ! is_file('/usr/bin/python3')) {
    exit("Configuration initiale incomplète. Aucune modification effectuée.\n");
}
chdir($root);
require $root.'/vendor/autoload.php';
$app = require $root.'/bootstrap/app.php';
$app->make(Kernel::class)->bootstrap();
if (! extension_loaded('gd') || ! function_exists('imagewebp')) {
    exit("Activer GD avec WebP pour PHP 8.5 avant de poursuivre.\n");
}
$receiver = file_get_contents('https://raw.githubusercontent.com/Gaslandie/cipimmo/'.$revision.'/scripts/bluehost-receiver.py');
if (! $receiver || strlen($receiver) > 50000 || ! str_contains($receiver, 'Forced SSH command')) {
    exit("Téléchargement du programme de déploiement impossible.\n");
}
$shared = $root.'/shared';
if (file_exists($shared)) {
    exit("La préparation existe déjà. Ne pas la remplacer ; vérifier son état.\n");
}
$driver = config('database.default');
$database = config('database.connections.'.$driver.'.database');
if ($driver === 'sqlite') {
    $database = realpath($database) ?: realpath($root.'/'.$database);
    if (! $database || ! is_file($database)) {
        exit("Base SQLite existante introuvable. Aucune modification effectuée.\n");
    }
} elseif ($driver !== 'mysql') {
    exit("Le moteur de base doit être vérifié avant l’installation.\n");
}
umask(0077);
mkdir($shared, 0700);
mkdir($root.'/uploads-public', 0755);
chmod($root.'/uploads-public', 0755);
symlink($root.'/storage', $shared.'/storage');
$contents = file_get_contents($root.'/.env');
$settings = [
    'APP_ENV' => 'production', 'APP_DEBUG' => 'false', 'APP_URL' => 'https://cipimmo.com',
    'CIPIMMO_DEMO' => 'false', 'CIPIMMO_PLACEHOLDER_CONTACT' => 'false',
    'SESSION_DRIVER' => 'file', 'SESSION_COOKIE' => 'cipimmo_admin_session',
    'SESSION_SECURE_COOKIE' => 'true', 'SESSION_HTTP_ONLY' => 'true', 'SESSION_SAME_SITE' => 'strict',
    'CIP_ADMIN_UPLOAD_ROOT' => $root.'/uploads-public',
    'CIP_ADMIN_PHOTO_ROOT' => $root.'/current/public/assets/images/properties',
];
if ($driver === 'sqlite') {
    $settings['DB_DATABASE'] = $database;
}
foreach ($settings as $key => $value) {
    $line = $key.'="'.str_replace(['\\', '"'], ['\\\\', '\\"'], $value).'"';
    $pattern = '/^'.preg_quote($key, '/').'\s*=.*$/m';
    $contents = preg_match($pattern, $contents) ? preg_replace_callback($pattern, fn () => $line, $contents) : rtrim($contents)."\n".$line."\n";
}
file_put_contents($shared.'/.env', $contents);
chmod($shared.'/.env', 0600);
$deploy = $root.'/.deploy';
if (! is_dir($deploy)) {
    mkdir($deploy, 0700);
}
file_put_contents($deploy.'/receiver.py', $receiver);
chmod($deploy.'/receiver.py', 0700);
$ssh = '/home2/fnksrwmy/.ssh';
if (! is_dir($ssh)) {
    mkdir($ssh, 0700);
}
$authorized = $ssh.'/authorized_keys';
$key = 'AAAAC3NzaC1lZDI1NTE5AAAAIDoHpo/8dPRlFlh/GUKMKY3g31/+B8fHLOOrvTdkt9Lr';
$line = 'restrict,command="/usr/bin/python3 '.$deploy.'/receiver.py" ssh-ed25519 '.$key.' cipimmo-deploiement';
$existing = is_file($authorized) ? file_get_contents($authorized) : '';
if (str_contains($existing, $key)) {
    exit("Cette clé existe déjà : vérifier ses restrictions avant de continuer. Le site reste inchangé.\n");
}
file_put_contents($authorized, rtrim($existing)."\n".$line."\n", LOCK_EX);
chmod($authorized, 0600);
echo "Préparation CIP IMMO terminée. La clé est limitée au déploiement CIP IMMO. Le site actuel reste inchangé.\n";
