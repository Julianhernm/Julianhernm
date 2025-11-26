import Sequelize from "sequelize";
import { config } from "./env.js";

export const sequelize = new Sequelize(
    config.database.db,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: "mysql"
    }
)
