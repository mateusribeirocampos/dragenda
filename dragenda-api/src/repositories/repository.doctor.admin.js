// Importa a função query do módulo sqlite.js localizado no diretório database
import { query } from "../database/sqlite.js";

// Define uma função assíncrona chamada Listar
async function Listar(name) {
  let filtro = [];

  // Define a consulta SQL para selecionar todos os registros da tabela doctors, ordenados pelo nome

  let sql = "select * from doctors ";

  if (name) {
    sql = sql + "where name like ? ";
    filtro.push("%" + name + "%");
  }

  //sql = sql + "order by name";

  // Executa a consulta SQL usando a função query e armazena o resultado na constante doctors
  const doctors = await query(sql, filtro);

  // Retorna o resultado da consulta, que é uma lista de médicos
  return doctors;
}

async function InserirDoctor(name, specialty, icon, crm, telefone, ativo) {
  let sql = `insert into doctors(name, specialty, icon, crm, telefone, ativo) values(?, ?, ?, ?, ?, ?)
  returning id_doctor`;

  const doctor = await query(sql, [name, specialty, icon, crm, telefone, ativo]);

  return doctor[0];
}

export default { Listar, InserirDoctor };