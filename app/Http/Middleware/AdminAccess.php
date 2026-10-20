<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        abort_unless($user, 401, 'Connectez-vous pour accéder à l’administration.');
        abort_unless($user->is_admin && $user->active, 403, 'Accès administrateur refusé.');
        abort_unless((int) $request->session()->get('admin_version') === (int) $user->session_version, 401, 'Reconnectez-vous.');

        return $next($request);
    }
}
