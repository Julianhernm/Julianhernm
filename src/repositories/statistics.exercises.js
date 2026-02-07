import { workout_session } from "../models/workout.session.js";
import { exercises } from "../models/exercise.js";
import { workout_sets } from "../models/workout.set.js";
import { templateWorkout } from "../models/template.workout.js";

//get statics
export const getStatics = async (idTemplate, userId) => {
  try {
    const result = await workout_session.findAll({
      where: { user_id: userId },
      attributes: ["id"],
      include: [
        {
          model: workout_sets,
          attributes: ["set_number", "reps", "weight"],
          include: [
            {
              model: exercises,
              attributes: ["name"],
            },
          ],
        },
        {
          model: templateWorkout,
          attributes: ["id"],
          where: { id: idTemplate },
        },
      ],
    });

    return result;
  } catch (error) {
    throw error;
  }
};
