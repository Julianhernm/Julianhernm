import { hashPassword, comparePassword } from "../config/bcrypt";
import { logger } from "../config/logging.js"
import validator from "validator"

export const login = async (req, res, next)=>{
    logger.info("Intento de login", { email: req.body})
    const { email, password } = req.body;

    try {
        if(!validator.isEmail(email)) return res.json({message: "incorrect format email"});
        

    } catch (error) {
        
    }
}