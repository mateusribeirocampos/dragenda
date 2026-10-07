import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'isolated-security-tests-only-not-a-production-secret';
process.env.DB_PATH = ':memory:';
const { default: app } = await import('../app.js');
const { db, query } = await import('../database/sqlite.js');
await query('CREATE TABLE users (id_user INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)');
await query('CREATE TABLE admins (id_admin INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)');
await query("INSERT INTO users VALUES (1, 'Test user', 'user@example.test', '')");
await query("INSERT INTO admins VALUES (1, 'Test admin', 'admin@example.test', '')");
after(() => new Promise((resolve, reject) => db.close(e => e ? reject(e) : resolve())));
const token = (role, options = {}) => jwt.sign({ id_user: 1, role }, process.env.JWT_SECRET, { expiresIn: '1h', ...options });

test('anonymous users cannot create administrators', async () => {
  assert.equal((await request(app).post('/admin/register').send({ name: 'x', email: 'x@example.test', password: 'test-password' })).status, 401);
});
test('user token cannot access administrative routes even with colliding numeric ids', async () => {
  const userToken = token('user');
  for (const [method, path] of [['get','/admin/users'], ['get','/admin/doctors'], ['get','/admin/appointments'], ['post','/admin/register'], ['post','/doctors'], ['put','/doctors/1'], ['delete','/doctors/1']]) {
    assert.equal((await request(app)[method](path).set('Authorization', `Bearer ${userToken}`)).status, 403, `${method} ${path}`);
  }
});
test('administrator can list users', async () => {
  const res = await request(app).get('/admin/users').set('Authorization', `Bearer ${token('admin')}`);
  assert.equal(res.status, 200); assert.equal(res.body.length, 1);
});
test('admin token cannot be used as patient identity', async () => {
  assert.equal((await request(app).get('/users/profile').set('Authorization', `Bearer ${token('admin')}`)).status, 403);
});
test('expired, unscoped, wrongly signed and malformed bearer tokens fail', async () => {
  const samples = [token('user', { expiresIn: -1 }), token(undefined), token('user', { algorithm: 'HS384' }), jwt.sign({ id_user: 1, role: 'admin' }, 'different-secret', { expiresIn: '1h' })];
  for (const value of samples) assert.equal((await request(app).get('/users/profile').set('Authorization', `Bearer ${value}`)).status, 401);
  assert.equal((await request(app).get('/users/profile').set('Authorization', `Basic ${token('user')}`)).status, 401);
});
test('user profile works and deleted account loses access immediately', async () => {
  const value = token('user');
  assert.equal((await request(app).get('/users/profile').set('Authorization', `Bearer ${value}`)).status, 201);
  await query('DELETE FROM users WHERE id_user = ?', [1]);
  assert.equal((await request(app).get('/users/profile').set('Authorization', `Bearer ${value}`)).status, 401);
});
