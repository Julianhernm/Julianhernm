import { verify } from "../repositories/user.repository.js";
import { comparePassword } from "../config/bcrypt.js";
import { logger } from "../config/logging.js";
import { signAccessToken, signRefreshToken } from "../config/jwt.js";
import validator from "validator"
import { config } from "../config/env.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //verificar que sea un email
        if (!validator.isEmail(email)) return res.json({ message: "Email or password incorect" });

        //verificar si existe el email
        const user = await verify(email);
        if (!user) return res.status(404).json({ message: "Email or password incorrect" });


        //comparar contraseña
        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ succes: false, message: "Email or password incorrect" });

        //Generar tokens
        const accessToken = await signAccessToken({email:user.email, userId: user.id});

        const refreshToken = await signRefreshToken({email:user.email, userId: user.id});

        //Enviar token en cookies
        res.cookie("refreshToken", refreshToken,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 *60 * 24 * 7
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            expiresIn: config.jwt.access.expiresIn,
            user:{
                id: user.id,
                email: user.email
            }
        })

    } catch (error) {
        logger.error(error);
        return res.status(500).json({succes: false, message: "Server Error"})
    }
}