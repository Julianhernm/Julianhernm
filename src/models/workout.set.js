import { sequelize } from "../config/connect.db.js";
import { DataTypes } from "sequelize";
import { workout_session } from "./workout.session.js";
import { exercises } from "./exercise.js";

export const workout_sets = sequelize.define("WorkoutSets",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    session_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    exercises_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reps:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight:{
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0
    },
    set_number:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: "workout_sets",
    timestamps: false
})




