
/* Traitement du stockage des données avec localStorage */

// Je récupère tous les livres depuis le localStorage
function getBooks() {
    const books = localStorage.getItem('myLibrary');
    return books ? JSON.parse(books) : [];
}

// Je sauvegarde les livres dans le localStorage
function saveBooks(books) {
    localStorage.setItem('myLibrary', JSON.stringify(books));
}

// Je génère un ID unique pour chaque livre
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}