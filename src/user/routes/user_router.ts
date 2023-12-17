import express, { Response,Request, NextFunction } from "express"
import { UserController } from "../controllers/user_controller"
import { UserRepositoryImpl } from "../../model/repositories/user/user_repo"
import { userModel } from "../../model/mongo_models/mongoose_model"
const userRouter = express.Router()
const basepath = "/t/f/auth/"
const userController = new UserController(new UserRepositoryImpl(userModel))
userRouter.post(`${basepath}create`,(req,res,next)=>userController.validateUser(req,res,next),(req,res)=>userController.createUser(req,res))
userRouter.get(`${basepath}/authenticate`,userController.auth)
userRouter.get(`${basepath}/delete_account/:id`,(req:Request,res:Response,next:NextFunction)=>userController.validateId(req,res,next),(req:Request,res:Response)=>userController.createUser(req,res))
userRouter.get(`${basepath}/update`,(req:Request,res:Response,next)=>userController.validateUser(req,res,next),(req,res)=>userController.update(req,res))
userRouter.get(`${basepath}/refresh`,(req:Request,res:Response)=>userController.refreshToken(req,res))

export default userRouter