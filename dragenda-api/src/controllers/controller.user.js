import serviceUser from "../services/service.user.js";

async function Inserir(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await serviceUser.Inserir(name, email, password);
    res.status(201).json({ message: "Usuário criado com sucesso!", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await serviceUser.Login(email, password);
    if (!user) throw new Error("E-mail ou enha inválida!");
    res.status(200).json({ message: "Login realizado com sucesso!", user });
  } catch (error) {
    res.status(401).json({ error: "E-mail ou senha inválida!" });
  }
}

async function Profile(req, res) {
  try {
    const id_user = req.id_user;
    const profile = await serviceUser.Profile(id_user);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export default { Inserir, Login, Profile };
