const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Inscription
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gradeLevel } = req.body;

    const user0 = await User.findOne({ email });
    if (user0) {
      return res.status(409).json({ error: 'Email existant' });
    }
    
    const user = await User.create({ firstName, lastName, email, password, gradeLevel });
    
    // Génère un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
