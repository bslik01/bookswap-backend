const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Lance une instance MongoDB en mémoire pour les tests
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
