import { SourceFundController } from "../../api/sourceFund/controllers/source_fund_controller"
import { sourceFundMocks } from "../../mocks/source_fund.mock"
import { sourceFundModel } from "../../model/mongo_models/mongoose_model"
import { SourceFundRepository, SourceFundRepositoryImpl } from "../../model/repositories/source_fund/source_fund_repo"
import { DeleteResult, fakeCacheMock, fakeRequest, fakeResponse, testMocks } from "../test_helpers/test_helpers"

function fakeReq() {
    const mock = sourceFundMocks[0]
    return fakeRequest({
        userId: mock.user._id,
        id: mock._id
    }, mock)
}
describe("transaction controller test", () => {
  
    const mock = sourceFundMocks[0]
    const res = fakeResponse()
    let req = fakeReq()
    const model = sourceFundModel
    const fakeRepo: SourceFundRepository = new SourceFundRepositoryImpl(model)
    const fakeCache = fakeCacheMock()
    beforeEach(() => {
        jest.mock("../../model/repositories/source_fund/source_fund_repo")
        testMocks()
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should add sourceFunds to cache after retrieve them", async () => {
        model.find = jest.fn().mockResolvedValue(sourceFundMocks)
        const fakeController = new SourceFundController(fakeRepo, fakeCache)
        await fakeController.getSourceFunds(req, res)
        expect(fakeCache.set).toHaveBeenCalledWith(`source_funds-${mock.user._id}`, JSON.stringify(sourceFundMocks))
    })
    it("should add sourceFund to cache after retrieve it", async () => {
        model.findOne = jest.fn().mockResolvedValue(mock)
        const fakeController = new SourceFundController(fakeRepo, fakeCache)
        await fakeController.getSourceFund(req, res)
        expect(fakeCache.set).toHaveBeenCalledWith(`source_funds-${mock._id}`, JSON.stringify(mock))
    })

    it("should remove sourceFunds from cache after delete one transaction", async () => {
        model.deleteOne = jest.fn().mockResolvedValue(DeleteResult)
        model.findOne = jest.fn().mockResolvedValue(mock)
        const fakeController = new SourceFundController(fakeRepo, fakeCache)
        await fakeController.deleSourceFund(req, res)
        expect(fakeCache.remove).toHaveBeenCalledWith(`source_funds-${mock._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`source_funds-${mock.user._id}`)
    })
    it("should remove each sourceFund from cache when deleting in batch", async () => {
        const mocks = sourceFundMocks
        req = fakeRequest({
            ...req.params
        },
            {
                sourceFunds: mocks
            })
        model.deleteOne = jest.fn()
        const lastSourceFund = mocks[mocks.length - 1]
        const fakeController = new SourceFundController(fakeRepo, fakeCache)
        await fakeController.deleteSourceFundInBatch(req, res)
        expect(fakeCache.remove).toHaveBeenCalledTimes(sourceFundMocks.length)
        expect(fakeCache.remove).toHaveBeenLastCalledWith(`source_funds-${lastSourceFund._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`source_funds-${mock.user._id}`)
    })
    it("should remove sourceFunds from cache after updated", async () => {
        req = fakeRequest({
            ...req.params
        },
            mock)
        model.updateOne = jest.fn()
        const fakeController = new SourceFundController(fakeRepo, fakeCache)
        await fakeController.updateSourceFund(req, res)
        expect(fakeCache.remove).toHaveBeenCalledWith(`source_funds-${mock._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`source_funds-${mock.user._id}`)

    })

})