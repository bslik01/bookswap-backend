const request = require('supertest');
const app = require('../app');
const Book = require('../models/Book');
const User = require('../models/User');

describe('Books API', () => {
  let token;
  // let currentUser;
    

  beforeAll(async () => {
    // Nettoyer la database avant tout
    await User.deleteMany({});
    await Book.deleteMany({});

    // Crée un utilisateur et récupère un token valide
    await request(app).post('/api/auth/register').send({
      email: 'books@test.com',
      password: 'password123',
      firstName: 'Marie',
      lastName: 'Martin'
    });
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'books@test.com', password: 'password123' });
    // currentUser = await User.findOne({ email:"books@test.com" });
    token = loginRes.body.token;
  });

  // Test d'ajout de livre
  it('POST /api/books → 201', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Mathématiques Terminale',
        author: 'Jean Dupont',
        gradeLevel: 'Terminale',
        condition: 'neuf', // obligatoire & doit etre dans l'enum
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  // Test de filtres
  it('GET /api/books?gradeLevel=Terminale → 200', async () => {
    await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        title: 'Livre Test', 
        author: 'Elsa Leonce',
        gradeLevel: 'Terminale',
        condition: 'occasion'
      });
    const res = await request(app)
      .get('/api/books?gradeLevel=Terminale');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});