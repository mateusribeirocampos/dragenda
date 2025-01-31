import serviceUserAdmin from "../services/service.user.admin.js";

async function Listar(req, res) {

  const userAdmin = await serviceUserAdmin.Listar();

  res.status(200).json(userAdmin);
}

export default { Listar };