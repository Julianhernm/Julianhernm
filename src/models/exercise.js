import { model } from "../config/connect.db.js";

export const result = async (email)=>{
    const sql = "SELECT * FROM users";

    const results = await model.query(sql);
    return [results]
}