<?php

namespace App\Http\Controllers;

use App\Support\DemoCatalog;
use App\Support\PublicContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class HomeController extends Controller
{
    public function __invoke(Request $request, DemoCatalog $catalog, PublicContact $contact)
    {
        $validator = Validator::make($request->only('city', 'duration', 'furnished'), [
            'city' => ['nullable', 'string', 'max:40', Rule::in(array_column($catalog->cities(), 'slug'))],
            'duration' => ['nullable', 'string', 'max:40', Rule::in(['court-sejour', 'longue-duree'])],
            'furnished' => ['nullable', 'string', 'max:40', Rule::in(['meuble', 'non-meuble'])],
        ], [
            '*.in' => 'Choisissez une option proposée dans la recherche.',
            '*.string' => 'Ce filtre doit contenir une seule valeur.',
            '*.max' => 'Ce filtre est trop long.',
        ]);
        $invalid = $validator->fails();
        $filters = $invalid ? [] : $validator->validated();

        return response()->view('home', [
            'demo' => $catalog->enabled(),
            'cities' => $catalog->cities(),
            'listings' => $catalog->search($filters),
            'filters' => $filters,
            'filtered' => collect($filters)->filter()->isNotEmpty(),
            'filterErrors' => $validator->errors(),
            'contact' => $contact->links(),
        ], $invalid ? 422 : 200);
    }

    public function show(string $slug, DemoCatalog $catalog, PublicContact $contact)
    {
        $listing = $catalog->find($slug);
        abort_unless($listing, 404);

        return view('demo-listing', [
            'listing' => $listing,
            'demo' => true,
            'contact' => $contact->links(),
        ]);
    }
}
