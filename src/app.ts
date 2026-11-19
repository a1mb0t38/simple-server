import express, { type Application, type Request, type Response } from "express";
import { pool } from "./db";
import config from "./config";
import { userRoute } from "./modules/users/user.route";


const app: Application = express();
// const port = 3000;

app.use(express.json());
// app.use(express.text)
// app.use(express.urlencoded({extended: true}))

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

export default app;