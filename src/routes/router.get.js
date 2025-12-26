import { Router } from "express";
import { login, homePage, register, createTemplate } from "../controller/controller.js";
import { authMiddleware, loginMiddleware } from "../controller/controller.auth.js";

const router = Router();

// Para login y register, usar loginMiddleware que redirige si ya estás autenticado
router.get("/login", loginMiddleware, login);
router.get("/register", loginMiddleware, register);

// Para rutas protegidas, usar authMiddleware que redirige si NO estás autenticado
router.get("/home", authMiddleware, homePage);
router.get("/create-template", authMiddleware, createTemplate)

export default router;