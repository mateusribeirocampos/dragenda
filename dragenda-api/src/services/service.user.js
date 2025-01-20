import Joi from "joi";
import bcrypt from "bcrypt";
import repoUser from "../repositories/repository.user.js";
import jwt from "../token.js";

const useSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": `"name" deve ser um texto`,
    "string.empty": `"name" não pode estar vazio`,
    "string.min": `"name" deve ter pelo menos 3 caracteres`,
    "any.required": `"name" é obrigatório`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `"email" não pode estar vazio`,
    "string.email": `"email" deve ser um endereço de email válido`,
    "any.required": `"email" é obrigatório`,
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"))
    .required()
    .messages({
      "string.empty": `"password" não pode estar vazio`,
      "string.min": `"password" deve ter pelo menos 8 caracteres`,
      "string.pattern.base": `"password" deve conter letras, números e caracteres especiais`,
      "any.required": `"password" é obrigatório`,
    }),
});

async function Inserir(name, email, password) {
  // Valida os dados do usuário
  const { error } = useSchema.validate({ name, email, password });
  if (error) throw new Error(`Erro na validação dos dados: ${error.details[0].message}`);

  // Verifica se o email já está registrado
  const existingUser = await repoUser.ListarByEmail(email);
  if (existingUser) throw new Error("Usuário já cadastrado");

  // Hash da senha
  const hashPassword = await bcrypt.hash(password, 10);

  // Insere o usuário no banco de dados
  const user = await repoUser.Inserir(name, email, hashPassword);

  // Gera o token
  user.token = jwt.CreateToken(user.id_user);

  // Retorna os dados do usuário
  return { id: user.id_user, name: user.name, email: user.email, token: user.token };
}

async function Login(email, password) {
  // Busca o usuário pelo email
  const user = await repoUser.ListarByEmail(email);
  if (!user) throw new Error("E-mail ou senha inválida!");

  // Compara a senha
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("E-mail ou senha inválida!");

  // Gera o token e remove a senha
  delete user.password;
  user.token = jwt.CreateToken(user.id_user);

  return user;
}

async function Profile(id_user) {
  // Busca o perfil do usuário
  const user = await repoUser.Profile(id_user);
  if (!user) throw new Error("Usuário não encontrado");

  return user;
}

export default { Inserir, Login, Profile };
