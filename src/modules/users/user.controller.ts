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

const getUser = async(req: Request, res: Response)=>{
  try {
    const result = await userService.getUserInfo()
      // console.log(result)
      res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
}

const getUserById = async(req: Request, res: Response)=>{
  try {
    // const {id} = req.params
    const result = await userService.getUserIdInfo(req.params)

    // console.log(result)
    res.status(200).json({
      success: true,
      message: "single user fetched successfully",
      data: result.rows[0],
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
}

const UpdateUserById = async(req: Request, res: Response)=>{
  try {
    const {id} = req.params
    // const {name, password, age, is_active} = req.body
    const result = await userService.updateUserById(req.body, id)
      // console.log(result)
      res.status(200).json({
      success: true,
      message: "single user updated successfully",
      data: result.rows,
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
    createUser,
    getUser,
    getUserById,
    UpdateUserById
}