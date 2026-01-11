
/* Mise en place de la classe Book avec ses méthodes */

class Book {
    constructor(title, author, pages, genre, status, favorite = false) {
        this.id = generateId();
        this.title = title;
        this.author = author;
        this.pages = pages || 0;
        this.genre = genre || '';
        this.status = status; // 'wishlist', 'reading', 'finished'
        this.favorite = favorite;
        this.dateAdded = new Date().toISOString();
    }
}


/* Les méthodes de la classe Book */

// J'ajoute un nouveau livre
function addBook(bookData) {
    const books = getBooks();
    const newBook = new Book(
        bookData.title,
        bookData.author,
        bookData.pages,
        bookData.genre,
        bookData.status,
        bookData.favorite
    );
    books.push(newBook);
    saveBooks(books);
    return newBook;
}

// Je supprime un livre par son ID
function deleteBook(bookId) {
    const books = getBooks();
    const filteredBooks = books.filter(book => book.id !== bookId);
    saveBooks(filteredBooks);
}

// Je modifie un livre existant
function updateBook(bookId, updatedData) {
    const books = getBooks();
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex !== -1) {
        books[bookIndex] = {
            ...books[bookIndex],
            ...updatedData,
            id: bookId // Je garde le même ID
        };
        saveBooks(books);
        return books[bookIndex];
    }
    return null;
}

// Je récupère un livre par son ID
function getBookById(bookId) {
    const books = getBooks();
    return books.find(book => book.id === bookId);
}