// const logger = require('../utils/logger'); // Optionnel : pour les logs

module.exports = (err, req, res, next) => {
  // Erreurs de validation Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  // Erreurs JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Token invalide' });
  }

  // Erreurs Firebase
  if (err.code === 'storage/unauthorized') {
    return res.status(403).json({ error: 'Accès refusé au stockage' });
  }

  // Par défaut : erreur serveur
  // logger.error(err.stack); // Log l'erreur en prod
  res.status(500).json({ error: 'Erreur serveur' });
};