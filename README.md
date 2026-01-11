# Ma Bibliothèque

Application web de gestion de collection de livres personnelle avec sauvegarde locale dans le navigateur.

## Description du projet

J'ai développé une application web qui permet de gérer sa collection personnelle de livres. L'application fonctionne entièrement dans le navigateur, sans avoir besoin d'un serveur ou d'une base de données externe. Toutes les données sont stockées localement sur votre ordinateur via le localStorage du navigateur.

## Ce que j'ai construit

### Les trois pages principales

**Page d'accueil (index.html)**
J'ai créé une page d'accueil qui affiche un tableau de bord avec quatre statistiques principales : le nombre total de livres, le nombre de pages lues, le nombre de livres en cours de lecture, et le nombre de livres terminés. En dessous, j'ai ajouté un tableau qui montre les trois derniers livres ajoutés à la collection.

**Page Catalogue (catalog.html)**
J'ai conçu une page catalogue qui permet de consulter tous les livres. J'ai mis en place un système de filtres pour trier les livres par statut (à lire, en cours, terminé), une barre de recherche pour trouver un livre par son titre ou son auteur, et deux modes d'affichage : en cartes ou en liste.

**Page Collection (collection.html)**
J'ai développé une page de gestion où je peux ajouter de nouveaux livres, modifier les informations d'un livre existant, ou supprimer un livre. J'ai utilisé un formulaire modal (fenêtre pop-up) pour l'ajout et la modification des livres.

### Les informations stockées pour chaque livre

Pour chaque livre, je stocke les informations suivantes :
- Le titre (obligatoire)
- L'auteur (obligatoire)
- Le nombre de pages (optionnel)
- Le genre littéraire (optionnel)
- Le statut de lecture : à lire, en cours, ou terminé (obligatoire)
- Un marquage favori (optionnel)
- La date d'ajout (automatique)

## Installation et utilisation

### Installation

J'ai conçu cette application pour qu'elle soit très simple à installer :

1. Je télécharge tous les fichiers du projet
2. Je conserve la structure des dossiers telle quelle
3. J'ouvre le fichier index.html dans mon navigateur web

C'est tout. Je n'ai besoin d'installer aucun logiciel supplémentaire, aucun serveur, aucune base de données. L'application fonctionne directement dans le navigateur.

### Utilisation pas à pas

**Ajouter mon premier livre**

1. J'ouvre la page "Mes collections" via le menu de navigation
2. Je clique sur le bouton "Ajouter un livre"
3. Je remplis le formulaire qui apparaît :
   - Je saisis le titre du livre
   - Je saisis le nom de l'auteur
   - J'indique le nombre de pages si je le souhaite
   - Je précise le genre si je le souhaite
   - Je choisis le statut : à lire, en cours, ou terminé
   - Je peux cocher "Favori" si je veux marquer ce livre
4. Je clique sur "Enregistrer"

Le livre apparaît immédiatement dans ma collection.

**Modifier un livre**

1. Je vais sur la page "Mes collections"
2. Je trouve le livre que je veux modifier
3. Je clique sur le bouton "Modifier"
4. Je change les informations que je souhaite
5. Je clique sur "Enregistrer"

**Supprimer un livre**

1. Je vais sur la page "Mes collections"
2. Je trouve le livre que je veux supprimer
3. Je clique sur le bouton "Supprimer"
4. Je confirme la suppression

**Rechercher un livre**

1. Je vais sur la page "Catalogue"
2. J'utilise la barre de recherche en haut
3. Je tape le titre ou l'auteur du livre
4. La liste se filtre automatiquement pendant que je tape

**Filtrer par statut**

1. Je vais sur la page "Catalogue"
2. Dans la barre latérale à gauche, je sélectionne un statut :
   - Tous : affiche tous les livres
   - À lire : affiche uniquement les livres que je n'ai pas encore commencés
   - En cours : affiche uniquement les livres que je suis en train de lire
   - Terminé : affiche uniquement les livres que j'ai finis
3. La liste se met à jour instantanément

**Changer le mode d'affichage**

1. Je vais sur la page "Catalogue"
2. Dans la barre latérale, je choisis :
   - "Cartes" pour un affichage en grille avec des cartes visuelles
   - "Liste" pour un affichage compact en liste
3. L'affichage change immédiatement

## Stockage des données

J'ai choisi d'utiliser le localStorage du navigateur pour stocker les données. Voici ce que cela signifie concrètement :

**Avantages**
- Les données restent sur votre ordinateur, elles ne sont jamais envoyées sur internet
- Les données persistent même si je ferme le navigateur
- Je n'ai pas besoin de créer un compte utilisateur
- L'application fonctionne sans connexion internet

**Limitations**
- Les données sont liées au navigateur : si je change de navigateur ou d'ordinateur, je ne retrouve pas mes données
- Si je vide le cache du navigateur, je perds mes données
- La capacité de stockage est limitée (environ 5-10 Mo, ce qui permet de stocker des milliers de livres)

**Conseil important**
Je recommande d'exporter régulièrement mes données si je ne veux pas les perdre. Pour l'instant, j'ai prévu d'ajouter une fonctionnalité d'export/import dans une future version.

## Architecture technique

### Structure des fichiers

Voici comment j'ai organisé le projet :

```
ma-bibliotheque/
├── index.html              # Page d'accueil avec statistiques et tableau
├── catalog.html            # Page catalogue avec filtres et recherche
├── collection.html         # Page de gestion avec formulaire CRUD
├── style.css              # Styles CSS personnalisés
├── js/                    # Dossier contenant tous les scripts JavaScript
│   ├── storage.js         # Gestion du localStorage
│   ├── book.js            # Classe Book et opérations CRUD
│   ├── utils.js           # Fonctions utilitaires
│   ├── index-page.js      # Logique spécifique à la page d'accueil
│   ├── catalog-page.js    # Logique spécifique à la page catalogue
│   ├── collection-page.js # Logique spécifique à la page collection
│   └── app.js             # Point d'entrée et initialisation
└── README.md              # Ce fichier de documentation
```

### Technologies utilisées

**HTML5**
J'ai utilisé HTML5 pour la structure des pages. J'ai notamment utilisé les balises sémantiques modernes et la balise table avec thead, tbody et tfoot pour le tableau de la page d'accueil.

**Bootstrap 5.3.2**
J'ai intégré Bootstrap via CDN pour gérer tout le design et les composants de l'interface. Cela inclut :
- Le système de grille responsive
- Les composants navbar, card, modal, table, buttons
- Les utilitaires de mise en page et d'espacement
- Le système de thème avec les couleurs prédéfinies

**CSS3 personnalisé**
J'ai ajouté un fichier style.css minimal qui contient uniquement quelques styles personnalisés :
- Les transitions au survol des cartes
- Les animations de fondu pour les éléments dynamiques
- Quelques ajustements visuels spécifiques

**JavaScript ES6+**
J'ai écrit tout le JavaScript en utilisant les fonctionnalités modernes :
- Les classes ES6 pour la structure du livre
- Les fonctions fléchées
- Le destructuring
- Les template literals pour générer le HTML dynamique
- L'API localStorage pour la persistance des données
- L'API Bootstrap Modal pour les fenêtres modales

### Architecture JavaScript modulaire

J'ai volontairement séparé le code JavaScript en plusieurs fichiers pour une meilleure organisation et maintenance :

**storage.js**
Je gère ici toute la communication avec le localStorage. J'ai créé trois fonctions principales :
- getBooks() : récupère tous les livres stockés
- saveBooks() : enregistre les livres dans le localStorage
- generateId() : génère un identifiant unique pour chaque livre

**book.js**
Je définis la classe Book et toutes les opérations CRUD (Create, Read, Update, Delete) :
- La classe Book qui structure les données d'un livre
- addBook() : ajoute un nouveau livre
- deleteBook() : supprime un livre par son ID
- updateBook() : modifie un livre existant
- getBookById() : récupère un livre spécifique

**utils.js**
Je regroupe les fonctions utilitaires réutilisables :
- getStatusIcon() : retourne l'emoji correspondant à un statut
- getStatusText() : retourne le texte en français d'un statut
- getStatusColor() : retourne la classe de couleur Bootstrap pour un statut

**index-page.js**
Je gère toute la logique spécifique à la page d'accueil :
- getStatistics() : calcule les statistiques de la bibliothèque
- displayStatistics() : affiche les statistiques dans les cartes
- displayRecentBooks() : génère le tableau des derniers livres
- initIndexPage() : initialise la page

**catalog-page.js**
Je gère toute la logique du catalogue :
- displayCatalog() : affiche les livres filtrés
- createBookCard() : génère une carte de livre
- createBookListItem() : génère un élément de liste
- handleFilterChange() : gère les changements de filtre
- handleViewChange() : gère le changement de vue
- handleSearch() : gère la recherche
- initCatalogPage() : initialise la page

**collection-page.js**
Je gère toute la logique de la collection et du formulaire :
- displayCollection() : affiche tous les livres de la collection
- createCollectionBookCard() : génère une carte avec boutons d'action
- openBookForm() : ouvre le modal de formulaire
- closeBookForm() : ferme le modal
- handleFormSubmit() : traite la soumission du formulaire
- handleEditBook() : ouvre le formulaire en mode édition
- handleDeleteBook() : supprime un livre après confirmation
- initCollectionPage() : initialise la page

**app.js**
Je gère l'initialisation globale de l'application :
- Détecte quelle page est chargée
- Appelle la fonction d'initialisation correspondante

### Ordre de chargement des scripts

J'ai défini un ordre précis de chargement des scripts dans chaque page HTML :

1. Bootstrap JS (pour les composants interactifs)
2. storage.js (doit être chargé en premier car les autres en dépendent)
3. book.js (dépend de storage.js)
4. utils.js (fonctions utilitaires indépendantes)
5. [page]-page.js (dépend de tous les précédents)
6. app.js (initialise l'application, doit être chargé en dernier)

Cet ordre est crucial pour éviter les erreurs de fonctions non définies.

### Responsive design

J'ai conçu l'application pour qu'elle s'adapte à toutes les tailles d'écran grâce au système de grille Bootstrap :
- Sur mobile (< 768px) : affichage en une colonne, navbar rétractable
- Sur tablette (768px - 1024px) : affichage en deux colonnes
- Sur desktop (> 1024px) : affichage en trois ou quatre colonnes selon les sections

## Évolutions futures possibles

Voici les fonctionnalités que j'envisage d'ajouter :
- Export/import des données en JSON
- Ajout de notes personnelles pour chaque livre
- Système de notation par étoiles
- Statistiques avancées (livres par genre, par année, etc.)
- Mode sombre
- Ajout de couvertures de livres
- Connexion à une API externe pour récupérer automatiquement les informations d'un livre

## Support et compatibilité

L'application fonctionne sur tous les navigateurs modernes qui supportent :
- localStorage
- ES6 JavaScript
- Bootstrap 5

J'ai testé sur :
- Google Chrome (version 90+)
- Mozilla Firefox (version 88+)
- Microsoft Edge (version 90+)
- Safari (version 14+)

## Licence

© 2026 - 2027 | Ma Bibliothèque | Tous droits réservés.
Développé par Seifeddine Maachaoui