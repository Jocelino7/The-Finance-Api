import { EmailTransport } from "./transport";
import { EmailTransporter } from "./transporter";

export interface EmailService  {
    createTransporter(transport:EmailTransport):EmailTransporter

}