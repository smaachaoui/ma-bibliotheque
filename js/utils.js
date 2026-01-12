/**
 * FONCTIONS UTILITAIRES
 */

/**
 * Je récupère l'icône selon le statut du livre
 * 
 * @param {string} status - Le statut du livre (wishlist, reading, finished)
 * @returns {string} Icône correspondant au statut (vide pour le moment)
 */
function getStatusIcon(status) {
    // Je retourne une icône selon le statut (à implémenter)
    return '';
}

/**
 * Je récupère le texte d'affichage selon le statut du livre
 * 
 * @param {string} status - Le statut du livre (wishlist, reading, finished)
 * @returns {string} Texte formaté du statut en français
 */
function getStatusText(status) {
    /* Je définis un objet de correspondance entre les statuts et leur texte d'affichage
     * - wishlist : "À lire"
     * - reading : "En cours"
     * - finished : "Terminé"
     */
    const texts = {
        'wishlist': 'À lire',
        'reading': 'En cours',
        'finished': 'Terminé'
    };
    
    /* Je retourne le texte correspondant au statut
     * Si le statut n'existe pas dans l'objet, je retourne "À lire" par défaut
     */
    return texts[status] || 'À lire';
}

/**
 * Je récupère la classe de couleur Bootstrap selon le statut du livre
 * 
 * @param {string} status - Le statut du livre (wishlist, reading, finished)
 * @returns {string} Classe de couleur Bootstrap (info, warning, success)
 */
function getStatusColor(status) {
    /* Je définis un objet de correspondance entre les statuts et les couleurs Bootstrap
     * - wishlist : "info" (bleu clair)
     * - reading : "warning" (jaune/orange)
     * - finished : "success" (vert)
     */
    const colors = {
        'wishlist': 'info',
        'reading': 'warning',
        'finished': 'success'
    };
    
    /* Je retourne la couleur correspondant au statut
     * Si le statut n'existe pas dans l'objet, je retourne "info" par défaut
     */
    return colors[status] || 'info';
}