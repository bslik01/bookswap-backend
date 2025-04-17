const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { addBook, getBooks, getBookDetails } = require('../controllers/books');

// Routes protégées par JWT
router.post('/', authenticate, addBook); // POST /api/books
router.get('/', getBooks); // GET /api/books?gradeLevel=Terminale&condition=neuf
router.get('/:id', getBookDetails); // GET /api/books/123

module.exports = router;
