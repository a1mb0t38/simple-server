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






app.get("/api/v1/users/:id", async(req: Request, res: Response)=>{
  try {
    const {id} = req.params
    const result = await pool.query(`
      SELECT * FROM users WHERE ID = $1
      
      `,[id])

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
})

app.put("/api/v1/users/:id", async(req: Request, res: Response)=>{
  try {
    const {id} = req.params
    const {name, password, age, is_active} = req.body
    const result = await pool.query(`
      UPDATE users SET
      name = COALESCE($1, name),
      password = COALESCE($2, password),
      age = COALESCE($3, age),
      is_active = COALESCE($4, is_active),
      updated_at = NOW()
      WHERE id=$5 RETURNING *
      
      `,[name ?? null, password ?? null, age ?? null, is_active ?? null, id],)
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
})

export default app;