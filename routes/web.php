<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PublicationController;
use App\Http\Middleware\AdminAccess;
use App\Http\Middleware\AdminSecurity;
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

Route::prefix('admin')->middleware(AdminSecurity::class)->group(function () {
    Route::view('/', 'admin')->name('admin');
    Route::post('/api/login', [AdminController::class, 'login'])->middleware('throttle:30,1,cip-admin-login:');
    Route::middleware(AdminAccess::class)->group(function () {
        $controller = AdminController::class;
        Route::get('/api/session', [$controller, 'session']);
        Route::post('/api/logout', [$controller, 'logout']);
        Route::get('/api/rentals', [$controller, 'index']);
        Route::post('/api/rentals', [$controller, 'save'])->middleware('throttle:120,1,cip-admin-rentals:');
        Route::patch('/api/rentals/{slug}', [$controller, 'save'])->where('slug', '[a-z0-9-]{1,100}')->middleware('throttle:120,1,cip-admin-rentals:');
        Route::post('/api/photos', [$controller, 'photo'])->middleware('throttle:30,1,cip-admin-photos:');
        Route::get('/api/media', [$controller, 'media']);
        Route::post('/api/publish', [PublicationController::class, 'store'])->middleware('throttle:2,1,cip-admin-publish:');
        Route::get('/api/export', [$controller, 'export']);
    });
});
