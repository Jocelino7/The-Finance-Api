import { Request,NextFunction,Response } from "express";
import jsonwebtoken from "jsonwebtoken"

export function validateId(req:Request,res:Response,next:NextFunction){
    const {id}=req.params
    if(!id)
        return res.status(400).json({message:"path was not provided"})
    next()
} 
export function validateUserId(req:Request,res:Response,next:NextFunction){
    const {userId}=req.params
    if(!userId)
        return res.status(400).json({message:"path was not provided"})
    next()
} 
export async function  verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const jwt = jsonwebtoken
        const token = req.headers["authorization"]
        const ACESS_TOKEN = process.env.ACESS_TOKEN_SECRET!
        if (!token)
            return res.sendStatus(401)
        jwt.verify(token, ACESS_TOKEN)
        next()
    } catch (e) {
        console.error(e)
        return res.sendStatus(403)
    }
}
 