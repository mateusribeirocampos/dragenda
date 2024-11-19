// Importa a função query do módulo sqlite.js localizado no diretório database
import { query } from "../database/sqlite.js";

// Define uma função assíncrona chamada Listar
async function Listar() {

  // Define a consulta SQL para selecionar todos os registros da tabela doctors, ordenados pelo nome
  let sql = "select * from doctors order by name";

  // Executa a consulta SQL usando a função query e armazena o resultado na constante doctors
  const doctors = await query(sql, []);

  // Retorna o resultado da consulta, que é uma lista de médicos
  return doctors;
}

// Exporta a função Listar como parte do objeto padrão exportado por este módulo
export default { Listar };