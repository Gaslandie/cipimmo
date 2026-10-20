<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Support\Facades\Exceptions;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use PHPUnit\Framework\Attributes\DataProvider;
use RuntimeException;
use Tests\TestCase;

class ErrorPagesTest extends TestCase
{
    use LazilyRefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['app.debug' => false]);
    }

    public static function errors(): iterable
    {
        yield [403, 'Accès non autorisé'];
        yield [405, 'Action non disponible'];
        yield [419, 'Votre session a expiré'];
        yield [429, 'Un instant, s’il vous plaît'];
        yield [500, 'Le service rencontre un problème'];
        yield [503, 'Le site est en maintenance'];
    }

    #[DataProvider('errors')]
    public function test_errors_show_french_messages_and_keep_their_status_and_retry_headers(int $status, string $title): void
    {
        $headers = in_array($status, [429, 503], true) ? ['Retry-After' => '60'] : [];
        Route::get('/test-error', fn () => abort($status, 'private-path /home2/private <script>alert(1)</script>', $headers));

        $response = $this->get('/test-error')->assertStatus($status)
            ->assertSee($title)->assertSee('lang="fr"', false)
            ->assertSee('href="/"', false)->assertSee('href="/contacts/"', false)
            ->assertDontSee('private-path')->assertDontSee('alert(1)')
            ->assertHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
        $this->assertStringContainsString('no-store', $response->headers->get('Cache-Control'));
        if ($headers) {
            $response->assertHeader('Retry-After', '60');
        }
    }

    public function test_missing_pages_return_a_real_404_and_admin_errors_offer_sign_in(): void
    {
        $this->get('/page-qui-nexiste-pas')->assertNotFound()->assertSee('Page introuvable')
            ->assertSee('href="/listing-left-sidebar/"', false);
        $this->get('/admin/page-qui-nexiste-pas')->assertNotFound()->assertSee('href="/admin"', false);
        $this->get('/admin/api/page-qui-nexiste-pas')->assertNotFound()->assertJsonStructure(['message'])
            ->assertHeader('Content-Type', 'application/json')->assertDontSee('<html', false);
    }

    public function test_server_failures_are_reported_without_disclosing_details_in_html_or_json(): void
    {
        Exceptions::fake();
        Route::get('/test-failure', fn () => throw new RuntimeException('private-test-secret /home2/private/database.sqlite'));

        $this->get('/test-failure')->assertInternalServerError()->assertSee('Le service rencontre un problème')
            ->assertDontSee('private-test-secret')->assertDontSee('/home2/private');
        $this->getJson('/test-failure')->assertInternalServerError()->assertExactJson(['message' => 'Server Error']);
        Exceptions::assertReported(RuntimeException::class);
    }

    public function test_health_checks_the_catalogue_database_and_returns_only_a_generic_state_on_failure(): void
    {
        $this->getJson('/up')->assertOk()->assertExactJson(['status' => 'up']);
        Schema::drop('managed_rentals');

        $this->getJson('/up')->assertInternalServerError()->assertExactJson(['status' => 'down']);
        $this->get('/up')->assertInternalServerError()->assertDontSee('SQLSTATE')->assertDontSee('managed_rentals');
    }
}
