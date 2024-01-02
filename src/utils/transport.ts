import { EmailTransport } from "../api/interfaces/transport";

export function getEmailTransport(): EmailTransport {
    if (process.env.NODE_ENV == "production")
        return {
            host: "smtp.ethereal.email",
            port: 587,
            service: "SMTP",
            secure: false, // `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.EMAIL_DEV!,
                pass: process.env.PASS_DEV!,
            }
        }

    return {
        service: "gmail",
        auth: {
            user: process.env.EMAIL_PRO!,
            pass: process.env.PASS_PRO!,
        }

    }
}