import { Router } from "express";
import { add, showTemplate } from "../controller/controller.logic.js";
import { createSessionController, deleteExerciseController, newTemplate, showId } from "../controller/controller.logic.js";
import { authMiddleware } from "../controller/controller.auth.js";

const router = Router()

router.post("/add_exercises", authMiddleware, add)
router.post("/create-session", authMiddleware, createSessionController)
router.delete("/delete-exercise", authMiddleware, deleteExerciseController)
router.post("/new-template", authMiddleware, newTemplate)
router.post("/show-template", authMiddleware,showTemplate)
router.post("/get-id", authMiddleware,showId)

export default router 