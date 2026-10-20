<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*', 'admin/api/*') || $request->expectsJson(),
        );
        $exceptions->respond(function (Response $response): Response {
            if ($response->getStatusCode() >= 400 && str_contains($response->headers->get('Content-Type', ''), 'text/html')) {
                $response->setContent(view('errors.status', ['status' => $response->getStatusCode()])->render());
                $response->headers->set('Cache-Control', 'private, no-store');
                $response->headers->set('X-Robots-Tag', 'noindex, nofollow, noarchive');
            }

            return $response;
        });
    })->create();
