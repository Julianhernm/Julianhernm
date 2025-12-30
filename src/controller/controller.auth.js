import { verify, registerUser, verifyById } from "../repositories/user.repository.js";
import { comparePassword, hashPassword } from "../config/bcrypt.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../config/jwt.js";
import validator from "validator";
import { config } from "../config/env.js";
import ms from "ms";

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // validar email
        if (!validator.isEmail(email)) return res.json({ message: "Email or password incorrect" });

        // buscar usuario
        const user = await verify(email);
        if (!user) return res.status(404).json({ success: false, message: "Email or password incorrect" });

        // comparar contraseña
        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ success: false, message: "Email or password incorrect" });

        // crear tokens
        const accessToken = await signAccessToken({ name: user.name ,email: user.email, userId: user.id });
        const refreshToken = await signRefreshToken({name: user.name, email: user.email, userId: user.id });

        // guardar tokens en cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        res.status(200).json({ success: true, refreshToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Registro
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // validar email
        if (!validator.isEmail(email)) return res.json({ success: false, message: "Email or password incorrect" });

        // verificar si ya existe
        const user = await verify(email);
        if (user) return res.status(400).json({ success: false, message: "Email already exists" });

        // encriptar contraseña
        const passwordHash = await hashPassword(password);

        // crear usuario
        const newUser = await registerUser(name, email, passwordHash);

        // crear tokens
        const accessToken = await signAccessToken({name: newUser.name,email: newUser.email, userId: newUser.id });
        const refreshToken = await signRefreshToken({name: newUser.name,email: newUser.email, userId: newUser.id });

        // guardar tokens en cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // respuesta
        return res.status(200).json({
            success: true,
            message: "register successful",
            accessToken,
            expiresIn: ms(config.jwt.access.expiresIn),
            user: {
                name: newUser.name,
                id: newUser.id,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Middleware de auth
export const authMiddleware = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    // si no hay token, redirigir
    if (!refreshToken) return res.redirect("/login");

    try {
        // verificar token
        const decodedRefresh = await verifyRefreshToken(refreshToken);

        if(await verifyById(decodedRefresh.userId) === null){
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken")
            return res.redirect("/login")
        }
        req.user = decodedRefresh;

        next();
    } catch (error) {
        // limpiar cookies malas
        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        };
        
        res.clearCookie("refreshToken", cookieOptions);
        res.clearCookie("accessToken", cookieOptions);

        return res.redirect("/login");
    }
};

// Refresh token
export const refreshToken = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Refresh token required" });
        }

        // verificar refresh token
        const decoded = await verifyRefreshToken(token);

        // nuevo access token
        const newAccessToken = await signAccessToken({
            email: decoded.email,
            userId: decoded.id
        });

        res.json({
            success: true,
            accessToken: newAccessToken,
            expiresIn: config.jwt.access.expiresIn
        });
    } catch (error) {
        res.status(403).json({ success: false, message: "Invalid refresh token" });
    }
};

// Logout
export const logout = (req, res) => {
    // limpiar cookie
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    res.redirect("/login")
};

// Middleware de login
export const loginMiddleware = async (req, res, next) => {
    const token = req.cookies.refreshToken;

    if (!token) return next();

    try {
        // verificar token
        const decoded = await verifyRefreshToken(token);

        //verificar por Id si exisite en la base de datos
        if(await verifyById(decoded.userId) !== null) return res.redirect("/home")

        // si es válido, redirigir a home
        req.user = decoded;
        return next()
    } catch (error) {
        // limpiar cookie mala y seguir
        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        };

        res.clearCookie("refreshToken", cookieOptions);
        return next();
    }
};