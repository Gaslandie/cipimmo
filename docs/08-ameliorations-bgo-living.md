# Améliorations CIP IMMO inspirées de BGO Living

Date : 16 octobre 2026.

Les sept idées ci-dessous ont été acceptées par Gassama. Les cases cochées indiquent les travaux réalisés dans le site Luminor local. Les cases ouvertes restent à faire, notamment dans le futur back-office ou après réception des contenus du client.

## État de l'implémentation

Le site concerné est le dossier `luminor/`. La version Laravel et sa base de données ne sont pas modifiées par ce travail. La publication de cette version sur GitHub Pages a été demandée le 16 octobre 2026.

La disponibilité reste à confirmer sur le site public. Le client la gérera lui-même dans le futur back-office. Aucun statut réel n'a été inventé.

Les exemples fictifs de quartier ne s'affichent qu'en mode développement et sont signalés. La version compilée pour la production les remplace par une invitation à demander les repères à CIP IMMO. Les équipements connus proviennent des descriptions existantes ; les autres sont indiqués « À confirmer ».

Aucune vidéo réelle n'a été fournie. L'emplacement est prêt et propose actuellement une demande de visite ou de vidéo. Lors de l'ajout d'une vidéo, fournir une image d'aperçu, une description textuelle et des sous-titres si elle contient des paroles utiles. Le lecteur accepte uniquement des chemins locaux de médias, avec lecture volontaire.

## Référence consultée

Comparaison effectuée le 16 octobre 2026 :

- [Accueil BGO Living](https://www.bgoliving.com/) : recherche par lieu, chambres et budget ; logements présentés avec photo, adresse et prix de départ.
- [Fiche Gerrard West](https://www.bgoliving.com/residential/gerrard-west) : disponibilité, équipements, quartier, visites 3D et contact.

Ces deux références ont été consultées à nouveau le 16 octobre 2026 avant l'implémentation. La recherche visible, les informations comparables et les parties équipements/quartier/contact sont adaptées à CIP IMMO.

[W3C WAI — Libellés des formulaires](https://www.w3.org/WAI/tutorials/forms/labels/), consulté le 16 octobre 2026 : chaque champ doit être identifié. Adaptation : libellés reliés aux champs, listes natives, boutons nommés et focus visible.

Le contenu de ces deux pages BGO a été consulté. Les interactions et l'affichage sur téléphone n'ont pas été testés. Les adaptations prévues sont détaillées ci-dessous. Garder l'identité de CIP IMMO et ses propres contenus. Vérifier à nouveau les références au moment de la réalisation si elles ont changé.

## 1. Une recherche facile à trouver

But : permettre au visiteur de dire rapidement où il veut habiter et ce qu'il peut payer.

- [x] Mettre la recherche en évidence dès l'accueil.
- [x] Rendre simples les choix de ville ou quartier, durée du séjour et budget.
- [x] Garder accessibles les critères utiles déjà présents, notamment meublé ou non meublé et nombre de chambres.
- [x] Indiquer clairement si le budget correspond à une nuit ou à un mois ; ne pas mélanger ces tarifs.
- [x] Prévoir un message clair quand aucun logement ne correspond et un bouton pour effacer les filtres.

## 2. Des logements faciles à comparer

But : voir les différences entre deux appartements sans ouvrir toutes les fiches.

- [x] Présenter les informations dans le même ordre sur chaque carte : photo, nom, quartier ou ville, prix et période, chambres, meublé ou non meublé.
- [x] Réutiliser les photos existantes et garder un accès simple à la fiche complète. Les images historiques de la maquette sont conservées ; leur authenticité reste à valider avec le client.
- [x] Afficher les mêmes informations sur la carte et sur la fiche du logement.
- [x] Ne pas inventer les prix, surfaces ou caractéristiques manquantes.

## 3. Disponibilité gérée par le client dans le futur back-office

**Décision explicite de Gassama : ce sera au client CIP IMMO de changer le statut de chaque appartement pour indiquer s'il est disponible ou indisponible. Cette fonction est à prévoir lors du travail sur le back-office.**

Le back-office est l'espace privé où le client modifiera ses annonces.

- [ ] Ajouter un choix simple « Disponible » / « Indisponible » dans la modification d'un logement.
- [ ] Enregistrer le choix du client et le faire apparaître de façon cohérente sur les cartes et les fiches publiques.
- [x] Tant que le client n'a pas renseigné la disponibilité, afficher « Contactez-nous pour vérifier la disponibilité » ; ne pas considérer automatiquement le logement comme disponible.
- [ ] Garder séparés la disponibilité et le retrait d'une annonce : un logement indisponible n'est pas forcément une annonce supprimée ou cachée.
- [ ] Vérifier qu'un changement enregistré dans le back-office se retrouve bien sur le site public, y compris si certaines pages sont mises en cache ou générées à l'avance.
- [ ] Vérifier côté serveur que seule une personne autorisée peut modifier le logement concerné.
- [ ] Tester le passage dans les deux sens, la conservation après rechargement, puis les refus sans connexion, avec un autre compte ou après retrait des droits.

Le clic sur WhatsApp ne réserve pas le logement et ne change pas son statut. Aucune mise à jour automatique ni calendrier de réservation n'est demandé ici.

## 4. Présenter le quartier et les services proches

But : aider le visiteur à imaginer sa vie autour du logement.

**Gassama autorise des informations fictives pour préparer cette partie pour le moment.**

- [x] Ajouter une partie « Autour du logement » : commerces, marché, transports, route principale ou autres repères utiles.
- [x] Préparer des exemples fictifs pour essayer la présentation, en les signalant clairement comme « Informations de démonstration ».
- [x] Distinguer ces exemples des renseignements réels dans les données pour éviter leur publication comme des faits.
- [ ] Faire confirmer les lieux, distances et temps de trajet par le client avant la publication commerciale.
- [ ] Remplacer les exemples par les informations validées ou retirer celles qui restent inconnues.

## 5. Expliquer les équipements et les charges

But : montrer exactement ce que le logement propose et ce que le prix comprend.

- [x] Présenter une liste lisible des équipements : eau, électricité, climatisation, cuisine, parking, Wi-Fi, selon les informations reçues.
- [x] Distinguer un équipement présent dans le logement d'un service partagé dans l'immeuble.
- [x] Préciser les charges comprises et celles à payer en plus, uniquement avec des informations confirmées.
- [ ] Prévoir la saisie et la modification de ces renseignements dans le back-office.
- [x] Pour une information inconnue, utiliser « À confirmer » plutôt que d'annoncer que le service existe ou qu'il est absent.

L'autorisation d'utiliser des informations fictives au point 4 concerne les quartiers ; elle ne vaut pas confirmation des équipements ou des charges.

## 6. Montrer les logements à distance

But : aider une personne qui ne peut pas se déplacer à comprendre la disposition des pièces.

- [x] Prévoir l’intégration d’une courte vidéo réelle par logement lorsque le client en fournit une. Les fichiers restent à recevoir.
- [x] Préparer le lecteur avec image d’aperçu obligatoire, commandes natives et chargement à la demande. La lecture d’une vidéo client reste à vérifier après réception du fichier.
- [ ] Vérifier que les médias ne montrent pas de documents personnels ni de personnes sans leur accord.
- [x] Permettre de demander une visite par les moyens de contact existants.

La vidéo simple est l'adaptation retenue pour commencer. Une visite 3D nécessite des contenus et un choix supplémentaires ; elle n'est pas une condition pour réaliser cette amélioration.

## 7. Contacter CIP IMMO depuis le bon logement

But : éviter au client de devoir expliquer de quel appartement il parle.

- [x] Vérifier les boutons WhatsApp et téléphone sur les cartes et les fiches concernées.
- [x] Préparer un message WhatsApp avec le nom ou la référence du logement et son lien public.
- [x] Garder ces boutons faciles à utiliser sur téléphone et au clavier.
- [x] Contrôler les coordonnées utilisées et ne mettre aucune information privée dans les liens.
- [x] Tester les liens sans envoyer de message ni passer d'appel réel.

## Vérifications communes avant livraison

- [x] Vérifier le parcours recherche → résultats → fiche → contact sur ordinateur et petit écran.
- [x] Contrôler la lisibilité, les boutons, les photos et l’absence de débordement horizontal. La lecture de vidéos réelles reste à contrôler après leur réception.
- [x] Tester les cas normaux et les cas refusés concernés par les changements.
- [x] Conserver les protections existantes. Ce travail ne modifie ni les sessions ni les droits du serveur Laravel ; les entrées de recherche et les chemins de médias du site sont contrôlés. Les droits de modification du futur back-office restent à implémenter et tester.
- [ ] Pour les changements de données du back-office, prévoir une sauvegarde adaptée et préserver les données existantes.
- [x] Vérifier que les exemples fictifs ne sont pas présentés comme des informations réelles en production.
- [x] Expliquer à Gassama en français simple ce qui a changé, ce qu'il peut essayer, les vérifications faites et leurs limites.

Tout risque confirmé qui expose des données doit être corrigé avant la livraison concernée. Toute consigne transmise à un autre agent doit reprendre les exigences de sécurité, la comparaison préalable avec des références et l'explication simple à Gassama.


## Vérifications de cette réalisation

- Contrôle TypeScript et analyse ESLint des fichiers modifiés : réussis.
- Chrome local : recherche depuis l'accueil, sélection précise d'un quartier, filtres combinés, résultat vide, réinitialisation, conservation des critères après rechargement, affichage liste/grille et fiche du logement.
- Navigation au clavier : accès direct au contenu, champs de recherche natifs, bouton de recherche qui place le focus sur les résultats. Carrousel mobile testé avec ses flèches précédent/suivant.
- Contrôle des liens de contact sans appel ni envoi : référence distincte et lien de la fiche, sans paramètres de recherche.
- Affichage contrôlé à 320, 390, 768 et 1440 pixels : aucun débordement horizontal constaté dans les parcours testés.
- Entrées invalides, paramètres répétés, recherches trop longues, texte contenant du JavaScript, tarifs inconnus et périodes de budget distinctes : vérifications réussies. Une fiche inconnue renvoie 404.
- Validation des chemins de médias : fichiers locaux attendus acceptés ; URL externe, chemin remontant les dossiers, contenu actif et paramètres privés refusés.
- Les tests ne prouvent pas le fonctionnement sur un téléphone physique ou avec un lecteur d'écran. Les comptes, droits révoqués et modifications de disponibilité seront testés lors du futur travail sur le back-office.

- Compilation Next.js finale : réussie, avec les avertissements existants du thème (images, effets React et quelques règles CSS).
- Axe, contrôles WCAG A/AA dans le contenu principal de l'accueil, du catalogue et d'une fiche, à 390 et 1440 pixels avec mouvements réduits : aucune violation détectée après correction. Cela ne remplace pas un essai avec un lecteur d'écran.
- Version compilée : absence des exemples fictifs de quartier confirmée. Accès directs à `/.env`, `/.git/config` et à une fiche inconnue : réponses 404.
- Aperçu de travail testé sur `http://127.0.0.1:3197`. La livraison Git et GitHub Pages fait maintenant partie du périmètre demandé.


## Livraison GitHub Pages

- Destination : https://gaslandie.github.io/cipimmo/ ; branche de publication existante `gh-pages`.
- Construction : `cd luminor && npm run build:pages`. Arrêter le serveur Next local avant la compilation. Le dossier public à publier est `luminor/.next-pages/` ; ne pas publier le dépôt ni le dossier interne `.next/`.
- L’export remplace l’ancien aperçu Laravel par Luminor. Les anciennes entrées `/contact/`, `/a-propos/` et `/logements/` conduisent aux pages actuelles.
- Référence technique consultée le 16 octobre 2026 : [export statique Next.js](https://nextjs.org/docs/app/guides/static-exports) et [préfixe de chemin](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath). Adaptation : pages statiques, chemins sous `/cipimmo/` et images servies directement.
- Les formulaires Luminor préparent uniquement un message WhatsApp. Cette préparation se fait désormais dans le navigateur, avec les mêmes validations ; aucune donnée n’est écrite sur un serveur. Les protections et la base Laravel restent inchangées.
- Les profils Facebook utilisent le lien fourni par Gassama : https://www.facebook.com/profile.php?id=61595249675572.
- Quatre préparations de formulaire testées avec entrées valides et refusées, sans requête externe. Les futurs droits de modification et de disponibilité du back-office restent à réaliser côté serveur.


## Précisions et adaptations Pincher Creek — 16 octobre 2026

Décision de Gassama : le visiteur consulte les logements puis contacte CIP IMMO par appel ou WhatsApp. Aucun compte visiteur ni espace locataire n'est prévu. Le futur back-office sera réservé à l'administrateur de CIP IMMO ; les mentions précédentes du « client » gérant les disponibilités désignent cet administrateur, pas un visiteur.

Comparaison revérifiée le 16 octobre 2026 sur https://www.pinchercreekrealtors.com/ : zones desservies nommées, accès au contact et présentation de l'accompagnement visibles dans l'accueil. Le catalogue intégré n'a pas pu être inspecté lors de la comparaison initiale. Adaptation au site existant : liens des destinations filtrés par lieu, aide à la recherche avec préparation volontaire d'un message WhatsApp, trois étapes visibles aussi sur téléphone. Les choix de budget distinguent jour, nuit et mois. Aucun message n'est envoyé automatiquement.

Les témoignages sont retirés des pages publiques pour le moment. La présentation de l'équipe reste inchangée et l'ajout d'une sélection de logements mise en avant n'est pas engagé. Le statut de disponibilité et les droits d'administration restent un travail futur, comme convenu.


Vérifications locales de cette adaptation : compilation Pages réussie, analyse ESLint des fichiers modifiés réussie ; les six liens de destination affichent respectivement 1, 1, 3, 4, 1 et 7 logements, y compris après rechargement. Trois étapes visibles à 320, 390 et 1440 pixels, ouverture de l'aide au clavier et aucun débordement horizontal. Axe ne détecte aucune violation WCAG A/AA dans la partie modifiée à ces trois largeurs ; cela ne remplace pas un lecteur d'écran ni un téléphone physique. Messages WhatsApp préparés avec et sans critères, puis interceptés avant toute requête ; valeurs injectées, champs répétés et budget incompatible refusés, avec focus sur l'erreur. Aucun témoignage n'est présent dans les pages et scripts exportés. Cette adaptation a été vérifiée localement.


## Adaptations Rentola — 16 octobre 2026

Points 1, 2 et 3 acceptés par Gassama. Références revérifiées le 16 octobre 2026 : [accueil Rentola](https://rentola.ch/en), avec compteurs par ville et exemples de recherche ; [catalogue Rentola](https://rentola.ch/en/for-rent), avec saisie des bornes de prix. La comparaison porte sur le contenu accessible, sans validation des interactions Rentola ni de sa fiche individuelle inaccessible lors de la comparaison.

- Les compteurs des villes et des destinations sont calculés depuis les mêmes annonces que le catalogue. Ils indiquent des logements proposés, sans promettre leur disponibilité. Les liens par ville incluent Kankan.
- Trois raccourcis de recherche : court séjour à Conakry, trois chambres à Ansoumaniah, longue durée à Coyah. Ils utilisent les filtres existants.
- Budget maximal libre en GNF sur l'accueil, dans le catalogue et dans l'aide WhatsApp. Montant entier positif de 12 chiffres maximum, facultatif ; période explicite par jour, nuit ou mois. Les durées et périodes incompatibles sont refusées ; changer la durée efface le budget (aucun maximum).
- Les anciens liens avec un budget sous la forme `3000000:mois` restent reconnus. Les nouveaux liens gardent le montant et sa période séparément. Les paramètres répétés, montants invalides et périodes inconnues sont refusés.
- Le visiteur conserve le parcours sans compte : consultation, appel ou WhatsApp. Les catégories et le badge « Nouveau » ne font pas partie de cette réalisation. Le futur espace de gestion reste réservé à l'administrateur.


Vérifications locales Rentola : compilation Pages et ESLint ciblé réussis. Compteurs vérifiés depuis les données ; dix recherches valides avec conservation des critères dans les liens et quinze cas invalides/refusés contrôlés. Chrome : liens des villes et trois raccourcis, budget libre, rechargement, réinitialisation, anciens liens, séparation jour/nuit/mois et exclusion des tarifs inconnus lorsqu'un plafond est fixé. Aide WhatsApp testée avec budget libre et sans budget, requêtes interceptées avant envoi ; période répétée refusée. Affichage sans débordement et clavier contrôlés à 320, 390 et 1440 pixels. Axe : aucune violation A/AA détectée dans les parties modifiées à ces tailles. Pas de test sur téléphone physique ou lecteur d'écran. Ces modifications ont été validées en local.


## Adaptations Les Grillons, Wetag et Cap Ferret — 16 octobre 2026

Gassama accepte les points 1, 2, 4, 5 et 6 ; le point 3 (références courtes) est refusé. Les références et liens actuels sont conservés.

Références revérifiées le 16 octobre 2026 : [catalogue Les Grillons](https://www.lesgrillons.ch/a-louer), tris par surface et pièces ; [favoris Wetag](https://www.wetag.ch/en/favorite/), sélection de logements ; [fiche Cap Ferret](https://www.agence-cap-ferret.fr/bien/villa-contemporaine-ferret-lhorizon/), demande de dates, autres biens et galerie. Observation du contenu accessible, sans test de leurs interactions.

- Catalogue : tri « Les plus grands d’abord » et « Le plus de chambres d’abord », combinables avec les filtres existants.
- Favoris sans compte : bouton sur les cartes et les fiches, page « Mes favoris » dans le menu. Seules les références d'annonces connues sont conservées dans le navigateur. Les valeurs inconnues, les doublons et les données illisibles sont ignorés ; les onglets se synchronisent. Si l'enregistrement est bloqué, la sélection reste temporaire pendant la visite et un message l'explique. Les dates ne sont pas stockées dans les favoris.
- Dates facultatives sur la fiche : arrivée et départ souhaités dans le message WhatsApp. L'arrivée seule est possible ; un départ sans arrivée, un départ avant ou le jour de l'arrivée, une arrivée passée, une date invalide ou des champs répétés sont refusés. Référence et lien du logement conservés. Aucun envoi ni réservation automatique.
- Suggestions : jusqu'à trois autres annonces de même durée, classées par proximité de lieu, de nombre de chambres et de type. Le logement ouvert est exclu. Les prix par nuit, jour ou mois ne sont pas comparés entre eux.
- Galerie : champs facultatifs `photos` (chemin local, description, largeur, hauteur), boutons précédent/suivant et miniatures. Chemins externes, chemins remontant les dossiers, doublons et dimensions invalides sont écartés. La galerie revient à la première image en changeant de logement. Les fichiers supplémentaires restent à recevoir ; aucune photo d'un autre bien n'est ajoutée. La photo actuelle reste affichée en attendant. Lors de la réception, vérifier l'appartenance des photos au logement et mettre aussi à jour sa photo principale.

Vérifications locales : compilation Pages et ESLint ciblé réussis. Chrome : tris avec filtre, favoris après rechargement, changement de page et d'onglet, suppression, données locales incorrectes et stockage bloqué. Messages avec dates valides ou sans dates interceptés avant toute requête ; dates refusées et doublons testés. À 320, 390 et 1440 pixels, pas de débordement ; aucune violation Axe A/AA détectée dans le contenu principal du catalogue, des favoris et d'une fiche. Galerie à plusieurs photos testée au clavier avec deux images de test dans un montage temporaire hors du site ; boutons, limites et miniatures validés, contrôle Axe réussi. Les fichiers de test ne sont pas publiés. Les photos réelles restent à réceptionner et vérifier ; aucun essai sur téléphone physique ou lecteur d'écran. Ces adaptations ont été validées en local.


## Livraison de l’ensemble des adaptations — 16 octobre 2026

Gassama demande le commit, le push et la mise à jour de GitHub Pages pour les adaptations Pincher Creek, Rentola, Les Grillons, Wetag et Cap Ferret acceptées ci-dessus. Publication du seul export statique validé sur la branche `gh-pages`, à https://gaslandie.github.io/cipimmo/. Les références restent inchangées. Le back-office et la réception des photos réelles restent des travaux futurs.
