import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { query } from './database/sqlite.js';

dotenv.config({ path: "./src/.env" });

// Carrega as variáveis de ambiente do arquivo .env
const JWT_SECRET = process.env.JWT_SECRET;

// Verifica se a variável de ambiente JWT_SECRET está definida
if (!JWT_SECRET) {
  // Lança um erro se JWT_SECRET    não estiver definido
  throw new Error("JWT_SECRET não definido. Configure um segredo privado do backend.");
}

// Função para criar um token JWT
function CreateToken(id_user, role = 'user') {
  // Cria um token JWT com o ID do usuário e uma data de expiração
  const token = jwt.sign({ id_user, role }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 24 * 60 * 60, // Tempo de expiração do token
  });
  // Retorna o token gerado
  return token;
}

// Função middleware para validar o token JWT
async function ValidateToken(req, res, next) {
  // Obtém o token de autenticação do cabeçalho da requisição
  const authToken = req.headers.authorization; // "Bearer xxxxxxxx"

  // Verifica se o token foi informado
  if (!authToken) return res.status(401).json({ error: "Token não informado" });

  // Divide o cabeçalho em "Bearer" e o token
  const [bearer, token] = authToken.split(" "); // "Bearer" "xxxxxx"
  if (bearer !== 'Bearer' || !token || authToken.split(' ').length !== 2) {
    return res.status(401).json({ error: 'Token inválido!' });
  }

  // Verifica a validade do token
  try {
    const tokenDecoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    if (!Number.isSafeInteger(tokenDecoded.id_user) || tokenDecoded.id_user <= 0 || !Number.isSafeInteger(tokenDecoded.exp) ||
        !['user', 'admin'].includes(tokenDecoded.role)) {
      return res.status(401).json({ error: 'Token inválido!' });
    }
    const sql = tokenDecoded.role === 'admin'
      ? 'SELECT id_admin FROM admins WHERE id_admin = ?'
      : 'SELECT id_user FROM users WHERE id_user = ?';
    const rows = await query(sql, [tokenDecoded.id_user]);
    if (rows.length !== 1) return res.status(401).json({ error: 'Token inválido!' });
    req.id_user = tokenDecoded.id_user;
    req.auth = { id: tokenDecoded.id_user, role: tokenDecoded.role };
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido!' });
  }
}

function RequireAdmin(req, res, next) {
  if (req.auth?.role !== 'admin') return res.status(403).json({ error: 'Acesso restrito a administradores' });
  next();
}

function RequireUser(req, res, next) {
  if (req.auth?.role !== 'user') return res.status(403).json({ error: 'Acesso restrito a usuários' });
  next();
}

// Exporta as funções para uso em outros módulos
export default { CreateToken, ValidateToken, RequireAdmin, RequireUser };
