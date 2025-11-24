import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

//genera una contraseña encriptada
export async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS)
};

//compara contraseña encriptada
export async function comparePassword(password, compareHash) {
    return await bcrypt.compare(password, hashPassword);
}