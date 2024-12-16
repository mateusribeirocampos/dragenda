import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

// Carrega as variáveis de ambiente do arquivo .env
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

// Verifica se a variável de ambiente EXPO_PUBLIC_API_KEY está definida
if (!API_KEY) {
  // Lança um erro se EXPO_PUBLIC_API_KEY    não estiver definido
  throw new Error("API_KEY não definido. Verifique o arquivo .env");
}

// Função para criar um token JWT
function CreateToken(id_user) {
  // Cria um token JWT com o ID do usuário e uma data de expiração
  const token = jwt.sign({ id_user }, API_KEY, {
    expiresIn: 9999999, // Tempo de expiração do token
  });
  // Retorna o token gerado
  return token;
}

// Função middleware para validar o token JWT
function ValidateToken(req, res, next) {
  // Obtém o token de autenticação do cabeçalho da requisição
  const authToken = req.headers.authorization; // "Bearer xxxxxxxx"

  // Verifica se o token foi informado
  if (!authToken) return res.status(401).json({ error: "Token não informado" });

  // Divide o cabeçalho em "Bearer" e o token
  const [bearer, token] = authToken.split(" "); // "Bearer" "xxxxxx"
  if (!token || bearer !== "Bearer") {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  // Verifica a validade do token
  jwt.verify(token, API_KEY, (err, tokenDecoded) => {
    // Se o token for inválido, retorna um erro 401
    if (err) return res.status(401).json({ error: "Token inválido!" });

    // Se o token for válido, adiciona o ID do usuário à requisição
    req.id_user = tokenDecoded.id_user;

    // Chama a próxima função middleware
    next();
  });
}

// Exporta as funções para uso em outros módulos
export default { CreateToken, ValidateToken };