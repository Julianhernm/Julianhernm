import { Router } from "express";
import { login, home, register, prueba} from "../controller/controller.js";
import { authMiddleware, loginMiddleware} from "../controller/controller.auth.js";

const router = Router();

// Para login y register, usar loginMiddleware que redirige si ya estás autenticado
router.get("/login", loginMiddleware, login);
router.get("/register", loginMiddleware, register);

// Para rutas protegidas, usar authMiddleware que redirige si NO estás autenticado
router.get("/home", authMiddleware, home);
router.get("/prueba", authMiddleware, prueba);

export default router;