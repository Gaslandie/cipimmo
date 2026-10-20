<?php

namespace App\Support;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ManagedCatalogue
{
    public function validate(array $value): array
    {
        $text = ['string', 'not_regex:/[<>\x00-\x08\x0b\x0c\x0e-\x1f]/u'];
        $media = ['string', 'max:240', 'regex:~^/assets/images/properties/[a-zA-Z0-9_/-]+\.(?:jpe?g|png|webp)$~'];
        $rules = [
            'slug' => ['required', 'string', 'max:100', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
            'title' => ['required', ...$text, 'max:160'], 'city' => ['required', ...$text, 'max:100'],
            'municipality' => ['required', Rule::in(['Conakry', 'Coyah', 'Kankan'])],
            'duration' => ['required', Rule::in(['Court séjour', 'Longue durée'])],
            'furnished' => ['present', 'nullable', Rule::in(['', 'Meublé', 'Non meublé'])],
            'price' => ['present', 'nullable', 'integer', 'min:0', 'max:999999999999'],
            'period' => ['present', 'nullable', Rule::in(['', 'jour', 'nuit', 'mois'])],
            'beds' => ['present', 'nullable', 'integer', 'between:0,100'],
            'area' => ['present', 'nullable', 'integer', 'between:0,100000'],
            'imgSrc' => ['present', 'nullable', ...$media], 'imageAlt' => ['present', 'nullable', ...$text, 'max:300'],
            'description' => ['required', ...$text, 'max:6000'],
            'category' => ['required', Rule::in(['Appartement', 'Duplex', 'Logement', 'Villa', 'Maison', 'Studio'])],
            'imgWidth' => ['required', 'integer', 'between:1,12000'], 'imgHeight' => ['required', 'integer', 'between:1,12000'],
            'availability' => ['required', Rule::in(['À confirmer', 'Disponible', 'Indisponible'])],
            'published' => ['required', 'boolean'],
            'photos' => ['sometimes', 'array', 'max:30'], 'photos.*' => ['array:src,alt,width,height,caption,originalSrc'],
            'photos.*.src' => ['required', ...$media, 'distinct'], 'photos.*.originalSrc' => ['sometimes', ...$media],
            'photos.*.alt' => ['required', ...$text, 'max:300'], 'photos.*.caption' => ['sometimes', ...$text, 'max:1000'],
            'photos.*.width' => ['required', 'integer', 'between:1,12000'], 'photos.*.height' => ['required', 'integer', 'between:1,12000'],
            'amenities' => ['sometimes', 'array:Eau,Électricité,Climatisation,Cuisine,Parking,Wi-Fi'],
            'amenities.*' => ['required', ...$text, 'max:300'],
            'sharedAmenities' => ['sometimes', 'array', 'max:30'], 'sharedAmenities.*' => ['required', ...$text, 'max:300'],
            'neighbourhood' => ['sometimes', 'array', 'max:30'], 'neighbourhood.*' => ['required', ...$text, 'max:300'],
            'charges' => ['sometimes', 'array:included,extra'],
            'charges.included' => ['present_with:charges', 'array', 'max:30'], 'charges.included.*' => ['required', ...$text, 'max:300'],
            'charges.extra' => ['present_with:charges', 'array', 'max:30'], 'charges.extra.*' => ['required', ...$text, 'max:300'],
            'photoNotice' => ['sometimes', ...$text, 'max:1500'],
            'video' => ['sometimes', 'array:src,poster,description,captions'],
            'video.src' => ['required_with:video', 'regex:~^/assets/[a-zA-Z0-9_/-]+\.(mp4|webm)$~'],
            'video.poster' => ['required_with:video', ...$media], 'video.description' => ['required_with:video', ...$text, 'max:1000'],
            'video.captions' => ['sometimes', 'regex:~^/assets/[a-zA-Z0-9_/-]+\.vtt$~'],
        ];
        if (array_diff(array_keys($value), array_filter(array_keys($rules), fn ($key) => ! str_contains($key, '.')))) {
            throw ValidationException::withMessages(['rental' => 'Champ inconnu.']);
        }
        $data = Validator::make($value, $rules)->validate();
        foreach (['furnished', 'period', 'imgSrc', 'imageAlt'] as $key) {
            $data[$key] ??= '';
        }
        if (($data['price'] === null && $data['period'] !== '') || ($data['price'] !== null && ! in_array($data['period'], $data['duration'] === 'Longue durée' ? ['mois'] : ['jour', 'nuit'], true))) {
            throw ValidationException::withMessages(['period' => 'Le tarif et sa période doivent correspondre à la durée du séjour.']);
        }
        if (($data['imgSrc'] && ! $data['imageAlt']) || (! empty($data['photos']) && $data['photos'][0]['src'] !== $data['imgSrc'])) {
            throw ValidationException::withMessages(['photos' => 'Vérifiez la photo principale et sa description.']);
        }
        foreach (['price', 'beds', 'area', 'imgWidth', 'imgHeight'] as $key) {
            if ($data[$key] !== null) {
                $data[$key] = (int) $data[$key];
            }
        }
        $data['published'] = (bool) $data['published'];

        return $this->currentWording($data);
    }

    private function currentWording(array $rental): array
    {
        if (isset($rental['photoNotice']) && is_string($rental['photoNotice'])) {
            $rental['photoNotice'] = str_replace(
                'Ces photos sont utilisées temporairement pour les trois appartements de cet immeuble à Ansoumaniah.',
                'Ces photos présentent l’immeuble et sont communes aux trois appartements à Ansoumaniah.',
                $rental['photoNotice'],
            );
        }

        return $rental;
    }

    public function items(): array
    {
        return DB::table('managed_rentals')->orderBy('id')->get()->map(fn ($row) => [
            'rental' => $this->currentWording(json_decode($row->content, true, flags: JSON_THROW_ON_ERROR)),
            'revision' => (int) $row->revision, 'updated' => $row->updated_at,
        ])->all();
    }

    public function save(array $data, int $revision, int $actor, ?string $slug): array
    {
        abort_if($slug !== null && $slug !== $data['slug'], 422, 'La référence ne peut pas changer.');

        return DB::transaction(function () use ($data, $revision, $actor, $slug) {
            $existing = DB::table('managed_rentals')->where('slug', $data['slug'])->lockForUpdate()->first();
            abort_if($slug && ! $existing, 404);
            abort_if(($existing?->revision ?? 0) !== $revision, 409, 'Ce logement a changé. Rechargez la liste.');
            abort_if(! $slug && $existing, 409, 'Cette référence existe déjà.');
            $now = now();
            $record = ['content' => json_encode($data, JSON_THROW_ON_ERROR), 'revision' => $revision + 1, 'updated_at' => $now];
            if ($existing) {
                $changed = DB::table('managed_rentals')->where('id', $existing->id)->where('revision', $revision)->update($record);
                abort_unless($changed === 1, 409, 'Ce logement a changé. Rechargez la liste.');
                DB::table('rental_history')->insert(['slug' => $data['slug'], 'content' => $existing->content, 'revision' => $revision, 'actor_id' => $actor, 'created_at' => $now]);
            } else {
                abort_if(DB::table('managed_rentals')->count() >= 2000, 422, 'Limite du catalogue atteinte.');
                DB::table('managed_rentals')->insert([...$record, 'slug' => $data['slug'], 'created_at' => $now]);
            }

            return ['rental' => $data, 'revision' => $revision + 1, 'updated' => $now->toIso8601String()];
        });
    }

    public function photoPath(string $src): string
    {
        abort_unless(preg_match('~^/assets/images/properties/[a-zA-Z0-9_/-]+\.(?:jpe?g|png|webp)$~', $src), 422, 'Photo non autorisée.');
        $suffix = substr($src, strlen('/assets/images/properties/'));
        if (str_starts_with($suffix, 'admin/')) {
            $root = realpath(config('admin.upload_root') ?: config('admin.photo_root').'/admin');
            $suffix = substr($suffix, strlen('admin/'));
        } else {
            $root = realpath(config('admin.photo_root'));
        }
        $path = $root ? realpath($root.'/'.$suffix) : false;
        abort_unless($root && $path && str_starts_with($path, $root.DIRECTORY_SEPARATOR) && is_file($path), 404, 'Photo introuvable.');

        return $path;
    }
}
