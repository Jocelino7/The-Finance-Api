import { categorymocks } from "../../mocks/category.mock";
import { categoryModel } from "../../model/mongo_models/mongoose_model";
import { CategoryRepositoryImpl } from "../../model/repositories/category/category_repo";
import { DeleteResult } from "../test_helpers/test_helpers";


jest.mock("../../model/mongo_models/mongoose_model")
test("categoryRepositoryImplTest", async () => {
    categoryModel.find = jest.fn().mockResolvedValue(categorymocks)
    categoryModel.findOne = jest.fn().mockResolvedValue(categorymocks[0])
    categoryModel.deleteOne = jest.fn().mockResolvedValue(DeleteResult)
    categoryModel.deleteMany = jest.fn().mockResolvedValue(DeleteResult)
    categoryModel.updateOne = jest.fn()
    categoryModel.create = jest.fn()
    const repoImpl = new CategoryRepositoryImpl(categoryModel)
    await repoImpl.addCategory(categorymocks[0])
    await repoImpl.deleteCategoriesInBatch(categorymocks)
    await repoImpl.updateCategory(categorymocks[0])
    await repoImpl.getCategories(categorymocks[0].user._id!)
    await repoImpl.getCategory(categorymocks[0]._id!)
    await repoImpl.search("test", categorymocks[0].user._id!)
    const deleteResult = await repoImpl.deleteCategory(categorymocks[0]._id!)

    expect(categoryModel.find).toHaveBeenCalledWith({
        "user._id": categorymocks[0].user._id
    })
    expect(categoryModel.find).toHaveBeenCalledWith(
        {
            "user._id": categorymocks[0].user._id, $or: [
                {
                    name: { "$regex": new RegExp("test", "i") }
                }
            ]
        })
    expect(categoryModel.findOne).toHaveBeenCalledWith({
        "_id": categorymocks[0]._id
    })
    expect(
        categoryModel.create
    ).toHaveBeenCalledWith(categorymocks[0])
    expect(
        categoryModel.deleteOne
    ).toHaveBeenCalledWith(
        {
            _id: categorymocks[0]._id
        }
    )
    expect(categoryModel.deleteOne).toHaveBeenCalledWith({
        _id: categorymocks[categorymocks.length - 1]._id
    })
    expect(deleteResult).toBe(true)
    expect(categoryModel.updateOne).toHaveBeenCalledWith({
        _id: categorymocks[0]._id,

    }, categorymocks[0])





})