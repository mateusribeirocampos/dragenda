import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { app } from '../index.js';
import { query } from '../database/sqlite.js';

dotenv.config({ path: './src/.env' });

const { expect } = chai;
chai.use(chaiHttp);

describe('User Routes', () => {
  let token;
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123'
  };

  // Clear users table before tests
  before(async () => {
    await query('DELETE FROM users');
  });

  describe('POST /users/register', () => {
    it('should register a new user', async () => {
      const res = await chai
        .request(app)
        .post('/users/register')
        .send(testUser);
      
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('id_user');
      expect(res.body).to.have.property('token');
    });

    it('should not register user with existing email', async () => {
      const res = await chai
        .request(app)
        .post('/users/register')
        .send({
          name: 'Test User 2',
          email: testUser.email,
          password: 'test123'
        });
      
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('POST /users/login', () => {
    it('should login successfully', async () => {
      const res = await chai
        .request(app)
        .post('/users/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      token = res.body.token;
    });

    it('should not login with wrong password', async () => {
      const res = await chai
        .request(app)
        .post('/users/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });
      
      expect(res).to.have.status(401);
    });
  });

  describe('GET /users/profile', () => {
    it('should get user profile', async () => {
      const res = await chai
        .request(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('name', testUser.name);
      expect(res.body).to.have.property('email', testUser.email);
    });

    it('should not get profile without token', async () => {
      const res = await chai
        .request(app)
        .get('/users/profile');
      
      expect(res).to.have.status(401);
    });
  });
});