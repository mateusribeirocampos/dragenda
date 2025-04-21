import { query } from "../database/sqlite.js";
import { generateToken } from "../token.js";
import bcrypt from "bcryptjs";
import { DB_TYPE } from "../database/database-adapter.js";

// Função para formatar resultados dependendo do tipo de banco de dados
function formatResult(result) {
  // No PostgreSQL, o resultado já vem como objeto
  if (DB_TYPE === 'postgres') {
    return result;
  }
  // No SQLite, precisamos converter o resultado para objeto
  return result;
}

export async function login(req, res) {
  const { email, password } = req.body;
  const emailLower = email.toLowerCase();

  // Validação de campos
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    // Buscar usuário no banco por email
    const admin = await query("SELECT * FROM admins WHERE email = ?", [emailLower], "get");
    
    // Se não encontrar o usuário
    if (!admin) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // Verifica se a senha está correta
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // Gera o token de autenticação
    const token = generateToken({
      id: admin.id_admin,
      name: admin.name,
      email: admin.email,
      role: admin.role || "admin"
    });

    // Resposta de sucesso com token
    return res.status(200).json({
      token,
      id_admin: admin.id_admin,
      name: admin.name,
      email: admin.email,
      role: admin.role || "admin"
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Renomeando para LoginAdmin para melhor clareza na exportação
export const LoginAdmin = login;

// Função para inserir um novo administrador (registro)
export async function InserirAdmin(req, res) {
  const { name, email, password } = req.body;
  const emailLower = email.toLowerCase();
  
  // Validação de campos
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
  }

  try {
    // Verifica se o email já está em uso
    const existingAdmin = await query("SELECT email FROM admins WHERE email = ?", [emailLower], "get");
    
    if (existingAdmin) {
      return res.status(400).json({ error: "Este email já está em uso" });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insere o novo administrador no banco
    const result = await query(
      "INSERT INTO admins (name, email, password) VALUES (?, ?, ?) RETURNING id_admin",
      [name, emailLower, hashedPassword],
      "run"
    );
    
    // Obtém o ID do administrador recém-criado
    const id_admin = result.id_admin || result;
    
    // Gera o token de autenticação
    const token = generateToken({
      id: id_admin,
      email: emailLower,
      name
    });
    
    // Retorna os dados do usuário e o token
    return res.status(201).json({
      id_admin,
      name,
      email: emailLower,
      token
    });
  } catch (error) {
    console.error("Erro ao registrar administrador:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function register(req, res) {
  const { name, email, password } = req.body;
  const emailLower = email?.toLowerCase();

  // Validação de campos
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres" });
  }

  try {
    // Verificar se já existe um admin com esse email
    const existingAdmin = await query("SELECT * FROM admins WHERE email = ?", [emailLower], "get");
    
    if (existingAdmin) {
      return res.status(409).json({ error: "Este email já está em uso" });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Inserir novo admin no banco
    const result = await query(
      "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
      [name, emailLower, hashedPassword]
    );

    // No PostgreSQL, o comando INSERT não retorna o ID diretamente
    let newAdminId;
    
    if (DB_TYPE === 'postgres') {
      // No PostgreSQL, precisamos fazer uma consulta adicional
      const newAdmin = await query(
        "SELECT id_admin FROM admins WHERE email = ?",
        [emailLower],
        "get"
      );
      newAdminId = newAdmin.id_admin;
    } else {
      // No SQLite, o lastID contém o ID do registro inserido
      newAdminId = result.lastID;
    }

    // Gerar token de autenticação
    const token = generateToken({
      id: newAdminId,
      name,
      email: emailLower,
      role: "admin"
    });

    // Resposta de sucesso
    return res.status(201).json({
      token,
      id_admin: newAdminId,
      name,
      email: emailLower,
      role: "admin"
    });
  } catch (error) {
    console.error("Erro ao registrar admin:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function getProfile(req, res) {
  try {
    // Extrair ID do usuário do token (adicionado pelo middleware de autenticação)
    const adminId = req.user.id;

    if (!adminId) {
      return res.status(400).json({ error: "ID do admin não fornecido" });
    }

    // Buscar informações do admin no banco
    const admin = await query("SELECT id_admin, name, email, role FROM admins WHERE id_admin = ?", [adminId], "get");

    if (!admin) {
      return res.status(404).json({ error: "Admin não encontrado" });
    }

    // Resposta de sucesso
    return res.status(200).json(admin);
  } catch (error) {
    console.error("Erro ao buscar perfil do admin:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function updateProfile(req, res) {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const adminId = req.user.id;
    const updates = {};
    let updateFields = [];
    let updateValues = [];

    if (!adminId) {
      return res.status(400).json({ error: "ID do admin não fornecido" });
    }

    // Buscar admin atual
    const currentAdmin = await query("SELECT * FROM admins WHERE id_admin = ?", [adminId], "get");
    
    if (!currentAdmin) {
      return res.status(404).json({ error: "Admin não encontrado" });
    }

    // Se o email for fornecido e diferente do atual
    if (email && email !== currentAdmin.email) {
      // Verificar se o novo email já está em uso
      const existingAdmin = await query("SELECT * FROM admins WHERE email = ? AND id_admin != ?", [email.toLowerCase(), adminId], "get");
      
      if (existingAdmin) {
        return res.status(409).json({ error: "Este email já está em uso" });
      }
      
      updates.email = email.toLowerCase();
      updateFields.push("email = ?");
      updateValues.push(email.toLowerCase());
    }

    // Se o nome for fornecido e diferente do atual
    if (name && name !== currentAdmin.name) {
      updates.name = name;
      updateFields.push("name = ?");
      updateValues.push(name);
    }

    // Se quiser alterar a senha
    if (currentPassword && newPassword) {
      // Verificar se a senha atual está correta
      const isMatch = await bcrypt.compare(currentPassword, currentAdmin.password);
      
      if (!isMatch) {
        return res.status(401).json({ error: "Senha atual incorreta" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ error: "A nova senha deve ter pelo menos 6 caracteres" });
      }

      // Criptografar a nova senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      updates.password = hashedPassword;
      updateFields.push("password = ?");
      updateValues.push(hashedPassword);
    }

    // Se não houver atualizações
    if (updateFields.length === 0) {
      return res.status(400).json({ error: "Nenhuma atualização fornecida" });
    }

    // Atualizar o admin no banco
    updateValues.push(adminId);
    await query(
      `UPDATE admins SET ${updateFields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id_admin = ?`,
      updateValues
    );

    // Buscar o admin atualizado (sem a senha)
    const updatedAdmin = await query(
      "SELECT id_admin, name, email, role FROM admins WHERE id_admin = ?",
      [adminId],
      "get"
    );

    // Resposta de sucesso
    return res.status(200).json({
      message: "Perfil atualizado com sucesso",
      admin: updatedAdmin
    });
  } catch (error) {
    console.error("Erro ao atualizar perfil do admin:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export default {
  LoginAdmin,
  InserirAdmin,
  register,
  getProfile,
  updateProfile
};