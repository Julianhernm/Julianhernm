import jwt from "jsonwebtoken";
import { env } from "./env.js";

//Genera un ACCESS TOKEN válido
export function signAccessToken(payload){
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRES
    });
}

//Genera un REFRESH TOKEN válido
export function signRefreshToken(payload){
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES
    });
}

//Verifica un ACCESS TOKEN
export function verifyAccessToken(token){
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
}

//Verifica un REFRESH TOKEN
export function verifyRefreshToken(token){
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
}