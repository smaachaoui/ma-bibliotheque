/**
 * TRAITEMENT DE LA PAGE COLLECTION
 */

// Je stocke l'ID du livre en cours de modification (null si ajout d'un nouveau livre)
let editingBookId = null;

/**
 * J'affiche tous les livres de la collection
 * Si la collection est vide, j'affiche un message d'invitation
 * 
 * @returns {void}
 */
function displayCollection() {
    // Je récupère tous les livres de la bibliothèque
    const books = getBooks();
    
    // Je sélectionne le conteneur d'affichage
    const container = document.getElementById('booksDisplay');
    
    // Je vérifie que le conteneur existe
    if (!container) return;
    
    // J'affiche un message si la collection est vide
    if (books.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-center text-muted py-5">Votre collection est vide.<br> Ajoutez votre premier livre !</p></div>';
        return;
    }
    
    // Je génère et j'affiche les cartes pour chaque livre
    container.innerHTML = books.map(book => createCollectionBookCard(book)).join('');
    
    // J'attache les écouteurs d'événements pour les actions (modifier, supprimer)
    attachBookActions();
}

/**
 * Je crée une carte de livre pour la collection avec les boutons d'action
 * 
 * @param {Object} book - L'objet livre à afficher
 * @param {string} book.id - Identifiant unique du livre
 * @param {string} book.title - Titre du livre
 * @param {string} book.author - Auteur du livre
 * @param {string} book.genre - Genre du livre
 * @param {number} book.pages - Nombre de pages
 * @param {string} book.status - Statut du livre (reading, finished, wishlist)
 * @param {boolean} book.favorite - Indique si le livre est favori
 * @returns {string} Code HTML de la carte du livre avec boutons d'action
 */
function createCollectionBookCard(book) {
    return `
        <div class="col-md-6 col-lg-4" data-id="${book.id}">
            <div class="card h-100 shadow">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title">${book.title}</h5>
                        ${book.favorite ? '<span class="badge bg-warning text-dark">Favori</span>' : ''}
                    </div>
                    <h6 class="card-subtitle mb-2 text-muted">par ${book.author}</h6>
                    ${book.genre ? `<p class="text-primary small mb-1">Genre: ${book.genre}</p>` : ''}
                    <p class="text-muted small mb-2">${book.pages || 0} pages</p>
                    <div class="mb-3">
                        <span class="badge bg-${getStatusColor(book.status)}">
                            ${getStatusIcon(book.status)} ${getStatusText(book.status)}
                        </span>
                    </div>
                </div>
                <div class="card-footer bg-transparent border-top">
                    <div class="d-grid gap-2">
                        <button class="btn btn-sm btn-outline-primary btn-edit" data-id="${book.id}">
                            Modifier
                        </button>
                        <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${book.id}">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * J'attache les événements aux boutons d'action de chaque livre
 * Configure les écouteurs pour la modification et la suppression
 * 
 * @returns {void}
 */
function attachBookActions() {
    // J'attache les écouteurs d'événements aux boutons de modification
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', handleEditBook);
    });
    
    // J'attache les écouteurs d'événements aux boutons de suppression
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', handleDeleteBook);
    });
}

/**
 * J'ouvre la modal du formulaire de livre
 * En mode modification, je pré-remplis le formulaire avec les données du livre
 * En mode ajout, je réinitialise le formulaire
 * 
 * @param {string|null} bookId - L'ID du livre à modifier (null pour un nouveau livre)
 * @returns {void}
 */
function openBookForm(bookId = null) {
    // J'initialise la modal Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('bookFormModal'));
    const form = document.getElementById('bookForm');
    const formTitle = document.getElementById('formTitle');
    
    // Je stocke l'ID du livre en cours d'édition
    editingBookId = bookId;
    
    if (bookId) {
        // Mode modification : je remplis le formulaire avec les données du livre
        const book = getBookById(bookId);
        formTitle.textContent = 'Modifier le livre';
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookPages').value = book.pages;
        document.getElementById('bookGenre').value = book.genre;
        document.getElementById('bookStatus').value = book.status;
        document.getElementById('bookFavorite').checked = book.favorite;
        document.getElementById('bookId').value = book.id;
    } else {
        // Mode ajout : je réinitialise le formulaire pour un nouveau livre
        formTitle.textContent = 'Ajouter un livre';
        form.reset();
        document.getElementById('bookId').value = '';
    }
    
    // J'affiche la modal
    modal.show();
}

/**
 * Je ferme la modal du formulaire de livre
 * Réinitialise l'ID du livre en cours d'édition
 * 
 * @returns {void}
 */
function closeBookForm() {
    // Je récupère l'instance de la modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookFormModal'));
    
    // Je ferme la modal si elle existe
    if (modal) {
        modal.hide();
    }
    
    // Je réinitialise l'ID du livre en cours d'édition
    editingBookId = null;
}

/**
 * Je gère la soumission du formulaire de livre
 * Selon le mode, j'ajoute un nouveau livre ou je modifie un livre existant
 * 
 * @param {Event} event - L'événement de soumission du formulaire
 * @returns {void}
 */
function handleFormSubmit(event) {
    // J'empêche le rechargement de la page
    event.preventDefault();
    
    // Je récupère les données du formulaire dans un objet
    const formData = {
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        pages: parseInt(document.getElementById('bookPages').value) || 0,
        genre: document.getElementById('bookGenre').value,
        status: document.getElementById('bookStatus').value,
        favorite: document.getElementById('bookFavorite').checked
    };
    
    if (editingBookId) {
        // Mode modification : je mets à jour le livre existant
        updateBook(editingBookId, formData);
    } else {
        // Mode ajout : je crée un nouveau livre
        addBook(formData);
    }
    
    // Je ferme la modal
    closeBookForm();
    
    // Je rafraîchis l'affichage de la collection
    displayCollection();
}

/**
 * Je gère le clic sur le bouton "Modifier" d'un livre
 * Ouvre la modal de modification avec les données du livre
 * 
 * @param {Event} event - L'événement de clic sur le bouton
 * @returns {void}
 */
function handleEditBook(event) {
    // Je récupère l'ID du livre depuis l'attribut data-id du bouton
    const bookId = event.target.dataset.id;
    
    // J'ouvre le formulaire en mode modification
    openBookForm(bookId);
}

/**
 * Je gère le clic sur le bouton "Supprimer" d'un livre
 * Demande confirmation puis supprime le livre de la collection
 * 
 * @param {Event} event - L'événement de clic sur le bouton
 * @returns {void}
 */
function handleDeleteBook(event) {
    // Je récupère l'ID du livre depuis l'attribut data-id du bouton
    const bookId = event.target.dataset.id;
    
    // Je récupère les données du livre pour afficher son titre
    const book = getBookById(bookId);
    
    // Je demande confirmation avant la suppression
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${book.title}" ?`)) {
        // Je supprime le livre de la bibliothèque
        deleteBook(bookId);
        
        // Je rafraîchis l'affichage de la collection
        displayCollection();
    }
}

/**
 * J'initialise la page collection
 * Configure tous les écouteurs d'événements nécessaires
 * 
 * @returns {void}
 */
function initCollectionPage() {
    // J'affiche la collection initiale
    displayCollection();
    
    // Je configure le bouton d'ajout pour ouvrir la modal
    const addBtn = document.getElementById('addBookBtn');
    if (addBtn) {
        // Je retire les attributs Bootstrap pour gérer manuellement l'ouverture
        addBtn.removeAttribute('data-bs-toggle');
        addBtn.removeAttribute('data-bs-target');
        
        // J'attache l'écouteur pour ouvrir le formulaire en mode ajout
        addBtn.addEventListener('click', () => openBookForm());
    }
    
    // J'attache l'écouteur pour la soumission du formulaire
    const form = document.getElementById('bookForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // J'attache l'écouteur pour le bouton "Annuler"
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeBookForm);
    }
}