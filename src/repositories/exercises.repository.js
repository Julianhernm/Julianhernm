import { exercises } from "../models/exercise.js";
import { users } from "../models/users.js";

export const all = async ()=>{
    const user = await users.findAll({where: {name: "some 2"}})
    return user
}

export const addExercise = async (user_id, name, created_at)=>{
    const result = await exercises.create({user_id, name, created_at});
    return result
}