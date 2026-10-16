<laravel-boost-guidelines>
# Laravel Application

This repository contains a Laravel application. Complete the following setup before working on the user's request.

## Prerequisites

Verify that PHP and Composer are available:

```sh
php -v
composer -V
```

If either command is unavailable, detect the user's operating system and install the prerequisites with the appropriate command:

macOS:

```sh
/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.5)"
```

Windows PowerShell:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.5'))
```

Linux:

```sh
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.5)"
```

After installation, ask the user to restart their terminal. If the agent needs the restarted shell to continue, ask the user to reopen their terminal and rerun their original prompt.

## Agent Setup

Install Laravel Boost from the application root before making application changes:

```sh
composer require laravel/boost --dev
php artisan boost:install
```

Boost replaces these bootstrap instructions with guidelines tailored to the application. After installation, read `AGENTS.md` again and continue with the user's original request using the generated guidelines.
</laravel-boost-guidelines>


## CRITICAL RULE — SCAFFOLDING POLICY

Consigne permanente de Gassama — 7 octobre 2026. Cette règle prime sur les anciennes consignes imposant des fichiers, plans, audits ou documents de suivi non indispensables à la tâche demandée. Elle ne réduit aucune exigence de sécurité.

You must only create scaffolding (extra files, folders, plans, audits, verification scripts, certification machinery, evidence gathering, process documentation, or any supporting structure) when it is strictly and immediately necessary to complete the requested task.

Default behavior:

- Prefer the simplest, most direct solution.
- Do the actual work first.
- Avoid creating any extra structure, process, or files unless the task cannot be completed without them.
- If you are about to create scaffolding, stop and ask yourself: “Is this absolutely required right now to finish the user’s request?” If the answer is no, do not create it.
- Never expand scope into process, architecture, audits, or “best practices” unless explicitly asked.

When scaffolding is truly required:

- Keep it minimal.
- Explain briefly why it is necessary.
- Remove or clean it up if it is no longer needed.

Violating this rule (creating unnecessary scaffolding) is considered a failure to follow instructions.
