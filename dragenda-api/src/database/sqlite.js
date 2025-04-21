// Importa o módulo de adaptador de banco de dados
import { query, initDatabase, DB_TYPE } from './database-adapter.js';

// Para compatibilidade com código existente
let db = {};

// Inicializa o banco de dados quando este módulo é carregado
initDatabase()
  .then(() => {
    console.log(`Banco de dados ${DB_TYPE} inicializado com sucesso.`);
  })
  .catch((error) => {
    console.error(`Erro ao inicializar o banco de dados ${DB_TYPE}:`, error);
    process.exit(1); // Encerra a aplicação em caso de erro crítico
  });

// Exporta os objetos db, query e DB_TYPE para compatibilidade com código existente e novos repositórios
export { db, query, DB_TYPE };