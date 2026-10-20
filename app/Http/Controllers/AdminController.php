<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Support\ManagedCatalogue;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class AdminController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate(['username' => 'required|string|max:254', 'password' => 'required|string|max:128']);
        $key = 'cip-login:'.hash('sha256', mb_strtolower($data['username']).'|'.$request->ip());
        abort_if(RateLimiter::tooManyAttempts($key, 8), 429, 'Trop de tentatives. Réessayez dans 15 minutes.');
        RateLimiter::hit($key, 900);
        $user = User::where('email', mb_strtolower(trim($data['username'])))->first();
        $valid = Hash::check($data['password'], $user?->password ?? '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.');
        abort_unless($valid && $user?->active && $user?->is_admin, 401, 'Identifiant ou mot de passe incorrect.');
        Auth::login($user);
        $request->session()->regenerate();
        $request->session()->regenerateToken();
        $request->session()->put('admin_version', $user->session_version);
        RateLimiter::clear($key);

        return $this->session($request);
    }

    public function session(Request $request): JsonResponse
    {
        return response()->json(['username' => $request->user()->email, 'csrf' => csrf_token()]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['ok' => true, 'csrf' => csrf_token()]);
    }

    public function index(ManagedCatalogue $catalogue): JsonResponse
    {
        return response()->json(['items' => $catalogue->items()]);
    }

    public function save(Request $request, ManagedCatalogue $catalogue, ?string $slug = null): JsonResponse
    {
        abort_if(strlen($request->getContent()) > 131072, 413);
        $input = $request->validate(['rental' => 'required|array', 'revision' => 'required|integer|min:0']);
        abort_if(array_diff(array_keys($request->all()), ['rental', 'revision']), 422, 'Champ inconnu.');
        $data = $catalogue->validate($input['rental']);
        $photos = [$data['imgSrc']];
        foreach ($data['photos'] ?? [] as $photo) {
            $photos[] = $photo['src'];
            $photos[] = $photo['originalSrc'] ?? '';
        }
        foreach (array_filter($photos) as $photo) {
            $catalogue->photoPath($photo);
        }

        return response()->json($catalogue->save($data, (int) $input['revision'], $request->user()->id, $slug), $slug ? 200 : 201);
    }

    public function photo(Request $request): JsonResponse
    {
        $request->validate(['file' => 'required|file|mimes:jpeg,png,webp|max:8192', 'alt' => ['required', 'string', 'max:300', 'not_regex:/[<>\x00-\x1f]/u']]);
        abort_unless(function_exists('imagecreatefromstring') && function_exists('imagewebp'), 503, 'Le traitement des images doit être activé sur le serveur.');
        $file = $request->file('file');
        $size = @getimagesize($file->getRealPath());
        abort_unless($size && $size[0] > 0 && $size[1] > 0 && $size[0] <= 12000 && $size[1] <= 12000 && $size[0] * $size[1] <= 12000000, 422, 'Dimensions de photo non autorisées.');
        $image = @imagecreatefromstring(file_get_contents($file->getRealPath()));
        abort_unless($image, 422, 'Image illisible.');
        $root = realpath(config('admin.photo_root'));
        abort_unless($root, 503, 'Dossier des photos indisponible.');
        $directory = config('admin.upload_root') ?: $root.'/admin';
        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }
        abort_unless(realpath($directory) === $directory && ! is_link($directory), 503);
        $name = Str::uuid().'.webp';
        try {
            abort_unless(imagewebp($image, $directory.'/'.$name, 85), 500, 'Enregistrement impossible.');
        } finally {
            imagedestroy($image);
        }

        return response()->json(['src' => '/assets/images/properties/admin/'.$name, 'alt' => $request->string('alt')->trim()->toString(), 'width' => $size[0], 'height' => $size[1]], 201);
    }

    public function media(Request $request, ManagedCatalogue $catalogue): BinaryFileResponse
    {
        $request->validate(['path' => 'required|string|max:240']);
        abort_if(count($request->query()) !== 1, 422);

        return response()->file($catalogue->photoPath($request->query('path')), ['Cache-Control' => 'private, no-store', 'X-Content-Type-Options' => 'nosniff']);
    }

    public function export(ManagedCatalogue $catalogue): JsonResponse
    {
        return response()->json(['format' => 'cip-immo-catalogue-v1', 'rentals' => array_column($catalogue->items(), 'rental')])->header('Content-Disposition', 'attachment; filename="cip-immo-catalogue.json"');
    }
}
