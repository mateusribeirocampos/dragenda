import serviceAdmin from "../services/service.admin.js";

async function InserirAdmin(req, res) {
  const { name, email, password } = req.body;

  const admin = await serviceAdmin.InserirAdmin(name, email, password);

  res.status(201).json(admin);
}

async function LoginAdmin(req, res) {
  const { email, password } = req.body;

  const admin = await serviceAdmin.LoginAdmin(email, password);

  if (admin.length == 0) {
    res.status(401).json({ error: "E-mail ou senha inválida!" });
  } else {
    res.status(200).json(admin);
  }
}

export default { InserirAdmin, LoginAdmin };