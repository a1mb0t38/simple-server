import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";


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

        const jwtPayload = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email
        }

        const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {expiresIn:"1d",})
        return {accessToken, user: user.rows[0]}

}

export const authService = {
    loginUserIntoApp
}