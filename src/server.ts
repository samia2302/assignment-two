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


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    "message": "express server",
    "author": "next level"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})