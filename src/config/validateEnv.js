import Joi from "joi";

/**
 * Esquema para Todas las variables de entorno.
 * Si el algo falta, el servidor NO arranca
 */

const envschema = Joi.object({
    //============
    //APLICACIÓN
    //============
    NODE_ENV: Joi.string()
        .valid("development", "production", "test")
        .default("development"),
    
    PORT: Joi.number().default(3000),
    APP_NAME: Joi.string().default("multitenant"),


    //============
    //BASE DE DATOS
    //============
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().allow(""),
    DB_NAME: Joi.string().required(),


    //============
    //JWT
    //============
    JWT_ACCESS_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRES: Joi.string().default("15m"),

    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_REFRESH_EXPIRES: Joi.string().default("7d"),


    //============
    //SEGURIDAD
    //============
    CORS_ORIGIN: Joi.string().required(),

    RATE_LIMIT_WINDOW: Joi.string()
        .pattern(/^\d+(s|m|h|d)$/)
        .required()
        .default("15m"),

    RATE_LIMIT_MAX: Joi.number().default(100),
    SPEED_LIMIT_DEALY: Joi.number().default(1000),


    //============
    //LOGGING
    //============
    LOG_LEVEL: Joi.string()
        .valid("debug", "info", "warn", "error")
        .default("debug"),
    
    LOG_FORMAT: Joi.string()
        .valid("json","prettyPrint", "simple")
        .default("json"),
}).unknown(true);


//Valida el objeto process.env completo
export function validateEnv(env = process.env){
    const { error, value } = envschema.validate(env, {
        abortEarly: false
    });

    if(error){
        console.error("Error en archivo .env");
        error.details.forEach(d => console.error(" -", d.message));
        process.exit(1);    
    }

    return value
}