import serviceUser from "../services/service.user.js";

async function Inserir(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check for existing user
    const existingUser = await serviceUser.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user
    const user = await serviceUser.Inserir(name, email, password);
    return res.status(201).json(user);
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: error.message });
  }
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
  try {
    const id_user = req.id_user;
    const profile = await serviceUser.Profile(id_user);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default { Inserir, Login, Profile };
