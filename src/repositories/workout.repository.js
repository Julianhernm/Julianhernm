import { workout_sets } from "../models/workout.set.js";
import { workout_session } from "../models/workout.session.js"
import { sequelize } from "../config/connect.db.js";
import { exercises } from "../models/exercise.js";
import { templateWorkout } from "../models/template.workout.js";
import { templateExercises } from "../models/template.exercises.js";
import { templateSets } from "../models/template.sets.js";
import { Sequelize } from "sequelize";

export const createWorkoutSession = async (userId, Exercises, templateId) => {
  const transaction = await sequelize.transaction();
  console.log(Exercises[0].sets)

  try {
    // CREAR SESIÓN
    const session = await workout_session.create(
      { user_id: userId, date: new Date(), template_id: templateId},
      { transaction }
    );

    // CREAR EJERCICIOS
    const exercisesToInsert = Exercises.map(ex => ({
      user_id: userId,
      session_id: session.id,
      name: ex.exercise,
      created_at: new Date(),
    }));

    const createdExercises = await exercises.bulkCreate(
      exercisesToInsert,
      { transaction, returning: true }
    );

    // CREAR SETS
    const setsToInsert = [];

    Exercises.forEach((ex, exerciseIndex) => {
      ex.sets.forEach((set, setIndex) => {
        setsToInsert.push({
          session_id: session.id,
          exercise_id: createdExercises[exerciseIndex].id,
          set_number: setIndex + 1,
          reps: set.reps,
          weight: set.weight
        });
      });
    });

    await workout_sets.bulkCreate(setsToInsert, { transaction });

    await transaction.commit();
    return session;

  } catch (error) {
    await transaction.rollback();
    console.error(error);
    throw error;
  }
};

export const useTemplates = async (workoutId) => {
  try {
    const id = await templateWorkout.findAll(
      {
        where: { id: workoutId },
        atributte: ["id", "name"],
        include: {
          model: templateExercises,
          required: true,
          atributte: ["id", "name"],
          include: {
            model: templateSets,
            required: true,
            attributes: ["set_number"]
          }
        }
      }
    )

    return id
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const sessions = async (userId) => {
  try {
    const data = await workout_session.findAll({
      where: {
        user_id: userId,
      },
      attributes: [
        "id",
        "created_at",
        "template_id",

        [
          sequelize.literal(`(
      SELECT COUNT(*)
      FROM exercises e
      WHERE e.session_id = WorkoutSession.id
    )`),
          "exercises_number",
        ],

        [
          sequelize.literal(`(
      SELECT SUM(wst.set_number)
      FROM workout_sets wst
      WHERE wst.session_id = WorkoutSession.id
    )`),
          "volum",
        ],
      ],
      order: [["created_at", "DESC"]],
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
