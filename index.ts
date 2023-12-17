import dotenv from "dotenv"
dotenv.config()
import express from "express"
import userRouter from "./src/user/routes/user_router"
const app = express()
app.use(express.json())
app.use(userRouter)
export {app}