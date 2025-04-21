import { query, DB_TYPE } from "../database/sqlite.js";

async function InserirAdmin(name, email, password) {
  // Query compatível com PostgreSQL e SQLite
  let sql;
  
  if (DB_TYPE === 'postgres') {
    sql = `INSERT INTO admins(name, email, password) VALUES($1, $2, $3) RETURNING id_admin`;
  } else {
    sql = `INSERT INTO admins(name, email, password) VALUES(?, ?, ?)`;
  }

  const result = await query(sql, [name, email, password]);
  
  if (DB_TYPE === 'postgres') {
    return result[0];
  } else {
    // Para SQLite, buscar o ID do admin recém-inserido
    const adminId = await query(
      `SELECT id_admin FROM admins WHERE email = ?`,
      [email],
      "get"
    );
    return adminId;
  }
}

async function ListarByEmailAdmin(email) {
  let sql = `SELECT * FROM admins WHERE email = ?`;

  const admin = await query(sql, [email], "get");

  if (!admin) return [];
  return admin;
}

export default { InserirAdmin, ListarByEmailAdmin };