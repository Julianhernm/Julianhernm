import { exercises } from "./exercise.js";
import { workout_session } from "./workout.session.js";
import { workout_sets } from "./workout.set.js";
import { users } from "./users.js";
import { templateExercises } from "./template.exercises.js"
import { templateSets } from "./template.sets.js";
import { templateWorkout } from "./template.workout.js";

workout_session.belongsToMany(exercises, {
    through: workout_sets,
    foreignKey: "session_id",
    otherKey: "exercise_id"
})

exercises.belongsToMany(workout_session,{
    through: workout_sets,
    foreignKey: "exercise_id",
    otherKey: "session_id"
})

users.hasMany(exercises,{
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "CASCADE"
});

exercises.belongsTo(users,{
    foreignKey: "user_id",
    targetKey: "id"
})

users.hasMany(workout_session,{
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "CASCADE"
})

workout_session.belongsTo(users,{
    foreignKey: "user_id",
    targetKey: "id"
})

workout_sets.belongsTo(workout_session, {
    foreignKey: "session_id"
})

workout_sets.belongsTo(exercises, {
    foreignKey: "exercise_id"
})

workout_session.hasMany(workout_sets,{
    foreignKey: "session_id"
})

exercises.hasMany(workout_sets,{
    foreignKey: "exercise_id"
})


//template
users.hasMany(templateWorkout,{
    foreignKey: "user_id"
})

templateWorkout.belongsTo(users,{
    foreignKey: "user_id",
    targetKey: "id"
})


templateWorkout.hasMany(templateExercises,{
    foreignKey: "id_workout"
})

templateExercises.belongsTo(templateWorkout,{
    foreignKey: "id_workout",
    targetKey: "id"
})

templateExercises.hasMany(templateSets, {
    foreignKey: "template_exercises_id"
})

templateSets.belongsTo(templateExercises,{
    foreignKey: "template_exercises_id",
    targetKey: "id"
})


export {
    exercises,
    workout_session,
    workout_sets,
    users,
    templateExercises,
    templateWorkout,
    templateSets
}