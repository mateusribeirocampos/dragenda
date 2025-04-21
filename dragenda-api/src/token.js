import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

// Chave secreta do JWT (obtida do arquivo .env ou usa um valor padrão)
const JWT_SECRET = process.env.JWT_SECRET || 'dragenda2025superSecureTokenKeyForDevelopment';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '24h';

/**
 * Gera um token JWT para autenticação
 * @param {Object} payload - Dados a serem incluídos no token
 * @returns {string} Token JWT gerado
 */
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

/**
 * Verifica a validade de um token JWT
 * @param {string} token - Token JWT a ser verificado
 * @returns {Object|null} - Payload decodificado ou null se inválido
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Erro na verificação do token:", error.message);
    return null;
  }
}

/**
 * Middleware para verificação de autenticação
 * @param {Object} req - Objeto de requisição
 * @param {Object} res - Objeto de resposta
 * @param {Function} next - Função de próximo middleware
 */
export function authenticateToken(req, res, next) {
  // Obter o cabeçalho de autorização
  const authHeader = req.headers["authorization"];
  
  // Verificar se o cabeçalho existe e começa com "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token de autenticação não fornecido" });
  }
  
  // Extrair o token do cabeçalho
  const token = authHeader.split(" ")[1];
  
  // Verificar a validade do token
  const user = verifyToken(token);
  
  if (!user) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
  
  // Se o token for válido, armazena os dados do usuário na requisição
  req.user = user;
  
  // Continua para o próximo middleware
  next();
}

export default { generateToken, verifyToken, authenticateToken };