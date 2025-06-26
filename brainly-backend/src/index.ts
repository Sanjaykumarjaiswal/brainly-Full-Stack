import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import { connectDB } from "./db"
import { router } from "./routes/routes"
import cors from "cors"
import helmet from "helmet";

const app = express()
app.use(express.json())
app.use(helmet());
app.use(cors({
      origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
    }))
app.use("/api/v1",router)
connectDB()
.then(()=>{
    console.log("DB has successfully connected");
    app.listen(3000,()=>{
        console.log("server is listening succesfully on port 3000");
    })
})

