/* Les fonctions utilitaires */

// Je récupère l'icône selon le statut (
function getStatusIcon(status) {
    return '';
}

// Je récupère le texte selon le statut
function getStatusText(status) {
    const texts = {
        'wishlist': 'À lire',
        'reading': 'En cours',
        'finished': 'Terminé'
    };
    return texts[status] || 'À lire';
}

// Je récupère la couleur Bootstrap selon le statut
function getStatusColor(status) {
    const colors = {
        'wishlist': 'info',
        'reading': 'warning',
        'finished': 'success'
    };
    return colors[status] || 'info';
}