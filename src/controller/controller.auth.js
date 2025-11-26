import { hashPassword, comparePassword } from "../config/bcrypt";
import validator from "validator"

export const login = async (req, res, next)=>{
    const { email, password } = req.body;

    try {
        if(!validator.isEmail(email)) return res.json({message: "incorrect format email"});
        

    } catch (error) {
        
    }
}