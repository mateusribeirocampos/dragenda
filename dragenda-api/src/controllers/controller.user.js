import serviceUser from "../services/service.user.js";

async function Inserir(req, res) {
  const { name, email, password } = req.body;

  const user = await serviceUser.Inserir(name, email, password);

  res.status(201).json(user);
}

async function Login(req, res) {
  const { email, password } = req.body;

  const user = await serviceUser.Login(email, password);

  if (user.length == 0) {
    res.status(401).json({ error: "E-mail ou senha inválida!" });
  } else {
    res.status(200).json(user);
  }
}

async function Profile(req, res) {

  const id_user = req.id_user;
  const profile = await serviceUser.Profile(id_user);

  res.status(201).json(profile);
}

export default { Inserir, Login, Profile };
