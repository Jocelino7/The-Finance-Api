import { app } from "../../../index"
import request from "supertest"
import { userModel } from "../../model/mongo_models/mongoose_model"
import { connectToMongo } from "../../../mongoose_config/mongo_config"
import mongoose from "mongoose"
import { generateteRefreshToken } from "../../utils/helpers"
describe("user test", () => {
    const baseUrl = "/t/f/auth/"
    const mongooseConnection = mongoose
    beforeAll(async () => {
        try {
          const result = await connectToMongo();
          console.log("MongoDB connection result:", result);
        } catch (error) {
          console.error("Error connecting to MongoDB:", error);
        }
      },30000)
    afterAll(async () => {
        await userModel.deleteMany();
        await mongooseConnection.connection.close(true);
      },30000)

    it("given a userType it should create a new user", async () => {
        const req = request(app)
        const result = await req.post(`${baseUrl}create`)
            .send({
                firstName: "first",
                lastName: "last",
                email: "test@gmail.com",
                password: "test123"
            })

        expect(result.statusCode).toBe(201)
    }, 30000)
    it("given user credential it should authenticate user and return acess token and refresh toke",async ()=>{
        const req = await request(app)
        await req.post(`${baseUrl}create`)
            .send({
                firstName:"first",
                lastName:"last",
                email:"test@gmail.com",
                password:"test123"
            })
        const result = await req.post(`${baseUrl}authenticate`)
            .send({
                email:"test@gmail.com",
                password:"test123"
            })
        expect(result.body.token).toBeDefined()
        expect(result.body.refreshToken).toBeDefined()    
    })
    it("given a user it should return status 401 when the user is badly created",async ()=>{
        const req =  request(app)
        const result = await req.post(`${baseUrl}create`)
            .send({
                firstName:"",
                lastName:"last name",
                email:"test@gmail.com",
                password:"test123"
            })
            
        expect(result.statusCode).toBe(400)
        expect(result.body.message).toBeDefined() 

    })
    it("given a valid refresh token, it should return a object with new token and refresh token",async ()=>{
        const req =request(app)
        const fakeToken = generateteRefreshToken({
            email:"test@gmail.com",
            password:"test123"
        })
        const result =  await  req.get(`${baseUrl}refresh`)
        .set("authorization",fakeToken)
        expect(result.body.token).toBeDefined()
        
    },30000)
},)
