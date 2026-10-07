<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/logements', [HomeController::class, 'index'])->name('listings.index');
Route::get('/comment-louer', [HomeController::class, 'page'])->name('renting');
Route::get('/a-propos', [HomeController::class, 'page'])->name('about');
Route::get('/contact', [HomeController::class, 'page'])->name('contact');
Route::get('/logements/{slug}', [HomeController::class, 'show'])
    ->where('slug', '[a-z0-9-]{1,80}')->name('listings.show');
Route::get('/demo/logements/{slug}', [HomeController::class, 'show'])
    ->where('slug', '[a-z0-9-]{1,80}')->name('demo.listing');
