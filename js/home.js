/**
 TRAITEMENT DE LA PAGE D'ACCUEIL
*/

/**
 * Calcule les statistiques de la bibliothèque
 * 
 * @returns {Object} Objet contenant les statistiques
 * @returns {number} return.total - Nombre total de livres
 * @returns {number} return.pagesRead - Nombre total de pages lues (livres terminés uniquement)
 * @returns {number} return.inProgress - Nombre de livres en cours de lecture
 * @returns {number} return.finished - Nombre de livres terminés
 * @returns {number} return.wishlist - Nombre de livres dans la liste d'envie
 */

function getStatistics() {
    // Récupération de tous les livres de la bibliothèque
    const books = getBooks();
    
    return {
        // Je compte le nombre total de livres
        total: books.length,
        
        // Je filtre les livres terminés puis j'additionne leurs pages avec la méthode reduce
        pagesRead: books
            .filter(book => book.status === 'finished')

            /* La méthode reduce parcourt le tableau et accumule une valeur :
            * - sum : l'accumulateur qui stocke la somme actuelle (commence à 0)
            * - book : le livre en cours de traitement
            * - À chaque itération, j'ajoute les pages du livre à la somme
            * - parseInt convertit les pages en nombre
            * - || 0 garantit 0 si la conversion échoue
            */
            .reduce((sum, book) => sum + (parseInt(book.pages) || 0), 0),
        
        // Je compte les livres en cours de lecture
        inProgress: books.filter(book => book.status === 'reading').length,
        
        // Les livres terminés
        finished: books.filter(book => book.status === 'finished').length,
        
        // Les livres dans la liste d'envie
        wishlist: books.filter(book => book.status === 'wishlist').length
    };
}

/**
 * J'affiche les statistiques de la bibliothèque sur la page d'accueil
 * Met à jour les éléments HTML avec les valeurs calculées
 * 
 * @returns {void}
 */
function displayStatistics() {
    // Récupération des statistiques calculées
    const stats = getStatistics();
    
    // Mise à jour du DOM avec les différentes statistiques
    document.getElementById('totalBooks').textContent = stats.total;
    document.getElementById('pagesRead').textContent = stats.pagesRead;
    document.getElementById('booksInProgress').textContent = stats.inProgress;
    document.getElementById('booksFinished').textContent = stats.finished;
}

/**
 * J'affiche les 3 derniers livres ajoutés dans un tableau HTML
 * Si aucun livre n'existe, j'affiche un message d'invitation
 * 
 * @returns {void}
 */
function displayRecentBooks() {
    // Récupération de tous les livres
    const books = getBooks();
    
    // Tri par date d'ajout (du plus récent au plus ancien) et sélection des 3 premiers livres
    const recentBooks = books
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        .slice(0, 3);
    
    // Sélection du corps du tableau
    const tbody = document.getElementById('recentBooksList');
    
    // Si aucun livre n'existe, j'affiche un message d'invitation
    if (recentBooks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Aucun livre dans votre bibliothèque. Commencez par en ajouter un <a href="collection.html">ici</a></td></tr>';
        return;
    }
    
    // Génération du HTML pour chaque livre et insertion dans le tableau
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
                ${book.favorite ? '<span class="badge bg-warning text-dark">Favori</span>' : '<span class="text-muted">-</span>'}
            </td>
        </tr>
    `).join('');
}

/**
 * Initialise la page d'accueil
 * Lance l'affichage des statistiques et des derniers livres ajoutés
 * 
 * @returns {void}
 */
function initIndexPage() {
    // Affichage des statistiques globales
    displayStatistics();
    
    // Affichage des 3 derniers livres ajoutés
    displayRecentBooks();
}