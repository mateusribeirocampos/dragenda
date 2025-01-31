import { query } from "../database/sqlite.js";

async function Listar() {
  let filtro = [];

  let sql = `select id_user, name, email from users order by name`;

  const userAdmin = await query(sql, filtro);

  return userAdmin;
}

export default { Listar };