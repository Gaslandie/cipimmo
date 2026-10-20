<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false);
            $table->boolean('active')->default(true);
            $table->unsignedInteger('session_version')->default(1);
        });
        Schema::create('managed_rentals', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 100)->unique();
            $table->json('content');
            $table->unsignedInteger('revision')->default(1);
            $table->timestamps();
        });
        Schema::create('rental_history', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 100);
            $table->json('content');
            $table->unsignedInteger('revision');
            $table->foreignId('actor_id')->constrained('users');
            $table->timestamp('created_at');
        });
    }

    public function down(): void
    {
        throw new RuntimeException('Cette migration conserve les données. Utiliser une correction additive.');
    }
};
