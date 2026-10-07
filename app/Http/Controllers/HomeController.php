<?php

namespace App\Http\Controllers;

use App\Support\ListingCatalog;
use App\Support\PublicContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class HomeController extends Controller
{
    public function __invoke(Request $request, ListingCatalog $catalog, PublicContact $contact)
    {
        // Preserve searches saved before the catalogue got its own page.
        if ($request->hasAny(['city', 'duration', 'furnished'])) {
            return redirect()->route('listings.index', $request->only('city', 'duration', 'furnished'));
        }

        $cities = $catalog->cities();

        return view('home', [
            'demo' => $catalog->enabled(),
            'cities' => $cities,
            // Until demand statistics exist, rank by published catalogue size.
            'popularCities' => collect($cities)->sortBy([['count', 'desc'], ['name', 'asc']])
                ->take(3)->values()->all(),
            'listings' => $catalog->search([], 6),
            'contact' => $contact->links(),
        ]);
    }

    public function index(Request $request, ListingCatalog $catalog, PublicContact $contact)
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

        return response()->view('listings', [
            'demo' => $catalog->enabled(),
            'cities' => $catalog->cities(),
            'listings' => $invalid ? [] : $catalog->search($filters),
            'filters' => $filters,
            'filtered' => collect($filters)->filter()->isNotEmpty(),
            'filterErrors' => $validator->errors(),
            'contact' => $contact->links(),
        ], $invalid ? 422 : 200);
    }

    public function page(Request $request, ListingCatalog $catalog, PublicContact $contact)
    {
        $view = match ($request->route()->getName()) {
            'renting' => 'renting',
            'about' => 'about',
            'contact' => 'contact',
        };

        return view($view, ['demo' => $catalog->enabled(), 'contact' => $contact->links()]);
    }

    public function show(string $slug, ListingCatalog $catalog, PublicContact $contact)
    {
        $listing = $catalog->find($slug);
        abort_unless($listing, 404);

        return view('demo-listing', [
            'listing' => $listing,
            'demo' => $catalog->enabled(),
            'contact' => $contact->links(),
        ]);
    }
}
