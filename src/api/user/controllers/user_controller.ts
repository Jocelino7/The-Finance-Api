import jsonwebtoken from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../../model/repositories/user/user_repo";
import { userYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation";
import { generateToken, generateteRefreshToken } from "../../../utils/helpers";

export class UserController {
    private  secretRefreshToken = process.env.REFRESH_TOKKEN_SECRET!
    private userRepo:UserRepository
    constructor(repo: UserRepository) {
        console.log(repo)
        this.userRepo = repo
    }
    async deleteUser(req:Request,res:Response){
        try{
            const {id} = req.params
            await this.userRepo.deleteUser(id)
            return res.sendStatus(200)
        }
        catch(e:any){
            console.log(e)
            return res.sendStatus(500)
        }
    }
     async createUser(req: Request, res: Response) {
        try {
            await this.userRepo.createUser(req.body)
            return res.sendStatus(201)

        } catch (e) {
            console.error(e)
            return res.status(500).send("Error while creating user")
        }
    }
    async update(req:Request,res:Response){
        try {
            await this.userRepo.updateUser(req.body)
            return res.sendStatus(200)
        }
        catch(e:any){
            console.error(e)
            return res.status(500)
        }
    }
    
     async validateUser(req: Request, res: Response, next: NextFunction) {
        try {
            userYupSchema.validate(req.body)
            next()
        }
        catch (e: any) {
            console.error(e)
            const message = e.errosrs[0]
            return res.status(400).json({message})
        }
    }
    validateId(req:Request,res:Response,next:NextFunction){
        const {id} = req.params
        if(!id)
            return res.status(400).json({message:"Id was not provided"})
        next()
    }
     async auth(req: Request, res: Response) {
       
        const user = await this.userRepo.authUser(req.body)
        if (!user)
            return res.sendStatus(401)
        const userPayLoad = req.body
        const token = generateToken(userPayLoad)
        const refreshToken = generateteRefreshToken(userPayLoad)
        res.status(200).json({
            token,
            refreshToken
        })
    }
    
   
     async refreshToken(req: Request, res: Response) {
        try {
            const jwt = jsonwebtoken
            const refreshToken = req.headers["authorization"]
            if(!refreshToken)
                return res.sendStatus(401)
            jwt.verify(refreshToken, this.secretRefreshToken)
            const token = generateToken(req.body)
            return res.status(200).json({
                token,
                refreshToken
            })
        }
        catch (e) {
            return res.sendStatus(403)
        }

    }
}