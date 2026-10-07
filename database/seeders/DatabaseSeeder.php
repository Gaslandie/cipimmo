<?php

namespace Database\Seeders;

use App\Support\ListingCatalog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (app(ListingCatalog::class)->enabled()) {
            $this->call(DemoListingSeeder::class);
        }
    }
}
