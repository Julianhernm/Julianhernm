import { Router } from "express"
import {home, register, login} from "../controller/controller.js"


const router = Router();

router.get("/login", home)
router.get("/register", register)

router.post("/login", login)
export default router