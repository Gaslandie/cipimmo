# Bonnes pratiques et préférences de Gassama — sites web

Référence de travail à transmettre à un agent IA au début d’un projet.
Créé le 4 octobre 2026, à la demande de Gassama.

## À lire avant de travailler

Ce document rassemble les pratiques **validées par Gassama**. Il distingue ses préférences de présentation des recommandations générales du Web. Il sert de base aux projets présents et futurs ; tenir compte du public, du contenu et des consignes propres au projet.

Gassama et l’agent peuvent faire évoluer ce fichier ensemble. L’agent ne doit jamais ajouter une nouvelle pratique de sa propre initiative :

1. Repérer une pratique utile et consulter des références reconnues et récentes.
2. La proposer à Gassama en français simple : problème, solution, bénéfice, limites et exemple concret.
3. Attendre son accord explicite. Le silence ne vaut pas accord.
4. Après accord, ajouter la pratique, sa portée, les sources, la date et une ligne dans le journal. Modifier une pratique existante suit la même règle ; ne pas effacer son historique sans demande.

Quand une pratique utile apparaît pendant un projet, rappeler à Gassama qu’elle peut rejoindre ce fichier, **sans l’y inscrire immédiatement**. La mise en œuvre dans un projet et l’ajout à cette référence générale sont deux décisions distinctes. Une demande directe de Gassama d’ajouter un élément constitue son autorisation pour cet élément.

Si le fichier n’est pas accessible, signaler cette limite. Ne pas prétendre l’avoir consulté ou modifié. Ne pas remplacer automatiquement le fichier par une copie plus ancienne.

## Consignes permanentes à transmettre avec ce fichier

- **Sécurité à chaque étape** : conception, code, tests et livraison. Conserver les protections existantes ; vérifier les droits et le propriétaire réel des données côté serveur. Ne pas faire confiance aux boutons masqués, rôles ou identifiants transmis par le navigateur. Valider les entrées et fichiers ; protéger sessions, données privées et secrets. Examiner les abus, dépendances et sauvegardes selon le périmètre. Vérifier les cas autorisés et refusés, accès directs, changements de compte et droits révoqués lorsqu’ils existent. Ne jamais affaiblir une protection pour réussir un test. Un risque confirmé bloque l’action qui expose les données. Rapporter les contrôles réels et leurs limites, sans promettre une sécurité absolue.
- **Comparaison préalable obligatoire** : avant de concevoir ou d’adapter, consulter des références reconnues ; noter sources, date, observations réelles et adaptation au projet. Vérifier la pertinence d’une comparaison réutilisée. Signaler les sources inaccessibles, sans inventer leurs résultats. Ne pas copier aveuglément.
- **Explications simples** : parler en français, avec des phrases courtes et des exemples concrets, sans ton infantilisant. Dire d’abord ce qui change, pourquoi et ce que Gassama peut essayer. Expliquer les mots techniques indispensables.
- Reprendre explicitement ces trois exigences dans tout prompt destiné à un autre chat ou agent, même si les fichiers lui sont transmis.

## BP-01 — Uniformité des cartes et de la présentation

**Statut : validé par Gassama le 4 octobre 2026.**
**Origine : règles convenues pendant le projet GECA, puis demande explicite de les conserver pour les prochains sites.**

### Cartes d’une même famille

- Les cartes qui sont au même niveau et ont le même rôle utilisent le même modèle : fond, bordures, disposition, typographie et espacements. Par exemple, « Notre conviction », « Notre implantation » et « Nos capacités » partagent le même style.
- La cohérence doit être particulièrement visible sur mobile, où les cartes se suivent.
- Réutiliser un composant et des styles communs. Une nouvelle carte ou page reprend ces règles ; éviter les corrections isolées qui produisent des différences au fil du temps.
- Une différence entre familles reste possible si leur rôle la justifie. Ne pas imposer une hauteur fixe qui coupe les textes ou gêne leur agrandissement.

### Titres et sous-titres

- Centrer les titres et sous-titres des sections et des cartes.
- À rôle égal, conserver la même police, la même taille, la même graisse, la même couleur et les mêmes espacements.
- Placer l’en-tête principal d’une section sur sa largeur disponible ; placer ses liens d’ensemble en dessous. Dans une carte, centrer les titres dans la carte.
- Préserver la structure du document : un titre principal de page, puis des titres de section et de carte hiérarchisés.

### Paragraphes longs sur mobile

- **Préférence de Gassama** : justifier les paragraphes de lecture qui occupent environ quatre à cinq lignes ou davantage sur mobile. « Justifier » signifie aligner les lignes à gauche et à droite.
- Garder la dernière ligne alignée au début. Déclarer la langue du texte et permettre la césure automatique lorsque le navigateur la prend en charge.
- Les titres et sous-titres restent centrés. Les champs de formulaire, commandes, petits libellés et coordonnées ne sont pas des paragraphes à justifier.
- Vérifier le rendu réel sur petit écran : pas de débordement, texte coupé ou mots excessivement espacés. Si la justification nuit nettement à la lecture, montrer le problème à Gassama et proposer un ajustement avant de modifier cette préférence.
- **Limite à connaître** : la justification n’est pas une recommandation universelle d’accessibilité. Le critère W3C 1.4.8, de niveau AAA, prévoit notamment la possibilité d’un texte non justifié. Ne pas présenter cette préférence comme une garantie de conformité AAA.

### Espaces et interactions

- Utiliser une échelle commune pour les espaces dans les cartes, entre les cartes et entre les sections. Les valeurs peuvent s’adapter à l’écran, mais pas varier sans raison d’une carte sœur à l’autre.
- Conserver les mêmes dimensions, marges et espaces intérieurs au repos, au survol et au focus clavier. Les effets ne doivent pas faire bouger la mise en page.
- Les apparitions au défilement suivent une logique uniforme : même mouvement et même durée pour des blocs comparables, une seule fois par bloc, sans animer simultanément parent et enfant.
- Respecter la préférence de mouvements réduits. Le contenu doit rester lisible si les animations ou JavaScript ne fonctionnent pas.
- Centrer les éléments du pied de page sur mobile, conformément à la présentation convenue avec Gassama.

### Valeurs d’exemple, propres à GECA

GECA utilise un espace intérieur et un écart entre cartes de 20 à 32 px, un écart entre sections de 24 à 48 px et des apparitions de 480 ms avec un déplacement de 12 px. Ce sont des exemples d’application, **pas des valeurs à imposer à tous les futurs sites**.

### Vérifications avant livraison

Comparer les cartes sœurs sur téléphone et ordinateur, au repos et au survol. Vérifier le centrage, les espacements, les textes longs, l’agrandissement à 200 %, l’absence de débordement et l’usage au clavier. Rapporter ce qui a réellement été vérifié.

### Références et observations

Consultées ou vérifiées pendant le travail du 4 octobre 2026 :

- [USWDS — Card](https://designsystem.digital.gov/components/card/) : cartes modulaires appartenant à une collection ; adaptation retenue : cohérence des cartes d’une même famille.
- [W3C — Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) : besoins de lecture et limite de la justification ; préférence de Gassama distinguée de la recommandation AAA.
- [W3C — Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) : possibilité de désactiver les mouvements non essentiels.

## BP-02 — Recherche superposée accessible et respectueuse de la vie privée

**Statut : validé explicitement par Gassama le 4 octobre 2026**, après proposition séparée dans le projet GECA.

### Comportement attendu

- La commande de recherche ouvre un panneau au-dessus de la page, sans changement de page à l’ouverture. Un fond translucide et légèrement flouté permet de reconnaître le contexte.
- Afficher un vrai champ de saisie, avec un nom accessible et un libellé compréhensible. Un texte d’exemple dans le champ ne remplace pas son libellé.
- Donner le focus au champ à l’ouverture. Fermer avec un bouton visible et Échap ; un clic sur le fond peut aussi fermer le panneau. Rendre le focus au bouton qui l’a ouvert.
- Empêcher les clics et la navigation au clavier dans la page derrière le panneau tant qu’il est ouvert. Le contenu du panneau doit rester accessible au clavier, avec un défilement interne si nécessaire.
- Sur mobile, vérifier l’utilisation avec le clavier virtuel, la hauteur réellement disponible, les petits écrans et le texte agrandi. Les commandes de fermeture et d’effacement restent utilisables.

### Suggestions utiles

- Actualiser les résultats pendant la saisie, avec un délai court adapté au moteur. Annuler les requêtes ou calculs devenus inutiles ; ne pas laisser un ancien résultat remplacer une réponse plus récente.
- Tolérer les accents et la casse ; proposer, si pertinent, la recherche par début de mot, quelques synonymes et une tolérance limitée aux fautes. Ne pas annoncer une recherche « intelligente » ou « par IA » sans expliquer ses capacités réelles.
- Présenter une liste courte, ordonnée par pertinence, avec titre, contexte et extrait utile. Éviter de répéter inutilement la même destination.
- Prévoir la saisie vide, l’absence de résultat, le chargement et, si un service distant intervient, ses erreurs. Informer sans bloquer la saisie ni annoncer chaque frappe de manière envahissante.
- Préserver les commandes natives d’édition et les méthodes de saisie avec composition. Tab et Entrée doivent fonctionner ; les flèches peuvent faciliter le parcours.
- Employer la bonne structure accessible : des liens pour naviguer vers des résultats ; un composant de type « combobox » seulement si son comportement de sélection et son clavier sont réellement implémentés. Ne pas ajouter des rôles ARIA uniquement pour leur nom.

### Confidentialité et sécurité

- Indexer uniquement les contenus auxquels le visiteur a droit. Pour un petit site public statique, une recherche locale peut éviter toute transmission de saisie.
- Ne pas stocker ni journaliser les recherches sans besoin défini et information appropriée. Ne pas envoyer la saisie à un service tiers simplement pour obtenir des suggestions.
- Dans un site avec comptes, contrôler les droits côté serveur lors de la recherche et de l’ouverture du résultat. Un filtre dans le navigateur ne protège pas un contenu privé. Tester aussi les comptes différents et droits révoqués.
- Borner la taille des entrées et le travail demandé au moteur. Rendre les saisies comme du texte, sans HTML injecté ni expression régulière non maîtrisée. Construire les destinations depuis des données contrôlées, jamais directement depuis la saisie.

### Vérifications avant livraison

Tester ouverture sans navigation, focus initial, Tab/Entrée/flèches, Échap, fermeture et retour du focus, liens vers la bonne section, absence de résultat, saisie hostile, accents, fautes prévues, petit écran, texte à 200 %, composition et comportement sans JavaScript. Vérifier réellement les requêtes réseau et le stockage selon les engagements du produit. Un contrôle automatique ne remplace pas un essai avec les technologies d’assistance du public visé.

### Références consultées le 4 octobre 2026

- [W3C — Dialog modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) : focus, clavier, fermeture et contexte modal.
- [W3C — Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) : suggestions, sélection et préservation de l’édition du texte.
- [USWDS — Search](https://designsystem.digital.gov/components/search/) : champ identifié et recherche de contenu.
- [MDN — dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) : panneau natif et arrière-plan non interactif avec `showModal()`.

## Journal des validations

| Date | Accord | Modification |
| --- | --- | --- |
| 4 octobre 2026 | Demande explicite de Gassama dans le projet GECA | Création du fichier ; ajout de BP-01 et des règles de mise à jour sur accord préalable. |
| 4 octobre 2026 | Réponse explicite « Oui, l’ajouter au fichier du Bureau » | Ajout de BP-02 sur la recherche superposée, après proposition distincte. |
