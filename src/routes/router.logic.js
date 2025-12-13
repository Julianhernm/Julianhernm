import { Router } from "express";
import { add } from "../controller/controller.logic.js";
import { createSessionController } from "../controller/controller.logic.js";

const router = Router()

router.post("/add_exercises", add)
router.post("/create-session", createSessionController)

export default router