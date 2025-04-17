const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB connecté !');
  } catch (err) {
    console.error('Erreur DB:', err);
    process.exit(1);
  }
};
module.exports = connectDB;