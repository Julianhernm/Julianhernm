import Sequelize from "sequelize";
import { logger } from "./logging.js";
import { config } from "./env.js";

export const sequelize = new Sequelize(
    config.database.db,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: "mysql",
        timezone: "-06:00"
    }
)

export const initDB = async()=>{
    try {
        await sequelize.authenticate();
        logger.info("successful connection to the DB");

        await sequelize.sync({alter: false});
        logger.info("synchronized models");
    } catch (error) {
        logger.error("Error connecting to DB")
        console.error(error)
    }
}

