import { sequelize } from "../config/connect.db.js";
import { DataTypes } from "sequelize";

export const users = sequelize.define("User",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{isEmail: true}
    },
    password_hash:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    tableName: "users",
    timestamps: false
})



