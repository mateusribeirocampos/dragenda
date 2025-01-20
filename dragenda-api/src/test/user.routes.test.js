// Importa o framework de testes Chai
import chai from 'chai';
// Importa o plugin do Chai para testar requisições HTTP
import chaiHttp from 'chai-http';
// Importa biblioteca para gerenciar variáveis de ambiente
import dotenv from 'dotenv';
// Importa função para executar queries no banco SQLite
import { query } from '../database/sqlite.js';
// Importa a instância do aplicativo Express
import { app } from '../index.js';

// Configura o dotenv para ler variáveis do arquivo .env
dotenv.config({ path: './src/.env' });

// Extrai o método expect do Chai para fazer asserções
const { expect } = chai;
// Adiciona o plugin HTTP ao Chai
chai.use(chaiHttp);

// Agrupa todos os testes relacionados às rotas de usuário
describe('User Routes', () => {
  // Variável para armazenar o token JWT
  let token;
  // Objeto com dados do usuário de teste
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123'
  };

  // Executa antes de todos os testes
  before(async () => {
    // Limpa a tabela de usuários para garantir estado limpo
    await query('DELETE FROM users');
  });

  // Testes para rota de registro
  describe('POST /users/register', () => {
    // Testa registro bem-sucedido
    it('should register a new user', async () => {
      // Faz requisição HTTP POST para registro
      const res = await chai
        .request(app)
        .post('/users/register')
        .send(testUser);
      
      // Verifica se retornou status 201 (Created)
      expect(res).to.have.status(201);
      // Verifica se retornou ID do usuário
      expect(res.body).to.have.property('id_user');
      // Verifica se retornou token de autenticação
      expect(res.body).to.have.property('token');
    });

    // Testa tentativa de registro com email duplicado
    it('should not register user with existing email', async () => {
      // Tenta registrar usuário com mesmo email
      const res = await chai
        .request(app)
        .post('/users/register')
        .send({
          name: 'Test User 2',
          email: testUser.email, // Mesmo email do primeiro teste
          password: 'test123'
        });
      
      // Verifica se retornou status 400 (Bad Request)
      expect(res).to.have.status(400);
      // Verifica se retornou mensagem de erro
      expect(res.body).to.have.property('error');
    });
  });

  // Testes para rota de login
  describe('POST /users/login', () => {
    // Testa login bem-sucedido
    it('should login successfully', async () => {
      // Faz requisição de login com credenciais corretas
      const res = await chai
        .request(app)
        .post('/users/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      // Verifica se retornou status 200 (OK)
      expect(res).to.have.status(200);
      // Verifica se retornou token
      expect(res.body).to.have.property('token');
      // Armazena token para usar em outros testes
      token = res.body.token;
    });

    // Testa login com senha incorreta
    it('should not login with wrong password', async () => {
      // Tenta login com senha errada
      const res = await chai
        .request(app)
        .post('/users/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });
      
      // Verifica se retornou status 401 (Unauthorized)
      expect(res).to.have.status(401);
    });
  });

  // Testes para rota de perfil
  describe('GET /users/profile', () => {
    // Testa acesso ao perfil com token válido
    it('should get user profile', async () => {
      // Faz requisição com token no header
      const res = await chai
        .request(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${token}`);
      
      // Verifica se retornou status 200 (OK)
      expect(res).to.have.status(200);
      // Verifica se retornou nome correto
      expect(res.body).to.have.property('name', testUser.name);
      // Verifica se retornou email correto
      expect(res.body).to.have.property('email', testUser.email);
    });

    // Testa acesso ao perfil sem token
    it('should not get profile without token', async () => {
      // Faz requisição sem token
      const res = await chai
        .request(app)
        .get('/users/profile');
      
      // Verifica se retornou status 401 (Unauthorized)
      expect(res).to.have.status(401);
    });
  });
});