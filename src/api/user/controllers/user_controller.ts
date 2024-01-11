import jsonwebtoken from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../../model/repositories/user/user_repo";
import { userYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation";
import { generateToken, generateteRefreshToken } from "../../../utils/helpers";
import { User } from "../../../model/dtos/dto";
import path from "path"
import fs from "fs"
import AWS from "aws-sdk"
import { internalServerError } from "../../../utils/constants";
import { PutObjectRequest } from "aws-sdk/clients/s3";

export class UserController {
    private secretRefreshToken = process.env.REFRESH_TOKEN_SECRET!
    private userRepo: UserRepository
    private jwt = jsonwebtoken
    constructor(repo: UserRepository) {
        console.log(repo)
        this.userRepo = repo
    }
    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params
            await this.userRepo.deleteUser(id)
            return res.sendStatus(200)
        }
        catch (e: any) {
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async createUser(req: Request, res: Response) {
        try {
            const user = req.body
            await this.userRepo.createUser(user)
            return res.sendStatus(201)

        } catch (e) {
            console.error(e)
            return res.status(500).send("Error while creating user")
        }
    }
    async update(req: Request, res: Response) {
        try {
            await this.userRepo.updateUser(req.body)
            return res.sendStatus(200)
        }
        catch (e: any) {
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
            return res.status(400).json({ message })
        }
    }
    validateId(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        if (!id)
            return res.status(400).json({ message: "Id was not provided" })
        next()
    }
    async auth(req: Request, res: Response) {
        const user = await this.userRepo.authUser(req.body)
        if (!user)
            return res.status(401).json({ message: "unauthorized" })
        const userPayLoad = req.body
        const token = generateToken(userPayLoad)
        const refreshToken = generateteRefreshToken(userPayLoad)
        res.status(200).json({
            token,
            refreshToken,
            user
        })
    }

    async refreshToken(req: Request, res: Response) {
        try {

            const { refreshToken } = req.params
            if (!refreshToken)
                return res.status(401)
            this.jwt.verify(refreshToken, this.secretRefreshToken)
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
    async sendEmailVerification(req: Request, res: Response, sendEmail: (user: User) => void) {
        const { userId } = req.params
        const user = await this.userRepo.getUser(userId)
        if (user) {
            sendEmail(user)
            return res.sendStatus(200)
        }
        res.sendStatus(400)

    }
    async verifyEmail(req: Request, res: Response) {
        const { token } = req.params
        const { userId } = req.params
        try {
            const tokenSecret = process.env.ACCESS_TOKEN_SECRET
            this.jwt.verify(token, tokenSecret!)
            const user: User | null = await this.userRepo.getUser(userId)
            if (user) {
                await this.userRepo.updateUser({ ...user, isEmailVerified: true })
                return res.status(200).send("Your email is verified")
            }
            res.sendStatus(500)
        }
        catch (e: any) {
            console.error("erro"+e)
            res.sendStatus(500)
        }
    }
    async isEmailVerified(req: Request, res: Response) {
        const { userId } = req.params
        const user = await this.userRepo.getUser(userId)
        if (user) {
            return res.status(200).json({
                isEmailVerified: user.isEmailVerified,
            })
        }
        res.status(404).json({
            message: "User not found"
        })
    }
    async sendResetPasswordEmail(req: Request, res: Response, sendEmail: (user: User) => void) {
        const { userId } = req.params
        const user = await this.userRepo.getUser(userId)
        if (user) {
            sendEmail(user)
            return res.sendStatus(200)
        }
        res.sendStatus(400)
    }
    async upload(req: Request, res: Response, next: NextFunction) {
        console.log(req.file)
        try {
            const dirPath = path.join(__dirname, "../../../../", "temp")

            const file = req.file
            console.log("file"+file)
            AWS.config.update({
                secretAccessKey: "hS5O8bLm7h9dWlvMrirnmpRjuKB83EC9BORoFu8",
                accessKeyId: "AKIAU7W5MD5ZJKC3247H",
                region:"us-east-1",
            })
            const params: PutObjectRequest = {
                Bucket: "the-finance-bucket",
                Key: `user-images/${file!.filename}`,
                Body: fs.readFileSync(file!.path),
            }
            const s3 = new AWS.S3()
            s3.upload(params, ((e, data) => {
                if (!e) {
                    console.log("loc"+data.Location)
                    //this.removeDirectoryRecursive(dirPath)
                    return
                }
                console.log("error"+e)
            }))
            res.status(200).json({
                success: true,
                url: req.file?.filename
            })
        }
        catch (e: any) {
            const errorMessage: string | null = e.message
            console.error(e)
            //if (errorMessage?.toLocaleLowerCase)
            res.status(500).json({ message: internalServerError })
        }
    }
    async removeDirectoryRecursive(dirPath: string) {
        if (fs.existsSync(dirPath)) {
            fs.readdirSync(dirPath).forEach((value, index) => {
                const currentPath = path.join(dirPath, value)
                if (fs.lstatSync(currentPath).isDirectory()) {
                    return this.removeDirectoryRecursive(currentPath)
                }
                fs.unlinkSync(currentPath)
            })
        }
    }
    async fileValidation(req: Request, file: Express.Multer.File, cb: (error: Error | null) => void) {
        const mimetype = file.mimetype
        if (mimetype == "image/jpg" || mimetype == "image/png" || mimetype == "image/jpeg") {
            cb(null)
            return

        }
        cb(new Error("Invalid format only jpeg,jpg and png are allowed" + mimetype))
    }
}