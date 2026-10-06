<?php

namespace App\Support;

class DemoCatalog
{
    public function enabled(): bool
    {
        return app()->environment('local', 'testing') && (bool) config('cipimmo.demo');
    }

    public function all(): array
    {
        if (! $this->enabled()) {
            return [];
        }

        return array_map(fn ($listing) => [
            ...$listing,
            'images' => ListingPhotos::forListing($listing),
        ], require resource_path('data/demo-listings.php'));
    }

    public function cities(): array
    {
        return collect($this->all())->unique('city')->map(fn ($listing) => [
            'slug' => $listing['city'],
            'name' => $listing['city_name'],
            'count' => collect($this->all())->where('city', $listing['city'])->count(),
        ])->values()->all();
    }

    public function search(array $filters): array
    {
        return array_values(array_filter($this->all(), function ($listing) use ($filters) {
            foreach (['city', 'duration', 'furnished'] as $field) {
                if (! empty($filters[$field]) && $filters[$field] !== $listing[$field]) {
                    return false;
                }
            }

            return true;
        }));
    }

    public function find(string $slug): ?array
    {
        return collect($this->all())->firstWhere('slug', $slug);
    }
}
