import mongoose from "mongoose";
import { connectToMongo } from "../../config/mongo_config";
import request from "supertest"
import { generateFakeToken } from "../../utils/helpers";
import { categoryModel } from "../../model/mongo_models/mongoose_model";
import { app } from "../../../index";
import { CategoryType } from "../../model/dtos/dto";
import { categorymocks } from "../../mocks/category.mock";
async function addCategory(category: CategoryType, req: request.SuperTest<request.Test>) {
    const baseUrl = "/t/f/categories/"
    return await req.post(`${baseUrl}add`)
        .send(category)
        .set("authorization", generateFakeToken())
}
describe("category tests", () => {
    const baseUrl = "/t/f/categories/"
    const mongooseConnection = mongoose
    let fakeCategory: CategoryType
    const req = request(app)
    beforeAll(async () => {
        try {
            await connectToMongo();
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }, 30000)
    afterAll(async () => {
        await categoryModel.deleteMany()
        await mongooseConnection.connection.close(true);
    }, 30000)
    it("given a category, it should create and return a status 201", async () => {

        fakeCategory = categorymocks[0]
        const result = await addCategory(fakeCategory, req)
        expect(result.statusCode).toBe(201)

    })
    it("given a category it should update", async () => {
        fakeCategory = categorymocks[1]
        //create new category
        const fakeToken = generateFakeToken()
        await addCategory(fakeCategory, req)

        // update category
        const updateResult = await req.put(`${baseUrl}update`)
            .set("authorization", fakeToken)
            .send({
                ...fakeCategory!,
                amount: 1500
            })
        expect(updateResult.statusCode).toBe(200)
        //retrieve update category 
        const updatedCategory = await categoryModel.findOne({ _id: fakeCategory!._id })
        expect(updatedCategory?.name).toBe(fakeCategory.name)
    }, 30000)
    it("given an id, it should return a category", async () => {
        `${baseUrl}get/:id`
        //create category
        fakeCategory = categorymocks[2]

        const fakeToken = generateFakeToken()
        await addCategory(fakeCategory, req)
        //get the new created category
        const result = await req.get(`${baseUrl}get/${fakeCategory!._id}`)
            .set("authorization", fakeToken)
        expect(result.body).toBeDefined()
        expect(result.body).not.toBeNull()
    }, 30000)
    it("given an userId it should return an array of category that belongs to the user", async () => {
        //add category
        fakeCategory = categorymocks[3]

        const fakeToken = generateFakeToken()
        await addCategory(fakeCategory, req)
        //get categories added    
        const result = await req.get(`${baseUrl}getAll/${fakeCategory!.userId}`)
            .set("authorization", fakeToken)
            console.log("all +",JSON.stringify(result))
        expect(result.body.length).toBe(1)
        expect(result.body[0].name).toBe(fakeCategory.name)
        expect(result.body[0].userId).toBe(fakeCategory.userId)
    }, 30000)
    it("given an userId and a query(q) should return an array of category that matches the query and belongs to the user", async () => {
        //add category
        fakeCategory = {
            ...categorymocks[7],
            name: "category test"
        }
        const fakeToken = generateFakeToken()
        await addCategory(fakeCategory, req)
        //get categories added
        const result = await req.get(`${baseUrl}getAll/${fakeCategory.userId}?q=test`)
            .set("authorization", fakeToken)
            console.log("wuery +",JSON.stringify(result))
        expect(result.body[0].name).toBe(fakeCategory.name)
        expect(result.body[0].userId).toBe(fakeCategory.userId)
        expect(result.body.length).toBeGreaterThan(0)

    }, 30000),
        it("given an categoryId it should delete it", async () => {
            fakeCategory = categorymocks[4]
            //add category
            const fakeToken = generateFakeToken()
            await addCategory(fakeCategory, req)
            //delete category
            const deleteResult = await req.delete(`${baseUrl}delete/${fakeCategory!._id}`)
                .set("authorization", fakeToken)

            expect(deleteResult.status).toBe(200)
            //assert if category was deleted 
            const result = await req.get(`${baseUrl}get/${fakeCategory!._id}`)
                .set("authorization", fakeToken)
            expect(result.body).toBeNull()
        }, 30000)
    it("given an array of categories it should delete them all", async () => {
        fakeCategory = categorymocks[5]
        const fakeCategory2 = categorymocks[6]
        const fakeToken = generateFakeToken()
        //add categories
        await addCategory(fakeCategory, req)
        await addCategory(fakeCategory2, req)
        //delete categories
        const deleteResult = await req.delete(`${baseUrl}delete_batch/`)
            .set("authorization", fakeToken)
            .send({
                categories: [fakeCategory, fakeCategory2]
            })

        expect(deleteResult.status).toBe(200)
        //assert if categories was deleted 
        const resultCategory1 = await req.get(`${baseUrl}get/${fakeCategory!._id}`)
            .set("authorization", fakeToken)
        const resultCategory2 = await req.get(`${baseUrl}get/${fakeCategory2!._id}`)
            .set("authorization", fakeToken)
        expect(resultCategory1.body).toBeNull()
        expect(resultCategory2.body).toBeNull()
    }, 30000)

})