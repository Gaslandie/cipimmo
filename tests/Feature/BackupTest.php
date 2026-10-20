<?php

namespace Tests\Feature;

use App\Models\User;
use App\Support\ManagedCatalogue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use PDO;
use Tests\TestCase;

class BackupTest extends TestCase
{
    private string $temporary;

    protected function setUp(): void
    {
        parent::setUp();
        $this->temporary = sys_get_temp_dir().'/cip-backup-test-'.bin2hex(random_bytes(8));
        mkdir($this->temporary.'/storage', 0700, true);
        $this->app->useStoragePath($this->temporary.'/storage');
        $database = $this->temporary.'/source.sqlite';
        touch($database);
        chmod($database, 0600);
        config(['database.default' => 'sqlite', 'database.connections.sqlite.database' => $database, 'admin.origin' => 'http://localhost']);
        DB::purge('sqlite');
        $this->artisan('migrate', ['--force' => true])->assertSuccessful();
        $this->withHeader('Origin', 'http://localhost');
    }

    protected function tearDown(): void
    {
        DB::purge('sqlite');
        File::deleteDirectory($this->temporary);
        parent::tearDown();
    }

    public function test_a_real_backup_restores_accounts_catalogue_and_history_into_an_isolated_database(): void
    {
        $user = User::factory()->create(['is_admin' => true, 'active' => true, 'password' => Hash::make('Backup-local-only-2026!')]);
        $this->artisan('cip:admin', ['action' => 'seed'])->assertSuccessful();
        $catalogue = app(ManagedCatalogue::class);
        $item = $catalogue->items()[0];
        $item['rental']['description'] = 'Description conservée dans la sauvegarde de test.';
        $catalogue->save($item['rental'], 1, $user->id, $item['rental']['slug']);
        $expected = [];
        foreach (['users', 'managed_rentals', 'rental_history', 'migrations'] as $table) {
            $expected[$table] = DB::table($table)->orderBy('id')->get()->toJson();
        }

        $this->artisan('cip:backup')->expectsOutput('Sauvegarde privée créée.')->assertSuccessful();
        $files = glob(storage_path('app/private/deployment-backups/*.sqlite'));
        $this->assertCount(1, $files);
        $backup = $files[0];
        $this->assertSame(0600, fileperms($backup) & 0777);
        $this->assertSame(0700, fileperms(dirname($backup)) & 0777);
        $snapshot = new PDO('sqlite:'.$backup);
        $this->assertSame('ok', $snapshot->query('PRAGMA integrity_check')->fetchColumn());
        $snapshot = null;
        $this->assertStringNotContainsString('Backup-local-only-2026!', file_get_contents($backup));

        DB::table('managed_rentals')->delete();
        DB::table('rental_history')->delete();
        DB::table('users')->where('id', $user->id)->update(['active' => false, 'session_version' => 2]);
        $this->assertDatabaseCount('managed_rentals', 0);
        DB::disconnect('sqlite');
        $restored = $this->temporary.'/restored.sqlite';
        $this->assertTrue(copy($backup, $restored));
        chmod($restored, 0600);
        config(['database.connections.sqlite.database' => $restored]);
        DB::purge('sqlite');

        $this->assertSame('ok', DB::selectOne('PRAGMA integrity_check')->integrity_check);
        foreach ($expected as $table => $rows) {
            $this->assertSame($rows, DB::table($table)->orderBy('id')->get()->toJson(), $table);
        }
        $this->getJson('/admin/api/rentals')->assertUnauthorized();
        $this->postJson('/admin/api/login', ['username' => $user->email, 'password' => 'Backup-local-only-2026!'])->assertOk();
        $this->getJson('/admin/api/rentals')->assertOk()->assertJsonCount(8, 'items')
            ->assertJsonPath('items.0.rental.description', 'Description conservée dans la sauvegarde de test.');
        $this->postJson('/admin/api/logout')->assertOk();
        $this->getJson('/admin/api/export')->assertUnauthorized();
    }

    public function test_new_backups_do_not_overwrite_previous_snapshots_or_change_live_data(): void
    {
        $user = User::factory()->create(['name' => 'Avant sauvegarde']);
        $this->artisan('cip:backup')->assertSuccessful();
        $first = glob(storage_path('app/private/deployment-backups/*.sqlite'))[0];
        $digest = hash_file('sha256', $first);
        $user->name = 'Après la première sauvegarde';
        $user->save();
        $this->artisan('cip:backup')->assertSuccessful();
        $files = glob(storage_path('app/private/deployment-backups/*.sqlite'));
        $this->assertCount(2, $files);
        $this->assertSame($digest, hash_file('sha256', $first));
        $snapshot = new PDO('sqlite:'.$first);
        $this->assertSame('Avant sauvegarde', $snapshot->query('SELECT name FROM users')->fetchColumn());
        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Après la première sauvegarde']);
    }
}
