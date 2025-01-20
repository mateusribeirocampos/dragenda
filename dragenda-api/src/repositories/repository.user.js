import { query } from "../database/sqlite.js";

async function Inserir(name, email, password) {
  let sql = `insert into users(name, email, password) values(?, ?, ?)`;
  //returning id_user`;

  //const user = 
  await query(sql, [name, email, password]);

  // Recupera o ID do último usuário inserido
  const result = await query("SELECT last_insert_rowid() AS id_user");
  return { id_user: result[0].id_user, name, email };

  //return user[0];
}

async function ListarByEmail(email) {
  let sql = `select * from users where email = ?`;
  const user = await query(sql, [email]);
  /*if (user.length == 0) return [];
  else return user[0];*/
  return user[0] || null;
}

async function Profile(id_user) {
  let sql = `select id_user, name, email from users where id_user = ?`;
  const user = await query(sql, [id_user]);
  //return user[0];
  return user[0] || null;
}

export default { Inserir, ListarByEmail, Profile };
