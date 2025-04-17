const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Accès refusé (token manquant)' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Ajoute l'ID utilisateur à la requête
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide' });
  }
};
