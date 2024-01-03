import mongoose from "mongoose";
import { connectToMongo } from "../../config/mongo_config";
import request from "supertest"
import { generateFakeToken } from "../../utils/helpers";
import { goalModel } from "../../model/mongo_models/mongoose_model";
import { app } from "../../../index";
import { GoalType } from "../../model/dtos/dto";
import { goalMocks } from "../../mocks/goal.mock";
async function addGoal(goal: GoalType, req: request.SuperTest<request.Test>) {
    const baseUrl = "/t/f/goals/"
    return await req.post(`${baseUrl}add`)
        .send(goal)
        .set("authorization", generateFakeToken())

}

describe("goal tests", () => {
    const baseUrl = "/t/f/goals/"
    const mongooseConnection = mongoose
    let fakeGoal: GoalType
    const req = request(app)
    beforeAll(async () => {
        try {
            await connectToMongo();
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }, 30000)
    afterAll(async () => {
        await goalModel.deleteMany()
        await mongooseConnection.connection.close(true);
    }, 30000)
    it("given a goal, it should create and return a status 201", async () => {

        fakeGoal = goalMocks[0]
        const result = await addGoal(fakeGoal, req)
        expect(result.statusCode).toBe(201)

    })
    it("given a goal it should update", async () => {
        fakeGoal = goalMocks[1]
        //create new goal
        const fakeToken = generateFakeToken()
        await addGoal(fakeGoal, req)

        // update goal
        const updateResult = await req.put(`${baseUrl}update`)
            .set("authorization", fakeToken)
            .send({
                ...fakeGoal!,
                amount: 1500
            })
        expect(updateResult.statusCode).toBe(200)
        //retrieve update goal 
        const updatedGoal = await goalModel.findOne({ _id: fakeGoal!._id })
        expect(updatedGoal?.name).toBe(fakeGoal.name)
    }, 30000)
    it("given an id, it should return a goal", async () => {
        `${baseUrl}get/:id`
        //create goal
        fakeGoal = goalMocks[2]

        const fakeToken = generateFakeToken()
        await addGoal(fakeGoal, req)
        //get the new created goal
        const result = await req.get(`${baseUrl}get/${fakeGoal!._id}`)
            .set("authorization", fakeToken)
        expect(result.body).toBeDefined()
        expect(result.body).not.toBeNull()
    }, 30000)
    it("given an userid it should return an array of goal that belongs to the user", async () => {
        //add goal
        fakeGoal = goalMocks[3]

        const fakeToken = generateFakeToken()
        await addGoal(fakeGoal, req)
        //get goals added    
        const result = await req.get(`${baseUrl}getAll/${fakeGoal!.user._id}`)
            .set("authorization", fakeToken)
        expect(result.body.length).toBe(1)
        expect(result.body[0].name).toBe(fakeGoal.name)
        expect(result.body[0].user._id).toBe(fakeGoal.user._id)
    }, 30000)
    it("given an userid and a query(q) should return an array of goal that matches the query and belongs to the user", async () => {
        //add goal
        fakeGoal = {
            ...goalMocks[7],
            name: "goal test"
        }
        const fakeToken = generateFakeToken()
        await addGoal(fakeGoal, req)
        //get goals added    

        const result = await req.get(`${baseUrl}getAll/${fakeGoal.user._id}?q=test`)
            .set("authorization", fakeToken)
        expect(result.body[0].name).toBe(fakeGoal.name)
        expect(result.body[0].user._id).toBe(fakeGoal.user._id)
        expect(result.body.length).toBeGreaterThan(0)

    }, 30000),
        it("given an goalId it should delete it", async () => {
            fakeGoal = goalMocks[4]
            //add goal
            const fakeToken = generateFakeToken()
            await addGoal(fakeGoal, req)
            //delete goal
            const deleteResult = await req.delete(`${baseUrl}delete/${fakeGoal!.user._id}`)
                .set("authorization", fakeToken)

            expect(deleteResult.status).toBe(200)
            //assert if goal was deleted 
            const result = await req.get(`${baseUrl}get/${fakeGoal!._id}`)
                .set("authorization", fakeToken)
            expect(result.body).toBeNull()
        }, 30000)
    it("given an array of goals it should delete them all", async () => {
        fakeGoal = goalMocks[5]
        const fakeGoal2 = goalMocks[6]
        const fakeToken = generateFakeToken()
        //add goals
        await addGoal(fakeGoal, req)
        await addGoal(fakeGoal2, req)
        //delete goals
        const deleteResult = await req.delete(`${baseUrl}delete_batch/`)
            .set("authorization", fakeToken)
            .send({
                goals: [fakeGoal, fakeGoal2]
            })

        expect(deleteResult.status).toBe(200)
        //assert if goals was deleted 
        const resultGoal1 = await req.get(`${baseUrl}get/${fakeGoal!._id}`)
            .set("authorization", fakeToken)
        const resultGoal2 = await req.get(`${baseUrl}get/${fakeGoal2!._id}`)
            .set("authorization", fakeToken)
        expect(resultGoal1.body).toBeNull()
        expect(resultGoal2.body).toBeNull()
    }, 30000)

})