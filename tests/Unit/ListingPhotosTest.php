<?php

namespace Tests\Unit;

use App\Support\ListingPhotos;
use PHPUnit\Framework\TestCase;

class ListingPhotosTest extends TestCase
{
    public function test_gallery_is_limited_to_five_distinct_images(): void
    {
        $photos = [];
        for ($i = 1; $i <= 7; $i++) {
            $photos[] = ['image' => "photo-$i.jpg", 'width' => 800, 'height' => 600, 'alt' => "Vue $i"];
        }
        array_unshift($photos, $photos[0]);
        $result = ListingPhotos::forListing(['images' => $photos]);

        $this->assertCount(5, $result);
        $this->assertSame(['photo-1.jpg', 'photo-2.jpg', 'photo-3.jpg', 'photo-4.jpg', 'photo-5.jpg'], array_column($result, 'image'));
    }

    public function test_unsafe_paths_urls_active_files_and_invalid_dimensions_are_refused(): void
    {
        $photos = array_map(fn ($file) => ['image' => $file, 'width' => 800, 'height' => 600], [
            '../.env', '/etc/passwd', 'https://example.org/photo.jpg', 'javascript:alert(1)', 'script.svg', 'image.jpg?x=1',
        ]);
        $photos[] = ['image' => 'empty.jpg', 'width' => 0, 'height' => 600];
        $photos[] = ['image' => 'huge.jpg', 'width' => 999999, 'height' => 600];
        $photos[] = ['image' => 'valid.webp', 'width' => 800, 'height' => 600, 'alt' => 'Salon'];

        $this->assertSame(['valid.webp'], array_column(ListingPhotos::forListing(['images' => $photos]), 'image'));
        $this->assertSame([], ListingPhotos::forListing(['images' => 'invalid']));
    }
}
