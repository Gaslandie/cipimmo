<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/demo/logements/{slug}', [HomeController::class, 'show'])
    ->where('slug', '[a-z0-9-]{1,80}')->name('demo.listing');
