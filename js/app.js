/**
 * SCRIPT PRINCIPAL DE L'APPLICATION
 */

/**
 * Je détecte la page actuelle et j'initialise les fonctions appropriées
 * S'exécute une fois que le DOM est complètement chargé
 */
document.addEventListener('DOMContentLoaded', () => {
    /* Je récupère le nom de la page actuelle :
     * - window.location.pathname : le chemin complet de l'URL
     * - .split('/').pop() : je récupère uniquement le nom du fichier
     * Exemple : "/mon-site/index.html" devient "index.html"
     */
    const currentPage = window.location.pathname.split('/').pop();
    
    /* Je détermine quelle fonction d'initialisation appeler selon la page :
     * - index.html ou page vide (racine) : page d'accueil
     * - catalog.html : page catalogue
     * - collection.html : page collection
     */
    switch(currentPage) {
        case 'index.html':
        case '':
            // J'initialise la page d'accueil
            initIndexPage();
            break;
            
        case 'catalog.html':
            // J'initialise la page catalogue
            initCatalogPage();
            break;
            
        case 'collection.html':
            // J'initialise la page collection
            initCollectionPage();
            break;
    }
});