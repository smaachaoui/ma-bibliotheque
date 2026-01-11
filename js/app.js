
/* Le script JS principal */

// Je détecte la page actuelle et j'initialise les fonctions appropriées
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initIndexPage();
            break;
        case 'catalog.html':
            initCatalogPage();
            break;
        case 'collection.html':
            initCollectionPage();
            break;
    }
});