import { users } from "../models/users.js";

export const verify = async (email) => {
    try {
        const result = await users.findOne({
            where: {email},
            attributes: ["email", "password_hash", "id"]
        })
        return result
    } catch (error) {
        throw new Error("error al consultar")
    }
}