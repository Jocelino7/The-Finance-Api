import { Email } from "./email";
export interface EmailTransporter {
    sendMail(email:Email):void
}
