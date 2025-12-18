import { exercises } from "../models/exercise.js";
import { users } from "../models/users.js";
import { sequelize } from "../config/connect.db.js";

export const all = async () => {
    const user = await users.findAll({ where: { name: "some 2" } })
    return user
}

export const addExercise = async (user_id, name, created_at) => {
    const result = await exercises.create({ user_id, name, created_at });
    return result
}

export const destroyExercises = async (id, name) => {
    const transactions = await sequelize.transaction();

    try {

        const result = await exercises.destroy({
            where: { id, name },
            transaction: transactions
        })

        if(result === 0){
            await transactions.rollback()
            return 0
        }

        await transactions.commit();
        return result
    } catch (error) {
        await transactions.rollback();
        throw error
    }
}
