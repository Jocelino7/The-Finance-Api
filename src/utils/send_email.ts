import { Email } from "../api/interfaces/email";
import { EmailService } from "../api/interfaces/email_service";
import { EmailTransport } from "../api/interfaces/transport";


export class EmailSender {
    private emailService:EmailService
    private transport:EmailTransport
 
    constructor(emailService:EmailService,transport:EmailTransport){
        this.emailService= emailService
        this.transport = transport
    }
   
     sendEmail(email:Email){
        const transporter =  this.emailService.createTransporter(this.transport)
        return transporter.sendMail(email)
    }
}