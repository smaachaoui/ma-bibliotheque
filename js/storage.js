/**
 * TRAITEMENT DU STOCKAGE DES DONNÉES AVEC LOCALSTORAGE
 */

/**
 * Je récupère tous les livres depuis le localStorage
 * Si aucune donnée n'existe, je retourne un tableau vide
 * 
 * @returns {Array} Tableau contenant tous les livres de la bibliothèque
 */
function getBooks() {
    // Je récupère les données stockées dans le localStorage sous la clé 'myLibrary'
    const books = localStorage.getItem('myLibrary');
    
    /* Je vérifie si des données existent :
     * - Si oui : je les convertis de JSON en objet JavaScript avec JSON.parse
     * - Si non : je retourne un tableau vide
     */
    return books ? JSON.parse(books) : [];
}

/**
 * Je sauvegarde les livres dans le localStorage
 * Les données sont converties en chaîne JSON avant le stockage
 * 
 * @param {Array} books - Tableau des livres à sauvegarder
 * @returns {void}
 */
function saveBooks(books) {
    /* Je convertis le tableau de livres en chaîne JSON avec JSON.stringify
     * puis je le stocke dans le localStorage sous la clé 'myLibrary'
     */
    localStorage.setItem('myLibrary', JSON.stringify(books));
}

/**
 * Je génère un ID unique pour chaque livre
 * Combine un timestamp et un nombre aléatoire en base 36
 * 
 * @returns {string} ID unique généré (exemple: "l8x9k2m3p5")
 */
function generateId() {
    /* Je génère un ID unique en combinant :
     * - Date.now().toString(36) : timestamp actuel converti en base 36
     * - Math.random().toString(36).substr(2) : nombre aléatoire en base 36 (sans le "0.")
     * Cette combinaison garantit l'unicité de l'ID
     */
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}