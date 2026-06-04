import express, { type Application, type Request, type Response } from "express"
import {Pool} from "pg"

const app: Application = express()
const port = 3000

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}))


const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_hbrPCa9cEKV4@ep-billowing-union-aqcmbd7b-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})


const initDB = async()=> {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(20) DEFAULT 'contributor',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)

            console.log("database connected successfully");
    } catch (error) {
        console.log(error)
    }
};
initDB()


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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})