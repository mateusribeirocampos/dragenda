import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { app } from '../index.js';

dotenv.config({ path: './src/.env' });

const { expect } = chai;
chai.use(chaiHttp);

describe('Doctor Routes', () => {
  let token;

  before(async () => {
    token = jwt.sign({ id: 1 }, process.env.EXPO_PUBLIC_API_KEY, { expiresIn: '1h' });
  });

  describe('GET /doctors', () => {
    it('should list all doctors', async () => {
      const res = await chai
        .request(app)
        .get('/doctors')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /doctors', () => {
    it('should insert a new doctor', (done) => {
      chai.request(app)
        .post('/doctors')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Dr. Test', specialty: 'Test Specialty', icon: 'test-icon.png' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id_doctor');
          done();
        });
    });
  });

  describe('PUT /doctors/:id_doctors', () => {
    it('should edit an existing doctor', (done) => {
      chai.request(app)
        .put('/doctors/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Dr. Updated', specialty: 'Updated Specialty', icon: 'updated-icon.png' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('DELETE /doctors/:id_doctors', () => {
    it('should delete an existing doctor', (done) => {
      chai.request(app)
        .delete('/doctors/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('GET /doctors/:id_doctors/services', () => {
    it('should list services of a doctor', (done) => {
      chai.request(app)
        .get('/doctors/1/services')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});