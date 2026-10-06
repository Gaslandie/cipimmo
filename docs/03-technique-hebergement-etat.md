# CIP IMMO — Solutions techniques, hébergement et transmission

État vérifié dans les échanges au **6 octobre 2026, 08:07 UTC**, fuseau Africa/Conakry.

## 1. Consignes de reprise dans VS Code

Lire les trois documents de ce dossier avant de modifier le projet. Ils décrivent une installation déjà fonctionnelle sur Bluehost, pas un projet à réinstaller.

Le code source du serveur n’est pas contenu dans ce dossier Markdown. Il faudra récupérer le projet existant dans VS Code par un moyen autorisé (SSH/SFTP ou archive), ou ouvrir sa copie locale si elle existe. Aucun dépôt Git ni workflow de déploiement n’a été confirmé.

Ne pas recréer la base, ne pas relancer les migrations initiales de façon destructive, ne pas régénérer `APP_KEY` et ne pas remplacer le `.env` de production par un exemple. Les prochains changements doivent préserver les autres sites du compte Bluehost.

La prochaine étape demandée par Gassama est la rédaction des textes exacts de l’accueil dans la conversation actuelle, avant de poursuivre le développement dans VS Code.

## 2. Choix techniques

| Élément | Choix / état |
| --- | --- |
| Framework | Laravel ; choix accepté pour apprendre et développer le projet |
| WordPress | Explicitement écarté par Gassama, même si le forfait Bluehost porte ce nom |
| Base de données | MySQL |
| Front-end de travail | Blade + Tailwind CSS ; vérifier les dépendances présentes avant implémentation |
| Interface | Mobile-first, semi-flat, inspiration Vrbo/Blueground |
| Hébergement | Bluehost mutualisé, forfait WordPress Plus Hosting annoncé à 20 sites |
| Administration | Back-office requis ; aucun package d’administration choisi ou installé dans les preuves disponibles |
| Paiement / réservation | Aucun paiement en ligne ; contact WhatsApp/appel |

Blade/Tailwind constituent la direction de travail ; la compilation des assets n’a pas encore été vérifiée. Filament, Livewire, Alpine, Vue, React, une API séparée ou une application mobile ne sont pas des choix validés ici.

## 3. Infrastructure existante

| Paramètre | Valeur constatée |
| --- | --- |
| Domaine public | `cipimmo.com` |
| Adresse canonique | `https://cipimmo.com` |
| Alias | `www.cipimmo.com` |
| Serveur cPanel | `box4100.bluehost.com` |
| IP partagée | `50.6.153.225` |
| Utilisateur système | `fnksrwmy` |
| Répertoire personnel | `/home2/fnksrwmy` |
| Projet en service | `/home2/fnksrwmy/cipimmo` |
| Racine publique du domaine | `/home2/fnksrwmy/cipimmo/public` |
| Installation intermédiaire conservée | `/home2/fnksrwmy/cipimmo-install` |
| Domaine technique du compte | `fnk.srw.mybluehost.me` |
| Sous-domaine technique créé par cPanel | `cipimmo.com.fnk.srw.mybluehost.me` |
| cPanel | Jupiter, version affichée 134.0.61 |
| Accès terminal | Disponible ; shell jailshell |

La racine du domaine est bien `public`, pas la racine Laravel. Les fichiers de configuration et les dépendances restent ainsi en dehors de la racine web. La documentation Laravel impose de servir l’application via son dossier public.

## 4. Versions et outils constatés

| Outil | Version / détail |
| --- | --- |
| PHP CLI | 8.4.26 |
| PHP web configuré | 8.4 dans MultiPHP Manager |
| Laravel Framework | 13.34.0, confirmé par `php artisan --version` et la page d’accueil |
| Composer | 2.10.3 |
| MySQL | 8.0.46-37 |
| Serveur HTTP | Apache ; réponse HTTPS observée en HTTP/2 |

Composer n’était pas initialement disponible dans le PATH. Installation locale réalisée après vérification SHA-384 de l’installeur :

```bash
php "$HOME/bin/composer.phar" --version
```

Chemin : `/home2/fnksrwmy/bin/composer.phar`.

Les extensions PHP nécessaires ont été constatées dans `php -m`, dont `ctype`, `curl`, `dom`, `fileinfo`, `filter`, `hash`, `mbstring`, `openssl`, `pcre`, `PDO`, `session`, `tokenizer` et `xml`. Sont aussi disponibles notamment `pdo_mysql`, `gd`, `imagick`, `intl`, `zip`, `bcmath` et `redis`. La présence de l’extension Redis ne prouve pas qu’un serveur Redis est fourni.

Node.js et npm sur le serveur n’ont pas été vérifiés. La stratégie de compilation des assets reste à fixer ; une compilation locale suivie de l’envoi du build est une option, pas un travail déjà réalisé.

## 5. Base et initialisation réalisées

Base et utilisateur MySQL : `fnksrwmy_cipimmo`. Hôte : `localhost`, port 3306. Droits accordés sur cette base. Une connexion MySQL réelle a réussi avec `SELECT VERSION()`.

Installation Laravel effectuée dans le dossier intermédiaire, puis copie vers le dossier final. Le `.env` a été créé à partir de l’exemple et protégé avec des permissions 600.

Commandes déjà exécutées avec succès :

```bash
php artisan config:clear
php artisan key:generate --force
php artisan package:discover
php artisan migrate --force
```

La clé a déjà été générée. **Ne pas réexécuter `key:generate` pour reprendre le projet.**

Les migrations de base ont été exécutées : `create_users_table`, `create_cache_table`, `create_jobs_table`, ainsi que la création de la table de suivi des migrations. L’erreur initiale « Migration table not found » a été résolue par cette première migration.

Aucune table métier de logements, villes, équipements ou photos n’a encore été créée dans les échanges. Aucun utilisateur administrateur n’a été confirmé.

## 6. Configuration applicative enregistrée

Extrait descriptif **sans secrets** ; ne pas le coller sur le `.env` de production :

```dotenv
APP_NAME="CIP IMMO"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://cipimmo.com
APP_LOCALE=fr
APP_FALLBACK_LOCALE=en
LOG_LEVEL=warning

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=fnksrwmy_cipimmo
DB_USERNAME=fnksrwmy_cipimmo

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null
CACHE_STORE=file
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=local
MAIL_MAILER=log
```

`APP_KEY` et `DB_PASSWORD` existent dans la configuration privée et sont volontairement omis ici. Ne jamais les ajouter au dépôt ni à ce dossier de transmission. Un mot de passe MySQL a été exposé durant les échanges : son remplacement a été demandé, mais sa rotation n’a pas été explicitement confirmée ; vérifier ce point sans demander de le recopier dans le chat.

`MAIL_MAILER=log` ne constitue pas un envoi d’e-mails réel. Aucun SMTP CIP IMMO n’a été configuré. Les jobs fonctionnent en mode synchrone ; aucun worker permanent ou cron n’a été mis en place.

## 7. DNS — problème résolu

Serveurs de noms : `ns1.bluehost.com` et `ns2.bluehost.com`.

L’éditeur de zone cPanel montrait déjà la bonne IP, mais les DNS publics du portail Bluehost pointaient encore vers `204.11.56.246`, une page de construction. Les corrections ont été faites dans **Bluehost → Domaines → cipimmo.com → DNS avancés** :

| Type | Hôte | Destination | TTL affiché |
| --- | --- | --- | --- |
| A | @ | 50.6.153.225 | 2 heures |
| A | www | 50.6.153.225 | 2 heures |

Les deux serveurs de noms ont ensuite renvoyé la bonne IP pour le domaine principal. Un test HTTP forcé sur cette IP répondait déjà 200 avec les cookies Laravel, ce qui a permis de distinguer l’application du problème DNS.

Le portail DNS public et la zone locale cPanel n’affichaient pas les mêmes ensembles d’enregistrements. Ne pas supposer que les e-mails ou les sous-domaines de service sont opérationnels parce qu’ils figurent dans cPanel.

## 8. SSL — problème résolu pour le site

AutoSSL a été lancé depuis cPanel. Les deux domaines publics ont obtenu le statut **AutoSSL Domain Validated**. Les premiers tests avaient encore reçu un certificat inadapté, puis le certificat correct a été constaté sur le serveur.

Certificat présenté lors du dernier contrôle OpenSSL :

- Sujet : `CN=cipimmo.com`.
- Émetteur : Let’s Encrypt, `YR1`.
- Début de validité : 6 octobre 2026 à 06:58:17 GMT.
- Fin de validité : 4 janvier 2027 à 06:58:16 GMT.
- Domaines couverts : `cipimmo.com`, `www.cipimmo.com`, et leurs deux alias techniques cPanel.
- cPanel annonce un renouvellement automatique via AutoSSL ; le renouvellement futur n’a naturellement pas encore été testé.

Les erreurs visibles sur `mail`, `webmail`, `cpanel`, `autoconfig` et d’autres sous-domaines concernent leur absence de résolution DNS publique. Elles n’ont pas empêché la validation des deux domaines du site. Leur configuration reste hors du travail déjà réalisé.

## 9. Redirection installée et validée

Fichier : `/home2/fnksrwmy/cipimmo/public/.htaccess`.

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Redirection vers HTTPS et le domaine sans www
    RewriteCond %{HTTPS} !=on [OR]
    RewriteCond %{HTTP_HOST} !^cipimmo\.com$ [NC]
    RewriteRule ^ https://cipimmo.com%{REQUEST_URI} [R=301,L]

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Handle X-XSRF-Token Header
    RewriteCond %{HTTP:x-xsrf-token} .
    RewriteRule .* - [E=HTTP_X_XSRF_TOKEN:%{HTTP:X-XSRF-Token}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

Test réussi le 6 octobre 2026 à 08:07:13 GMT :

```bash
curl -IL --max-redirs 5 --connect-timeout 10 --max-time 20 http://www.cipimmo.com
```

Résultat : `301 Moved Permanently`, destination `https://cipimmo.com/`, puis `HTTP/2 200`, sans erreur SSL. Le cookie de session reçu est marqué `secure` et `httponly`. La page Laravel a également été constatée dans le navigateur. Cela valide ce parcours ; ce n’est pas un audit complet de sécurité ou de toutes les routes.

La règle contient volontairement le domaine de production. Lors de la mise en place du développement local, adapter la configuration locale sans casser la règle de production.

## 10. Ce qui reste à construire

- Textes exacts de l’accueil, prochaine étape convenue.
- Interface CIP IMMO et intégration du logo final.
- Modèles, migrations métier et relations des logements.
- Pages de résultats, filtres et fiches détaillées.
- Liens WhatsApp/appel avec coordonnées réelles.
- Authentification et autorisations de l’administration.
- Gestion des villes, logements, photos et contenus.
- Stockage des photos, optimisation et éventuel lien public de stockage : non réalisés.
- Compilation des assets et déploiement reproductible.
- Sauvegardes fichiers/base et procédure de restauration.
- Contenu légal, métadonnées SEO et éventuelle mesure des clics de contact.

Le schéma de données précis, le package de back-office et le workflow Git doivent être proposés avant leur implémentation. Ne pas prétendre que ces éléments sont déjà installés.

## 11. Hébergement et coûts : ne pas confondre les périmètres

L’offre vendue à CIP IMMO est de 5 000 000 GNF tout compris la première année, puis 3 000 000 GNF/an d’hébergement dès la deuxième année. Les modalités de paiement ne doivent pas figurer dans le cahier des charges.

Le compte Bluehost héberge plusieurs projets de GassTech. Ses coûts globaux ne sont pas le tarif client CIP IMMO. Les écrans de renouvellement consultés affichaient pour Plus : 21,99 USD/mois, 119,94 USD/6 mois ou 203,88 USD/an. Ce sont des montants historiques du panier, pas un devis actuel ni une preuve de règlement. Le choix de paiement final du renouvellement n’a pas été confirmé.

Le domaine CIP IMMO a été acheté. Le panier présenté était de 25,07 USD pour la première année, comprenant domaine 12,99 USD, confidentialité/protection 11,88 USD et frais ICANN 0,20 USD. Les renouvellements affichés étaient 23,99 USD pour le domaine et 15 USD pour la protection, hors éventuels frais/taxes. Vérifier le compte pour toute future facturation.

Les lignes `cPanel E-mail Basic` vues dans la facturation correspondent au service e-mail séparé ; elles ne prouvent pas une configuration de messagerie CIP IMMO. Ne pas acheter un nouvel hébergement pour ce domaine sans besoin identifié : il fonctionne sur l’offre existante.

## 12. Sources officielles et provenance

Les versions, chemins, DNS, configuration, commandes exécutées et résultats ci-dessus proviennent des sorties terminal et captures fournies par Gassama. Ce sont les preuves de l’état réel du projet à cette date.

Documentation utile consultée durant la préparation et la mise en place :

- Laravel 13, déploiement : https://laravel.com/framework/docs/13.x/deployment
- Composer : https://getcomposer.org/download/
- Bluehost AutoSSL : https://www.bluehost.com/help/article/autossl-management
- Apache mod_rewrite : https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html
- Diagnostic OpenSSL : https://docs.openssl.org/3.0/man1/openssl-s_client/
- Vérification TLS avec curl : https://curl.se/docs/sslcerts.html

Lors de la reprise, comparer ces informations à l’état réel des fichiers et du serveur ; ne pas confondre le présent état daté avec une garantie permanente de disponibilité.
