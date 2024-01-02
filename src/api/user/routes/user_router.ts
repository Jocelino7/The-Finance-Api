import express, { Response, Request, NextFunction } from "express"
import { UserController } from "../controllers/user_controller"
import { UserRepositoryImpl } from "../../../model/repositories/user/user_repo"
import { userModel } from "../../../model/mongo_models/mongoose_model"
import { userValidationMdw } from "../validation_midleware/user_validation_midleware"
import { validateId } from "../../../utils/midleware/validation/global_validation_midleware"
import { User } from "../../../model/dtos/dto"
import { EmailSender } from "../../../utils/send_email"
import { EmailService } from "../../interfaces/email_service"
import { EmailTransport } from "../../interfaces/transport"
import { EmailTransporter } from "../../interfaces/transporter"
import nodemailer from "nodemailer"
import { getEmailTransport } from "../../../utils/transport"
import { sendVerificationEmail } from "../../../utils/send_verification_email"
import { sendEmailResetWrapper } from "../../../utils/helpers"
function emailVerificationWrapper(user: User) {
    const emailService: EmailService = {
        createTransporter: function (transport: EmailTransport): EmailTransporter {
            return nodemailer.createTransport(transport)
        }
    }
    const emailSender = new EmailSender(emailService, getEmailTransport())
    sendVerificationEmail(emailSender, user)

}

const route = express.Router()
const baseUrl = "/t/f/auth/"
const userController = new UserController(new UserRepositoryImpl(userModel))
route.post(`${baseUrl}create`, userValidationMdw, (req, res) => userController.createUser(req, res))
route.post(`${baseUrl}authenticate`, (req: Request, res: Response) => userController.auth(req, res))
route.delete(`${baseUrl}delete/:id`, validateId, (req: Request, res: Response, next: NextFunction) => userController.validateId(req, res, next), (req: Request, res: Response) => userController.createUser(req, res))
route.put(`${baseUrl}update`, (req: Request, res: Response, next) => userController.validateUser(req, res, next), (req, res) => userController.update(req, res))
route.get(`${baseUrl}refresh`, (req: Request, res: Response) => userController.refreshToken(req, res))
route.get(`${baseUrl}send_email_verification/:userId`, (req: Request, res: Response) => userController.sendEmailVerification(req, res, emailVerificationWrapper))
route.get(`${baseUrl}verify_email/:token`, (req: Request, res: Response) => userController.verifyEmail(req, res))
route.get(`${baseUrl}is_email_verified/:userId/`, (req: Request, res: Response) => userController.isEmailVerified(req, res))
route.get(`${baseUrl}reset_email/:userId/`, (req: Request, res: Response) => userController.sendEmailVerification(req, res,sendEmailResetWrapper))
export default route