import { logger } from "../config/logging.js"

export const login =  (req, res)=>{
    logger.warn("no puede ser")     
    res.render("pages/login", {layout: false})
}

export const home = (req, res)=>{
    logger.warn("pasaste")
    res.render("pages/home", { layout: false})
}

export const register = (req, res)=>{
    res.render("pages/register", { layout: false})
}

export const prueba = (req, res)=>{
    res.render("pages/profile", { layout: false})
}