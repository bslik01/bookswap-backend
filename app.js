// Importations des dépendances
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Initialisation de l'application Express
const app = express();

// Connexion à la base de données MongoDB
connectDB();

// Middlewares de sécurité
app.use(helmet()); // Protège contre les vulnérabilités HTTP
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' })); // Restreint les origines autorisées
app.use(express.json()); // Permet de parser le JSON des requêtes

// Limitation des requêtes (anti-bruteforce)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max par fenêtre
});
app.use('/api/auth', limiter);

// Configuration de Multer pour l'upload de fichiers
const upload = multer({ storage: multer.memoryStorage() });

// Importation des routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

// Routes principales
app.use('/api/auth', authRoutes);
app.use('/api/books', upload.single('coverImage'), bookRoutes); // Upload d'image pour les livres

// Gestion des erreurs (doit être le dernier middleware !)
app.use(errorHandler);

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint non trouvé' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});


module.exports = app;