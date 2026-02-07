import { Router } from "express";
import { login, homePage, register, createTemplate, useTemplate, statics } from "../controller/controller.js";
import { authMiddleware, loginMiddleware } from "../controller/controller.auth.js";

const router = Router();

// for login and register, use loginMiddleware that redirects if user is already authenticated
router.get("/login", loginMiddleware, login);
router.get("/register", loginMiddleware, register);

// For protected routes, use authMiddleware that redirects if user is not authenticated
router.get("/home", authMiddleware, homePage);
router.get("/create-template", authMiddleware, createTemplate)
router.get("/home/workout/:id", authMiddleware, useTemplate);
router.get("/home/history/statistics/:template_id", statics)

export default router;