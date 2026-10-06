# CIP IMMO — Benchmark et direction de design

État au 6 octobre 2026. À lire avec `01-objectifs-cibles-decisions.md`.

## 1. Sélection retenue

Gassama a choisi deux références principales après une recherche de sites de location : **Vrbo** et **Blueground**. Les sites locaux consultés n’ont pas été retenus comme références visuelles prioritaires. La liste initiale de vingt sites n’est pas reconstituée ici : seuls les deux choix explicitement confirmés orientent ce document.

Des captures mobiles de ces deux sites ont été fournies au cours du projet. Elles devront être jointes au dossier de travail si une reproduction précise de leur composition est nécessaire. Ce fichier ne remplace pas ces captures et ne constitue pas un audit visuel exhaustif de toutes les pages.

## 2. Références et observations vérifiées

| Référence | Observation sur le service / la page publique | Rôle retenu pour CIP IMMO |
| --- | --- | --- |
| [Vrbo](https://www.vrbo.com/) | Recherche de locations avec destination, dates et voyageurs ; exploration de destinations et de types de logements | Référence explicite pour le début de page et le hero avec recherche |
| [Blueground](https://www.theblueground.com/) | Présentation d’appartements meublés pour différentes durées de location | Deuxième référence UI, notamment pour la présentation des logements et l’ambiance générale |

Pages publiques consultées le 6 octobre 2026. Leur apparence peut varier selon le pays, la langue et la date. Les recommandations suivantes sont une adaptation pour CIP IMMO, pas une description certifiée des systèmes de design internes de ces entreprises.

## 3. Style à appliquer

Direction de travail : **design contemporain semi-flat (Flat Design 2.0)**.

Cela signifie pour notre projet : surfaces simples, hiérarchie claire, photos importantes, boutons bien identifiables, angles arrondis modérés et ombres légères pour distinguer certains blocs. Cette appellation décrit notre intention visuelle ; ni Vrbo ni Blueground ne sont déclarés officiellement « Material Design » ou « glassmorphism » sur la base de ce benchmark.

Le glassmorphism et les effets 3D marqués ne constituent pas la direction retenue pour l’interface. Le léger relief du logo peut coexister avec une interface sobre.

## 4. Traduction vers CIP IMMO

| Élément | Décision ou proposition |
| --- | --- |
| Hero | Validé : inspiration Vrbo, recherche adaptée au projet |
| Approche mobile | Validée : priorité au téléphone |
| Photos et cartes logements | Recommandation : images généreuses et informations essentielles rapidement lisibles |
| Palette | Reprendre le logo CIP IMMO accepté ; bleu/doré comme direction, valeurs exactes à définir |
| Ombres et arrondis | Recommandation : relief léger, cohérent avec le semi-flat |
| Typographie | À choisir : lisible sur petit écran, sans multiplier les polices |
| Animations | Recommandation : discrètes et utiles, sans ralentir la consultation |

S’inspirer des principes de composition, pas copier leurs textes, photos, logos ou identité.

## 5. Hero et recherche

Le choix acté est un début de page dans l’esprit Vrbo avec une recherche propre à CIP IMMO. La composition exacte et les textes restent à travailler.

Proposition de mise en œuvre :

- Un titre court indiquant la location de logements et une phrase d’explication.
- Une photo pertinente autorisée, avec contraste suffisant pour lire le texte.
- Un bloc de recherche visible dès le premier écran autant que possible.
- Champs initiaux proposés : ville, court séjour/longue durée et meublé/non meublé.
- Un bouton de recherche principal ; les critères plus détaillés peuvent être accessibles dans les résultats.
- Sur mobile, disposer les champs verticalement ou en petit groupe lisible, sans compresser une barre desktop.

Ne pas recopier automatiquement le champ « dates » de Vrbo : une recherche de disponibilité réelle suppose des données et un fonctionnement qui n’ont pas été validés. Une demande de dates peut être recueillie lors du contact sans promettre une réservation automatique.

## 6. Cartes et fiches logements

Contenu recommandé des cartes : photo, titre, ville/quartier, tarif avec unité, indication meublé/non meublé, caractéristiques majeures et accès à la fiche.

La fiche doit aider à décider puis à contacter CIP IMMO. Proposition : galerie, description, caractéristiques, équipements, localisation pertinente, prix et conditions connues, boutons WhatsApp et appel. Le message WhatsApp peut mentionner automatiquement le titre, la référence et le lien du logement ; ce détail est une recommandation d’implémentation.

Ne pas reprendre les étoiles, notes ou témoignages des références : aucun avis client n’est disponible et les témoignages sont écartés pour le moment.

## 7. Critères de réussite mobile — recommandations

- Navigation courte ; accès clair à la recherche et au contact.
- Boutons faciles à toucher, champs avec libellés visibles.
- Filtres simples à ouvrir, modifier et réinitialiser.
- Prix lisibles sans ambiguïté de période.
- Photos optimisées et chargement progressif hors du premier écran.
- Aucun débordement horizontal à petite largeur.
- Contrastes, focus clavier et messages d’erreur lisibles.
- État utile si aucun logement ne correspond aux filtres.

## 8. Ce qui n’est pas repris des plateformes de référence

Pas de paiement en ligne, panier, programme de fidélité, espace propriétaire public, messagerie interne ou confirmation instantanée de réservation. Le contact commercial reste assuré par CIP IMMO via WhatsApp ou téléphone.

## 9. Prochaine étape éditoriale

Rédiger et valider les textes exacts des sections de l’accueil listées dans le premier document : navigation, hero, sélection de logements, villes, fonctionnement, entreprise, FAQ, contact et pied de page. Les formulations ci-dessus sont des consignes de conception, pas les textes finaux à publier.
