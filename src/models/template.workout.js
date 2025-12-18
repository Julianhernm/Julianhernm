import { sequelize } from "../config/connect.db.js";
import { DataTypes } from "sequelize";

export const templateWorkout = sequelize.define("TemplateWorkout",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
            model: "users",
            key: "id"
        },
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
    },
    name:{
        type: DataTypes.STRING,
    },
    deleted_at: {
        type: DataTypes.DATE,
    }
},{
    tableName: "template_workout",
    timestamps: false
})