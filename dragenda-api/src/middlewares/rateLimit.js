import rateLimit from "express-rate-limit";
import dotenv from 'dotenv';

dotenv.config({ path: "./src/.env" });

const loginAttempts = new Map(); // Mapa para armazenar tentativas de login

const RATE_LIMIT_WINDOW = Number(process.env.RATE_LIMIT_WINDOW);
const LOGIN_RATE_LIMIT_MAX = Number(process.env.LOGIN_RATE_LIMIT_MAX);

const loginLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  max: LOGIN_RATE_LIMIT_MAX,
  handler: (req, res) => {
    res.status(429).json({ 
      error: "Muitas tentativas de login. Tente novamente mais tarde.",
      blockedUntil: Date.now() + RATE_LIMIT_WINDOW,
    });
  },
  keyGenerator: (req) => req.ip,
});

// Middleware para rastrear tentativas de login
const trackLoginAttempts = async (req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();

  // Verifica se o IP já tem registro de tentativas
  let attempts = loginAttempts.get(ip) || {
    count: 0,
    lastAttempt: currentTime,
    blockedUntil: 0
  };

  // Verifica se ainda está bloqueado
  if (attempts.blockedUntil > currentTime) {
    return res.status(429).json({
      error: "IP bloqueado temporariamente. Tente novamente mais tarde.",
      blockedUntil: attempts.blockedUntil
    });
  }

  // Reseta contagem se passou mais de 15 minutos
  if (currentTime - attempts.lastAttempt > RATE_LIMIT_WINDOW) {
    attempts = {
      count: 0,
      lastAttempt: currentTime,
      blockedUntil: 0
    };
  }

  attempts.count++;
  attempts.lastAttempt = currentTime;

  // Bloqueia se exceder limite
  if (attempts.count > LOGIN_RATE_LIMIT_MAX) {
    attempts.blockedUntil = currentTime + RATE_LIMIT_WINDOW;
    loginAttempts.set(ip, attempts);

    return res.status(429).json({
      error: "Número máximo de tentativas excedido. IP bloqueado.",
      blockedUntil: attempts.blockedUntil
    });
  }

  loginAttempts.set(ip, attempts);
  next();
};
// Middleware para resetar tentativas de login
const resetLoginAttempts = (req, res, next) => {
  const ip = req.ip;
  loginAttempts.delete(ip);
  next();
};

export { 
  loginLimiter, 
  trackLoginAttempts, 
  resetLoginAttempts 
};