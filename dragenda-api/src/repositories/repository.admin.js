import { query } from "../database/sqlite.js";

async function InserirAdmin(name, email, password) {
  let sql = `insert into admins(name, email, password) values(?, ?, ?)
  returning id_admin`;

  const admin = await query(sql, [name, email, password]);

  return admin[0];
}

async function ListarByEmailAdmin(email) {
  let sql = `select * from admins where email = ?`;

  const admin = await query(sql, [email]);

  if (admin.length == 0) return [];
  else return admin[0];
}

export default { InserirAdmin, ListarByEmailAdmin };