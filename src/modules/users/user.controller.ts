import type { Request, Response } from "express";
import { pool } from "../../db";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body)
  try {
    const { name, email, password, age } = req.body;
    // console.log(password)

    const result = await pool.query(
      `
      INSERT INTO users(name, email, password, age) VALUES ($1,$2,$3,$4) RETURNING *
      
      `,
      [name, email, password, age],
    );

    // console.log(result)

    res.status(201).json({
      success: true,
      message: "user created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
}

export const userController = {
    createUser
}