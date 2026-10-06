<?php

namespace Tests\Feature;

use Tests\TestCase;

class HomePageTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        config(['cipimmo.demo' => true, 'cipimmo.phone' => null, 'cipimmo.whatsapp' => null]);
    }

    public function test_home_renders_approved_copy_and_four_fictional_listings(): void
    {
        $this->get('/')->assertOk()
            ->assertSee('De passage ou pour longtemps, trouvez votre chez-vous.')
            ->assertSee('Aperçu de démonstration')
            ->assertDontSee('Coordonnées CIP IMMO à compléter.')
            ->assertViewHas('listings', fn ($listings) => count($listings) === 4)
            ->assertDontSee('href="#"', false);
    }

    public function test_filters_are_combined_and_price_period_is_explicit(): void
    {
        $this->get('/?city=conakry&duration=court-sejour&furnished=meuble')
            ->assertOk()->assertViewHas('listings', fn ($listings) => count($listings) === 2)
            ->assertSee('GNF / nuit')->assertDontSee('Une maison pour s’installer');
        $this->get('/?duration=longue-duree&furnished=non-meuble')->assertOk()
            ->assertViewHas('listings', fn ($listings) => count($listings) === 1)
            ->assertSee('GNF / mois');
    }

    public function test_no_result_state_provides_a_reset(): void
    {
        $this->get('/?city=kindia&duration=court-sejour')->assertOk()
            ->assertSee('Aucun logement pour ces critères')
            ->assertSee('Réinitialiser les filtres')
            ->assertViewHas('listings', []);
    }

    public function test_hostile_unknown_array_and_oversized_filters_are_rejected(): void
    {
        foreach (['city=<script>alert(1)</script>', 'city[]=conakry', 'duration=other', 'furnished='.str_repeat('x', 1000)] as $query) {
            $this->get('/?'.$query)->assertStatus(422)
                ->assertSee('La recherche n’a pas pu être appliquée.')
                ->assertDontSee('<script>alert(1)</script>', false);
        }
    }

    public function test_demo_detail_is_public_locally_and_unknown_identifiers_are_denied(): void
    {
        $this->get('/demo/logements/appartement-lumineux')->assertOk()->assertSee('FICHE DE DÉMONSTRATION');
        $this->get('/demo/logements/inconnu')->assertNotFound();
        $this->get('/demo/logements/'.str_repeat('a', 81))->assertNotFound();
    }

    public function test_demo_is_absent_in_production_even_with_the_flag_enabled(): void
    {
        $this->app['env'] = 'production';
        $this->get('/')->assertOk()->assertViewHas('listings', [])
            ->assertDontSee('Un appartement lumineux')->assertDontSee('Aperçu de démonstration');
        $this->get('/demo/logements/appartement-lumineux')->assertNotFound();
    }

    public function test_demo_can_be_disabled_locally(): void
    {
        config(['cipimmo.demo' => false]);
        $this->get('/')->assertOk()->assertViewHas('listings', []);
        $this->get('/demo/logements/appartement-lumineux')->assertNotFound();
    }

    public function test_missing_or_invalid_contacts_do_not_create_contact_links(): void
    {
        config(['cipimmo.phone' => 'javascript:alert(1)', 'cipimmo.whatsapp' => '+224123<script>']);
        $this->get('/')->assertOk()->assertDontSee('href="tel:', false)
            ->assertDontSee('href="https://wa.me/', false)
            ->assertDontSee('javascript:alert(1)', false);
    }

    public function test_public_contact_links_use_only_configured_international_numbers(): void
    {
        // Test-only numbers, never stored in site configuration.
        config(['cipimmo.phone' => '+12025550123', 'cipimmo.whatsapp' => '+12025550124']);
        $this->get('/')->assertOk()->assertSee('href="tel:+12025550123"', false)
            ->assertSee('href="https://wa.me/12025550124"', false);
    }
}
