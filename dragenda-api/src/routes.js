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
import { loginLimiter, trackLoginAttempts } from "./middlewares/rateLimit.js";

dotenv.config ({ path: "./src/.env" });
const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const generalLimiter = rateLimit ({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
  max: Number(process.env.GENERAL_RATE_LIMIT_MAX) || 100,
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
router.post("/doctors", jwt.ValidateToken, jwt.RequireAdmin, controllerDoctor.Inserir);
router.put("/doctors/:id_doctors", jwt.ValidateToken, jwt.RequireAdmin, controllerDoctor.Editar);
router.delete("/doctors/:id_doctors", jwt.ValidateToken, jwt.RequireAdmin, controllerDoctor.Excluir);

// Services (serviços prestados)...
router.get("/doctors/:id_doctors/services", jwt.ValidateToken, controllerDoctor.ListarServicos);

// users
// register, login e profile
router.post("/users/register", controllerUser.Inserir);
router.post("/users/login", loginLimiter, trackLoginAttempts, controllerUser.Login);
router.get("/users/profile", jwt.ValidateToken, jwt.RequireUser, controllerUser.Profile);

// Reservas (appointments)...
router.get("/appointments", jwt.ValidateToken, jwt.RequireUser, controllerAppointment.ListarByUser);
router.post("/appointments", jwt.ValidateToken, jwt.RequireUser, controllerAppointment.Inserir);
router.delete("/appointments/:id_appointment", jwt.ValidateToken, jwt.RequireUser, controllerAppointment.Excluir);

// Rotas do Admin
router.post("/admin/register", jwt.ValidateToken, jwt.RequireAdmin, controllerAdmin.InserirAdmin);
router.post("/admin/login", loginLimiter, trackLoginAttempts, controllerAdmin.LoginAdmin);

// rotas do admin para users
router.get("/admin/users", jwt.ValidateToken, jwt.RequireAdmin, controllerUserAdmin.Listar);

// rotas do admin para doctors
router.get("/admin/doctors", jwt.ValidateToken, jwt.RequireAdmin, controllerDoctorAdmin.List);
router.get("/admin/doctors/:id_doctor", jwt.ValidateToken, jwt.RequireAdmin, controllerDoctorAdmin.ListId);
router.put("/admin/doctors/:id_doctor", jwt.ValidateToken, jwt.RequireAdmin, controllerDoctorAdmin.EditDoctor);
router.post("/admin/doctors", jwt.ValidateToken, jwt.RequireAdmin, controllerDoctorAdmin.InsertDoctor);
router.delete("/admin/doctors/:id_doctor", jwt.ValidateToken, jwt.RequireAdmin, controllerDoctorAdmin.DeleteDoctor);

// rotas admin appointment get
router.get("/admin/appointments", jwt.ValidateToken, jwt.RequireAdmin, controllerAppointmentAdmin.Listar);
router.get("/admin/appointments/:id_appointment", jwt.ValidateToken, jwt.RequireAdmin, controllerAppointmentAdmin.ListarId);

// rotas admin appointments post / put / delete
router.post("/admin/appointments", jwt.ValidateToken, jwt.RequireAdmin, controllerAppointmentAdmin.InserirAdmin);
router.put("/admin/appointments/:id_appointment", jwt.ValidateToken, jwt.RequireAdmin, controllerAppointmentAdmin.EditarAdmin);
router.delete("/admin/appointments/:id_appointment", jwt.ValidateToken, jwt.RequireAdmin, controllerAppointmentAdmin.ExcluirAdmin);

export default router;
