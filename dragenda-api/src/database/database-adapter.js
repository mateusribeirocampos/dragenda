import pg from 'pg';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

// Define qual banco de dados usar com base na configuração
const DB_TYPE = process.env.DB_TYPE || 'sqlite'; // 'sqlite' ou 'postgres'

// Cliente para PostgreSQL
let pgClient = null;

// Cliente para SQLite
let sqliteDb = null;

/**
 * Inicializa o adaptador de banco de dados
 */
async function initDatabase() {
  if (DB_TYPE === 'postgres') {
    try {
      pgClient = new pg.Pool({
        user: process.env.PG_USER || 'postgres',
        host: process.env.PG_HOST || 'localhost',
        database: process.env.PG_DATABASE || 'dragenda',
        password: process.env.PG_PASSWORD || 'postgres',
        port: process.env.PG_PORT || 5432,
      });
      
      // Teste de conexão
      await pgClient.query('SELECT NOW()');
      console.log('Conectado ao PostgreSQL com sucesso');
    } catch (error) {
      console.error('Erro ao conectar ao PostgreSQL:', error);
      throw error;
    }
  } else {
    // SQLite (comportamento atual)
    const SQLite = sqlite3.verbose();
    sqliteDb = new SQLite.Database(
      process.env.SQLITE_PATH || "./src/database/banco.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          console.error("Erro ao conectar com o banco SQLite:", err.message);
          throw err;
        }
        console.log('Conectado ao SQLite com sucesso');
      }
    );
  }
}

/**
 * Executa uma consulta SQL no banco de dados
 * @param {string} sql - Comando SQL a ser executado
 * @param {Array} params - Parâmetros para o comando SQL
 * @param {string} method - Método a ser usado (apenas para SQLite)
 * @returns {Promise<any>} - Resultado da consulta
 */
async function query(sql, params = [], method = 'all') {
  if (DB_TYPE === 'postgres') {
    try {
      // No PostgreSQL, usamos $1, $2, etc. para parâmetros
      // Vamos converter automaticamente ? para $1, $2, etc.
      let pgSql = sql;
      let paramCounter = 0;
      pgSql = pgSql.replace(/\?/g, () => `$${++paramCounter}`);
      
      const result = await pgClient.query(pgSql, params);
      return method === 'get' ? result.rows[0] : result.rows;
    } catch (error) {
      console.error('Erro na consulta PostgreSQL:', error);
      throw error;
    }
  } else {
    // SQLite (comportamento atual)
    return new Promise((resolve, reject) => {
      sqliteDb[method](sql, params, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

/**
 * Fecha as conexões de banco de dados
 */
async function closeDatabase() {
  if (DB_TYPE === 'postgres' && pgClient) {
    await pgClient.end();
    console.log('Conexão com PostgreSQL fechada');
  } else if (sqliteDb) {
    return new Promise((resolve, reject) => {
      sqliteDb.close((err) => {
        if (err) {
          console.error('Erro ao fechar conexão SQLite:', err);
          reject(err);
        } else {
          console.log('Conexão com SQLite fechada');
          resolve();
        }
      });
    });
  }
}

// Exporta os objetos db, query e funções auxiliares
export { 
  initDatabase, 
  query, 
  closeDatabase, 
  DB_TYPE 
};