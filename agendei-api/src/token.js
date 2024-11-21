import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const secretToken = process.env.SECRET_TOKEN;

if (!secretToken) {
  throw new Error("SECRET_TOKEN não definido. Verifique o arquivo .env");
}

function CreateToken(id_user) {
  const token = jwt.sign({ id_user }, secretToken, {
    expiresIn: 9999999,
  });
  return token;
}

function ValidateToken(req, res, next) {
  const authToken = req.headers.authorization; // "Bearer xxxxxxxx"

  if (!authToken) return res.status(401).json({ error: "Token não informado" });

  const [bearer, token] = authToken.split(" "); // "Bearer" "xxxxxx"

  jwt.verify(token, secretToken, (err, tokenDecoded) => {
    if (err) return res.status(401).json({ error: "Token inválido!" });

    req.id_user = tokenDecoded.id_user;

    next();
  });
}

export default { CreateToken, ValidateToken };
