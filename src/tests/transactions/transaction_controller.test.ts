import { Transactioncontroller } from "../../api/transactions/controllers/transaction_controller"
import { transactionMocks } from "../../mocks/transaction.mock"
import { ReportType } from "../../model/dtos/dto"
import { transactionModel } from "../../model/mongo_models/mongoose_model"
import { TransactionRepositoryImpl, TransationRepository } from "../../model/repositories/transaction/transaction_repo"
import { DeleteResult, fakeCacheMock, fakeRequest, fakeResponse, testMocks } from "../test_helpers/test_helpers"

function fakeReq() {
    const mock = transactionMocks[0]
    return fakeRequest({
        userId: mock.userId,
        id: mock._id
    }, mock)
}
describe("transaction controller test", () => {
    const mock = transactionMocks[0]
    const res = fakeResponse()
    let req = fakeReq()
    const model = transactionModel
    const fakeRepo: TransationRepository = new TransactionRepositoryImpl(model)
    const fakeCache = fakeCacheMock()
    beforeEach(() => {
        jest.mock("../../model/repositories/transaction/transaction_repo")
        testMocks()
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should add transactions to cache after retrieve them", async () => {
        model.find = jest.fn().mockResolvedValue(transactionMocks)
        const fakeController = new Transactioncontroller(fakeRepo, fakeCache)
        await fakeController.getTransactions(req, res)
        expect(fakeCache.set).toHaveBeenCalledWith(`transactions-${mock.userId}`, JSON.stringify(transactionMocks))
    })
    it("should add transactions to cache after retrieve it", async () => {
        model.findOne = jest.fn().mockResolvedValue(mock)
        const fakeController = new Transactioncontroller(fakeRepo, fakeCache)
        await fakeController.getTransaction(req, res)
        expect(fakeCache.set).toHaveBeenCalledWith(`transactions-${mock._id}`, JSON.stringify(mock))
    })
    it("should add report to cache after retrieve it", async () => {
        req = fakeRequest(
            {
                userId: mock.userId,
                month: 4,
                year: 2023
            },
            {}
        )
        const fakeReport: ReportType = {
            month: 0,
            week1: {
                transaction: [],
                total: 0
            },
            week2: {
                transaction: [],
                total: 0
            },
            week3: {
                transactions: [],
                total: 0
            },
            week4: {
                transactions: [],
                total: 0
            },
            total: 0
        }
        fakeRepo.getReport = jest.fn().mockResolvedValue(fakeReport)
        model.find = jest.fn().mockResolvedValue(transactionMocks)
        const fakeController = new Transactioncontroller(fakeRepo, fakeCache)
        await fakeController.getReport(req, res)
        expect(fakeCache.set).toHaveBeenCalledWith(`report-${4}-${2023}-${mock.userId}`, JSON.stringify(fakeReport))
    })
    it("should remove transactions from cache after delete one transaction", async () => {
        model.deleteOne = jest.fn().mockResolvedValue(DeleteResult)
        model.findOne = jest.fn().mockResolvedValue(mock)
        const fakeController = new Transactioncontroller(fakeRepo, fakeCache)
        await fakeController.deleteTransaction(req, res)
        expect(fakeCache.remove).toHaveBeenCalledWith(`report-${mock.transactionDate.month}-${mock.transactionDate.year}-${mock.userId}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`transactions-${mock._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`transactions-${mock.userId}`)
    })
    it("should remove any report from cache for each month of a transaction", async () => {
        const mocks = transactionMocks
        req = fakeRequest({
            ...req.params
        },
            {
                transactions: mocks
            })
        model.updateOne = jest.fn()
        const lastTransaction = mocks[mocks.length-1]
        const fakeController = new Transactioncontroller(fakeRepo, fakeCache)
        await fakeController.deleteTransactionBatch(req, res)
        expect(fakeCache.remove).toHaveBeenCalledTimes((transactionMocks.length*2)+1)
        expect(fakeCache.remove).toHaveBeenNthCalledWith(1,`report-${mock.transactionDate.month}-${mock.transactionDate.year}-${mock.userId}`)
        expect(fakeCache.remove).toHaveBeenLastCalledWith(`transactions-${lastTransaction._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`transactions-${mock.userId}`)
    })
    it("should remove transactions from cache after updated", async () => {
        req = fakeRequest({
            ...req.params
        },
            mock)
        model.updateOne = jest.fn()
        const fakeController = new Transactioncontroller(fakeRepo, fakeCache)
        await fakeController.updateTransaction(req, res)
        expect(fakeCache.remove).toHaveBeenCalledWith(`transactions-${mock._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`transactions-${mock.userId}`)

    })

})