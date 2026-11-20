import type { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
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
  next();
};

export default auth;
