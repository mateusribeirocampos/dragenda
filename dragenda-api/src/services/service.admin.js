import bcrypt from "bcrypt";
import repoAdmin from "../repositories/repository.admin.js";
import jwt from "../token.js";

async function InserirAdmin(name, email, password) {
  if (!password || password.trim() === "") {
    throw new Error("Password é obrigatório");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const admin = await repoAdmin.InserirAdmin(name, email, hashPassword);

  admin.token = jwt.CreateToken(admin.id_admin);

  return admin;
}

async function LoginAdmin(email, password) {
  const admin = await repoAdmin.ListarByEmailAdmin(email);

  if (admin.length == 0) {
    return [];
  } else {
    if (await bcrypt.compare(password, admin.password)) {
      delete admin.password;

      admin.token = jwt.CreateToken(admin.id_admin);

      return admin;
    } else {
      return [];
    }
  }
}

export default { InserirAdmin, LoginAdmin };
