/* Traitement de la page collection */

let editingBookId = null;

// J'affiche tous les livres de la collection
function displayCollection() {
    const books = getBooks();
    const container = document.getElementById('booksDisplay');
    
    if (!container) return;
    
    if (books.length === 0) {
        container.innerHTML = '<div class="col-12"><p class="text-center text-muted py-5">Votre collection est vide. Ajoutez votre premier livre !</p></div>';
        return;
    }
    
    container.innerHTML = books.map(book => createCollectionBookCard(book)).join('');
    
    // J'ajoute les écouteurs pour les actions sur chaque livre
    attachBookActions();
}

// Je crée une carte de livre pour la collection
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

// J'attache les événements aux boutons d'action
function attachBookActions() {
    // Je gère les boutons de modification
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', handleEditBook);
    });
    
    // Je gère les boutons de suppression
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', handleDeleteBook);
    });
}

// J'ouvre la modal du formulaire
function openBookForm(bookId = null) {
    const modal = new bootstrap.Modal(document.getElementById('bookFormModal'));
    const form = document.getElementById('bookForm');
    const formTitle = document.getElementById('formTitle');
    
    editingBookId = bookId;
    
    if (bookId) {
        // Je remplis le formulaire avec les données du livre à modifier
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
        // Je réinitialise le formulaire pour un nouveau livre
        formTitle.textContent = 'Ajouter un livre';
        form.reset();
        document.getElementById('bookId').value = '';
    }
    
    modal.show();
}

// Je ferme la modal du formulaire
function closeBookForm() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookFormModal'));
    if (modal) {
        modal.hide();
    }
    editingBookId = null;
}

// Je gère la soumission du formulaire
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        pages: parseInt(document.getElementById('bookPages').value) || 0,
        genre: document.getElementById('bookGenre').value,
        status: document.getElementById('bookStatus').value,
        favorite: document.getElementById('bookFavorite').checked
    };
    
    if (editingBookId) {
        // Je modifie le livre existant
        updateBook(editingBookId, formData);
    } else {
        // J'ajoute un nouveau livre
        addBook(formData);
    }
    
    closeBookForm();
    displayCollection();
}

// Je gère la modification d'un livre
function handleEditBook(event) {
    const bookId = event.target.dataset.id;
    openBookForm(bookId);
}

// Je gère la suppression d'un livre
function handleDeleteBook(event) {
    const bookId = event.target.dataset.id;
    const book = getBookById(bookId);
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${book.title}" ?`)) {
        deleteBook(bookId);
        displayCollection();
    }
}

// J'initialise la page collection
function initCollectionPage() {
    displayCollection();
    
    // J'ajoute l'écouteur d'évenement pour le bouton d'ajout (qui ouvre la modal vide)
    const addBtn = document.getElementById('addBookBtn');
    if (addBtn) {
        // Je retire l'attribut data-bs-toggle pour gérer manuellement
        addBtn.removeAttribute('data-bs-toggle');
        addBtn.removeAttribute('data-bs-target');
        addBtn.addEventListener('click', () => openBookForm());
    }
    
    // J'ajoute l'écouteur d'évenement pour le formulaire
    const form = document.getElementById('bookForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // J'ajoute l'écouteur pour le bouton annuler
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeBookForm);
    }
}