<?php

namespace App\Support;

use App\Models\Listing;
use Illuminate\Database\Eloquent\Builder;

class ListingCatalog
{
    public function enabled(): bool
    {
        return app()->environment('local', 'testing') && (bool) config('cipimmo.demo');
    }

    private function visible(): Builder
    {
        // Apply the same server-side visibility to search, cities and direct links.
        return Listing::query()->where('is_published', true)
            ->when(! $this->enabled(), fn (Builder $query) => $query->where('is_demo', false));
    }

    public function cities(): array
    {
        return $this->visible()->select('city', 'city_name')
            ->selectRaw('COUNT(*) as listing_count')
            ->groupBy('city', 'city_name')->orderBy('city_name')
            ->get()->map(fn (Listing $listing) => [
                'slug' => $listing->city,
                'name' => $listing->city_name,
                'count' => (int) $listing->listing_count,
            ])->all();
    }

    public function search(array $filters, ?int $limit = null): array
    {
        $query = $this->visible();
        foreach (['city', 'duration', 'furnished'] as $field) {
            if (! empty($filters[$field])) {
                $query->where($field, $filters[$field]);
            }
        }

        return $query->orderBy('id')->when($limit !== null, fn (Builder $query) => $query->limit($limit))
            ->get()->map($this->toListing(...))->all();
    }

    public function find(string $slug): ?array
    {
        $listing = $this->visible()->where('slug', $slug)->first();

        return $listing ? $this->toListing($listing) : null;
    }

    private function toListing(Listing $listing): array
    {
        $data = $listing->only([
            'slug', 'title', 'city', 'city_name', 'duration', 'furnished',
            'price', 'period', 'rooms', 'area', 'description', 'images',
        ]);

        return [...$data, 'images' => ListingPhotos::forListing($data)];
    }
}
