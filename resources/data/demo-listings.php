<?php

// Fictional examples used only by the guarded local/test seeder.
$apartmentPhoto = ['image' => 'apartment-interior.jpg', 'width' => 977, 'height' => 733, 'alt' => 'Salon lumineux avec cuisine ouverte'];
$heroPhoto = ['image' => 'hero-interior.jpg', 'width' => 800, 'height' => 1200, 'alt' => 'Salon contemporain avec escalier et grandes fenêtres'];

$listings = [
    ['slug' => 'appartement-lumineux', 'title' => 'Un appartement lumineux', 'city' => 'conakry', 'city_name' => 'Conakry', 'duration' => 'court-sejour', 'furnished' => 'meuble', 'price' => 450000, 'period' => 'nuit', 'rooms' => 2, 'area' => 75, 'images' => [$apartmentPhoto, $heroPhoto], 'description' => 'Un appartement meublé avec un salon, deux chambres et une cuisine, pour un court séjour à Conakry.'],
    ['slug' => 'maison-spacieuse', 'title' => 'Une maison pour s’installer', 'city' => 'kindia', 'city_name' => 'Kindia', 'duration' => 'longue-duree', 'furnished' => 'non-meuble', 'price' => 3500000, 'period' => 'mois', 'rooms' => 3, 'area' => 120, 'images' => [$heroPhoto, $apartmentPhoto], 'description' => 'Une maison non meublée de trois chambres, pour une location longue durée à Kindia.'],
    ['slug' => 'studio-pratique', 'title' => 'Un studio pour votre séjour', 'city' => 'conakry', 'city_name' => 'Conakry', 'duration' => 'court-sejour', 'furnished' => 'meuble', 'price' => 300000, 'period' => 'nuit', 'rooms' => 1, 'area' => 38, 'images' => [$heroPhoto, $apartmentPhoto], 'description' => 'Un studio meublé pour un court séjour à Conakry.'],
    ['slug' => 'appartement-familial', 'title' => 'De la place pour toute la famille', 'city' => 'labe', 'city_name' => 'Labé', 'duration' => 'longue-duree', 'furnished' => 'meuble', 'price' => 2800000, 'period' => 'mois', 'rooms' => 3, 'area' => 95, 'images' => [$apartmentPhoto, $heroPhoto], 'description' => 'Un appartement meublé de trois chambres, pour une location longue durée à Labé.'],
];

// slug, title, city, city name, duration, furniture, price, bedrooms, surface.
$additional = [
    ['studio-kaloum', 'Un studio au cœur de Kaloum', 'conakry', 'Conakry', 'court-sejour', 'meuble', 350000, 1, 42],
    ['appartement-kipe', 'Un séjour confortable à Kipé', 'conakry', 'Conakry', 'court-sejour', 'meuble', 550000, 2, 85],
    ['villa-nongo', 'Une villa familiale à Nongo', 'conakry', 'Conakry', 'longue-duree', 'non-meuble', 6500000, 4, 180],
    ['appartement-ratoma', 'Un appartement à aménager à Ratoma', 'conakry', 'Conakry', 'longue-duree', 'non-meuble', 3200000, 2, 80],
    ['appartement-taouyah', 'Un appartement meublé à Taouyah', 'conakry', 'Conakry', 'longue-duree', 'meuble', 4800000, 3, 105],
    ['studio-lambanyi', 'Un studio meublé à Lambanyi', 'conakry', 'Conakry', 'longue-duree', 'meuble', 2200000, 1, 40],
    ['studio-kindia', 'Une étape au calme à Kindia', 'kindia', 'Kindia', 'court-sejour', 'meuble', 180000, 1, 35],
    ['appartement-kindia', 'Un appartement prêt à vivre à Kindia', 'kindia', 'Kindia', 'longue-duree', 'meuble', 1900000, 2, 70],
    ['maison-jardin-kindia', 'Une maison avec jardin à Kindia', 'kindia', 'Kindia', 'longue-duree', 'non-meuble', 2500000, 3, 130],
    ['studio-labe', 'Un pied-à-terre à Labé', 'labe', 'Labé', 'court-sejour', 'meuble', 200000, 1, 36],
    ['maison-labe', 'Une maison à personnaliser à Labé', 'labe', 'Labé', 'longue-duree', 'non-meuble', 2100000, 3, 115],
    ['appartement-centre-labe', 'Un appartement meublé au centre de Labé', 'labe', 'Labé', 'longue-duree', 'meuble', 2400000, 2, 78],
    ['studio-kankan', 'Un studio pour découvrir Kankan', 'kankan', 'Kankan', 'court-sejour', 'meuble', 160000, 1, 32],
    ['appartement-kankan', 'Un appartement meublé à Kankan', 'kankan', 'Kankan', 'longue-duree', 'meuble', 1700000, 2, 72],
    ['maison-kankan', 'Une grande maison à Kankan', 'kankan', 'Kankan', 'longue-duree', 'non-meuble', 2300000, 4, 145],
    ['studio-nzerekore', 'Un séjour tranquille à Nzérékoré', 'nzerekore', 'Nzérékoré', 'court-sejour', 'meuble', 150000, 1, 34],
    ['appartement-nzerekore', 'Un appartement meublé à Nzérékoré', 'nzerekore', 'Nzérékoré', 'longue-duree', 'meuble', 1600000, 2, 68],
    ['maison-nzerekore', 'Une maison spacieuse à Nzérékoré', 'nzerekore', 'Nzérékoré', 'longue-duree', 'non-meuble', 1800000, 3, 110],
    ['appartement-mamou', 'Un appartement prêt à vivre à Mamou', 'mamou', 'Mamou', 'longue-duree', 'meuble', 1400000, 2, 65],
    ['maison-mamou', 'Une maison pour s’installer à Mamou', 'mamou', 'Mamou', 'longue-duree', 'non-meuble', 1700000, 3, 100],
];

foreach ($additional as $index => [$slug, $title, $city, $cityName, $duration, $furnished, $price, $rooms, $area]) {
    $listings[] = [
        'slug' => $slug,
        'title' => $title,
        'city' => $city,
        'city_name' => $cityName,
        'duration' => $duration,
        'furnished' => $furnished,
        'price' => $price,
        'period' => $duration === 'court-sejour' ? 'nuit' : 'mois',
        'rooms' => $rooms,
        'area' => $area,
        'images' => $index % 2 === 0 ? [$apartmentPhoto, $heroPhoto] : [$heroPhoto, $apartmentPhoto],
        'description' => sprintf(
            'Ce logement %s de %d m² propose %d %s et un salon à %s. Il convient à %s. Contactez CIP IMMO pour les conditions de location.',
            $furnished === 'meuble' ? 'meublé' : 'non meublé',
            $area,
            $rooms,
            $rooms === 1 ? 'chambre' : 'chambres',
            $cityName,
            $duration === 'court-sejour' ? 'un court séjour' : 'une installation de longue durée',
        ),
    ];
}

return $listings;
