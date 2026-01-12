/**
 * CLASSE BOOK ET SES MÉTHODES DE GESTION
 */

/**
 * Classe représentant un livre dans la bibliothèque
 */
class Book {
    /**
     * Je crée un nouveau livre avec toutes ses propriétés
     * 
     * @param {string} title - Titre du livre
     * @param {string} author - Auteur du livre
     * @param {number} pages - Nombre de pages
     * @param {string} genre - Genre du livre
     * @param {string} status - Statut du livre (wishlist, reading, finished)
     * @param {boolean} favorite - Indique si le livre est favori (défaut: false)
     */
    constructor(title, author, pages, genre, status, favorite = false) {
        // Je génère un ID unique pour le livre
        this.id = generateId();
        
        // Je stocke le titre du livre
        this.title = title;
        
        // Je stocke l'auteur du livre
        this.author = author;
        
        // Je stocke le nombre de pages (0 si non renseigné)
        this.pages = pages || 0;
        
        // Je stocke le genre (chaîne vide si non renseigné)
        this.genre = genre || '';
        
        // Je stocke le statut du livre (wishlist, reading, finished)
        this.status = status;
        
        // Je stocke si le livre est favori
        this.favorite = favorite;
        
        // Je stocke la date d'ajout au format ISO
        this.dateAdded = new Date().toISOString();
    }
}

/**
 * J'ajoute un nouveau livre à la bibliothèque
 * Crée une instance de Book, l'ajoute au tableau et sauvegarde
 * 
 * @param {Object} bookData - Les données du livre à ajouter
 * @param {string} bookData.title - Titre du livre
 * @param {string} bookData.author - Auteur du livre
 * @param {number} bookData.pages - Nombre de pages
 * @param {string} bookData.genre - Genre du livre
 * @param {string} bookData.status - Statut du livre
 * @param {boolean} bookData.favorite - Si le livre est favori
 * @returns {Book} Le nouveau livre créé
 */
function addBook(bookData) {
    // Je récupère tous les livres existants
    const books = getBooks();
    
    // Je crée une nouvelle instance de Book avec les données fournies
    const newBook = new Book(
        bookData.title,
        bookData.author,
        bookData.pages,
        bookData.genre,
        bookData.status,
        bookData.favorite
    );
    
    // J'ajoute le nouveau livre au tableau
    books.push(newBook);
    
    // Je sauvegarde la bibliothèque mise à jour
    saveBooks(books);
    
    // Je retourne le livre créé
    return newBook;
}

/**
 * Je supprime un livre de la bibliothèque par son ID
 * 
 * @param {string} bookId - L'ID du livre à supprimer
 * @returns {void}
 */
function deleteBook(bookId) {
    // Je récupère tous les livres existants
    const books = getBooks();
    
    // Je filtre le tableau pour exclure le livre avec l'ID spécifié
    const filteredBooks = books.filter(book => book.id !== bookId);
    
    // Je sauvegarde la bibliothèque sans le livre supprimé
    saveBooks(filteredBooks);
}

/**
 * Je modifie un livre existant dans la bibliothèque
 * Utilise le spread operator pour fusionner les anciennes et nouvelles données
 * 
 * @param {string} bookId - L'ID du livre à modifier
 * @param {Object} updatedData - Les nouvelles données du livre
 * @returns {Book|null} Le livre modifié ou null si non trouvé
 */
function updateBook(bookId, updatedData) {
    // Je récupère tous les livres existants
    const books = getBooks();
    
    // Je recherche l'index du livre à modifier
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    // Si le livre existe, je le modifie
    if (bookIndex !== -1) {
        /* Je fusionne les anciennes données avec les nouvelles
         * - ...books[bookIndex] : je garde toutes les propriétés existantes
         * - ...updatedData : j'écrase avec les nouvelles données
         * - id: bookId : je m'assure de garder le même ID
         */
        books[bookIndex] = {
            ...books[bookIndex],
            ...updatedData,
            id: bookId
        };
        
        // Je sauvegarde la bibliothèque mise à jour
        saveBooks(books);
        
        // Je retourne le livre modifié
        return books[bookIndex];
    }
    
    // Je retourne null si le livre n'a pas été trouvé
    return null;
}

/**
 * Je récupère un livre spécifique par son ID
 * 
 * @param {string} bookId - L'ID du livre à rechercher
 * @returns {Book|undefined} Le livre trouvé ou undefined si non trouvé
 */
function getBookById(bookId) {
    // Je récupère tous les livres existants
    const books = getBooks();
    
    // Je recherche et retourne le livre avec l'ID correspondant
    return books.find(book => book.id === bookId);
}