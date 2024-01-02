import { EmailService } from "../../api/interfaces/email_service"
import { EmailTransport } from "../../api/interfaces/transport"
import { EmailTransporter } from "../../api/interfaces/transporter"
import { EmailSender } from "../../utils/send_email"
import { getEmailTransport } from "../../utils/transport"
import { sendVerificationEmail } from "../../utils/send_verification_email"
import { userMocks } from "../../mocks/user.mock"

describe("email_verification_test", () => {
    const emailService: EmailService = {
        createTransporter: jest.fn().mockImplementation((transport: EmailTransport): EmailTransporter => {
            return {
                sendMail:()=>{

                }
            }
        })
    }
    const transport = getEmailTransport()
    beforeEach(() => {
        jest.mock("../../api/interfaces/email_service")
        jest.mock("../../utils/transport")
        jest.mock("../../utils/send_email")
    })
    afterAll(() => {
        jest.clearAllMocks()
    })
    it("should send verification email", () => {
        
        const emailSender = new EmailSender(emailService, transport)
        const user = userMocks[0]
        emailSender.sendEmail = jest.fn()
        sendVerificationEmail(emailSender, user)
        expect(emailSender.sendEmail).toHaveBeenCalledWith(
            {
                from: process.env.EMAIL_DEV!,
                to: user.email,
                subject: "Email Verification",
                text: "please verify your email",
                html: "<p>click on this link to verify your email<p/> <a href='http://google.com'>clicl<a/>"
            }
        )

    })
    it("should call email service and email transporter", () => {
        const email = {
            from: "fakesender@gmail.com",
            to: "fakerecipient@gmail.com",
            subject: "fake subject",
            text: "fake text",
            html: "fake html"
        }
        new EmailSender(emailService, transport).sendEmail(email)
        expect(emailService.createTransporter).toHaveBeenCalledWith(transport)
    })

})