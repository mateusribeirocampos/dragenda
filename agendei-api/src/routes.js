import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js"; 

const router = Router();

// Doctors
router.get("/doctors", controllerDoctor.Listar);
router.post("/doctors", controllerDoctor.Inserir);
router.put("/doctors/:id_doctors", controllerDoctor.Editar);
router.delete("/doctors/:id_doctors", controllerDoctor.Excluir);

// User...



// Reservas (appintments)...




// Services (serviços prestados)...




export default router;