import { sourceFundMocks } from "../../mocks/source_fund.mock";
import { sourceFundModel } from "../../model/mongo_models/mongoose_model";
import { SourceFundRepositoryImpl } from "../../model/repositories/source_fund/source_fund_repo";
import { regexp } from "../../utils/helpers";
import { DeleteResult } from "../test_helpers/test_helpers";


jest.mock("../../model/mongo_models/mongoose_model")
test("categoryRepositoryImplTest", async () => {

    sourceFundModel.find = jest.fn().mockResolvedValue(sourceFundMocks)
    sourceFundModel.findOne = jest.fn().mockResolvedValue(sourceFundMocks[0])
    sourceFundModel.deleteOne = jest.fn().mockResolvedValue(DeleteResult)
    sourceFundModel.deleteMany = jest.fn().mockResolvedValue(DeleteResult)
    sourceFundModel.updateOne = jest.fn()
    sourceFundModel.create = jest.fn()
    const repoImpl = new SourceFundRepositoryImpl(sourceFundModel)
    await repoImpl.addSourceFund(sourceFundMocks[0])
    await repoImpl.deleteSourceFundInBatch(sourceFundMocks)
    await repoImpl.updateSourceFund(sourceFundMocks[0])
    await repoImpl.getSourceFunds(sourceFundMocks[0].userId!)
    await repoImpl.getSourceFund(sourceFundMocks[0]._id!)
    await repoImpl.search("test", sourceFundMocks[0].userId!)
    const deleteResult = await repoImpl.deleteSourceFund(sourceFundMocks[0]._id!)

    expect(sourceFundModel.find).toHaveBeenCalledWith({
        "userId": sourceFundMocks[0].userId
    })
    expect(sourceFundModel.find).toHaveBeenCalledWith(
        {
            "userId": sourceFundMocks[0].userId, $or: [{
                name: { "$regex": regexp("test") },
            }]
        })
    expect(sourceFundModel.findOne).toHaveBeenCalledWith({
        _id: sourceFundMocks[0]._id
    })
    expect(
        sourceFundModel.create
    ).toHaveBeenCalledWith(sourceFundMocks[0])
    expect(
        sourceFundModel.deleteOne
    ).toHaveBeenCalledWith(
        {
            _id: sourceFundMocks[0]._id
        }
    )
    expect(sourceFundModel.deleteOne).toHaveBeenCalledWith({
        _id: sourceFundMocks[sourceFundMocks.length - 1]._id
    })
    expect(deleteResult).toBe(true)
    expect(sourceFundModel.updateOne).toHaveBeenCalledWith({
        _id: sourceFundMocks[0]._id,

    }, sourceFundMocks[0])

})