# CIP IMMO — Accueil et aperçu local

Travail et vérifications du 6 octobre 2026, fuseau Africa/Conakry.

## Voir le site

Depuis la racine du projet :

```bash
./scripts/serve-local
```

Ouvrir **http://127.0.0.1:8000**. Arrêter le serveur avec Ctrl+C.

Le serveur écoute uniquement sur ce poste. Il utilise le dossier `public` et un routeur local distinct (`scripts/router-local.php`). Le `.htaccess` Apache original reste inchangé : sa redirection HTTPS vers `cipimmo.com` est conservée pour la production. PHP local ne traite pas ce fichier.

Le fichier `.env` créé pour cet aperçu contient une nouvelle clé locale. Il utilise SQLite (`database/local.sqlite`, vide), des sessions et un cache sur fichiers, et aucun identifiant de production. Il est protégé avec les permissions 600 et exclu de Git. `.env.example` est un modèle strictement local, sans clé. Ne pas copier le `.env` local sur le serveur.

## Outils et dépendances

Laravel **13.34.0** est confirmé dans le code récupéré. Le poste utilise PHP **8.5.4** et Node **24.18.0**. PHP 8.4 de production n’a pas été testé ici.

Les modules PHP manquants ont été téléchargés depuis Ubuntu et extraits dans `.local-tools/php`, sans changer PHP système. `scripts/php-local` les charge uniquement pour ses commandes et leurs sous-processus. Si PHP système possède déjà les modules nécessaires, le script l’utilise directement.

Composer **2.10.3** a été téléchargé depuis sa source officielle après vérification SHA-384 de l’installeur. `composer install` a installé les 109 dépendances du `composer.lock` fourni. `composer.json` et `composer.lock` sont inchangés.

L’archive ne contenait pas `package-lock.json`. Il a donc été créé depuis le `package.json` original, puis les dépendances ont été installées avec `npm ci --ignore-scripts`. Toutes les URL de téléchargement du lock pointent vers `registry.npmjs.org`. npm 12 rencontrait une erreur de résolution ; une copie npm **11.21.0** isolée dans `.local-tools/npm` a servi à cette installation. Aucun script d’installation des dépendances npm n’a été activé.

Les instructions génériques de l’archive proposent Laravel Boost. Il n’a pas été ajouté : la demande explicite impose les dépendances verrouillées et évite les ajouts inutiles pour cet accueil.

Pour compiler après une modification :

```bash
npm run build
```

Pour les tests PHP :

```bash
./scripts/php-local vendor/bin/phpunit
```

Pour réinstaller sur ce poste, tant que les outils locaux sont présents :

```bash
./scripts/php-local .local-tools/composer.phar install
node .local-tools/npm/bin/npm-cli.js ci --ignore-scripts
npm run build
```

Sur un autre poste, installer PHP compatible avec mbstring, DOM/XML et SQLite, Composer et Node. Les outils de `.local-tools` sont propres à ce poste et exclus de Git. Aucune migration ni commande destructive n’a été lancée. Ne pas utiliser le script Composer `setup` existant pour reprendre l’installation : il génère une clé et lance des migrations.

## Ce qui est construit

Les neuf sections de l’accueil respectent l’ordre demandé. Les textes du fichier 04 sont repris. Les titres sont centrés ; les paragraphes longs sont justifiés sur téléphone conformément aux bonnes pratiques fournies. La navigation mobile et la FAQ utilisent `details/summary`, avec une amélioration JavaScript légère pour fermer le menu avec Échap et rendre le focus.

- Page : `resources/views/home.blade.php`.
- Éléments communs : `resources/views/components/`.
- Styles et menu : `resources/css/app.css`, `resources/js/app.js`.
- Recherche et fiches : `app/Http/Controllers/HomeController.php`, `routes/web.php`.
- Données fictives : `resources/data/demo-listings.php`, sans écriture en base.
- Activation de la démo : `config/cipimmo.php`, `CIPIMMO_DEMO=true` dans le `.env` local.
- Contacts : `CIPIMMO_PHONE` et `CIPIMMO_WHATSAPP`, dans cette même configuration.

La démo exige à la fois son activation et un environnement `local` ou `testing`. En production, les annonces et villes fictives ne sont pas rendues et leurs fiches renvoient 404, même si le drapeau démo est activé. Il n’existe pas encore de catalogue réel : l’accueil indique alors que les logements seront ajoutés prochainement.

La recherche combine ville, durée et mobilier. Elle passe par une requête GET et reste utilisable sans JavaScript. Les critères apparaissent dans l’URL et peuvent figurer dans l’historique du navigateur. Aucun outil de suivi ni stockage de recherches n’a été ajouté.

Les numéros publics doivent être renseignés au format international, avec `+`, sans espaces. Les valeurs absentes ou invalides ne créent aucun lien `tel:` ou `wa.me`. Ne pas utiliser les coordonnées personnelles de Gassama. Le logo fourni le 6 octobre 2026 est intégré dans l’en-tête et le pied de page. Les couleurs dominantes relevées dans ses pixels opaques sont le bleu `#002E63` et le doré `#F5AD01`. Elles sont centralisées dans les variables de `resources/css/app.css`, avec des variantes plus sombres pour les petits textes sur fond clair. La couleur du navigateur et les icônes reprennent cette identité.

## Comparaison préalable

Références publiques vérifiées le **6 octobre 2026** :

| Source | Observation réelle | Adaptation retenue |
| --- | --- | --- |
| [Vrbo](https://www.vrbo.com/) | Titre principal, recherche de destination, dates et voyageurs dès le début de page ; exploration des destinations ensuite. | Recherche visible dans le hero, puis logements et villes. Les dates et voyageurs sont remplacés par les critères validés pour CIP IMMO. |
| [Blueground](https://www.theblueground.com/) | Introduction aux logements meublés, recherche de localisation et dates, exploration des villes, puis présentation du service. | Parcours simple : chercher, explorer, comprendre, contacter. Pas de reprise de garanties, statistiques ou offres de la marque. |

La consultation a porté sur les contenus publics accessibles. Les captures mobiles évoquées dans la transmission n’ont pas été fournies ; aucune comparaison précise de ces captures n’est revendiquée.

## Photos et rangement

Les fichiers 01 à 04, les bonnes pratiques et le prompt sont dans `docs/`. Leur contenu est conservé. L’original des bonnes pratiques reste sur le Bureau. Le document 05 et les captures de référence n’ont pas été fournis. Le logo ajouté ensuite à la racine est conservé ; sa copie exacte utilisée par le site est `public/images/cip-immo-logo.png`.

Les photos téléchargées et optimisées sont locales, dans `public/images/`. Elles sont clairement signalées comme illustrations et ne représentent pas des offres CIP IMMO.

| Fichier | Auteur et source | Usage |
| --- | --- | --- |
| `hero-interior.jpg`, `hero-mobile.jpg` | [Valton Myrtaj — intérieur contemporain](https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-chandelier-mmAo_lkAOiY) | Hero et certains exemples fictifs. |
| `apartment-interior.jpg` | [Lisa Anna — cuisine et salon](https://unsplash.com/photos/a-kitchen-and-living-room-in-a-one-bedroom-apartment-OqZaRVv3_zE) | Cartes et présentation. |

Les deux pages indiquaient la [licence Unsplash gratuite](https://unsplash.com/license), vérifiée le 6 octobre 2026. Aucune photo de Vrbo ou Blueground n’est utilisée. Les images hors du premier écran sont chargées à la demande. Le hero est prioritaire, sans chargement différé, avec une version plus légère sur mobile. Remplacer ces fichiers et leurs textes alternatifs par les vraies photos autorisées au moment d’intégrer le catalogue.

## Vérifications effectuées

- Compilation Vite/Tailwind réussie. Aucun CDN Tailwind ni police distante.
- 11 tests PHP réussis, 50 assertions : filtres combinés, état vide, valeurs inconnues, tableaux et saisies hostiles refusés, fiches valides et inconnues, démo interdite en production, contacts absents/invalides et contacts de test valides.
- Contrôle des prérequis Composer réussi avec le PHP local.
- Rendu Chrome aux largeurs **375, 768 et 1440 px** : un seul H1, images chargées et aucun débordement horizontal. Inspection visuelle du hero mobile et ordinateur et des cartes ordinateur.
- Texte agrandi à **200 %** aux trois largeurs : aucun débordement horizontal après correction du menu.
- Menu : ouverture, lien d’ancre, fermeture avec Échap et retour du focus. FAQ : ouverture puis fermeture avec Entrée.
- Recherche : combinaison des trois filtres, fiche, aucun résultat et réinitialisation. Même parcours testé sans JavaScript, avec mouvements réduits.
- 14 destinations de liens testées ; ancres présentes et pages accessibles.
- Requêtes observées uniquement vers l’origine locale ; aucun stockage dans localStorage ou sessionStorage pendant les essais.
- Accès directs refusés : `.env`, `composer.lock`, documents internes, `.htaccess` et journaux. Réponses 404, ou 403 pour le journal.
- `.env`, archive source, outils, base locale et fichiers d’exécution exclus de Git. `.htaccess`, `composer.json`, `composer.lock` et `package.json` identiques à ceux de l’archive.
- Audit npm : **0 vulnérabilité connue signalée**. L’audit PHP Composer n’a pas abouti : délai de connexion à Packagist dépassé, y compris une tentative IPv4 et une tentative via son API. Son résultat reste donc inconnu ; ne pas interpréter cela comme une absence de vulnérabilité PHP.

Les captures et le rapport navigateur sont dans `storage/app/qa/`, exclus de Git. Le test navigateur réutilisable est dans `tests/browser/check.cjs`. Il utilise un outil temporaire séparé du site :

```bash
npm install --prefix /tmp/cipimmo-browser-tools playwright-core --ignore-scripts
CIPIMMO_PLAYWRIGHT_PATH=/tmp/cipimmo-browser-tools/node_modules/playwright-core node tests/browser/check.cjs
```

Le test utilise Chrome système, un profil isolé et son bac à sable actif. Lancer d’abord le serveur local. Les tests clavier réalisés ne remplacent pas un essai avec un lecteur d’écran. Le clavier virtuel d’un téléphone réel n’a pas été testé. Aucun compte ni administration n’a été ajouté ; les changements de compte et révocations de droits ne concernent pas ce catalogue fictif public.

## Avant publication

Fournir les coordonnées publiques, les logements réels avec leurs tarifs et périodes, les villes confirmées, les photos autorisées et les pages légales. Le catalogue métier reste à intégrer ultérieurement. Les villes fictives ne constituent pas une couverture commerciale confirmée.

Le document 03 signale une rotation de mot de passe MySQL de production à confirmer. Ce point n’a pas été vérifié ici ; aucun accès à la production n’a été utilisé. Refaire le contrôle des avis de sécurité PHP lorsque Packagist sera accessible.

Aucun déploiement, modification du DNS/SSL, accès à la base MySQL de production ou changement de clé de production n’a été réalisé.

## Mise à jour du logo — 6 octobre 2026

Le fichier source `CIP IMMO Semi-Flat Logo.png` est un PNG transparent de 1254 × 1254 px. Sa copie publique est identique au fichier fourni. Le composant `brand.blade.php` affiche cette image aux deux emplacements ; le CSS cadre ses marges transparentes sans modifier ses pixels, proportions, couleurs ni contenu. À cette étape, le même PNG servait d’icône d’onglet ; il a ensuite été remplacé par le symbole seul, voir la mise à jour ci-dessous.

Comparaison préalable pour la palette, le 6 octobre 2026 : [USWDS — Using color](https://designsystem.digital.gov/design-tokens/color/overview/) utilise des couleurs nommées et des usages cohérents ; adaptation : variables communes pour la marque, les fonds et les accents. [W3C — Contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) demande un contraste de 4,5:1 pour le texte courant ; adaptation : bleu marine pour les textes et boutons, doré clair sur bleu et doré sombre `#8A5700` sur fond clair. Le logo a des dégradés : les deux valeurs de base sont ses couleurs opaques les plus fréquentes, pas une affirmation que tous ses pixels ont la même couleur.

Vérifications après intégration du logo : compilation réussie, 11 tests PHP / 50 assertions réussis, parcours navigateur validés à 375, 768 et 1440 px sans débordement, y compris texte à 200 %. Le logo apparaît dans l’en-tête et le pied de page ; les captures mobile et ordinateur ont été inspectées. Les refus d’accès aux fichiers privés restent inchangés.

Contrastes calculés des principales associations unies : bleu sur fond clair 12,70:1 ; blanc sur bouton bleu 13,37:1 (9,72:1 au survol) ; doré sur bleu 6,91:1 ; doré sombre sur blanc 6,10:1 ; texte secondaire sur fond clair 5,91:1. Ces calculs concernent ces associations précises, pas une certification générale d’accessibilité ni tous les pixels des photographies. Le rapport est conservé dans `storage/app/qa/branding-contrast.json`.

## Typographie et symbole réduit — 6 octobre 2026

Demande de Gassama : rapprocher la typographie de Blueground, diminuer encore le logo et n’afficher que la maison et la clé. Gassama a ensuite choisi explicitement « Deux polices gratuites proches, sans achat ».

Comparaison préalable : inspection du HTML et des styles publics de [Blueground](https://www.theblueground.com/) le 6 octobre 2026. Observation réelle : `hero-new` aux graisses 400/600 pour le corps et les commandes ; `laca` aux graisses 400/500 pour les titres. Le H1 est en Laca 400. Ces familles ne sont pas utilisées dans CIP IMMO. [Laca chez Adobe Fonts](https://fonts.adobe.com/fonts/laca) propose l’usage web via un projet Adobe et distingue l’auto-hébergement. Les fichiers Blueground n’ont pas été copiés.

Adaptation validée : **Outfit** pour les titres et **Manrope** pour les textes, champs, navigation et boutons. Titres principaux plus légers (graisse 400), titres de cartes en 500. La proximité de style est une appréciation de design, pas une identité des caractères. Sources officielles : [Outfit dans Google Fonts](https://github.com/google/fonts/tree/main/ofl/outfit), [Manrope dans Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope). Les deux licences SIL OFL 1.1 téléchargées et vérifiées sont conservées dans `resources/fonts/`. Les versions variables WOFF2 couvrant le français pèsent environ 25 et 32 Ko. Vite compile les fichiers de `resources/fonts/` dans `public/build/assets/` avec un nom versionné. Les polices sont hébergées localement avec `font-display: swap` et préchargement ; aucune requête visiteur à Google Fonts ou Blueground n’est nécessaire.

Le symbole est affiché à **84 px de large** dans l’en-tête, **78 px** sur très petit écran et **94 px** dans le pied de page. Le cadre `public/images/cip-immo-symbol.svg` contient le PNG original intact et ne montre que la zone maison/clé. Il sert également d’icône d’onglet. Le texte « CIP IMMO » du dessin n’est plus visible ; le nom accessible du lien reste « CIP IMMO, accueil ». Le fichier source à la racine et sa copie PNG publique sont inchangés. Aucun bitmap n’a été redessiné.

Vérifications après cette adaptation : compilation Vite réussie sans avertissement de chemin ; 11 tests PHP / 50 assertions réussis. Chrome confirme Manrope pour le corps et Outfit pour le H1, deux fichiers WOFF2 locaux chargés avec une réponse 200 et les caractères français disponibles. Captures mobile et ordinateur inspectées. Parcours à 375, 768 et 1440 px réussis, y compris texte à 200 %, sans débordement ni erreur JavaScript. Les 14 destinations restent accessibles, le parcours sans JavaScript fonctionne et les accès directs aux fichiers privés restent refusés. Aucune requête vers un service tiers pendant ces essais.

## Texte du premier écran — 6 octobre 2026

Gassama a validé un nouveau titre : « De passage ou pour longtemps, trouvez votre chez-vous. » et une nouvelle introduction : « Découvrez les photos, comparez les prix et choisissez les logements qui vous plaisent. CIP IMMO vous accompagne pour la suite. » Ils remplacent les formulations précédentes dans l’accueil et le document 04. Le titre de l’onglet est également synchronisé.

Comparaison préalable réutilisée : observations de Vrbo et Blueground faites le même jour et consignées ci-dessus. Elles restent pertinentes pour cette retouche : une introduction suivie d’une recherche visible. La structure de ce parcours reste la même ; les nouvelles phrases sont celles fournies par Gassama. Aucun texte des références n’est repris.

Vérifications de cette retouche : les deux phrases exactes et le titre d’onglet sont présents dans Chrome à 375 et 1440 px. Captures inspectées ; aucun débordement horizontal, y compris avec le texte à 200 %. Compilation réussie et 11 tests PHP / 50 assertions réussis. La retouche concerne uniquement des textes fixes, sans changement des accès, de la validation ou des secrets.

## Champs de recherche au clic — 6 octobre 2026

Les trois captures fournies par Gassama montrent le cadre de focus du `select` qui remonte sur son libellé, ainsi qu’une liste standard peu cohérente avec la marque. Le cadre bleu entoure désormais le champ entier, titre et icône compris. Un espace sépare le titre de la valeur. Il reste visible au clavier, ainsi que pendant l’ouverture de la liste.

Comparaison préalable du 6 octobre 2026 : [GOV.UK — Select](https://design-system.service.gov.uk/components/select/) conserve un vrai `label` associé à un `select` et des valeurs d’options. Adaptation : garder cette structure et la soumission GET existante. [MDN — Customizable select elements](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) documente `appearance: base-select`, la personnalisation du panneau et le retour au sélecteur standard dans les navigateurs non compatibles. Adaptation : règles CSS dans `@supports`, sans composant JavaScript ni dépendance. Panneau blanc arrondi, choix d’au moins 44 px de haut, choix actif bleu avec coche, ombre légère. Position préférée sous le champ, avec placement alternatif si l’espace manque. La prise en charge de ce style de liste reste limitée selon le navigateur ; le cadre du champ est corrigé indépendamment.

Vérifications : compilation réussie ; 11 tests PHP / 50 assertions réussis. Parcours navigateur existants validés à 375, 768 et 1440 px, sans JavaScript également ; accès aux fichiers privés toujours refusés. Après ajustement du placement, les trois listes ont été ouvertes et sélectionnées au clavier à 320, 375, 850 et 1440 px : libellés dégagés, cadre visible, options dans l’écran, listes sous le champ dans ces configurations. Flèches, Entrée, Tabulation et Échap vérifiés. Largeur de liste vérifiée avec texte à 200 %. Captures finales à 850 px inspectées dans `storage/app/qa/select-final-*.png`. Sélecteur standard simulé dans Chrome avec `appearance: auto` : choix au clavier et cadre conservés ; ce contrôle ne remplace pas un essai réel dans Firefox ou Safari. Aucun essai avec lecteur d’écran ni téléphone physique réalisé.

La correction modifie uniquement le CSS. Les valeurs reçues restent validées côté serveur ; aucune règle d’accès, donnée privée, session, dépendance ou configuration de production n’a changé.

## Nettoyage des mentions de préparation — 6 octobre 2026

À la demande de Gassama, les mentions visibles « Photo illustrative », « Coordonnées CIP IMMO à compléter », les boutons de contact sans coordonnées et les notes « à rédiger » ou « avant la publication » ont été retirés de l’accueil, des composants et des fiches. Les mentions de démo répétées sur chaque carte, tarif, ville et filtre ont aussi été retirées. Les emplacements de pages légales sans page réelle ne sont plus affichés. Les informations de préparation restent dans ces documents internes.

Comparaison préalable réutilisée : observations de Vrbo et Blueground du 6 octobre 2026 consignées plus haut. Leur parcours recherche, offres puis présentation reste pertinent ; ce nettoyage retire seulement les annotations de préparation, sans modifier ce parcours ni reprendre leurs textes. Le bandeau global identifiant les logements, villes et tarifs fictifs reste dans l’aperçu local. Les fiches conservent leur titre « FICHE DE DÉMONSTRATION ». Les descriptions alternatives des photos restent exactes pour les personnes utilisant un lecteur d’écran.

Aucun numéro de téléphone, lien WhatsApp ou contenu légal n’a été inventé. Les coordonnées invalides restent refusées, et seuls les contacts configurés et valides produisent des boutons. La démo reste interdite en production. Compilation réussie et 11 tests PHP / 50 assertions réussis. Chrome confirme l’absence des mentions de préparation visibles sur l’accueil et une fiche, et l’absence de liens de contact lorsque les coordonnées manquent.

Parcours navigateur réussis à 375, 768 et 1440 px, y compris texte à 200 % et recherche sans JavaScript. Aucun débordement ni erreur JavaScript ; les 14 destinations de liens restent accessibles et les chemins privés sont toujours refusés. Capture du premier écran mobile inspectée après nettoyage.

## Navigation et suppression des mentions restantes — 6 octobre 2026

Après retour sur `main` et suppression de la branche de test du hero, Gassama a demandé explicitement de retirer « Nos villes » des menus et toutes les mentions de démonstration ou de données fictives. Le lien est retiré des navigations ordinateur, mobile et pied de page. La section des villes et le filtre restent accessibles dans le parcours de recherche.

Comparaison préalable réutilisée : observations de Blueground et Vrbo du même jour, décrites ci-dessus. L’exploration des logements et des villes reste pertinente par les filtres et les cartes ; cette retouche simplifie la navigation selon la demande de Gassama. Aucune nouvelle disposition ni contenu de ces références n’est repris.

Le bandeau global, le titre de fiche et les mentions dans les descriptions, les textes alternatifs et le titre d’onglet sont retirés. Les descriptions de l’aperçu utilisent uniquement les caractéristiques déjà présentes dans ses données locales. Les données restent identifiées comme des exemples dans le code et la documentation interne, et sont toujours interdites en production. La règle `noindex, nofollow` de l’aperçu reste active. Aucun accès, secret, validation serveur, session, contact ou dépendance n’a été modifié.

Vérifications de cette mise à jour : compilation réussie et 11 tests PHP / 50 assertions réussis. Chrome confirme l’absence des mentions retirées sur l’accueil et les quatre fiches, y compris titres d’onglet et textes alternatifs, ainsi que l’absence de « Nos villes » dans les menus. L’aperçu conserve `noindex, nofollow` et ne produit pas de contact inventé. Parcours à 375, 768 et 1440 px réussis, texte à 200 % et recherche sans JavaScript compris. Les 13 destinations de liens restent accessibles ; les chemins privés restent refusés. Aucune erreur JavaScript ni requête vers un tiers observée. Capture du premier écran ordinateur inspectée. Les limites des essais (Chrome, absence de téléphone physique et de lecteur d’écran) restent celles indiquées plus haut.

## Carte du hero sur grand écran — 6 octobre 2026

Comparaison préalable : capture Blueground fournie par Gassama, examinée le 6 octobre 2026. Observation réelle : carte blanche arrondie à gauche regroupant titre, introduction et recherche ; photo décalée à droite et visible au-dessus, à droite et sous la carte ; texte aligné à gauche ; ombre légère. Cette capture précise l’adaptation des observations du même jour sur [Blueground](https://www.theblueground.com/), déjà consignées plus haut. Aucun texte, logo, photo ou fichier de cette marque n’est utilisé dans CIP IMMO.

Adaptation demandée : disposition à partir de 1024 px, carte blanche devant notre photo existante, bleu du logo pour le texte et les boutons, doré sombre pour le petit titre. La recherche utilise deux colonnes entre 1024 et 1279 px pour garder les champs lisibles, puis une ligne arrondie à partir de 1280 px. Les filtres, textes validés et liens existants sont conservés. En dessous de 1024 px, la disposition du hero reste celle de la version précédente.

La grille de recherche repasse automatiquement sur deux lignes lorsque la taille du texte augmente : ses colonnes ont une largeur minimale exprimée en `rem`, qui suit la taille des caractères. Cela évite de comprimer les libellés à 200 %.

Le changement porte uniquement sur le CSS : aucune règle de validation, accès, contact, session, donnée privée, secret ou dépendance n’est modifié.

Vérifications : compilation réussie, parcours Chrome à 375, 768 et 1440 px réussis, recherche combinée, état vide, fiche et parcours sans JavaScript compris. Les 13 destinations restent accessibles et les fichiers privés restent refusés ; aucune erreur JavaScript ou requête vers un tiers observée. Position de la carte et sélection au clavier contrôlées à 1024, 1280, 1440 et 1920 px. Aucun débordement horizontal à 320 px ni sur ces tailles, y compris texte à 200 %. Après correction de la grille agrandie, les champs restent contenus dans leurs colonnes à 200 %. Captures à 1024 et 1440 px et recherche agrandie inspectées ; rendu final conservé dans `storage/app/qa/hero-overlap-final-1440.png` et `hero-search-zoom-final.png`. Les limites des essais restent Chrome, sans téléphone physique ni lecteur d’écran.
