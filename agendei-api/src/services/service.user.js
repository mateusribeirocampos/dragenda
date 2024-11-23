import bcrypt from "bcrypt";
import repoUser from "../repositories/repository.user.js";
import jwt from "../token.js";

async function Inserir(name, email, password) {
  try {
    // Check for required fields
    if (!name || !email || !password) {
      throw new Error('Missing required fields');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repoUser.Inserir(name, email, hashPassword);

    // Generate token
    user.token = jwt.CreateToken(user.id_user);
    
    return user;
  } catch (error) {
    throw error;
  }
}

async function Login(email, password) {
  const user = await repoUser.ListarByEmail(email);

  if (user.length == 0) {
    return [];
  } else {
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;

      user.token = jwt.CreateToken(user.id_user);

      return user;
    } else {
      return [];
    }
  }
}

async function Profile(id_user) {

  const user = await repoUser.Profile(id_user);

  return user;
}

async function findByEmail(email) {
  const user = await repoUser.findByEmail(email);
  return user;
}

export default { Inserir, Login, Profile, findByEmail };
