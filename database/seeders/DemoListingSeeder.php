<?php

namespace Database\Seeders;

use App\Models\Listing;
use App\Support\ListingCatalog;
use App\Support\ListingPhotos;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use LogicException;

class DemoListingSeeder extends Seeder
{
    public function run(): void
    {
        if (! app(ListingCatalog::class)->enabled()) {
            throw new LogicException('Les logements de test sont autorisés uniquement en local ou en test, avec CIPIMMO_DEMO=true.');
        }

        DB::transaction(function () {
            foreach (require resource_path('data/demo-listings.php') as $data) {
                // Re-running adds missing examples without replacing existing listings.
                if (Listing::where('slug', $data['slug'])->exists()) {
                    continue;
                }

                $listing = new Listing([...$data, 'images' => ListingPhotos::forListing($data)]);
                $listing->is_demo = true;
                $listing->is_published = true;
                $listing->save();
            }
        });
    }
}
