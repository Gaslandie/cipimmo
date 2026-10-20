<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminSecurity
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->isMethodSafe()) {
            abort_unless($request->header('Origin') === rtrim(config('admin.origin'), '/'), 403, 'Origine non autorisée.');
            abort_unless(in_array($request->header('Sec-Fetch-Site'), [null, 'same-origin', 'none'], true), 403);
            abort_if((int) $request->header('Content-Length') > 9 * 1024 * 1024, 413);
        }
        $response = $next($request);
        $response->headers->add([
            'Cache-Control' => 'private, no-store', 'X-Robots-Tag' => 'noindex, nofollow, noarchive',
            'X-Content-Type-Options' => 'nosniff', 'X-Frame-Options' => 'DENY', 'Referrer-Policy' => 'no-referrer',
            'Content-Security-Policy' => "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
        ]);

        return $response;
    }
}
