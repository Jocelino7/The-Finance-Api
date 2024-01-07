import mongoose from "mongoose";
import { connectToMongo } from "../../config/mongo_config";
import request from "supertest"
import { generateFakeToken } from "../../utils/helpers";
import { sourceFundModel } from "../../model/mongo_models/mongoose_model";
import { app } from "../../../index";
import { SourceFundType } from "../../model/dtos/dto";
import { sourceFundMocks } from "../../mocks/source_fund.mock";
async function addSourceFund(sourceFund: SourceFundType, req: request.SuperTest<request.Test>) {
    const baseUrl = "/t/f/source_funds/"
    return await req.post(`${baseUrl}add`)
        .send(sourceFund)
        .set("authorization", generateFakeToken())

}
describe("sourceFund tests", () => {
    const baseUrl = "/t/f/source_funds/"
    const mongooseConnection = mongoose
    let fakeSourcefund: SourceFundType
    const req = request(app)
    beforeAll(async () => {
        try {
            await connectToMongo();
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }, 30000)
    afterAll(async () => {
        await sourceFundModel.deleteMany()
        await mongooseConnection.connection.close(true);
    }, 30000)
    it("given a sourceFund, it should create and return a status 201", async () => {

        fakeSourcefund = sourceFundMocks[0]
        const result = await addSourceFund(fakeSourcefund, req)
        expect(result.statusCode).toBe(201)

    })
    it("given a sourceFund it should update", async () => {
        fakeSourcefund = sourceFundMocks[1]
        //create new sourceFund
        const fakeToken = generateFakeToken()
        await addSourceFund(fakeSourcefund, req)

        // update sourceFund
        const updateResult = await req.put(`${baseUrl}update`)
            .set("authorization", fakeToken)
            .send({
                ...fakeSourcefund!,
                amount: 1500
            })
        expect(updateResult.statusCode).toBe(200)
        //retrieve update sourceFund 
        const updatedSourceFund = await sourceFundModel.findOne({ _id: fakeSourcefund!._id })
        expect(updatedSourceFund?.name).toBe(fakeSourcefund.name)
    }, 30000)
    it("given an id, it should return a sourceFund", async () => {
        `${baseUrl}get/:id`
        //create sourceFund
        fakeSourcefund = sourceFundMocks[2]

        const fakeToken = generateFakeToken()
        await addSourceFund(fakeSourcefund, req)
        //get the new created sourceFund
        const result = await req.get(`${baseUrl}get/${fakeSourcefund!._id}`)
            .set("authorization", fakeToken)
        expect(result.body).toBeDefined()
        expect(result.body).not.toBeNull()
    }, 30000)
    it("given an userid it should return an array of sourceFund that belongs to the user", async () => {
        //add sourceFund
        fakeSourcefund = sourceFundMocks[3]

        const fakeToken = generateFakeToken()
        await addSourceFund(fakeSourcefund, req)
        //get sourceFunds added    
        const result = await req.get(`${baseUrl}getAll/${fakeSourcefund!.userId}`)
            .set("authorization", fakeToken)
        expect(result.body.length).toBe(1)
        expect(result.body[0].name).toBe(fakeSourcefund.name)
        expect(result.body[0].userId).toBe(fakeSourcefund.userId)
    }, 30000)
    it("given an userid and a query(q) should return an array of sourceFund that matches the query and belongs to the user", async () => {
        //add sourceFund
        fakeSourcefund = {
            ...sourceFundMocks[7],
            name: "sourceFund test"
        }
        const fakeToken = generateFakeToken()
        await addSourceFund(fakeSourcefund, req)
        //get sourceFunds added    

        const result = await req.get(`${baseUrl}getAll/${fakeSourcefund.userId}?q=test`)
            .set("authorization", fakeToken)
        expect(result.body[0].name).toBe(fakeSourcefund.name)
        expect(result.body[0].userId).toBe(fakeSourcefund.userId)
        expect(result.body.length).toBeGreaterThan(0)

    }, 30000),
        it("given an sourceFundId it should delete it", async () => {
            fakeSourcefund = sourceFundMocks[4]
            //add sourceFund
            const fakeToken = generateFakeToken()
            await addSourceFund(fakeSourcefund, req)
            //delete sourceFund
            const deleteResult = await req.delete(`${baseUrl}delete/${fakeSourcefund!._id}`)
                .set("authorization", fakeToken)

            expect(deleteResult.status).toBe(200)
            //assert if sourceFund was deleted 
            const result = await req.get(`${baseUrl}get/${fakeSourcefund!._id}`)
                .set("authorization", fakeToken)
            expect(result.body).toBeNull()
        }, 30000)
    it("given an array of sourceFunds it should delete them all", async () => {
        fakeSourcefund = sourceFundMocks[5]
        const fakeSourcefund2 = sourceFundMocks[6]
        const fakeToken = generateFakeToken()
        //add sourceFunds
        await addSourceFund(fakeSourcefund, req)
        await addSourceFund(fakeSourcefund2, req)
        //delete sourceFunds
        const deleteResult = await req.delete(`${baseUrl}delete_batch/`)
            .set("authorization", fakeToken)
            .send({
                sourceFunds: [fakeSourcefund, fakeSourcefund2]
            })

        expect(deleteResult.status).toBe(200)
        //assert if sourceFunds was deleted 
        const resultSourceFund1 = await req.get(`${baseUrl}get/${fakeSourcefund!._id}`)
            .set("authorization", fakeToken)
        const resultSourceFund2 = await req.get(`${baseUrl}get/${fakeSourcefund2!._id}`)
            .set("authorization", fakeToken)
        expect(resultSourceFund1.body).toBeNull()
        expect(resultSourceFund2.body).toBeNull()
    }, 30000)

})
//transaction