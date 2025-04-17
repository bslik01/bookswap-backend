const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  gradeLevel: { type: String, required: true }, // Ex: "CE2", "Terminale"
  condition: { type: String, enum: ['neuf', 'occasion'], required: true },
  coverImage: { type: String }, // URL Firebase Storage
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Book', bookSchema);
