import express from "express";
import cors from "cors";
import routes from "./routes.js";
import { initDatabase, DB_TYPE } from './database/database-adapter.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

// Configuração de CORS mais completa para desenvolvimento
app.use(cors({
  origin: (origin, callback) => {
    // Permitir requisições sem origin (como apps mobile ou Postman)
    if(!origin) return callback(null, true);
    // Lista de origens permitidas
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',  // Porta padrão do Vite
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
      'https://dragenda-web.vercel.app' // Produção web
    ];
    
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'A política de CORS não permite acesso a partir desta origem.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
}));

app.use(express.json());

// Middleware para logging de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Rota de verificação de saúde da API
app.get("/", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "API DrAgenda está funcionando!",
    version: "2.0.0",
    database: DB_TYPE
  });
});

// Rotas da aplicação
app.use(routes);

// Inicializar o banco de dados antes de iniciar o servidor
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);
      console.log(`Utilizando banco de dados: ${DB_TYPE}`);
      console.log(`API disponível em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Falha ao inicializar o banco de dados:", error);
    process.exit(1);
  });

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não tratado:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promessa rejeitada não tratada:', reason);
});

export default app;
