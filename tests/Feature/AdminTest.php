<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['admin.origin' => 'http://localhost']);
        $this->withHeader('Origin', 'http://localhost');
    }

    private function admin(): User
    {
        return User::factory()->create(['is_admin' => true, 'active' => true, 'session_version' => 1]);
    }

    private function seedCatalogue(): void
    {
        $this->artisan('cip:admin', ['action' => 'seed'])->assertSuccessful();
    }

    public function test_private_endpoints_refuse_anonymous_requests(): void
    {
        foreach (['session', 'rentals', 'export', 'media?path=/.env'] as $route) {
            $this->getJson('/admin/api/'.$route)->assertUnauthorized();
        }
        $this->postJson('/admin/api/rentals', [])->assertUnauthorized();
    }

    public function test_non_admin_inactive_and_revoked_sessions_are_refused(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->withSession(['admin_version' => 1])->getJson('/admin/api/rentals')->assertForbidden();
        $user->is_admin = true;
        $user->active = false;
        $user->save();
        $this->getJson('/admin/api/rentals')->assertForbidden();
        $user->active = true;
        $user->session_version = 2;
        $user->save();
        $this->getJson('/admin/api/rentals')->assertUnauthorized();
    }

    public function test_login_validates_password_and_origin_and_logout_invalidates_access(): void
    {
        $user = $this->admin();
        $user->password = Hash::make('Un-mot-de-passe-test-123!');
        $user->save();
        $this->postJson('/admin/api/login', ['username' => $user->email, 'password' => 'incorrect'])->assertUnauthorized();
        $this->withHeader('Origin', 'https://external.example')->postJson('/admin/api/login', ['username' => $user->email, 'password' => 'Un-mot-de-passe-test-123!'])->assertForbidden();
        $this->withHeader('Origin', 'http://localhost')->postJson('/admin/api/login', ['username' => $user->email, 'password' => 'Un-mot-de-passe-test-123!'])->assertOk()->assertJsonPath('username', $user->email)->assertJsonStructure(['csrf']);
        $this->getJson('/admin/api/session')->assertOk();
        $this->postJson('/admin/api/logout')->assertOk();
        $this->getJson('/admin/api/session')->assertUnauthorized();
    }

    public function test_seed_preserves_real_catalogue_and_never_overwrites_changes(): void
    {
        $this->seedCatalogue();
        $this->assertDatabaseCount('managed_rentals', 8);
        $this->actingAs($this->admin())->withSession(['admin_version' => 1]);
        $item = $this->getJson('/admin/api/rentals')->assertOk()->json('items.0');
        $item['rental']['availability'] = 'Indisponible';
        $this->patchJson('/admin/api/rentals/'.$item['rental']['slug'], ['rental' => $item['rental'], 'revision' => 1])->assertOk()->assertJsonPath('revision', 2);
        $this->assertDatabaseCount('rental_history', 1);
        $this->seedCatalogue();
        $this->assertSame('Indisponible', json_decode(DB::table('managed_rentals')->where('slug', $item['rental']['slug'])->value('content'), true)['availability']);
        $this->patchJson('/admin/api/rentals/'.$item['rental']['slug'], ['rental' => $item['rental'], 'revision' => 1])->assertConflict();
        $this->getJson('/admin/api/export')->assertOk()->assertJsonCount(8, 'rentals')->assertJsonMissingPath('users');
    }

    public function test_refuses_html_forged_photos_and_incoherent_prices_without_writes(): void
    {
        $this->seedCatalogue();
        $this->actingAs($this->admin())->withSession(['admin_version' => 1]);
        $item = $this->getJson('/admin/api/rentals')->json('items.0');
        foreach ([['title' => '<script>alert(1)</script>'], ['price' => -1], ['period' => 'mois'], ['is_admin' => true], ['imgSrc' => '/.env']] as $changes) {
            $this->patchJson('/admin/api/rentals/'.$item['rental']['slug'], ['rental' => array_replace($item['rental'], $changes), 'revision' => 1])->assertUnprocessable();
        }
        $this->assertDatabaseCount('rental_history', 0);
        $this->getJson('/admin/api/media?path=/.env')->assertUnprocessable();
    }

    public function test_write_requires_csrf_token_even_with_a_valid_admin_session(): void
    {
        $this->app['env'] = 'local';
        $this->actingAs($this->admin())->withSession(['admin_version' => 1, '_token' => 'test-token']);
        $this->postJson('/admin/api/logout')->assertStatus(419);
        $this->withHeader('X-CSRF-TOKEN', 'test-token')->postJson('/admin/api/logout')->assertOk();
    }

    public function test_publication_requires_admin_and_reports_github_failure_without_exposing_token(): void
    {
        Http::preventStrayRequests();
        config(['admin.github_token' => 'test-private-token']);
        $url = 'https://api.github.com/repos/Gaslandie/cipimmo/actions/workflows/bluehost.yml/dispatches';
        Http::fake([$url => Http::sequence()->push('', 204)->push('private response', 403)]);
        $this->postJson('/admin/api/publish')->assertUnauthorized();
        Http::assertNothingSent();
        $this->actingAs($this->admin())->withSession(['admin_version' => 1]);
        $this->postJson('/admin/api/publish')->assertOk()->assertDontSee('test-private-token');
        Http::assertSent(fn ($request) => $request->url() === $url && $request['ref'] === 'main');
        $this->postJson('/admin/api/publish')->assertStatus(503)->assertDontSee('private response');
    }

    public function test_edits_and_photo_uploads_do_not_consume_the_publication_limit(): void
    {
        $this->freezeTime();
        $this->seedCatalogue();
        Http::preventStrayRequests();
        config(['admin.github_token' => 'test-private-token']);
        Http::fake(['https://api.github.com/repos/Gaslandie/cipimmo/actions/workflows/bluehost.yml/dispatches' => Http::response('', 204)]);
        $this->actingAs($this->admin())->withSession(['admin_version' => 1]);
        $item = $this->getJson('/admin/api/rentals')->json('items.0');
        for ($revision = 1; $revision <= 3; $revision++) {
            $item['rental']['description'] = 'Description confirmée, version '.$revision;
            $this->patchJson('/admin/api/rentals/'.$item['rental']['slug'], ['rental' => $item['rental'], 'revision' => $revision])
                ->assertOk()->assertJsonPath('revision', $revision + 1);
            $this->postJson('/admin/api/photos', [])->assertUnprocessable();
        }
        $this->postJson('/admin/api/publish')->assertOk();
        $this->postJson('/admin/api/publish')->assertOk();
        $this->postJson('/admin/api/publish')->assertTooManyRequests()->assertHeader('Retry-After');
        Http::assertSentCount(2);

        $this->actingAs($this->admin())->withSession(['admin_version' => 1]);
        $this->postJson('/admin/api/publish')->assertOk();
        Http::assertSentCount(3);
    }

    public function test_photo_is_reencoded_and_false_images_are_refused(): void
    {
        if (! function_exists('imagewebp')) {
            $this->markTestSkipped('GD/WebP nécessaire pour le test de réencodage.');
        }
        Storage::fake('admin-test');
        config(['admin.photo_root' => Storage::disk('admin-test')->path('')]);
        $this->actingAs($this->admin())->withSession(['admin_version' => 1]);
        $image = UploadedFile::fake()->image('photo.jpg', 40, 30);
        $response = $this->postJson('/admin/api/photos', ['file' => $image, 'alt' => 'Salon de test'])->assertCreated();
        $this->assertStringEndsWith('.webp', $response->json('src'));
        $this->getJson('/admin/api/media?path='.urlencode($response->json('src')))->assertOk()->assertHeader('Content-Type', 'image/webp');
        $fake = UploadedFile::fake()->createWithContent('false.jpg', '<?php echo 123;');
        $this->postJson('/admin/api/photos', ['file' => $fake, 'alt' => 'Faux fichier'])->assertUnprocessable();
    }

    public function test_compilation_catalogue_excludes_hidden_records_and_private_data(): void
    {
        $this->seedCatalogue();
        $this->actingAs($this->admin())->withSession(['admin_version' => 1]);
        $values = $this->getJson('/admin/api/export')->json('rentals');
        $values[0]['published'] = false;
        $input = tempnam(sys_get_temp_dir(), 'cip-input-');
        $output = tempnam(sys_get_temp_dir(), 'cip-output-');
        try {
            file_put_contents($input, json_encode($values));
            config(['admin.catalogue' => $output]);
            $this->artisan('cip:catalogue-import', ['file' => $input])->assertSuccessful();
            $public = json_decode(file_get_contents($output), true);
            $this->assertCount(7, $public);
            $this->assertNotContains($values[0]['slug'], array_column($public, 'slug'));
            $this->assertDatabaseCount('managed_rentals', 8);
        } finally {
            unlink($input);
            unlink($output);
        }
    }
}
