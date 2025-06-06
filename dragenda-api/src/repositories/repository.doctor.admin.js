// Importa a função query do módulo sqlite.js localizado no diretório database
import { query } from "../database/sqlite.js";

// Define uma função assíncrona chamada Listar
async function List(name) {
  let filter = [];

  // Define a consulta SQL para selecionar todos os registros da tabela doctors, ordenados pelo nome

  let sql = "select * from doctors ";

  if (name) {
    sql = sql + "where name like ? ";
    filter.push("%" + name + "%");
  }

  //sql = sql + "order by name";

  // Executa a consulta SQL usando a função query e armazena o resultado na constante doctors
  const doctors = await query(sql, filter);

  // Retorna o resultado da consulta, que é uma lista de médicos
  return doctors;
}

async function InsertDoctor(name, specialty, icon, crm, phone, active) {
  let sql = `insert into doctors(name, specialty, icon, crm, phone, active) values(?, ?, ?, ?, ?, ?)
  returning id_doctor`;

  const doctor = await query(sql, [name, specialty, icon, crm, phone, active]);

  return doctor[0];
}

async function ListId(id_doctor) {
  let filtro = [id_doctor];

  let sql = `select * from doctors
              where id_doctor = ? `;

  const doctors = await query(sql, filtro);

  return doctors[0];
}

async function EditDoctor(id_doctor, name, specialty, icon, crm, phone, active) {
  let sql = `update doctors set name=?, specialty=?, icon=?, crm=?, phone=?, active=?
where id_doctor = ?`;

  await query(sql, [name, specialty, icon, crm, phone, active, id_doctor]);

  return { id_doctor };
}

async function DeleteDoctor(id_doctor) {
  let sql = `delete from doctors where id_doctor = ?`;

  await query(sql, [id_doctor]);

  return { id_doctor };
}

export default { List, InsertDoctor, ListId, EditDoctor, DeleteDoctor };
