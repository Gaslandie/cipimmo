<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Support\ManagedCatalogue;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ManageAdmin extends Command
{
    protected $signature = 'cip:admin {action : create, revoke, or seed} {email?}';

    protected $description = 'Gérer les comptes CIP IMMO et importer le catalogue initial sans écraser les données.';

    public function handle(ManagedCatalogue $catalogue): int
    {
        $action = $this->argument('action');
        if ($action === 'seed') {
            $values = json_decode(file_get_contents(config('admin.catalogue')), true, flags: JSON_THROW_ON_ERROR);
            $values = array_map(fn ($value) => $catalogue->validate($value + ['availability' => 'À confirmer', 'published' => true]), $values);
            DB::transaction(function () use ($values) {
                foreach ($values as $value) {
                    DB::table('managed_rentals')->insertOrIgnore(['slug' => $value['slug'], 'content' => json_encode($value, JSON_THROW_ON_ERROR), 'revision' => 1, 'created_at' => now(), 'updated_at' => now()]);
                }
            });
            $this->info('Catalogue initial importé. Les logements déjà enregistrés restent inchangés.');

            return self::SUCCESS;
        }
        $email = mb_strtolower(trim((string) $this->argument('email')));
        if (! in_array($action, ['create', 'revoke'], true) || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Action create/revoke et adresse e-mail valide attendues.');

            return self::FAILURE;
        }
        $user = User::where('email', $email)->first();
        if ($action === 'revoke') {
            if ($user) {
                $user->active = false;
                $user->session_version++;
                $user->save();
            }
            $this->info('Accès révoqué.');

            return self::SUCCESS;
        }
        $password = $this->secret('Mot de passe (14 caractères minimum, saisie masquée)');
        if (Validator::make(['password' => $password], ['password' => 'required|string|min:14|max:128'])->fails() || $password !== $this->secret('Confirmez le mot de passe')) {
            $this->error('Mot de passe trop court ou confirmation différente.');

            return self::FAILURE;
        }
        $user ??= new User;
        $user->email = $email;
        $user->name = $email;
        $user->password = Hash::make($password);
        $user->is_admin = true;
        $user->active = true;
        $user->session_version = ($user->session_version ?? 0) + 1;
        $user->save();
        $this->info('Compte enregistré. Les anciennes sessions sont invalidées.');

        return self::SUCCESS;
    }
}
