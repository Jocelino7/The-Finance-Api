import {app} from "../../../index"
import request from "supertest"
import { userModel } from "../../model/mongo_models/mongoose_model"
describe("user test",()=>{
    const baseUrl = "/t/f/auth/"
    afterAll(()=>{
        userModel.deleteOne({email:"test@gmail.com"})
    })
    it("create a new user",async ()=>{
        const req = await request(app)
        const result = await req.post(`${baseUrl}create`)
            .send({
                firstName:"first",
                lastName:"last",
                email:"test@gmail.com",
                password:"test123"
            })

        expect(result.statusCode).toBe(201)    
    },30000)
})
