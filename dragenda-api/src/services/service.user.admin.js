import repoUserAdmin from "../repositories/repository.user.admin.js"

async function Listar() {

  const userAdmin = await repoUserAdmin.Listar();

  return userAdmin;

}

export default { Listar };