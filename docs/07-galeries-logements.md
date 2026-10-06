# Galeries de photos et contacts directs — 6 octobre 2026

## Comparaison préalable

Capture Blueground fournie par Gassama le 6 octobre 2026 : cartes sur trois colonnes, images avec marge intérieure, coins arrondis et ombre légère ; indicateurs de plusieurs photos dans l’image ; caractéristiques et localisation sous la photo. Adaptation : mêmes principes de disposition pour CIP IMMO, avec ses couleurs, noms et tarifs. Aucune date de disponibilité ni salle de bain n’est inventée, ces données étant absentes du catalogue.

Références techniques consultées le 6 octobre 2026 : [W3C WAI — Carousels](https://www.w3.org/WAI/tutorials/carousels/) et [ARIA APG — Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) décrivent commandes clavier, boutons nommés et annonce du changement de photo. Adaptation : pas de rotation automatique, boutons précédent/suivant, choix direct de photo et compteur annoncé. [MDN — CSS scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) permet d’aligner chaque image après un défilement. Adaptation : défilement horizontal tactile et galerie utilisable sans JavaScript.

## Périmètre

Au maximum cinq photos par logement, données partagées par la carte et la fiche. Les deux photos locales déjà disponibles sont utilisées pour essayer la galerie ; cinq photos n’est pas un minimum. Le catalogue de démonstration reste interdit en production et n’utilise aucune base de production. Aucun formulaire d’envoi de fichiers ni administration n’est ajouté.

Gassama a demandé un numéro provisoire en attendant les coordonnées publiques. Le numéro `+12025550123` est utilisé avec `CIPIMMO_PLACEHOLDER_CONTACT=true`, uniquement en environnement local/testing et lorsque les coordonnées sont vides. [NANPA — 555 Line Numbers](https://www.nanpa.com/numbering/555-line-numbers), consulté le 6 octobre 2026, réserve la plage 555-0100 à 555-0199 aux exemples fictifs non fonctionnels. Ce numéro permet de montrer les icônes et leurs liens ; il ne permet pas de joindre CIP IMMO. Aucun appel ou message réel n’a été envoyé pendant les tests.

Pour recevoir des contacts, renseigner `CIPIMMO_PHONE` et `CIPIMMO_WHATSAPP` dans `.env`, au format international sans espaces, puis mettre `CIPIMMO_PLACEHOLDER_CONTACT=false`. Les vrais numéros configurés restent prioritaires. La configuration de production ne reçoit aucun contact provisoire, même si le drapeau reste activé. Les contrôles de format des numéros restent actifs et les saisies hostiles ne créent pas de liens.

## Ajouter les photos de l’aperçu

Les listes `images` de `resources/data/demo-listings.php` contiennent les photos dans leur ordre d’affichage. Chaque photo possède `image` (nom du fichier dans `public/images`), `width`, `height` et `alt` (description courte de ce qu’elle montre). Modifier cette liste pour chaque logement ; les cinq premières photos valides et distinctes sont retenues côté serveur. Les cartes et fiches utilisent le même composant `listing-gallery.blade.php` et cette même liste normalisée. Le fichier de données est réservé à l’aperçu local.

Les URL externes, traversées de dossiers, fichiers SVG actifs, doublons et dimensions invalides sont écartés. Les textes sont échappés par Blade. Cette validation porte sur les métadonnées du catalogue local ; elle ne remplace pas la vérification du contenu des fichiers lors d’un futur envoi de photos, fonctionnalité absente de ce travail.

## Vérifications

Compilation Vite réussie, contrôle de style PHP réussi, 15 tests PHP et 68 assertions réussis. Ils couvrent notamment la limite à cinq photos distinctes, les chemins et dimensions refusés, les contacts invalides, les contacts directs de la fiche et l’interdiction du numéro provisoire et du catalogue local en production. Aucun secret, règle d’accès existante, fichier lock ni dépendance n’a été modifié.

Chrome : contrôles des galeries à 375, 768 et 1440 px, flèches précédent/suivant avec retour à la première ou dernière photo, choix par repères et miniatures, clavier (flèches, Début, Fin), galeries indépendantes, mêmes images sur la carte et la fiche, conservation de la sélection après redimensionnement et fiche sans débordement avec texte à 200 %. Le défilement horizontal natif fonctionne sans JavaScript, avec commandes cachées et images accessibles. La préférence de réduction des mouvements est testée à 768 px. Le titre de fiche a été corrigé pour se couper si nécessaire avec de gros caractères.

Les parcours existants sont conservés : filtres combinés, résultat vide, réinitialisation, navigation et FAQ ; fichiers privés refusés, liens vérifiés sans activer les contacts externes. Captures ordinateur et téléphone inspectées dans `storage/app/qa`, dossier exclu de Git. Limites : Chrome uniquement, sans téléphone physique, lecteur d’écran ni appel/message réel. Aucun catalogue réel ou outil d’ajout de photos n’a été connecté.

Pour reproduire les contrôles navigateur avec Playwright installé hors du projet :

```bash
CIPIMMO_PLAYWRIGHT_PATH=/chemin/vers/playwright-core node tests/browser/check.cjs
CIPIMMO_PLAYWRIGHT_PATH=/chemin/vers/playwright-core node tests/browser/gallery.cjs
```
