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

  sql = sql + "order by name";

  // Executa a consulta SQL usando a função query e armazena o resultado na constante doctors
  const doctors = await query(sql, filtro);

  // Retorna o resultado da consulta, que é uma lista de médicos
  return doctors;
}

async function Inserir(name, specialty, icon) {
  let sql = `insert into doctors(name, specialty, icon) values(?, ?, ?)
  returning id_doctor`;

  const doctor = await query(sql, [name, specialty, icon]);

  return doctor[0];
}

async function Editar(id_doctor, name, specialty, icon) {
  let sql = `update doctors set name=?, specialty=?, icon=?
where id_doctor = ?`;

  await query(sql, [name, specialty, icon, id_doctor]);

  return { id_doctor };
}

async function Excluir(id_doctor) {
  let sql = `delete from doctors where id_doctor = ?`;

  await query(sql, [id_doctor]);

  return { id_doctor };
}

async function ListarServicos(id_doctor) {
  let sql = `select d.id_service, s.description, d.price
  from doctors_services d
  join services s on (s.id_service = d.id_service)
  where d.id_doctor = ?
  order by s.description`;

  const servDoc = await query(sql, [id_doctor]);

  return servDoc;
}

// Exporta a função Listar como parte do objeto padrão exportado por este módulo
export default { Listar, Inserir, Editar, Excluir, ListarServicos };
