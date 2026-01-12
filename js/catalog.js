/**
 * TRAITEMENT DE LA PAGE CATALOGUE
 */

// Je définis mes variables globales pour gérer les filtres et l'affichage
let currentFilter = 'all';
let currentView = 'card';
let searchQuery = '';

/**
 * J'affiche les livres dans le catalogue
 * Gère le filtrage par statut, la recherche et l'affichage selon la vue sélectionnée
 * 
 * @returns {void}
 */
function displayCatalog() {
    // Je récupère tous les livres de la bibliothèque
    const books = getBooks();
    
    // Je sélectionne le conteneur du catalogue
    const container = document.getElementById('catalogContent');
    
    // Je vérifie que le conteneur existe
    if (!container) return;
    
    // Je filtre les livres selon le statut sélectionné
    let filteredBooks = books;
    if (currentFilter !== 'all') {
        filteredBooks = books.filter(book => book.status === currentFilter);
    }
    
    /* Je filtre par recherche si une requête existe
     * La recherche s'effectue sur le titre et l'auteur (insensible à la casse)
     */
    if (searchQuery) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // J'affiche un message si aucun livre ne correspond aux filtres
    if (filteredBooks.length === 0) {
        container.innerHTML = '<p class="text-center text-muted py-5">Aucun livre ne correspond à votre recherche.</p>';
        return;
    }
    
    // J'affiche les livres selon la vue sélectionnée (carte ou liste)
    if (currentView === 'card') {
        container.className = 'row g-3';
        container.innerHTML = filteredBooks.map(book => createBookCard(book)).join('');
    } else {
        container.className = 'list-group';
        container.innerHTML = filteredBooks.map(book => createBookListItem(book)).join('');
    }
}

/**
 * Je crée une carte de livre pour la vue en grille
 * 
 * @param {Object} book - L'objet livre à afficher
 * @param {string} book.id - Identifiant unique du livre
 * @param {string} book.title - Titre du livre
 * @param {string} book.author - Auteur du livre
 * @param {string} book.genre - Genre du livre
 * @param {number} book.pages - Nombre de pages
 * @param {string} book.status - Statut du livre (reading, finished, wishlist)
 * @param {boolean} book.favorite - Indique si le livre est favori
 * @returns {string} Code HTML de la carte du livre
 */
function createBookCard(book) {
    return `
        <div class="col-md-6 col-lg-4" data-id="${book.id}">
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title">${book.title}</h5>
                        ${book.favorite ? '<span class="badge bg-warning text-dark">Favori</span>' : ''}
                    </div>
                    <h6 class="card-subtitle mb-2 text-muted">par ${book.author}</h6>
                    ${book.genre ? `<p class="text-primary small mb-1">${book.genre}</p>` : ''}
                    <p class="text-muted small mb-2">${book.pages || 0} pages</p>
                    <span class="badge bg-secondary">${getStatusIcon(book.status)} ${getStatusText(book.status)}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Je crée un élément de livre pour la vue en liste
 * 
 * @param {Object} book - L'objet livre à afficher
 * @param {string} book.id - Identifiant unique du livre
 * @param {string} book.title - Titre du livre
 * @param {string} book.author - Auteur du livre
 * @param {string} book.genre - Genre du livre
 * @param {number} book.pages - Nombre de pages
 * @param {string} book.status - Statut du livre (reading, finished, wishlist)
 * @param {boolean} book.favorite - Indique si le livre est favori
 * @returns {string} Code HTML de l'élément liste du livre
 */
function createBookListItem(book) {
    return `
        <div class="list-group-item" data-id="${book.id}">
            <div class="d-flex w-100 justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${book.title} ${book.favorite ? '<span class="badge bg-warning text-dark">Favori</span>' : ''}</h5>
                    <p class="mb-1 text-muted small">${book.author} - ${book.genre || 'Non spécifié'} - ${book.pages || 0} pages</p>
                </div>
                <span class="badge bg-secondary">${getStatusIcon(book.status)} ${getStatusText(book.status)}</span>
            </div>
        </div>
    `;
}

/**
 * Je gère le changement de filtre de statut
 * Met à jour la variable currentFilter et rafraîchit l'affichage
 * 
 * @param {Event} event - L'événement déclenché par le changement de filtre
 * @returns {void}
 */
function handleFilterChange(event) {
    // Je stocke le nouveau filtre sélectionné
    currentFilter = event.target.value;
    
    // Je rafraîchis l'affichage du catalogue
    displayCatalog();
}

/**
 * Je gère le changement de vue (carte ou liste)
 * Met à jour les boutons actifs et rafraîchit l'affichage
 * 
 * @param {string} view - Le type de vue ('card' ou 'list')
 * @returns {void}
 */
function handleViewChange(view) {
    // Je stocke la nouvelle vue sélectionnée
    currentView = view;
    
    // Je mets à jour les boutons actifs selon la vue choisie
    document.getElementById('cardViewBtn').classList.toggle('active', view === 'card');
    document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
    
    // Je rafraîchis l'affichage du catalogue
    displayCatalog();
}

/**
 * Je gère la recherche de livres
 * Filtre les livres en temps réel selon la saisie de l'utilisateur
 * 
 * @param {Event} event - L'événement déclenché par la saisie dans le champ de recherche
 * @returns {void}
 */
function handleSearch(event) {
    // Je stocke la requête de recherche
    searchQuery = event.target.value;
    
    // Je rafraîchis l'affichage du catalogue
    displayCatalog();
}

/**
 * J'initialise la page catalogue
 * Configure le conteneur et ajoute tous les écouteurs d'événements nécessaires
 * 
 * @returns {void}
 */
function initCatalogPage() {
    // Je configure l'ID du conteneur du catalogue
    const catalogContent = document.querySelector('.catalog-content');
    if (catalogContent) {
        catalogContent.id = 'catalogContent';
    }
    
    // J'affiche le catalogue initial
    displayCatalog();
    
    // J'ajoute les écouteurs d'événements pour les boutons radio de filtre
    document.querySelectorAll('input[name="statusFilter"]').forEach(radio => {
        radio.addEventListener('change', handleFilterChange);
    });
    
    // J'ajoute les écouteurs pour les boutons de changement de vue
    const cardViewBtn = document.getElementById('cardViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    if (cardViewBtn) cardViewBtn.addEventListener('click', () => handleViewChange('card'));
    if (listViewBtn) listViewBtn.addEventListener('click', () => handleViewChange('list'));
    
    // J'ajoute l'écouteur pour le champ de recherche
    const searchInput = document.getElementById('findBook');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}