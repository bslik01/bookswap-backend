# BookSwap - API d'échange de livres scolaires (Sprint 1)

![Node.js](https://img.shields.io/badge/Node.js-18-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-blue)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)

API backend pour une application d'échange de livres scolaires entre élèves et parents.

## 🚀 Fonctionnalités

### Authentification
- Inscription avec email/mot de passe
- Connexion sécurisée JWT (15 minutes)
- Rôles utilisateur/admin

### Gestion des livres
- CRUD complet des livres
- Filtres par niveau scolaire et état
- Upload des images de couverture (Firebase Storage)

### Sécurité
- Middleware JWT pour les routes protégées
- Rate limiting (100 requêtes/15min)
- Protection CORS

## 📦 Installation

### Prérequis
- Node.js v18+
- MongoDB (local ou Atlas)
- Compte Firebase (pour le stockage des images)

#### 1. Cloner le dépôt
```bash
git clone https://github.com/votre-username/bookswap-backend.git
cd bookswap-backend
```

#### 2. Installer les dépendances
npm install

#### 3. Configurer l'environnement
cp .env.example .env

#### Configuration (.env)
```ini
DB_URL=mongodb://localhost:27017/bookswap
JWT_SECRET=votre_clé_secrète_complexe
FIREBASE_BUCKET=your-project-id.appspot.com
PORT=5000
NODE_ENV=development
```

## 💻 Utilisation

### Lancer le serveur
```bash
# Mode développement (avec rechargement automatique)
npm run dev

# Mode production
npm start
```

## 🧪 Tests
```bash
# Lancer les tests (avec base de données en mémoire)
npm test

# Générer un rapport de couverture
npm test -- --coverage
```

### Tests couverts:
- Tests unitaires (modèles)
- Tests d'intégration (API)
- Tests d'erreurs

## 🏗 Architecture
```
bookswap-backend/
├── config/            # Configuration
│   ├── db.js          # Connexion MongoDB
│   └── firebase.js    # Initialisation Firebase
├── controllers/       # Logique métier
│   ├── auth.js        # Authentification
│   └── books.js       # Gestion des livres
├── middlewares/       # Middlewares
│   ├── auth.js        # Vérification JWT
│   └── errorHandler.js# Gestion des erreurs
├── models/            # Schémas Mongoose
│   ├── Book.js
│   └── User.js
├── routes/            # Routes API
│   ├── auth.js
│   └── books.js
├── utils/             # Utilitaires
│   └── firebaseStorage.js # Upload images
└── tests/             # Tests automatisés
    ├── auth.test.js
    └── books.test.js
```

## 🤝 Contribution
1. Forkez le projet
2. Créez une branche (git checkout -b feature/ma-feature)
3. Committez (git commit -am 'Ajout d'une fonctionnalité')
4. Pushez (git push origin feature/ma-feature)
5. Créez une Pull Request