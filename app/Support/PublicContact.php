<?php

namespace App\Support;

class PublicContact
{
    public function links(): array
    {
        // Only explicit international public numbers can create contact links.
        $phone = $this->number(config('cipimmo.phone'));
        $whatsapp = $this->number(config('cipimmo.whatsapp'));

        // Explicitly enabled local preview only. NANPA reserves 555-0100..0199.
        if (app()->environment('local', 'testing') && config('cipimmo.placeholder_contact')) {
            if (in_array(config('cipimmo.phone'), [null, ''], true)) {
                $phone = '+12025550123';
            }
            if (in_array(config('cipimmo.whatsapp'), [null, ''], true)) {
                $whatsapp = '+12025550123';
            }
        }

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
