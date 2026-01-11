
/* Traitement de la page d'accueil */

// Je commence par calculer les statistiques de la bibliothèque
function getStatistics() {
    const books = getBooks();
    
    return {
        total: books.length,
        pagesRead: books
            .filter(book => book.status === 'finished')
            .reduce((sum, book) => sum + (parseInt(book.pages) || 0), 0),
        inProgress: books.filter(book => book.status === 'reading').length,
        finished: books.filter(book => book.status === 'finished').length,
        wishlist: books.filter(book => book.status === 'wishlist').length
    };
}

// J'affiche les statistiques sur la page d'accueil
function displayStatistics() {
    const stats = getStatistics();
    
    document.getElementById('totalBooks').textContent = stats.total;
    document.getElementById('pagesRead').textContent = stats.pagesRead;
    document.getElementById('booksInProgress').textContent = stats.inProgress;
    document.getElementById('booksFinished').textContent = stats.finished;
}

// J'affiche les derniers livres ajoutés dans un tableau
function displayRecentBooks() {
    const books = getBooks();
    const recentBooks = books
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        .slice(0, 3);
    
    const tbody = document.getElementById('recentBooksList');
    
    if (recentBooks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Aucun livre dans votre bibliothèque. Commencez par en ajouter un !</td></tr>';
        return;
    }
    
    tbody.innerHTML = recentBooks.map(book => `
        <tr>
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td>${book.genre || '<span class="text-muted">Non spécifié</span>'}</td>
            <td>${book.pages || 0}</td>
            <td>
                <span class="badge bg-secondary">
                    ${getStatusIcon(book.status)} ${getStatusText(book.status)}
                </span>
            </td>
            <td class="text-center">
                ${book.favorite ? '<span class="fs-5"></span>' : '<span class="text-muted">-</span>'}
            </td>
        </tr>
    `).join('');
}

// J'initialise la page d'accueil
function initIndexPage() {
    displayStatistics();
    displayRecentBooks();
}