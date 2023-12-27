import express, { Response,Request, NextFunction } from "express"
import { UserController } from "../controllers/user_controller"
import { UserRepositoryImpl } from "../../../model/repositories/user/user_repo"
import { userModel } from "../../../model/mongo_models/mongoose_model"
import { userValidationMdw } from "../validation_midleware/user_validation_midleware"
const route = express.Router()
const basepath = "/t/f/auth/"
const userController = new UserController(new UserRepositoryImpl(userModel))
route.post(`${basepath}create`,userValidationMdw,(req,res)=>userController.createUser(req,res))
route.post(`${basepath}authenticate`,(req:Request,res:Response)=>userController.auth(req,res))
route.get(`${basepath}delete_account/:id`,(req:Request,res:Response,next:NextFunction)=>userController.validateId(req,res,next),(req:Request,res:Response)=>userController.createUser(req,res))
route.get(`${basepath}update`,(req:Request,res:Response,next)=>userController.validateUser(req,res,next),(req,res)=>userController.update(req,res))
route.get(`${basepath}refresh`,(req:Request,res:Response)=>userController.refreshToken(req,res))
export default route