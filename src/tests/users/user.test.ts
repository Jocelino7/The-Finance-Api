import { app } from "../../../index"
import request from "supertest"
import { userModel } from "../../model/mongo_models/mongoose_model"
import { connectToMongo } from "../../config/mongo_config"
import mongoose from "mongoose"
import { generateFakeToken, generateteRefreshToken } from "../../utils/helpers"
import { userMocks } from "../../mocks/user.mock"
import { User } from "../../model/dtos/dto"

async function addUser(user: User, req: request.SuperTest<request.Test>) {
    const baseUrl = "/t/f/auth/"
    return await req.post(`${baseUrl}create`)
        .send(user)
}
describe("user test", () => {
    const baseUrl = "/t/f/auth/"
    const mongooseConnection = mongoose
    let fakeUser: User
    const req = request(app)
    beforeAll(async () => {
        try {
            await connectToMongo();
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }, 30000)
    afterAll(async () => {
        await userModel.deleteMany();
        await mongooseConnection.connection.close(true);
    }, 30000)

    it("given a userType it should create a new user", async () => {
        fakeUser = userMocks[0]
        const result = await req.post(`${baseUrl}create`)
            .send(fakeUser)

        expect(result.statusCode).toBe(201)
    }, 30000)
    it("given user credential it should authenticate user and return access token and refresh toke", async () => {
        fakeUser = userMocks[1]
        await req.post(`${baseUrl}create`)
            .send(fakeUser)
        const result = await req.post(`${baseUrl}authenticate`)
            .send({
                email: fakeUser.email,
                password: fakeUser.password
            })
        expect(result.body.token).toBeDefined()
        expect(result.body.refreshToken).toBeDefined()
    })
    it("given a user it should return status 401 when the user is badly created", async () => {
        fakeUser = {
            firstName: "",
            lastName: "last Name",
            email: "test@gmail.com",
            password: "test123"
        }
        const req = request(app)
        const result = await req.post(`${baseUrl}create`)
            .send(fakeUser)

        expect(result.statusCode).toBe(400)
        expect(result.body.message).toBeDefined()

    })
    it("given a valid refresh token, it should return a object with new token and refresh token", async () => {
        const fakeToken = generateteRefreshToken({
            email: "test@gmail.com",
            password: "test123"
        })
        const result = await req.get(`${baseUrl}refresh`)
            .set("authorization", fakeToken)
        expect(result.body.token).toBeDefined()

    }, 30000)
    it("given a user it should update", async () => {
        fakeUser = userMocks[3]
        //create new user
        const fakeToken = generateFakeToken()
        await addUser(fakeUser, req)

        // update user
        const updateResult = await req.put(`${baseUrl}update`)
            .set("authorization", fakeToken)
            .send(fakeUser)
        expect(updateResult.statusCode).toBe(200)
        //retrieve update user
        const updatedUser = await userModel.findOne({ _id: fakeUser!._id })
        expect(updatedUser?.firstName).toBeDefined()
    }, 30000)
    it("given an userId it should delete a user", async () => {
        fakeUser = userMocks[4]
        //add user
        const fakeToken = generateFakeToken()
        await addUser(fakeUser, req)
        //delete user
        const deleteResult = await req.delete(`${baseUrl}delete/${fakeUser!._id}`)
            .set("authorization", fakeToken)

        expect(deleteResult.status).toBe(201)
        //assert if user was deleted 
        const result = await req.get(`${baseUrl}get/${fakeUser!._id}`)
            .set("authorization", fakeToken)
        expect(result.body).toStrictEqual({})
    }, 30000)
},)
