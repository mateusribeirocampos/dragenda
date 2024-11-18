import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js"; 

const router = Router();

router.get('/doctors', controllerDoctor.Listar);

export default router;