import dotenv from "dotenv";
dotenv.config();
import { validateEnv } from "./validateEnv.js";

const env = validateEnv();

export const config = {
    app: {
        name: env.APP_NAME,
        env: env.NODE_ENV,
        port: env.PORT
    },

    database:{
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        name: env.DB_NAME
    },

    jwt:{
        access:{
            secret: env.JWT_ACCESS_SECRET,
            expiresIn: env.JWT_ACCESS_EXPIRES
        },
        refresh:{
            secret: env.JWT_REFRESH_SECRET,
            expiresIn: env.JWT_REFRESH_EXPIRES
        }
    },

    security:{
        corsOrigin: env.CORS_ORIGIN,
        rateLimit:{
            window: env.RATE_LIMIT_WINDOW,
            max: env.RATE_LIMIT_MAX
        },
        speedLimit:{
            delay: env.SPEED_LIMIT_DELAY
        }
    },

    logging:{
        level: env.LOG_LEVEL,
        format: env.LOG_FORMAT
    }
};