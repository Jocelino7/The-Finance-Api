import { transactionCacheMiddleware } from "../../api/transactions/cache/transaction_cache_middleware"
import { transactionBaseUrl } from "../../base_urls/base_urls"
import { transactionMocks } from "../../mocks/transaction.mock"
import { fakeCacheMock, fakeNextFunction, fakeRequest, fakeResponse } from "../test_helpers/test_helpers"

describe("transaction middleware test", () => {
    const mocks = transactionMocks
    const mock = mocks[0]
    const res = fakeResponse()
    let next = fakeNextFunction()
    const fakeCache = fakeCacheMock()
    let req = fakeRequest(
        { userId: mock.user._id },
        {},
        {},
        `${transactionBaseUrl}getAll`
    )
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("when url is <getAll> should verify if there´s transactions in cache, return transactions from cache if exist, or call next function if it doesn´t",
        async () => {
            fakeCache.get = jest.fn().mockResolvedValue(JSON.stringify(mocks))
            res.json = jest.fn()
            await transactionCacheMiddleware(req, res, next, fakeCache)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(fakeCache.get).toHaveBeenCalledWith(`transactions-${req.params.userId}`)
        })
    it("when url is <report> should verify if there´s transactions in cache, return transactions from cache if exist, or call next function if it doesn´t",
        async () => {
            req = fakeRequest({
                userId: mock.user._id,
                month: 1,
                year: 2023
            },
                {},
                {},
                `${transactionBaseUrl}report`)
            fakeCache.get = jest.fn().mockResolvedValue(JSON.stringify(mocks))
            await transactionCacheMiddleware(req, res, next, fakeCache)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(fakeCache.get).toHaveBeenCalledWith(`report-${mock.transactionDate.day}-${mock.transactionDate.year}-${mock.user._id}`)
        })
    it("when url is <get> should verify if there´s transactions in cache, return transactions from cache if exist, or call next function if it doesn´t",
        async () => {
            req = fakeRequest({ id: mock._id },
                {},
                {},
                `${transactionBaseUrl}get`)
            fakeCache.get = jest.fn().mockResolvedValue(JSON.stringify(mock))
            await transactionCacheMiddleware(req, res, next, fakeCache)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(fakeCache.get).toHaveBeenCalledWith(`transactions-${mock._id}`)
        })
    it("should call next when path is <get> and there´s no cache", async () => {
        next = jest.fn()
        req = fakeRequest({ id: mock._id },
            {},
            {},
            `${transactionBaseUrl}get`)
        fakeCache.get = jest.fn().mockResolvedValue(null)

        await transactionCacheMiddleware(req, res, next, fakeCache)
        expect(next).toHaveBeenCalled()
    })
    it("should call next when path is <getAll> and there´s no cache", async () => {
        next = jest.fn()
        req = fakeRequest({ id: mock._id },
            {},
            {},
            `${transactionBaseUrl}getAll`)
        fakeCache.get = jest.fn().mockResolvedValue(null)

        await transactionCacheMiddleware(req, res, next, fakeCache)
        expect(next).toHaveBeenCalled()
    })
    it("should call next when path is <report> and there´s no cache", async () => {
        next = jest.fn()
        req = fakeRequest({ id: mock._id },
            {},
            {},
            `${transactionBaseUrl}report`)
        fakeCache.get = jest.fn().mockResolvedValue(null)

        await transactionCacheMiddleware(req, res, next, fakeCache)
        expect(next).toHaveBeenCalled()
    })
})