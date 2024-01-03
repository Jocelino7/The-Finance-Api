import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import express, { NextFunction, Request, Response } from "express"
import userRouter from "./src/api/user/routes/user_router"
import goalRoute from "./src/api/goals/routes/goal_route"
import transactionRoute from "./src/api/transactions/routes/transaction_route"
import sourceFundRoute from "./src/api/sourceFund/routes/source_fund_router"
import categoryRoute from "./src/api/category/routes/category_route"
import { internalServerError } from "./src/utils/constants"
import { connectToRedis } from "./src/config/redis_config"
const app = express()
connectToRedis()
app.use((e:Error,req:Request,res:Response,next:NextFunction)=>{
    console.error(e.stack)
    res.status(500).json({
        messgae:internalServerError
    })

})
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(goalRoute)
app.use(transactionRoute)
app.use(sourceFundRoute)
app.use(categoryRoute)
export {app}