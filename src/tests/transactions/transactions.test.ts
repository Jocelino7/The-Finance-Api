import mongoose from "mongoose";
import { connectToMongo } from "../../config/mongo_config";
import { transactionMocks } from "../../mocks/transaction.mock";
import request from "supertest"
import { generateFakeToken } from "../../utils/helpers";
import { transactionModel } from "../../model/mongo_models/mongoose_model";
import { app } from "../../../index";
import { Transaction } from "../../model/dtos/dto";
async function addTransaction(transaction: Transaction, req: request.SuperTest<request.Test>) {
    const baseUrl = "/t/f/transactions/"
    return await req.post(`${baseUrl}add`)
        .send(transaction)
        .set("authorization", generateFakeToken())
}
describe("transaction tests", () => {
    const baseUrl = "/t/f/transactions/"
    const mongooseConnection = mongoose
    let fakeTransaction: Transaction
    const req = request(app)
    beforeAll(async () => {
        try {
            await connectToMongo();
            await transactionModel.deleteMany()
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }, 30000)
    afterAll(async () => {
        await transactionModel.deleteMany()
        await mongooseConnection.connection.close(true);
    }, 30000)
    it("given a transaction, it should create and return a status 201", async () => {

        fakeTransaction = transactionMocks[0]
        const result = await addTransaction(fakeTransaction, req)
        expect(result.statusCode).toBe(201)

    })
    it("given a transaction it should update", async () => {
        fakeTransaction = transactionMocks[1]
        //create new transaction
        const fakeToken = generateFakeToken()
        await addTransaction(fakeTransaction, req)

        // update transaction
        const updateResult = await req.put(`${baseUrl}update`)
            .set("authorization", fakeToken)
            .send({
                ...fakeTransaction!,
                amount: 1500
            })
        expect(updateResult.statusCode).toBe(200)
        //retrieve update transaction
        const updateTransaction = await transactionModel.findOne({ _id: fakeTransaction!._id })
        expect(updateTransaction?.amount).toBe(1500)
    }, 30000)
    it("given an id, it should return a transaction", async () => {
        `${baseUrl}get/:id`
        //create transaction
        fakeTransaction = transactionMocks[2]

        const fakeToken = generateFakeToken()
        await addTransaction(fakeTransaction, req)
        //get the new created transaction
        const result = await req.get(`${baseUrl}get/${fakeTransaction!._id}`)
            .set("authorization", fakeToken)
        expect(result.body).toBeDefined()
        expect(result.body).not.toBeNull()
    }, 30000)
    it("given an userid it should return an array of transaction that belongs to the user", async () => {
        //add transaction
        fakeTransaction = transactionMocks[3]

        const fakeToken = generateFakeToken()
        await addTransaction(fakeTransaction, req)
        //get transactions added    
        const result = await req.get(`${baseUrl}getAll/${fakeTransaction!.user._id}`)
            .set("authorization", fakeToken)
        expect(result.body.length).toBe(1)
        expect(result.body[0].amount).toBe(fakeTransaction.amount)
        expect(result.body[0].user._id).toBe(fakeTransaction.user._id)
    }, 30000)
    it("given an userid and a query(q) should return an array of transaction that matches the query and belongs to the user", async () => {
        //add transaction
        fakeTransaction = {
            ...transactionMocks[7],
            amount:100,
            category:{
                ...transactionMocks[7].category,
                name:"test-category"
            }
        }
        const fakeToken = generateFakeToken()
        await addTransaction(fakeTransaction, req)
        //get transactions added    
        console.log("id " +fakeTransaction!.user._id)
        const result = await req.get(`${baseUrl}getAll/${fakeTransaction.user._id}?q=test`)
            .set("authorization", fakeToken)
            expect(result.body[0].amount).toBe(fakeTransaction.amount)
            expect(result.body[0].user._id).toBe(fakeTransaction.user._id)   
        expect(result.body.length).toBeGreaterThan(0)
      
    }, 30000),
        it("given an transactionId it should delete a transaction", async () => {
            fakeTransaction = transactionMocks[4]
            //add transaction
            const fakeToken = generateFakeToken()
            await addTransaction(fakeTransaction, req)
            //delete transaction
            const deleteResult = await req.delete(`${baseUrl}delete/${fakeTransaction!._id}`)
                .set("authorization", fakeToken)

            expect(deleteResult.status).toBe(200)
            //assert if transaction was deleted 
            const result = await req.get(`${baseUrl}get/${fakeTransaction!._id}`)
                .set("authorization", fakeToken)
            expect(result.body).toBeNull()
        }, 30000)
    it("given an array of transactions it should delete them all", async () => {
        fakeTransaction = transactionMocks[5]
        const fakeTransaction2 = transactionMocks[6]
        const fakeToken = generateFakeToken()
        //add transactions
        await addTransaction(fakeTransaction, req)
        await addTransaction(fakeTransaction2, req)
        //delete transactions
        const deleteResult = await req.delete(`${baseUrl}delete_batch/`)
            .set("authorization", fakeToken)
            .send({
                transactions: [fakeTransaction, fakeTransaction2]
            })

        expect(deleteResult.status).toBe(200)
        //assert if transactions was deleted 
        const resultTransaction1 = await req.get(`${baseUrl}get/${fakeTransaction!._id}`)
            .set("authorization", fakeToken)
        const resultTransaction2 = await req.get(`${baseUrl}get/${fakeTransaction2!._id}`)
            .set("authorization", fakeToken)
        expect(resultTransaction1.body).toBeNull()
        expect(resultTransaction2.body).toBeNull()
    }, 30000)
    it("given an userId and a month it should return a report object", async () => {
        fakeTransaction = {
            ...transactionMocks[5], transactionDate: {
                ...transactionMocks[5].transactionDate,
                day: 22,
                month: 4
            }
        }
        const fakeToken = generateFakeToken()
        //add transactions
        await addTransaction(fakeTransaction, req)
        //get report
        const result = await req.get(`${baseUrl}report/${fakeTransaction.user._id}/4/${fakeTransaction.transactionDate.year}`)
            .set("authorization", fakeToken)
        expect(result.status).toBe(200)
        expect(result.body).not.toBeNull()
        expect(result.body).toBeDefined()
        expect(result.body.total).toBeGreaterThan(0)
        expect(result.body.month).toBe(4)
        expect(result.body.week4.transactions.length).toBe(1)
        expect(result.body.week4.total).toBeGreaterThan(0)

    }, 30000)
})