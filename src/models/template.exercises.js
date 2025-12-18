import { sequelize } from "../config/connect.db.js";
import { DataTypes } from "sequelize";

export const templateExercises = sequelize.define("templateExercises", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    id_workout: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "template_workout",
            key: "id"
        }
    },
    exercise_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false,
    tableName: "template_exercises"
})