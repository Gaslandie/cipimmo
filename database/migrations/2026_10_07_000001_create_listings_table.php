<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 80)->unique();
            $table->string('title');
            $table->string('city', 40);
            $table->string('city_name', 80);
            $table->enum('duration', ['court-sejour', 'longue-duree']);
            $table->enum('furnished', ['meuble', 'non-meuble']);
            $table->unsignedBigInteger('price');
            $table->enum('period', ['nuit', 'mois']);
            $table->unsignedSmallInteger('rooms');
            $table->unsignedInteger('area');
            $table->text('description');
            $table->json('images');
            $table->boolean('is_published')->default(false);
            $table->boolean('is_demo')->default(false);
            $table->timestamps();
            $table->index(['is_published', 'is_demo', 'city', 'duration', 'furnished'], 'listings_search_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
