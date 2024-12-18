import { Router } from "express";
import rateLimit from "express-rate-limit";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import controllerAppointment from "./controllers/controller.appointment.js";
import jwt from "./token.js";
import dotenv from 'dotenv';

dotenv.config({ path: "./src/.env" });
const router = Router();

const generalLimiter = rateLimit ({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW),
  max: Number(process.env.GENERAL_RATE_LIMIT_MAX),
  message: {error: "Muitas requisições. Tente novamente mais tarde."},

});

const loginLimiter = rateLimit ({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW),
  max: Number(process.env.LOGIN_RATE_LIMIT_MAX),
  message: { error: "Muitas tentativas de login. Tente novamente mais tarde."},
});

router.use(generalLimiter);

// Doctors
router.get("/doctors", jwt.ValidateToken, controllerDoctor.Listar);
router.post("/doctors", jwt.ValidateToken, controllerDoctor.Inserir);
router.put("/doctors/:id_doctors", jwt.ValidateToken, controllerDoctor.Editar);
router.delete("/doctors/:id_doctors", jwt.ValidateToken, controllerDoctor.Excluir);

// Services (serviços prestados)...
router.get("/doctors/:id_doctors/services", jwt.ValidateToken, controllerDoctor.ListarServicos);

// register
router.post("/users/register", controllerUser.Inserir);
//login
router.post("/users/login", loginLimiter, controllerUser.Login);
router.get("/users/profile", jwt.ValidateToken, controllerUser.Profile);

// Reservas (appointments)...
router.get("/appointments", jwt.ValidateToken, controllerAppointment.ListarByUser);
router.post("/appointments", jwt.ValidateToken, controllerAppointment.Inserir);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.Excluir);


export default router;
