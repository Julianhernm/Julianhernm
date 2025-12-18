import { templateWorkout } from "../models/template.workout.js";
import { templateExercises } from "../models/template.exercises.js";
import { templateSets } from "../models/template.sets.js";
import { sequelize } from "../config/connect.db.js";

export const createTemplate = async (user_id,name, Exercises) => {

    const t = await sequelize.transaction()

    try {
        const workoutTemplate = await templateWorkout.create({
            user_id,
            created_at: new Date(),
            name,
        }, {
            transaction: t

        })

        //Crear ejercicios
        const exercisesToInsert = Exercises.map(ex=>({
            id_workout: workoutTemplate.id,
            exercise_name: ex.exercise,
            date: new Date()
        }))

        const exercisesTamplate = await templateExercises.bulkCreate(exercisesToInsert, { transaction: t , returning: true});

        //Crear sets
        const setsToInsert = []

        Exercises.forEach((exercise, index) => {
            exercise.sets.forEach((_, setIndex)=>{
                setsToInsert.push({
                    template_exercises_id: exercisesTamplate[index].id,
                    set_number: setIndex + 1
                })
            })
        })

        const setsTamplate = await templateSets.bulkCreate(setsToInsert, { transaction: t })

        await t.commit()

        return workoutTemplate
    } catch (error) {
        await t.rollback()
        console.error(error);
        throw error;
    }
}