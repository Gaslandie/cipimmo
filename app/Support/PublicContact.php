<?php

namespace App\Support;

class PublicContact
{
    public function links(): array
    {
        // Only explicit international public numbers can create contact links.
        $phone = $this->number(config('cipimmo.phone'));
        $whatsapp = $this->number(config('cipimmo.whatsapp'));

        return [
            'phone' => $phone ? 'tel:'.$phone : null,
            'whatsapp' => $whatsapp ? 'https://wa.me/'.substr($whatsapp, 1) : null,
        ];
    }

    private function number(mixed $value): ?string
    {
        return is_string($value) && preg_match('/^\+[1-9][0-9]{7,14}$/D', $value) ? $value : null;
    }
}
