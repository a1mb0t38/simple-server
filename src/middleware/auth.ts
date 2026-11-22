import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { pool } from "../db";

const auth = (...roles: any) =>{
  return async(req: Request, res: Response, next: NextFunction) => {
    // console.log(roles)
  //1. check if the token exist
  // console.log("this is protected route")
  // console.log(req.headers.authorization)
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    //   data: result.rows[0],
    });
  }

  const decode = jwt.verify(token as string, config.jwt_secret) as JwtPayload

  // console.log(decode)
  const user = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `,[decode.email])

    // console.log(user.rows[0])
    if(user.rowCount === 0){
      res.status(404).json({
      success: false,
      message: "user not found",
    //   data: result.rows[0],
    });
    }

    if(!user.rows[0].is_active){
      res.status(403).json({
      success: false,
      message: "forbidden",
    //   data: result.rows[0],
    });
    }

    if(roles.length && !roles.includes(user.rows[0].role)){
      res.status(401).json({
      success: false,
      message: "Unauthorized access",
    //   data: result.rows[0],
    });
    }

    req.user = decode;
    // console.log(req)

  next();
};
}

export default auth;
