const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth API', () => {

  afterEach(async () => {
    await User.deleteMany({});
  });
  
  // Test d'inscription
  it('POST /api/auth/register → 201', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@bookswap.com',
        password: 'password123',
        firstName: 'Jean',
        lastName: 'Dupont'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  // Test de connexion
  it('POST /api/auth/login → 200', async () => {
    await User.create({ 
      email: 'login@test.com', 
      password: 'password123',
      firstName: 'Shariffa',
      lastName: 'Mbang'
    });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@test.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  // Test d'erreur : email déjà utilisé
  it('POST /api/auth/register → 409 (email existant)', async () => {
    await User.create({ 
      email: 'duplicate@test.com', 
      password: 'password123',
      firstName: 'test00',
      lastName: 'TEST00'
    });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ 
        email: 'duplicate@test.com', 
        password: 'password456',
        firstName: 'test01',
        lastName: 'TEST01'
      });
    expect(res.statusCode).toBe(409);
  });
});