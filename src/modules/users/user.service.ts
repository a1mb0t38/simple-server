import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";


const userIntoDB = async(payload: IUser) =>{
    const { name, email, password, age } = payload;
    // console.log(password)

    const hashPassword = await bcrypt.hash(password, 10)
    // console.log(hash)

    const result = await pool.query(
      `
      INSERT INTO users(name, email, password, age) VALUES ($1,$2,$3,$4) RETURNING *
      
      `,
      [name, email, hashPassword, age],
    );

    delete result.rows[0].password //this is for now showing the password in data. not to delete the password.

    return result
}

const getUserInfo = async() =>{
    const result = await pool.query(`
      SELECT * FROM users
      `)
      return result
}

const getUserIdInfo = async(payload: any) =>{
    const {id} = payload;
    const result = await pool.query(`
      SELECT * FROM users WHERE ID = $1
      
      `,[id])
    
    return result
}

const updateUserById = async(payload: IUser, id: any) =>{

  const {name, password, age, is_active} = payload

  const result = await pool.query(`
      UPDATE users SET
      name = COALESCE($1, name),
      password = COALESCE($2, password),
      age = COALESCE($3, age),
      is_active = COALESCE($4, is_active),
      updated_at = NOW()
      WHERE id=$5 RETURNING *
      
      `,[name ?? null, password ?? null, age ?? null, is_active ?? null, id],)

      return result
}

export const userService = {
    userIntoDB,
    getUserInfo,
    getUserIdInfo,
    updateUserById
}