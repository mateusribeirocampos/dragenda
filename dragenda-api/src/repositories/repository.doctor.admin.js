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

export default { List, InsertDoctor };