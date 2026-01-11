# Ma Bibliothèque

Application web de gestion de collection de livres personnelle. Simple, intuitive et fonctionnelle.

**Site en ligne :** [https://smaachaoui.github.io/ma-bibliotheque/](https://smaachaoui.github.io/ma-bibliotheque/)

## Description

J'ai développé une application web permettant de gérer sa bibliothèque personnelle. L'application fonctionne entièrement dans le navigateur sans serveur ni base de données externe. Les données sont stockées localement via le localStorage.

## Fonctionnalités

**Gestion des livres**
- Ajouter un livre avec titre, auteur, pages, genre et statut
- Modifier les informations d'un livre
- Supprimer un livre
- Marquer des livres comme favoris

**Organisation et recherche**
- Filtrer les livres par statut : à lire, en cours, terminé
- Rechercher par titre ou auteur
- Afficher en mode cartes ou liste
- Tableau de bord avec statistiques

**Informations par livre**
- Titre et auteur (obligatoires)
- Nombre de pages et genre (optionnels)
- Statut de lecture (obligatoire)
- Marquage favori (optionnel)
- Date d'ajout automatique

## Installation

**Utiliser le site en ligne**

Accéder directement au site : [https://smaachaoui.github.io/ma-bibliotheque/](https://smaachaoui.github.io/ma-bibliotheque/)

**Installation en local**

1. Cloner ou télécharger le projet
2. Lancer un serveur local dans le dossier :
   ```bash
   python3 -m http.server 8000
   ```
3. Ouvrir dans le navigateur : `http://localhost:8000`

Note : L'application ne fonctionne pas correctement avec le protocole `file://`. Un serveur local ou un hébergement web est nécessaire pour le bon fonctionnement du localStorage.

## Utilisation

**Ajouter un livre**
Page Collection → Bouton "Ajouter un livre" → Remplir le formulaire → Enregistrer

**Consulter sa collection**
Page Catalogue → Utiliser les filtres et la recherche → Choisir le mode d'affichage

**Voir les statistiques**
Page Accueil → Consulter les cartes de statistiques et le tableau des derniers livres ajoutés

## Structure du projet

```
ma-bibliotheque/
├── index.html          # Page d'accueil
├── catalog.html        # Page catalogue
├── collection.html     # Page gestion
├── style/             # Styles CSS
│   └── style.css      # Styles personnalisés
└── js/                # Scripts JavaScript
    ├── storage.js     # Gestion localStorage
    ├── book.js        # Classe Book et CRUD
    ├── utils.js       # Fonctions utilitaires
    ├── home.js        # Logique page d'accueil
    ├── catalog.js     # Logique page catalogue
    ├── collection.js  # Logique page collection
    └── app.js         # Initialisation
```

## Technologies

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 5.3.2 (via CDN)
- localStorage pour la persistance

## Points importants

**Stockage des données**
- Les données sont stockées localement dans le navigateur
- Elles ne sont pas partagées entre navigateurs ou appareils
- Elles restent même après fermeture du navigateur
- Elles sont supprimées si le cache est vidé

**Compatibilité**
- Fonctionne sur tous les navigateurs modernes
- Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- Nécessite un serveur local ou un hébergement web

## Déploiement

L'application est actuellement déployée sur GitHub Pages : [https://smaachaoui.github.io/ma-bibliotheque/](https://smaachaoui.github.io/ma-bibliotheque/)

Autres options d'hébergement possibles :
- Netlify
- Vercel
- Tout hébergement web statique

## Évolutions futures

- Export/import des données
- Mode sombre
- Couvertures de livres
- Notes personnelles
- Statistiques avancées

## Auteur

Développé par Seifeddine Maachaoui

## Licence

© 2026 - 2027 | Ma Bibliothèque | Tous droits réservés.