import { workout_sets } from "../models/workout.set.js";
import { workout_session } from "../models/workout.session.js"
import { sequelize } from "../config/connect.db.js";

export const createWorkoutSession = async (userId, exercises) => {
    const transaction = await sequelize.transaction();
    try {
        const date = new Date();
        const session = await workout_session.create(
            { user_id: userId, date },
            { transaction }
        )

        const setsToInsert = [];

        for(const exercise of exercises){
            exercise.sets.forEach( (set, index) => {
                setsToInsert.push({
                    session_id: session.id,
                    exercise_id: exercise.exercise_id,
                    set_number: index + 1,
                    reps: set.reps,
                    weight: set.weight
                })
            });
        }

        await workout_sets.bulkCreate(setsToInsert, { transaction })

        await transaction.commit();

        return session
    } catch (error) {
        transaction.rollback()
        console.error(error)
    }
}

