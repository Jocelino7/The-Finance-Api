import jsonwebtoken from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../model/repositories/user/user_repo";
import { userYupSchema } from "../../model/schemas/user_schema";
import { UserCredential } from "../../model/dtos/dto";
import { userModel } from "../../model/mongo_models/mongoose_model";

export class UserController {
    private  secretAcessToken = process.env.SECRECT_ACESS_TOKEN!
    private  secretRefreshToken = process.env.REFRESH_TOKEN!
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
        catch(e){
            console.log(e)
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
        catch(e){
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
        const token = this.generateToken(userPayLoad)
        const refresToken = this.generateteRefreshToken(userPayLoad)
        res.status(200).json({
            token,
            refresToken
        })
    }
     async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const jwt = jsonwebtoken
            const token = req.headers["authorization"]
            const ACESS_TOKEN = process.env.ACCESS_TOKEN!
            if (!token)
                return res.sendStatus(401)
            jwt.verify(token, ACESS_TOKEN)
            next()
        } catch (e) {
            console.error(e)
            return res.sendStatus(403)
        }
    }
    private  generateToken(payload: UserCredential) {
        const jwt = jsonwebtoken
        return jwt.sign(payload, this.secretAcessToken, { expiresIn: "15m" })

    }
    private  generateteRefreshToken(payload: UserCredential) {
        const jwt = jsonwebtoken
        const monthInSeconds = 30 * 24 * 60 * 60
        const month = Math.floor(Date.now() / 1000) + monthInSeconds
        return jwt.sign(payload, this.secretRefreshToken, { expiresIn: month })
    }
     async refreshToken(req: Request, res: Response) {
        try {
            const jwt = jsonwebtoken
            const refreshToken = req.headers["authorization"]
            if(!refreshToken)
                return res.sendStatus(401)
            jwt.verify(refreshToken, this.secretRefreshToken)
            const token = this.generateToken(req.body)
            return {
                token,
                refreshToken
            }
        }
        catch (e) {
            return res.sendStatus(404)
        }

    }
}