import { Router } from "express";
import { login, refreshToken, register, logout} from "../controller/controller.auth.js";

const router = Router();

router.post("/login", login)
router.post("/register", register)
router.post("/refresh-token", refreshToken)
router.post("/logout", logout)

export default router
