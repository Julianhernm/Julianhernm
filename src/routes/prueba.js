import { Router } from "express";
import { profile } from "../controller/controller.js";

const router = Router();

router.get("/prueba", profile)


export default router