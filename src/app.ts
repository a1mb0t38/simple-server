import express, { type Application, type NextFunction, type Request, type Response } from "express";
import { pool } from "./db";
import config from "./config";
import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authroute } from "./modules/auth/auth.route";
import { METHODS } from "http";
import fs from "fs"
import logger from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cors from "cors"
import cookieParser from "cookie-parser";


const app: Application = express();
// const port = 3000;

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())
// app.use(express.text)
// app.use(express.urlencoded({extended: true}))

// app.use((req: Request, res: Response, next: NextFunction)=>{
//   // console.log("Time:", req.method, req.url, Date.now())
  
// })
app.use(logger)

app.get("/", (req: Request, res: Response) => {
  // console.log(req)
  // res.send('Hello World!')
  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "Noor",
  });
});

app.use("/api/v1/users", userRoute)
app.use("/api/v1/profiles", profileRoute)
app.use("/api/v1/auth", authroute)

app.use(globalErrorHandler)

export default app;