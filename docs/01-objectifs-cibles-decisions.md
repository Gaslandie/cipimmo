# CIP IMMO — Objectifs, cibles et décisions

État au 6 octobre 2026. Document de transmission à Codex dans VS Code.

## 1. Rôle de ce dossier

Lire ce fichier, puis `02-benchmark-direction-design.md` et `03-technique-hebergement-etat.md` avant de développer. Ces documents reprennent les échanges du projet. Ils distinguent les décisions actées, les recommandations et les informations à obtenir. Ne pas traiter une recommandation comme un engagement client.

La prochaine étape convenue est de rédiger ensemble les textes exacts de la page d’accueil. Ces textes ne sont pas encore validés. Le transfert du développement vers VS Code vient ensuite.

## 2. Objectif du site — synthèse du besoin validé

Présenter les logements proposés par CIP IMMO, faciliter leur recherche et transformer les visites du site en prises de contact qualifiées par WhatsApp ou téléphone.

Le visiteur doit pouvoir comprendre l’offre, trouver un logement adapté, consulter ses photos, ses caractéristiques et son prix, puis contacter directement l’entreprise pour discuter de la location.

Le site est un catalogue de locations avec administration. Ce n’est pas une plateforme de paiement ni un moteur de réservation instantanée.

## 3. Publics cibles

Le marché de départ est la Guinée, avec une utilisation principalement sur téléphone : cette priorité mobile est explicitement retenue.

| Public | Besoin | Statut |
| --- | --- | --- |
| Personnes recherchant un court séjour | Trouver un logement pour une période courte, voir le prix et contacter CIP IMMO | Directement lié à l’offre validée |
| Personnes recherchant une location longue durée | Comparer des logements et échanger sur les conditions de location | Directement lié à l’offre validée |
| Personnes recherchant un logement meublé ou non meublé | Identifier rapidement les annonces adaptées | Directement lié à l’offre validée |
| Diaspora de passage, voyageurs, professionnels en mission, familles en installation | Besoins possibles de séjour ou d’installation | Segments proposés, pas de priorisation client confirmée |
| Équipe CIP IMMO | Mettre à jour les annonces et le contenu | Utilisateurs du back-office validé |

Ne pas présenter un positionnement exclusivement luxe, touristique ou diaspora comme validé. Aucun persona chiffré ni étude de marché n’a été réalisé dans ces échanges.

## 4. Périmètre fonctionnel retenu

- Locations de courte et de longue durée.
- Logements meublés et non meublés.
- Prix visibles sur le site.
- Fiches logements détaillées avec photos et informations utiles.
- Recherche et filtres avancés.
- Contact par WhatsApp ou appel direct à CIP IMMO.
- Back-office pour ajouter et modifier le contenu et les annonces ; prévoir leur retrait de l’affichage.
- Parcours conçu d’abord pour le mobile, puis adapté aux autres écrans.

### Parcours principal

Accueil → recherche ou sélection d’une ville → résultats → fiche logement → WhatsApp ou appel → discussion avec CIP IMMO hors du site.

Le clic sur WhatsApp ne confirme aucune réservation. La disponibilité, les conditions et l’accord final sont confirmés par l’entreprise. Aucun paiement en ligne n’est prévu.

### Recherche : détail à finaliser

La présence de bons filtres est validée ; la liste exhaustive ne l’est pas. Base proposée : ville, quartier, durée de location, meublé/non meublé, type de logement, budget, chambres et équipements.

L’unité du tarif doit être explicite : par nuit, mois ou autre période validée. Ne pas comparer directement un tarif mensuel avec un tarif à la nuit dans un même filtre de budget.

Un calendrier de disponibilité en temps réel, des comptes locataires, des favoris, une carte interactive ou une messagerie interne ne sont pas validés. Ne pas les ajouter par défaut.

## 5. Structure de la page d’accueil retenue

| Ordre | Section | Intention |
| --- | --- | --- |
| 1 | En-tête / navigation | Logo, accès aux principales rubriques et au contact |
| 2 | Hero avec recherche | Comprendre l’offre et lancer une recherche ; référence principale Vrbo |
| 3 | Sélection de logements | Mettre en avant des annonces du catalogue |
| 4 | Logements par ville | Explorer les destinations proposées |
| 5 | Comment louer | Expliquer la consultation puis la prise de contact |
| 6 | Présentation de CIP IMMO | Présenter l’entreprise avec des informations vérifiées |
| 7 | FAQ | Répondre aux questions pratiques |
| 8 | Contact | WhatsApp et téléphone |
| 9 | Pied de page | Navigation utile, coordonnées et informations légales à compléter |

Les témoignages sont mis de côté pour le moment.

La section par ville est conservée même avec peu de logements. Pour le début et les maquettes, le client autorise une présentation large des villes. La liste exacte n’a pas été fournie : ne pas inventer une liste déjà approuvée. Avant publication commerciale, garder les villes réellement desservies après retour du client. Les données de démonstration doivent rester identifiables et ne pas être présentées comme un inventaire réel.

## 6. Identité et design

- Le client a retenu un logo CIP IMMO.
- Une version simplifiée, sans la phrase du bas, a été demandée et acceptée.
- Direction : semi-flat, mobile-first, inspirée de Vrbo et Blueground.
- Couleurs de travail évoquées : bleu et doré, à prélever dans le fichier final du logo. Aucun code hexadécimal ni police précise n’est fixé dans ce dossier.
- Le fichier logo accepté doit être ajouté au projet : ce dossier Markdown ne contient pas les images.

## 7. Organisation avec le client

Le client n’a pas le temps de confirmer formellement chaque détail du cahier des charges. Il fait confiance à l’équipe pour avancer et visitera le site afin de signaler les informations à corriger. Cette méthode autorise l’avancement avec les décisions connues ; elle ne transforme pas des hypothèses commerciales en faits.

## 8. Cadre commercial interne

| Élément | Décision |
| --- | --- |
| Conception et première année | 5 000 000 GNF, tout compris pour la première année |
| Hébergement à partir de la deuxième année | 3 000 000 GNF par an |
| Modalités de paiement | Ne pas les mentionner dans le cahier des charges |

Ces montants concernent la prestation au client, pas les prix des logements. Ne pas les publier sur le site. Le détail exact des services inclus dans les années suivantes reste à préciser si nécessaire ; ne pas promettre une maintenance illimitée.

## 9. Informations à obtenir pour finaliser le contenu

- Coordonnées publiques : téléphone, WhatsApp, adresse et e-mail.
- Présentation réelle de l’entreprise et dénomination légale.
- Logo final et droits d’utilisation des photos.
- Villes et quartiers réellement disponibles.
- Inventaire des logements, photos, tarifs, unités et équipements.
- Conditions de location : durée minimum éventuelle, caution, charges, visites et disponibilité.
- Règles d’affichage des biens indisponibles.
- Langues supplémentaires éventuelles : le français est la base de travail ; le multilingue n’est pas validé.

Ne pas inventer d’avis, de nombre de clients, d’années d’expérience, de disponibilité garantie ou de services inclus.

## 10. Indicateurs proposés, non encore instrumentés

Suivre les consultations de fiches et les clics WhatsApp/appel aiderait à mesurer la génération de contacts. Aucun outil analytique n’est choisi. Un clic n’est pas une location conclue.
