import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body)
  try {
    const result = await userService.userIntoDB(req.body)

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