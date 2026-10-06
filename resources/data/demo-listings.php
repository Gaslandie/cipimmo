<?php

// Fictional examples, never written to a database.
$apartmentPhoto = ['image' => 'apartment-interior.jpg', 'width' => 977, 'height' => 733, 'alt' => 'Salon lumineux avec cuisine ouverte'];
$heroPhoto = ['image' => 'hero-interior.jpg', 'width' => 800, 'height' => 1200, 'alt' => 'Salon contemporain avec escalier et grandes fenêtres'];

return [
    ['slug' => 'appartement-lumineux', 'title' => 'Un appartement lumineux', 'city' => 'conakry', 'city_name' => 'Conakry', 'duration' => 'court-sejour', 'furnished' => 'meuble', 'price' => 450000, 'period' => 'nuit', 'rooms' => 2, 'area' => 75, 'images' => [$apartmentPhoto, $heroPhoto], 'description' => 'Un appartement meublé avec un salon, deux chambres et une cuisine, pour un court séjour à Conakry.'],
    ['slug' => 'maison-spacieuse', 'title' => 'Une maison pour s’installer', 'city' => 'kindia', 'city_name' => 'Kindia', 'duration' => 'longue-duree', 'furnished' => 'non-meuble', 'price' => 3500000, 'period' => 'mois', 'rooms' => 3, 'area' => 120, 'images' => [$heroPhoto, $apartmentPhoto], 'description' => 'Une maison non meublée de trois chambres, pour une location longue durée à Kindia.'],
    ['slug' => 'studio-pratique', 'title' => 'Un studio pour votre séjour', 'city' => 'conakry', 'city_name' => 'Conakry', 'duration' => 'court-sejour', 'furnished' => 'meuble', 'price' => 300000, 'period' => 'nuit', 'rooms' => 1, 'area' => 38, 'images' => [$heroPhoto, $apartmentPhoto], 'description' => 'Un studio meublé pour un court séjour à Conakry.'],
    ['slug' => 'appartement-familial', 'title' => 'De la place pour toute la famille', 'city' => 'labe', 'city_name' => 'Labé', 'duration' => 'longue-duree', 'furnished' => 'meuble', 'price' => 2800000, 'period' => 'mois', 'rooms' => 3, 'area' => 95, 'images' => [$apartmentPhoto, $heroPhoto], 'description' => 'Un appartement meublé de trois chambres, pour une location longue durée à Labé.'],
];
