import { query, DB_TYPE } from "../database/sqlite.js";

async function Inserir(name, email, password) {
  // Query compatível com PostgreSQL e SQLite
  let sql;
  
  if (DB_TYPE === 'postgres') {
    sql = `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id_user`;
  } else {
    sql = `INSERT INTO users(name, email, password) VALUES(?, ?, ?)`;
  }

  const result = await query(sql, [name, email, password]);
  
  if (DB_TYPE === 'postgres') {
    return result[0];
  } else {
    // Para SQLite, buscar o ID do usuário recém-inserido
    const userId = await query(
      `SELECT id_user FROM users WHERE email = ?`,
      [email],
      "get"
    );
    return userId;
  }
}

async function ListarByEmail(email) {
  let sql = `SELECT * FROM users WHERE email = ?`;

  const user = await query(sql, [email], "get");

  if (!user) return [];
  return user;
}

async function Profile(id_user) {
  let sql = `SELECT id_user, name, email FROM users WHERE id_user = ?`;

  const user = await query(sql, [id_user], "get");

  return user;
}

export default { Inserir, ListarByEmail, Profile };
