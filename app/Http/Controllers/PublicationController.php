<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class PublicationController extends Controller
{
    public function store(): JsonResponse
    {
        $token = config('admin.github_token');
        abort_unless(is_string($token) && $token !== '', 503, 'La publication automatique doit encore être configurée. Vos modifications sont conservées.');
        try {
            $response = Http::withToken($token)->acceptJson()->connectTimeout(5)->timeout(15)
                ->post('https://api.github.com/repos/Gaslandie/cipimmo/actions/workflows/bluehost.yml/dispatches', ['ref' => 'main']);
        } catch (ConnectionException) {
            return response()->json(['error' => 'GitHub ne répond pas. Vos modifications sont conservées. Réessayez plus tard.'], 503);
        }
        abort_unless($response->status() === 204, 503, 'La publication n’a pas démarré. Vos modifications sont conservées. Contactez le responsable du site.');

        return response()->json(['message' => 'Publication demandée. Le site sera mis à jour après les contrôles de GitHub.']);
    }
}
