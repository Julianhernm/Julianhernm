import { sequelize } from "../config/connect.db.js";
import { DataTypes } from "sequelize";

export const workout_session = sequelize.define("WorkoutSession",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    deleted_at:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    template_id:{
        type: DataTypes.INTEGER,
        default: 0
    }
},{
    tableName: "workout_session",
    timestamps: false
})