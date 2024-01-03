import dotenv from "dotenv"
dotenv.config()
import { UserController } from "../../api/user/controllers/user_controller"
import { userMocks } from "../../mocks/user.mock"
import { userModel } from "../../model/mongo_models/mongoose_model"
import { UserRepositoryImpl } from "../../model/repositories/user/user_repo"
import { generateToken, sendEmailResetWrapper } from "../../utils/helpers"
import { fakeRequest, fakeResponse } from "../test_helpers/test_helpers"

describe("user controller test", () => {
    const model = userModel
    const fakeUser = userMocks[0]
    const fakeRepo = new UserRepositoryImpl(model)
    const controller = new UserController(fakeRepo)
    const res = fakeResponse()
    beforeEach(() => {
        jest.clearAllMocks()
        jest.mock("../../api/user/controllers/user_controller")
    })
    it("should verify email", async () => {
        const fakeToken = generateToken({
            id: fakeUser._id,
            email: fakeUser.email
        }, "1440m")


        const req = fakeRequest(
            {
                userId: fakeUser._id,
                token: fakeToken
            },
            {},
        )
        fakeRepo.getUser = jest.fn().mockReturnValue(fakeUser)
        model.findOne = jest.fn().mockResolvedValue(fakeUser)
        model.updateOne = jest.fn()

        await controller.verifyEmail(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    })
    it("should check if user has email verified", async () => {
        const req = fakeRequest(
            { userId: fakeUser._id },
            {}
        )
        fakeRepo.getUser = jest.fn().mockResolvedValue(fakeUser)
        await controller.isEmailVerified(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
    })
    it("should send passwordReset email", async () => {
        const req = fakeRequest(
            { userId: fakeUser._id },
            {}
        )
        fakeRepo.getUser = jest.fn().mockResolvedValue(fakeRepo)
        await controller.sendEmailVerification(req, res, sendEmailResetWrapper)
        expect(res.status).toHaveBeenCalledWith(200)
    })
})