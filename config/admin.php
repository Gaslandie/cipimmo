<?php

return [
    'github_token' => env('CIP_GITHUB_TOKEN'),
    'upload_root' => env('CIP_ADMIN_UPLOAD_ROOT'),
    'photo_root' => env('CIP_ADMIN_PHOTO_ROOT', base_path('luminor/public/assets/images/properties')),
    'catalogue' => base_path('luminor/src/data/catalogue.json'),
    'origin' => env('APP_URL', 'http://127.0.0.1:8000'),
];
