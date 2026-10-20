<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Process\Process;

class BackupCipDatabase extends Command
{
    protected $signature = 'cip:backup';

    protected $description = 'Sauvegarder la base avant un déploiement, sans modifier ses données.';

    public function handle(): int
    {
        $directory = storage_path('app/private/deployment-backups');
        if (! is_dir($directory)) {
            mkdir($directory, 0700, true);
        }
        $filename = $directory.'/'.date('Ymd-His').'-'.bin2hex(random_bytes(6));
        $connection = DB::connection();
        if ($connection->getDriverName() === 'sqlite') {
            $connection->getPdo()->exec('VACUUM INTO '.$connection->getPdo()->quote($filename.'.sqlite'));
            chmod($filename.'.sqlite', 0600);
        } elseif ($connection->getDriverName() === 'mysql') {
            $config = $connection->getConfig();
            $process = new Process(['mysqldump', '--single-transaction', '--quick', '--no-tablespaces', '--host='.$config['host'], '--port='.($config['port'] ?? 3306), '--user='.$config['username'], '--result-file='.$filename.'.sql', $config['database']], null, ['MYSQL_PWD' => $config['password']]);
            $process->setTimeout(300);
            $process->run();
            if (! $process->isSuccessful()) {
                $this->error('Sauvegarde impossible. Déploiement arrêté.');

                return self::FAILURE;
            }
            chmod($filename.'.sql', 0600);
        } else {
            $this->error('Ce moteur de base nécessite une procédure de sauvegarde adaptée.');

            return self::FAILURE;
        }
        $this->info('Sauvegarde privée créée.');

        return self::SUCCESS;
    }
}
