import { Router } from "express";
import rateLimit from "express-rate-limit";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import controllerAppointment from "./controllers/controller.appointment.js";
import controllerAdmin from "./controllers/controller.admin.js";
import controllerAppointmentAdmin from "./controllers/controller.appointment.admin.js";
import controllerDoctorAdmin from "./controllers/controller.doctor.admin.js";
import controllerUserAdmin from "./controllers/controller.user.admin.js";
import jwt from "./token.js";
import dotenv from 'dotenv';
import { loginLimiter, trackLoginAttempts, resetLoginAttempts } from "./middlewares/rateLimit.js";

dotenv.config ({ path: "./src/.env" });
const router = Router();

const generalLimiter = rateLimit ({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW),
  max: Number(process.env.GENERAL_RATE_LIMIT_MAX),
  message: {error: "Muitas requisições. Tente novamente mais tarde."},

});

router.use((req, res, next) => {
  if (req.path.startsWith('/users/login') || req.path.startsWith('/users/register')) {
    next();
  } else {
    generalLimiter(req, res, next);
  }
});
router.use((req, res, next) => {
  if (req.path.startsWith('/admin/login') || req.path.startsWith('/admin/register')) {
    next();
  } else {
    generalLimiter(req, res, next);
  }
});

// Doctors
router.get("/doctors", jwt.ValidateToken, controllerDoctor.Listar);
router.post("/doctors", jwt.ValidateToken, controllerDoctor.Inserir);
router.put("/doctors/:id_doctors", jwt.ValidateToken, controllerDoctor.Editar);
router.delete("/doctors/:id_doctors", jwt.ValidateToken, controllerDoctor.Excluir);

// Services (serviços prestados)...
router.get("/doctors/:id_doctors/services", jwt.ValidateToken, controllerDoctor.ListarServicos);

// users
// register, login e profile
router.post("/users/register", controllerUser.Inserir);
router.post("/users/login", loginLimiter, resetLoginAttempts, trackLoginAttempts, controllerUser.Login);
router.get("/users/profile", jwt.ValidateToken, controllerUser.Profile);

// Reservas (appointments)...
router.get("/appointments", jwt.ValidateToken, controllerAppointment.ListarByUser);
router.post("/appointments", jwt.ValidateToken, controllerAppointment.Inserir);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, controllerAppointment.Excluir);

// Rotas do Admin
router.post("/admin/register", controllerAdmin.InserirAdmin);
router.post("/admin/login", loginLimiter, resetLoginAttempts, trackLoginAttempts, controllerAdmin.LoginAdmin);

// rotas do admin para users
router.get("/admin/users", jwt.ValidateToken, controllerUserAdmin.Listar);

// rotas do admin para doctors
router.get("/admin/doctors", jwt.ValidateToken, controllerDoctorAdmin.List);
router.get("/admin/doctors/:id_doctor", jwt.ValidateToken, controllerDoctorAdmin.ListId);
router.post("/admin/doctors", jwt.ValidateToken, controllerDoctorAdmin.InsertDoctor);

// rotas admin appointment get
router.get("/admin/appointments", jwt.ValidateToken, controllerAppointmentAdmin.Listar);
router.get("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointmentAdmin.ListarId);

// rotas admin appointments post / put / delete
router.post("/admin/appointments/", jwt.ValidateToken, controllerAppointmentAdmin.InserirAdmin);
router.put("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointmentAdmin.EditarAdmin);
router.delete("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointmentAdmin.ExcluirAdmin);

export default router;