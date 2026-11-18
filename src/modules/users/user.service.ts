import { pool } from "../../db";
import type { IUser } from "./user.interface";


const userIntoDB = async(payload: IUser) =>{
    const { name, email, password, age } = payload;
    // console.log(password)

    const result = await pool.query(
      `
      INSERT INTO users(name, email, password, age) VALUES ($1,$2,$3,$4) RETURNING *
      
      `,
      [name, email, password, age],
    );
    return result
}

const getUserInfo = async() =>{
    const result = await pool.query(`
      SELECT * FROM users
      `)
      return result
}

export const userService = {
    userIntoDB,
    getUserInfo
}