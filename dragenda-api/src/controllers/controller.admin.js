import serviceAdmin from "../services/service.admin.js";

async function InserirAdmin(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
  }

  try {
    const admin = await serviceAdmin.InserirAdmin(name, email, password);
    return res.status(201).json({ alert: "Admin registrado com sucesso!" });

  } catch (error) {
    console.error("Erro no servidor:", error);
    return res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
  }
}

async function LoginAdmin(req, res) {
  const { email, password } = req.body;

    if(!email || !password) {
    return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
  }

  try {
      const admin = await serviceAdmin.LoginAdmin(email,
  password);

      if (admin.length == 0) {
        return res.status(401).json({ error: "E-mail ou senha inválida!" });
      } else {
        return res.status(200).json(admin);
      }
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
}

export default { InserirAdmin, LoginAdmin };