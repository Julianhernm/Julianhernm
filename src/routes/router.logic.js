import { Router } from "express";
import { add } from "../controller/controller.logic.js";
import { createSessionController, deleteExerciseController, newTemplate} from "../controller/controller.logic.js";


const router = Router()

router.post("/add_exercises", add)
router.post("/create-session", createSessionController)
router.delete("/delete-exercise", deleteExerciseController)
router.post("/new-template", newTemplate)
export default router 