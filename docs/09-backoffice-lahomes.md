# Back-office CIP IMMO — étapes essentielles

18 octobre 2026 : version initiale locale en Node.js. **Décision du 20 octobre : tout héberger chez Bluehost ; l’administration est adaptée à Laravel/PHP.** Le site public reste dans `luminor/`, en Next.js compilé en fichiers statiques.

## Adaptation Bluehost — 20 octobre 2026

- Interface d’administration raccordée à PHP dans `resources/js/admin/`, connexion par adresse e-mail, sessions et autorisations vérifiées côté serveur. Sources commerciales Lahomes conservées hors Git ; seule la feuille de style compilée destinée au site est livrée.
- Catalogue réel initial importé sans écraser les annonces enregistrées. Révisions, conflits de modification, masquage, export et images réencodées conservés. Aucun compte administrateur par défaut.
- Export du site à la racine de `cipimmo.com`. Articles fictifs du thème exclus. Les logements masqués sont exclus du catalogue de compilation, et pas seulement cachés dans l’interface.
- Workflow `.github/workflows/bluehost.yml` préparé : tests, lecture du catalogue Bluehost, compilation, livraison d’une nouvelle version, sauvegarde de la base, conservation des photos et contrôle HTTPS. Activation conditionnée à la variable `CIP_BLUEHOST_ENABLED=true` et aux secrets propres à CIP IMMO.
- Préparation initiale prévue par `scripts/setup-bluehost.php`, exclusivement en ligne de commande sur le compte `fnksrwmy`. Exige PHP 8.5, GD/WebP et Python 3 ; préserve la configuration et les données existantes. Accès SSH dédié limité aux commandes du programme de déploiement. Aucun accès à un autre dépôt ou site nécessaire.
- Le bouton « Publier sur le site » nécessite un jeton GitHub limité au dépôt CIP IMMO avec permission Actions en écriture, stocké uniquement dans `shared/.env` sous `CIP_GITHUB_TOKEN`. Aucun jeton n’est envoyé au navigateur. Une demande acceptée par GitHub ne constitue pas une preuve de publication terminée.
- Vérifications locales : accès autorisés/refusés, comptes révoqués, CSRF réel, révisions, export sans logements masqués, image valide réencodée et faux JPEG refusé ; parcours Chrome à 390 et 1440 pixels, modification persistante et déconnexion. Formulaire public et destination WhatsApp vérifiés sans envoyer de message réel.
- Secrets SSH dédiés enregistrés dans l’environnement GitHub `cipimmo-production` avec l’accord explicite de Gassama. Installation initiale effectuée dans cPanel ; déploiement activé sur les push `main`.
- **État : première publication Bluehost réussie (GitHub Actions 39402267498).** Contrôles Chrome en production à 390 et 1440 pixels : formulaire, destinations téléphone/WhatsApp et référence logement ; aucun message ni appel réel envoyé. Connexion administrateur affichée ; API catalogue anonyme refusée (401), sauvegardes privées non accessibles (404). Compte définitif créé par Gassama, jeton installé dans cPanel et demande de publication depuis le back-office acceptée par GitHub (39403348300).
- Les sauvegardes sur le même serveur ne constituent pas une sauvegarde hors hébergement. La clé de publication du back-office créée avec le lien fourni expire après 365 jours : la renouveler avant expiration ; les déploiements par push utilisent une clé SSH distincte.

Comparaison revérifiée le 20 octobre 2026 : [Laravel — authentification](https://laravel.com/docs/13.x/authentication), [protection CSRF](https://laravel.com/docs/13.x/csrf), [OWASP — fichiers envoyés](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html), [Next.js — export statique](https://nextjs.org/docs/app/guides/static-exports) et [GitHub — environnements de déploiement](https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments). Adaptation : sessions natives Laravel, contrôle de chaque écriture, images décodées/réencodées, site statique compilé sur GitHub et secrets séparés du dépôt. L’offre Bluehost mutualisée confirmée par Gassama impose de remplacer le serveur Node.js permanent par PHP.

## Historique de la version Node.js locale (18 octobre)

Les étapes ci-dessous décrivent la première version, désormais remplacée pour l’hébergement de production.

- [x] 1. Examiner Lahomes et le catalogue actuel ; ne garder que les composants utiles.
- [x] 2. Installer un back-office local séparé : tableau de bord, logements, photos et disponibilités manuelles.
- [x] 3. Ajouter l’enregistrement persistant, une vraie connexion et les contrôles côté serveur. Préserver les huit logements et leurs photos.
- [x] 4. Préparer un transfert contrôlé vers le site Next.js, sans publication automatique ni modification du site en ligne.
- [x] 5. Tester les parcours autorisés et refusés, compiler, contrôler le serveur local et noter les limites et les décisions restantes ici. Validation visuelle reportée : navigateur indisponible.

## Comparaison retenue

Références vérifiées le 18 octobre 2026 : [Lahomes](https://techzaa.in/lahomes/next.html) et [Omah React/Vite](https://elements.envato.com/omah-react-vite-real-estate-admin-dashboard-WSLQT3W). Lahomes propose les écrans immobiliers liste/création/modification et le menu latéral classique retenu avec Gassama. Ce sont des interfaces de départ, pas une preuve d’enregistrement ou de sécurité. Adaptation : administration CIP IMMO uniquement, français, données réelles, pas d’espace locataire, réservation ou paiement.

Contrôles techniques comparés aux guides [Next.js — authentification](https://nextjs.org/docs/app/guides/authentication) et [OWASP — fichiers envoyés](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html), consultés le 18 octobre : autorisation dans chaque accès aux données, session côté serveur, fichiers contrôlés et réencodés. Pas de connexion fictive du thème. La sélection visuelle vient de Lahomes ; les fonctions de gestion ont été ajoutées pour CIP IMMO.

## Décisions à présenter au retour

- Hébergement privé du serveur, domaine d’administration et sauvegardes hors machine : à choisir avant mise en ligne.
- Compte administrateur définitif et validation visuelle : à faire avec Gassama. Aucun mot de passe ni secret dans ce document ou dans Git.
- Publication : reste volontaire et séparée du travail local. Ne pas publier les sources commerciales de Lahomes sur un dépôt public.

## Résultat et vérifications

### Ce qui est prêt

- `backoffice/` : Next.js 16.4.2, React 19.3.1, Node 24 et SQLite locale. Le site `luminor/` reste sur sa version Next.js existante.
- Style Lahomes clair et menu latéral classique ; logo CIP IMMO et interface française. Seulement tableau de bord, logements et paramètres.
- Huit logements réels et 30 entrées de galerie conservés, sans ajout de caractéristiques fictives. Nongo reste en court séjour. Disponibilité initiale : « À confirmer ».
- Création/modification, tarifs jour/nuit/mois cohérents, mobilier, équipements confirmés, statut manuel et masquage indépendant sans suppression.
- Photos JPEG/PNG/WebP : ajout, ordre, retrait de la sélection, description ; 8 Mo maximum, contrôle du contenu, réencodage WebP et retrait des métadonnées privées. Originaux et mentions de retouches existants conservés. Import vidéo laissé pour une prochaine étape.
- Connexion réelle, mot de passe haché, session de 8 heures, déconnexion et révocation côté serveur, contrôles de l’origine et des demandes d’écriture. Aucun compte ou mot de passe par défaut.
- Ancienne version du logement conservée à chaque modification et conflits entre onglets refusés. Ces copies locales ne remplacent pas une sauvegarde hors machine.
- Export JSON du catalogue sans secrets ; `npm run site:prepare` prépare uniquement le site local et copie les nouvelles photos, avec sauvegarde du JSON précédent. Aucun commit, push ou déploiement automatique. Les anciens liens numériques restent attachés aux mêmes logements.
- Sources commerciales, base, sessions, sauvegardes et fichiers importés exclus du Git public via `/backoffice/` dans `.gitignore`. Il faudra un dépôt privé pour sauvegarder le code du back-office.

### Démarrage à notre retour

Dans un terminal, depuis le dossier `backoffice/` :

```sh
npm run admin:create
npm run dev
```

La première commande demande un identifiant et un mot de passe de 14 caractères minimum, saisi sans affichage. La seconde ouvre le serveur sur **http://127.0.0.1:3200**. Ne pas remplacer cette adresse par `localhost` : l’origine est contrôlée. Le compte définitif reste à créer avec Gassama ; pas de secret enregistré dans le rapport.

Pour fermer immédiatement les accès d’un compte : `npm run admin:revoke`. Pour préparer le site après validation des annonces : `npm run site:prepare`, puis compiler `luminor/` avec `npm run build:pages`. Vérifier avant publication. Ancien catalogue conservé dans `backoffice/data/site-backups/` ; aucune restauration automatique ni suppression de photos originales.

### Vérifications et limites

- 23 tests de données, d’accès, de fichiers et de raccordement au site : réussis. Dont conservation exacte des huit annonces, disponibilité inconnue, masquage sans suppression, ancien lien numérique stable, refus de HTML, de périodes incohérentes, de fichiers déguisés, de chemins privés et de liens symboliques.
- 12 tests HTTP sur le vrai serveur compilé, avec base et comptes jetables : réussis. Connexion, cookie privé, lecture, création, modification, conflit de versions, ajout et ordre des photos, export sans secrets, conservation après redémarrage, compte différent, révocation et déconnexion vérifiés. Les URL privées `/.env`, `/.git/config`, `/data/cip-immo.sqlite` et `/seed.json` renvoient 404. Les données sans connexion sont refusées.
- Contrôle TypeScript et compilation du back-office : réussis. Compilation GitHub Pages de Luminor : réussie, 127 pages. Avertissements non bloquants du Sass Bootstrap/Lahomes et avertissements existants de Luminor conservés ; aucun contournement de protection pour compiler.
- `npm audit` du back-office : aucune vulnérabilité connue signalée au moment du contrôle. Cela ne garantit pas une sécurité absolue.
- Comparaison du catalogue JSON avec le dernier commit : données identiques, avant toute modification administrative réelle. Base locale initialisée avec huit logements, **aucun compte et aucune session**. Les essais n’ont pas modifié cette base : ils utilisent des dossiers temporaires distincts, nettoyés après les tests.
- Serveur de test démarré sur `127.0.0.1:3201`, contrôlé puis arrêté. Aucun serveur d’administration n’est laissé actif ; utiliser les deux commandes ci-dessus à notre retour.
- Aucun commit, push, déploiement ou changement envoyé sur GitHub Pages. Ni Laravel ni ses anciennes données n’ont été modifiés. Le transfert du catalogue réel vers le site n’a pas été exécuté ; le mécanisme a été vérifié sur un site isolé de test.
- Le navigateur de cette session ne fournit aucune surface disponible : le rendu ordinateur/téléphone, les interactions clavier et le contrôle d’accessibilité visuel restent à faire à notre retour. Les tests du serveur ne remplacent pas ces essais. La première mise en ligne reste conditionnée à ces contrôles, à la création du compte définitif et au choix de l’hébergement HTTPS et des sauvegardes.
