import bcrypt from "bcryptjs";
import { pool } from "../../db";


const loginUserIntoApp =async (payload: {email: string, password: string})=>{
    //checking the user exists on database
    //check if the password match
    //check the user status
    //if pass all then generate token

    const {email, password} = payload
    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        
        `,[email])
        // console.log(user.rows[0])
        if(user.rowCount === 0){
            throw new Error("invalid user")
        }

        const matchPassword = await bcrypt.compare(password, user.rows[0].password)

         if(!matchPassword){
            throw new Error("invalid credential")
        }

         if(!user.rows[0].is_active){
            throw new Error("user is not active")
        }



}

export const authService = {
    loginUserIntoApp
}