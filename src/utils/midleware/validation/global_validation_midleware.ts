import { Request, NextFunction, Response } from "express";
import jsonwebtoken from "jsonwebtoken"

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const jwt = jsonwebtoken
        const token = req.headers["authorization"]
        const ACESS_TOKEN = process.env.ACCESS_TOKEN_SECRET!
        if (!token)
            return res.status(401).json({
                message: "unauthorized"
            })
        jwt.verify(token, ACESS_TOKEN)
        next()
    } catch (e) {
        console.error(e)
        res.status(403).json({ message: "forbidden" })
        return
    }
}
