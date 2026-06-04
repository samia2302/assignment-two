import express, { type Application, type Request, type Response } from "express"
import { pool } from "./db";

const app: Application = express()


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}))






app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    "message": "express server",
    "author": "next level"
  })
})


app.post("/", async(req: Request, res: Response)=>{
       const {name, email, password, role} = req.body;

try {
    const result = await pool.query(`
    INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *
    `,[name,email,password,role])

       res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        data: result.rows[0]
       })
} catch (error: any) {
    res.status(500).json({
        success: false,
        message: error.message,
        error: error,
       })
}


})


export default app