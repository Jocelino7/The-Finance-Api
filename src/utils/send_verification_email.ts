import { userBaserUrl } from "../base_urls/base_urls";
import { User } from "../model/dtos/dto";
import { generateToken } from "./helpers";
import { EmailSender } from "./send_email";

export function sendVerificationEmail(emailSender: EmailSender, user: User) {
    const subject = "Email Verification"
    const token = generateToken({
        id: user._id,
        email: user.email
    },"1440m")
    const link = `192.168.0.125/8000${userBaserUrl}verify_email/${user._id}/${token}`
    const text = "please verify your email"
    const html = `<p>click on this link to verify your email ${link} <p/> <a href='${link}'>clicl<a/>`
    
    if (process.env.NODE_ENV == "development") {
        return emailSender.sendEmail({
            from: process.env.EMAIL_DEV!,
            to: "cahocofelizardo@gmail.com",
            subject,
            text,
            html
        })

    }
    emailSender.sendEmail({
        from: process.env.EMAIL_PRO!,
        to: user.email,
        subject,
        text,
        html
    })
}