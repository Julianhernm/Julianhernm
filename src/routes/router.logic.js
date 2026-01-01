import { Router } from "express";
import { add, showTemplate, templateUsed } from "../controller/controller.logic.js";
import { createSessionController, deleteExerciseController, newTemplate } from "../controller/controller.logic.js";
import { authMiddleware } from "../controller/controller.auth.js";

const router = Router()

router.post("/add_exercises", authMiddleware, add)
router.post("/create-session", authMiddleware, createSessionController)
router.delete("/delete-exercise", authMiddleware, deleteExerciseController)
router.post("/new-template", authMiddleware, newTemplate)
router.post("/show-template", authMiddleware,showTemplate)
router.post("/template-use/:id", authMiddleware, templateUsed)

export default router 