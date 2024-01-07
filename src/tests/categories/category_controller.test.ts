import { CategoryController } from "../../api/category/controllers/category_controller"
import { categorymocks } from "../../mocks/category.mock"
import { categoryModel } from "../../model/mongo_models/mongoose_model"
import { CategoryRepository, CategoryRepositoryImpl } from "../../model/repositories/category/category_repo"
import { DeleteResult, fakeCacheMock, fakeRequest, fakeResponse, testMocks } from "../test_helpers/test_helpers"

function fakeReq() {
    const mock = categorymocks[0]
    return fakeRequest({
        userId: mock.userId,
        id: mock._id
    }, mock)
}
describe("transaction controller test", () => {
    const mock = categorymocks[0]
    const res = fakeResponse()
    let req = fakeReq()
    const model = categoryModel
    const fakeRepo: CategoryRepository = new CategoryRepositoryImpl(model)
    const fakeCache = fakeCacheMock()
    beforeEach(() => {
        jest.mock("../../model/repositories/category/category_repo")
        testMocks()
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should add categories to cache after retrieve them", async () => {
        model.find = jest.fn().mockResolvedValue(categorymocks)
        const fakeController = new CategoryController(fakeRepo, fakeCache)
        await fakeController.getCategories(req, res)
        expect(fakeCache.set).toHaveBeenCalledWith(`categories-${mock.userId}`, JSON.stringify(categorymocks))
    })
    it("should add category to cache after retrieve it", async () => {
        model.findOne = jest.fn().mockResolvedValue(mock)
        const fakeController = new CategoryController(fakeRepo, fakeCache)
        await fakeController.getCategory(req, res)
        expect(fakeCache.set).toHaveBeenCalledWith(`categories-${mock._id}`, JSON.stringify(mock))
    })
   
    it("should remove categories from cache after delete one transaction", async () => {
        model.deleteOne = jest.fn().mockResolvedValue(DeleteResult)
        model.findOne = jest.fn().mockResolvedValue(mock)
        const fakeController = new CategoryController(fakeRepo, fakeCache)
        await fakeController.deleteCategory(req, res)
        expect(fakeCache.remove).toHaveBeenCalledWith(`categories-${mock._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`categories-${mock.userId}`)
    })
    it("should remove each category from cache when deleting in batch", async () => {
        const mocks = categorymocks
        req = fakeRequest({
            ...req.params
        },
            {
                categories: mocks
            })
        model.deleteOne = jest.fn()
        const lastCategory = mocks[mocks.length-1]
        const fakeController = new CategoryController(fakeRepo, fakeCache)
        await fakeController.deleteCategoryInBatch(req, res)
        expect(fakeCache.remove).toHaveBeenCalledTimes(categorymocks.length)
        expect(fakeCache.remove).toHaveBeenLastCalledWith(`categories-${lastCategory._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`categories-${mock.userId}`)
    })
    it("should remove categories from cache after updated", async () => {
        req = fakeRequest({
            ...req.params
        },
            mock)
        model.updateOne = jest.fn()
        const fakeController = new CategoryController(fakeRepo, fakeCache)
        await fakeController.updateCategory(req, res)
        expect(fakeCache.remove).toHaveBeenCalledWith(`categories-${mock._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`categories-${mock.userId}`)

    })

})