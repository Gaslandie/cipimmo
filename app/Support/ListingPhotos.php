<?php

namespace App\Support;

class ListingPhotos
{
    public const MAX_PHOTOS = 5;

    public static function forListing(array $listing): array
    {
        $candidates = $listing['images'] ?? [$listing];
        if (! is_array($candidates)) {
            return [];
        }

        $photos = [];
        $seen = [];
        foreach ($candidates as $photo) {
            if (! is_array($photo)) {
                continue;
            }
            $file = $photo['image'] ?? null;
            // Local bitmap names only: no remote URLs, traversal or active SVG files.
            if (! is_string($file) || ! preg_match('/\A[a-zA-Z0-9][a-zA-Z0-9_-]*\.(?:jpe?g|png|webp|avif)\z/D', $file) || isset($seen[$file])) {
                continue;
            }
            $width = $photo['width'] ?? null;
            $height = $photo['height'] ?? null;
            if (! is_int($width) || ! is_int($height) || $width < 1 || $height < 1 || $width > 16000 || $height > 16000) {
                continue;
            }
            $photos[] = [
                'image' => $file,
                'width' => $width,
                'height' => $height,
                'alt' => is_string($photo['alt'] ?? null) ? mb_substr($photo['alt'], 0, 250) : 'Intérieur du logement',
            ];
            $seen[$file] = true;
            if (count($photos) === self::MAX_PHOTOS) {
                break;
            }
        }

        return $photos;
    }
}
