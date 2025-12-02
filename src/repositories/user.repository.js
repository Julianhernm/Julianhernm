import { users } from "../models/users.js";
import { logger } from "../config/logging.js";

export const verify = async (email) => {

    try {
        return await users.findOne({
            where: {email},
            attributes: ["email", "password_hash", "id"]
        })

    } catch (error) {
        logger.error("error al consultar")
        throw console.error(error)
    }
}

export const registerUser = async (name, email, password)=>{

    try {
        return await users.create({
            name,
            email, 
            password_hash: password
        })
    } catch (error) {
        logger.error("error al consultar")
        throw console.error(error)
    }
}