<?php

namespace Tests\Feature;

use App\Models\Listing;
use Database\Seeders\DemoListingSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['cipimmo.demo' => true, 'cipimmo.phone' => null, 'cipimmo.whatsapp' => null, 'cipimmo.placeholder_contact' => false]);
        $this->seed(DemoListingSeeder::class);
    }

    public function test_home_shows_a_preview_and_catalogue_shows_all_seeded_listings(): void
    {
        $this->get('/')->assertOk()
            ->assertSee('De passage ou pour longtemps, trouvez votre chez-vous.')
            ->assertSee('<meta name="robots" content="noindex, nofollow">', false)
            ->assertDontSee('Coordonnées CIP IMMO à compléter.')
            ->assertViewHas('listings', fn ($listings) => count($listings) === 6)
            ->assertDontSee('33 logements trouvés.')
            ->assertViewHas('cities', fn ($cities) => count($cities) === 7 && array_sum(array_column($cities, 'count')) === 33)
            ->assertDontSee('href="#"', false);

        $this->get('/logements')->assertOk()
            ->assertViewHas('listings', fn ($listings) => count($listings) === 33)
            ->assertSee('33 logements trouvés.');
    }

    public function test_filters_are_combined_and_price_period_is_explicit(): void
    {
        $this->get('/logements?city=conakry&duration=court-sejour&furnished=meuble')
            ->assertOk()->assertViewHas('listings', fn ($listings) => count($listings) === 4)
            ->assertSee('GNF / nuit')->assertDontSee('Une maison pour s’installer');
        $this->get('/logements?duration=longue-duree&furnished=non-meuble')->assertOk()
            ->assertViewHas('listings', fn ($listings) => count($listings) === 11)
            ->assertSee('GNF / mois');
    }

    public function test_home_highlights_the_three_cities_with_most_published_listings(): void
    {
        $this->get('/')->assertOk()
            ->assertViewHas('popularCities', fn ($cities) => array_column($cities, 'slug') === ['conakry', 'coyah', 'kankan'] && array_column($cities, 'count') === [8, 6, 6])
            ->assertSee('Vous cherchez une autre ville ?')
            ->assertSee('href="'.route('listings.index').'#city"', false);

        Listing::where('city', 'coyah')->update(['is_published' => false]);
        $this->get('/')->assertOk()
            ->assertViewHas('popularCities', fn ($cities) => array_column($cities, 'slug') === ['conakry', 'kankan', 'kindia']);

        $this->app['env'] = 'production';
        $this->get('/')->assertOk()->assertViewHas('popularCities', []);
    }

    public function test_dedicated_pages_and_navigation_use_their_own_urls(): void
    {
        foreach (['/logements' => 'Nos logements', '/comment-louer' => 'Comment louer avec CIP IMMO', '/a-propos' => 'CIP IMMO, à vos côtés', '/contact' => 'Contactez CIP IMMO'] as $path => $title) {
            $response = $this->get($path)->assertOk()->assertSee($title);
            $html = $response->getContent();
            $document = new \DOMDocument;
            @$document->loadHTML($html);
            $xpath = new \DOMXPath($document);
            $this->assertSame(1, $xpath->query('//h1')->length);
            foreach ($xpath->query('//nav//a') as $link) {
                $this->assertContains(parse_url($link->getAttribute('href'), PHP_URL_PATH), ['/logements', '/comment-louer', '/a-propos', '/contact']);
                $this->assertNull(parse_url($link->getAttribute('href'), PHP_URL_FRAGMENT));
            }
        }

        $this->get('/')->assertSee('action="'.route('listings.index').'#logements"', false)
            ->assertSee('href="'.route('renting').'"', false)
            ->assertSee('href="'.route('about').'"', false)
            ->assertSee('href="'.route('contact').'"', false);
    }

    public function test_old_search_urls_forward_to_the_catalogue_and_keep_validation(): void
    {
        $this->get('/?city=conakry&duration=court-sejour&furnished=meuble')
            ->assertRedirect(route('listings.index', ['city' => 'conakry', 'duration' => 'court-sejour', 'furnished' => 'meuble']));
        $this->followingRedirects()->get('/?city[]=conakry')->assertStatus(422)
            ->assertDontSee('Un appartement lumineux');
    }

    public function test_old_listing_links_still_enforce_publication_rules(): void
    {
        $this->get('/demo/logements/appartement-lumineux')->assertOk();
        Listing::where('slug', 'appartement-lumineux')->update(['is_published' => false]);
        $this->get('/demo/logements/appartement-lumineux')->assertNotFound();
    }

    public function test_every_combination_returns_only_matching_listings_and_preserves_selected_filters(): void
    {
        $data = require resource_path('data/demo-listings.php');
        foreach (['', 'conakry', 'coyah', 'kindia', 'labe', 'mamou', 'kankan', 'nzerekore'] as $city) {
            foreach (['', 'court-sejour', 'longue-duree'] as $duration) {
                foreach (['', 'meuble', 'non-meuble'] as $furnished) {
                    $filters = compact('city', 'duration', 'furnished');
                    $expected = array_column(array_filter($data, function ($listing) use ($filters) {
                        foreach ($filters as $field => $value) {
                            if ($value !== '' && $listing[$field] !== $value) {
                                return false;
                            }
                        }

                        return true;
                    }), 'slug');

                    $this->get('/logements?'.http_build_query($filters))->assertOk()
                        ->assertViewHas('listings', fn ($listings) => array_column($listings, 'slug') === $expected)
                        ->assertViewHas('filters', $filters);
                }
            }
        }
    }

    public function test_unpublished_listings_are_denied_by_search_city_counts_and_direct_link(): void
    {
        Listing::where('city', 'mamou')->update(['is_published' => false]);
        $this->get('/logements')->assertOk()
            ->assertViewHas('listings', fn ($listings) => count($listings) === 31)
            ->assertViewHas('cities', fn ($cities) => ! in_array('mamou', array_column($cities, 'slug'), true));
        $this->get('/logements/appartement-mamou')->assertNotFound();

        $this->get('/logements/appartement-lumineux')->assertOk();
        Listing::where('slug', 'appartement-lumineux')->update(['is_published' => false]);
        $this->get('/logements/appartement-lumineux')->assertNotFound();
    }

    public function test_seed_can_be_repeated_without_duplicates_or_overwriting_changes(): void
    {
        Listing::where('slug', 'appartement-lumineux')->update(['title' => 'Titre conservé', 'is_published' => false]);
        $this->seed(DemoListingSeeder::class);
        $this->assertDatabaseCount('listings', 33);
        $this->assertDatabaseHas('listings', ['slug' => 'appartement-lumineux', 'title' => 'Titre conservé', 'is_published' => false]);
        $this->assertDatabaseCount('users', 0);
    }

    public function test_demo_seed_refuses_production_even_when_demo_flag_is_enabled(): void
    {
        $this->app['env'] = 'production';
        $this->expectException(\LogicException::class);
        $this->seed(DemoListingSeeder::class);
    }

    public function test_real_published_listing_remains_visible_when_demo_is_disabled(): void
    {
        Listing::where('slug', 'appartement-lumineux')->update(['is_demo' => false]);
        config(['cipimmo.demo' => false]);
        $this->get('/')->assertOk()
            ->assertViewHas('listings', fn ($listings) => array_column($listings, 'slug') === ['appartement-lumineux'])
            ->assertViewHas('cities', fn ($cities) => $cities === [['slug' => 'conakry', 'name' => 'Conakry', 'count' => 1]]);
        $this->get('/logements/appartement-lumineux')->assertOk();
        $this->get('/logements/studio-pratique')->assertNotFound();
        $this->app['env'] = 'production';
        $this->get('/logements/appartement-lumineux')->assertOk()
            ->assertDontSee('<meta name="robots" content="noindex, nofollow">', false);
    }

    public function test_no_result_state_provides_a_reset(): void
    {
        $this->get('/logements?city=mamou&duration=court-sejour')->assertOk()
            ->assertSee('Aucun logement pour ces critères')
            ->assertSee('Réinitialiser les filtres')
            ->assertSee('0 logements trouvés pour votre recherche.')
            ->assertViewHas('listings', []);
    }

    public function test_hostile_unknown_array_and_oversized_filters_are_rejected(): void
    {
        foreach (['city=<script>alert(1)</script>', 'city[]=conakry', 'duration=other', 'furnished='.str_repeat('x', 1000)] as $query) {
            $this->get('/logements?'.$query)->assertStatus(422)
                ->assertSee('La recherche n’a pas pu être appliquée.')
                ->assertViewHas('listings', [])
                ->assertDontSee('<script>alert(1)</script>', false);
        }
    }

    public function test_demo_detail_is_public_locally_and_unknown_identifiers_are_denied(): void
    {
        $this->get('/logements/appartement-lumineux')->assertOk()->assertSee('Un appartement lumineux');
        $this->get('/logements/inconnu')->assertNotFound();
        $this->get('/logements/'.str_repeat('a', 81))->assertNotFound();
    }

    public function test_demo_is_absent_in_production_even_with_the_flag_enabled(): void
    {
        $this->app['env'] = 'production';
        $this->get('/')->assertOk()->assertViewHas('listings', [])
            ->assertDontSee('Un appartement lumineux')->assertDontSee('<meta name="robots" content="noindex, nofollow">', false);
        $this->get('/logements')->assertOk()->assertViewHas('listings', [])
            ->assertViewHas('cities', [])->assertDontSee('Un appartement lumineux');
        $this->get('/logements/appartement-lumineux')->assertNotFound();
    }

    public function test_demo_can_be_disabled_locally(): void
    {
        config(['cipimmo.demo' => false]);
        $this->get('/')->assertOk()->assertViewHas('listings', []);
        $this->get('/logements')->assertOk()->assertViewHas('listings', []);
        $this->get('/logements/appartement-lumineux')->assertNotFound();
    }

    public function test_missing_or_invalid_contacts_do_not_create_contact_links(): void
    {
        config(['cipimmo.phone' => 'javascript:alert(1)', 'cipimmo.whatsapp' => '+224123<script>']);
        $this->get('/')->assertOk()->assertDontSee('href="tel:', false)
            ->assertDontSee('href="https://wa.me/', false)
            ->assertDontSee('javascript:alert(1)', false);
        $this->get('/contact')->assertOk()->assertDontSee('href="tel:', false)
            ->assertDontSee('href="https://wa.me/', false)
            ->assertDontSee('javascript:alert(1)', false);
    }

    public function test_public_contact_links_use_only_configured_international_numbers(): void
    {
        // Test-only numbers, never stored in site configuration.
        config(['cipimmo.phone' => '+12025550123', 'cipimmo.whatsapp' => '+12025550124']);
        $this->get('/contact')->assertOk()->assertSee('href="tel:+12025550123"', false)
            ->assertSee('href="https://wa.me/12025550124"', false);
    }

    public function test_detail_reuses_catalog_photos_and_has_direct_contact_actions(): void
    {
        config(['cipimmo.placeholder_contact' => true]);
        $this->get('/logements/appartement-lumineux')->assertOk()
            ->assertViewHas('listing', fn ($listing) => count($listing['images']) === 2)
            ->assertSee('aria-label="Appeler CIP IMMO"', false)
            ->assertSee('aria-label="Écrire à CIP IMMO sur WhatsApp"', false)
            ->assertSee('href="tel:+12025550123"', false)
            ->assertSee('https://wa.me/12025550123?text=')
            ->assertDontSee('href="#detail-contact"', false);
    }

    public function test_placeholder_contacts_never_expose_links_in_production_or_replace_hostile_numbers(): void
    {
        config(['cipimmo.placeholder_contact' => true, 'cipimmo.phone' => 'javascript:alert(1)', 'cipimmo.whatsapp' => '<script>']);
        $this->get('/')->assertOk()->assertDontSee('href="tel:', false)->assertDontSee('href="https://wa.me/', false);

        config(['cipimmo.phone' => null, 'cipimmo.whatsapp' => null]);
        $this->app['env'] = 'production';
        $this->get('/')->assertOk()->assertDontSee('href="tel:', false)->assertDontSee('href="https://wa.me/', false);
        $this->get('/contact')->assertOk()->assertDontSee('href="tel:', false)->assertDontSee('href="https://wa.me/', false);
        $this->get('/logements/appartement-lumineux')->assertNotFound();
    }
}
