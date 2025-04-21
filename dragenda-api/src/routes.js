import { Router } from "express";
import rateLimit from "express-rate-limit";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import controllerAppointment from "./controllers/controller.appointment.js";
import controllerAdmin from "./controllers/controller.admin.js";
import controllerAppointmentAdmin from "./controllers/controller.appointment.admin.js";
import controllerDoctorAdmin from "./controllers/controller.doctor.admin.js";
import controllerUserAdmin from "./controllers/controller.user.admin.js";
import controllerBusinessType from "./controllers/controller.business.type.js";
import controllerProvider from "./controllers/controller.provider.js";
import jwt from "./token.js";
import dotenv from 'dotenv';
import { loginLimiter, trackLoginAttempts, resetLoginAttempts } from "./middlewares/rateLimit.js";

dotenv.config ({ path: "./src/.env" });
const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

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

// ===== ROTAS DE COMPATIBILIDADE (LEGADAS) =====
// Estas rotas mantêm compatibilidade com o sistema antigo específico para médicos

// Doctors (mantido para compatibilidade)
router.get("/doctors", jwt.ValidateToken, controllerDoctor.Listar);
router.post("/doctors", jwt.ValidateToken, controllerDoctor.Inserir);
router.put("/doctors/:id_doctors", jwt.ValidateToken, controllerDoctor.Editar);
router.delete("/doctors/:id_doctors", jwt.ValidateToken, controllerDoctor.Excluir);
router.get("/doctors/:id_doctors/services", jwt.ValidateToken, controllerDoctor.ListarServicos);

// ===== NOVAS ROTAS PARA SISTEMA GENÉRICO =====

// Business Types (Tipos de Negócio)
router.get("/business-types", jwt.ValidateToken, controllerBusinessType.List);
router.get("/business-types/:id_business_type", jwt.ValidateToken, controllerBusinessType.GetById);
router.post("/business-types", jwt.ValidateToken, controllerBusinessType.Insert);
router.put("/business-types/:id_business_type", jwt.ValidateToken, controllerBusinessType.Update);
router.delete("/business-types/:id_business_type", jwt.ValidateToken, controllerBusinessType.Delete);
router.get("/business-types/:id_business_type/settings", jwt.ValidateToken, controllerBusinessType.GetSettings);
router.post("/business-types/:id_business_type/settings", jwt.ValidateToken, controllerBusinessType.SaveSetting);

// Providers (Prestadores de Serviço)
router.get("/providers", jwt.ValidateToken, controllerProvider.List);
router.get("/providers/:id_provider", jwt.ValidateToken, controllerProvider.GetById);
router.post("/providers", jwt.ValidateToken, controllerProvider.Insert);
router.put("/providers/:id_provider", jwt.ValidateToken, controllerProvider.Update);
router.delete("/providers/:id_provider", jwt.ValidateToken, controllerProvider.Delete);
router.get("/providers/:id_provider/services", jwt.ValidateToken, controllerProvider.ListServices);
router.post("/providers/:id_provider/services", jwt.ValidateToken, controllerProvider.AddService);
router.delete("/providers/:id_provider/services/:id_service", jwt.ValidateToken, controllerProvider.RemoveService);

// Users
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

// rotas do admin para doctors (legado)
router.get("/admin/doctors", jwt.ValidateToken, controllerDoctorAdmin.List);
router.get("/admin/doctors/:id_doctor", jwt.ValidateToken, controllerDoctorAdmin.ListId);
router.put("/admin/doctors/:id_doctor", jwt.ValidateToken, controllerDoctorAdmin.EditDoctor);
router.post("/admin/doctors", jwt.ValidateToken, controllerDoctorAdmin.InsertDoctor);
router.delete("/admin/doctors/:id_doctor", jwt.ValidateToken, controllerDoctorAdmin.DeleteDoctor);

// rotas admin appointment get
router.get("/admin/appointments", jwt.ValidateToken, controllerAppointmentAdmin.Listar);
router.get("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointmentAdmin.ListarId);

// rotas admin appointments post / put / delete
router.post("/admin/appointments", jwt.ValidateToken, controllerAppointmentAdmin.InserirAdmin);
router.put("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointmentAdmin.EditarAdmin);
router.delete("/admin/appointments/:id_appointment", jwt.ValidateToken, controllerAppointmentAdmin.ExcluirAdmin);

// Admin Business Types (Tipos de Negócio para Administradores)
router.get("/admin/business-types", jwt.ValidateToken, controllerBusinessType.List);
router.get("/admin/business-types/:id_business_type", jwt.ValidateToken, controllerBusinessType.GetById);
router.post("/admin/business-types", jwt.ValidateToken, controllerBusinessType.Insert);
router.put("/admin/business-types/:id_business_type", jwt.ValidateToken, controllerBusinessType.Update);
router.delete("/admin/business-types/:id_business_type", jwt.ValidateToken, controllerBusinessType.Delete);
router.get("/admin/business-types/:id_business_type/settings", jwt.ValidateToken, controllerBusinessType.GetSettings);
router.post("/admin/business-types/:id_business_type/settings", jwt.ValidateToken, controllerBusinessType.SaveSetting);

// Admin Providers (Prestadores de Serviço para Administradores)
router.get("/admin/providers", jwt.ValidateToken, controllerProvider.List);
router.get("/admin/providers/:id_provider", jwt.ValidateToken, controllerProvider.GetById);
router.post("/admin/providers", jwt.ValidateToken, controllerProvider.Insert);
router.put("/admin/providers/:id_provider", jwt.ValidateToken, controllerProvider.Update);
router.delete("/admin/providers/:id_provider", jwt.ValidateToken, controllerProvider.Delete);
router.get("/admin/providers/:id_provider/services", jwt.ValidateToken, controllerProvider.ListServices);
router.post("/admin/providers/:id_provider/services", jwt.ValidateToken, controllerProvider.AddService);
router.delete("/admin/providers/:id_provider/services/:id_service", jwt.ValidateToken, controllerProvider.RemoveService);

export default router;