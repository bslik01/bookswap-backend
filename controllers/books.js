const Book = require('../models/Book');
const { uploadImage } = require('../utils/firebaseStorage');

// Ajouter un livre
exports.addBook = async (req, res) => {
  try {
    const { title, author, gradeLevel, condition } = req.body;
    const newBook = await Book.create({
      title,
      author,
      gradeLevel,
      condition,
      owner: req.userId, // Récupéré depuis le middleware d'authentification
      coverImage: req.file? await uploadImage(req.file) : null, // Si vous utilisez Firebase Storage
    });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lister tous les livres (avec filtres)
exports.getBooks = async (req, res) => {
  try {
    const { gradeLevel, condition } = req.query;
    const filters = {};
    if (gradeLevel) filters.gradeLevel = gradeLevel;
    if (condition) filters.condition = condition;

    const books = await Book.find(filters).populate('owner', 'firstName email');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Obtenir un livre spécifique
exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'firstName email');
    if (!book) return res.status(404).json({ error: 'Livre non trouvé' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
