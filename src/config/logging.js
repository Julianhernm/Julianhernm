import winston from "winston";
import { config } from "./env.js"

const  { combine, timestamp,printf, colorize} = winston.format


const customFormat = printf(({level, message, timestamp}) =>{
    return `[${timestamp}] ${level}: ${message}`
})

export const logger = winston.createLogger({
    level: config.logging.level,

    format: combine(
        timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        customFormat
    ),
    
    transports:[
        new winston.transports.Console({
            format: combine(
                colorize({all: true}),
                timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                customFormat
            )
        })
    ]
});