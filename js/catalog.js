
/* Traitement de la page catalogue */

// Je commence par définir mes variables
let currentFilter = 'all';
let currentView = 'card';
let searchQuery = '';

// J'affiche les livres dans le catalogue
function displayCatalog() {
    const books = getBooks();
    const container = document.getElementById('catalogContent');
    
    if (!container) return;
    
    // Je filtre les livres selon le statut sélectionné
    let filteredBooks = books;
    if (currentFilter !== 'all') {
        filteredBooks = books.filter(book => book.status === currentFilter);
    }
    
    // Je filtre par recherche si une requête existe
    if (searchQuery) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // J'affiche un message si aucun livre ne correspond
    if (filteredBooks.length === 0) {
        container.innerHTML = '<p class="text-center text-muted py-5">Aucun livre ne correspond à votre recherche.</p>';
        return;
    }
    
    // J'affiche les livres selon la vue sélectionnée
    if (currentView === 'card') {
        container.className = 'row g-3';
        container.innerHTML = filteredBooks.map(book => createBookCard(book)).join('');
    } else {
        container.className = 'list-group';
        container.innerHTML = filteredBooks.map(book => createBookListItem(book)).join('');
    }
}

// Je crée une carte de livre 
function createBookCard(book) {
    return `
        <div class="col-md-6 col-lg-4" data-id="${book.id}">
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title">${book.title}</h5>
                        ${book.favorite ? '<span class="fs-4"></span>' : ''}
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

// Je crée un élément de livre 
function createBookListItem(book) {
    return `
        <div class="list-group-item" data-id="${book.id}">
            <div class="d-flex w-100 justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${book.title} ${book.favorite ? '' : ''}</h5>
                    <p class="mb-1 text-muted small">${book.author} - ${book.genre || 'Non spécifié'} - ${book.pages || 0} pages</p>
                </div>
                <span class="badge bg-secondary">${getStatusIcon(book.status)} ${getStatusText(book.status)}</span>
            </div>
        </div>
    `;
}

// Je gère le changement de filtre
function handleFilterChange(event) {
    currentFilter = event.target.value;
    displayCatalog();
}

// Je gère le changement de vue
function handleViewChange(view) {
    currentView = view;
    
    // Je mets à jour les boutons actifs
    document.getElementById('cardViewBtn').classList.toggle('active', view === 'card');
    document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
    
    displayCatalog();
}

// Je gère la recherche
function handleSearch(event) {
    searchQuery = event.target.value;
    displayCatalog();
}

// J'initialise la page catalogue
function initCatalogPage() {
    const catalogContent = document.querySelector('.catalog-content');
    if (catalogContent) {
        catalogContent.id = 'catalogContent';
    }
    
    displayCatalog();
    
    // J'ajoute les écouteurs d'événements pour les filtres
    document.querySelectorAll('input[name="statusFilter"]').forEach(radio => {
        radio.addEventListener('change', handleFilterChange);
    });
    
    // J'ajoute les écouteurs pour les boutons de vue
    const cardViewBtn = document.getElementById('cardViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    if (cardViewBtn) cardViewBtn.addEventListener('click', () => handleViewChange('card'));
    if (listViewBtn) listViewBtn.addEventListener('click', () => handleViewChange('list'));
    
    // J'ajoute l'écouteur pour la recherche
    const searchInput = document.getElementById('findBook');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}