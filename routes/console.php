<?php

use App\Support\ManagedCatalogue;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('cip:catalogue-export', function (ManagedCatalogue $catalogue) {
    $this->output->write(json_encode(array_column($catalogue->items(), 'rental'), JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE));
})->purpose('Exporter uniquement les logements pour la compilation du site.');

Artisan::command('cip:catalogue-import {file}', function (ManagedCatalogue $catalogue) {
    $filename = $this->argument('file');
    if (! is_file($filename) || filesize($filename) > 20 * 1024 * 1024) {
        throw new RuntimeException('Catalogue absent ou trop grand.');
    }
    $values = json_decode(file_get_contents($filename), true, flags: JSON_THROW_ON_ERROR);
    if ($values === ['initial' => true]) {
        $this->info('Première installation : utilisation du catalogue initial du dépôt.');

        return;
    }
    if (! is_array($values) || ! array_is_list($values) || count($values) > 2000) {
        throw new RuntimeException('Catalogue invalide.');
    }
    $values = array_map($catalogue->validate(...), $values);
    if (count(array_unique(array_column($values, 'slug'))) !== count($values)) {
        throw new RuntimeException('Références en double.');
    }
    $values = array_values(array_filter($values, fn ($rental) => $rental['published']));
    file_put_contents(config('admin.catalogue'), json_encode($values, JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    $this->info('Catalogue de compilation validé.');
})->purpose('Valider le catalogue reçu avant de compiler le site public.');
