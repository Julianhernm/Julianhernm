import { sequelize } from "../config/connect.db.js";
import { DataTypes } from "sequelize";

export const templateSets = sequelize.define("TemplateSets",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    set_number:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    template_exercises_id:{
        type: DataTypes.INTEGER,
        references:{
            model: "template_exercises",
            key: "id"
        }
    }
}, {
    timestamps: false,
    tableName: "template_sets"
})