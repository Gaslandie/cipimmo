<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    protected $fillable = [
        'slug', 'title', 'city', 'city_name', 'duration', 'furnished',
        'price', 'period', 'rooms', 'area', 'description', 'images',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'is_published' => 'boolean',
            'is_demo' => 'boolean',
            'price' => 'integer',
            'rooms' => 'integer',
            'area' => 'integer',
        ];
    }
}
