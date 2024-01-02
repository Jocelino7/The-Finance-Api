
import { sourceFundCacheMiddleware } from "../../api/sourceFund/cache/source_fund_cache_middleware"
import { sourceFundBaseUrl } from "../../base_urls/base_urls"
import { sourceFundMocks } from "../../mocks/source_fund.mock"
import { fakeCacheMock, fakeNextFunction, fakeRequest, fakeResponse } from "../test_helpers/test_helpers"

describe("sourceFunds middleware test", () => {
    const mocks = sourceFundMocks
    const mock = mocks[0]
    const res = fakeResponse()
    let next = fakeNextFunction()
    const fakeCache = fakeCacheMock()
    let req = fakeRequest(
        { userId: mock.user._id },
        {},
        {},
        `${sourceFundBaseUrl}getAll`
    )
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("when url is <getAll> should verify if there´s sourceFunds in cache, return sourceFunds from cache if exist, or call next function if it doesn´t",
        async () => {
            fakeCache.get = jest.fn().mockResolvedValue(JSON.stringify(mocks))
            res.json = jest.fn()
            await sourceFundCacheMiddleware(req, res, next, fakeCache)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(fakeCache.get).toHaveBeenCalledWith(`sourceFunds-${req.params.userId}`)
        })

    it("when url is <get> should verify if there´s sourceFunds in cache, return sourceFunds from cache if exist, or call next function if it doesn´t",
        async () => {
            req = fakeRequest({ id: mock._id },
                {},
                {},
                `${sourceFundBaseUrl}get`)
            fakeCache.get = jest.fn().mockResolvedValue(JSON.stringify(mock))
            await sourceFundCacheMiddleware(req, res, next, fakeCache)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(fakeCache.get).toHaveBeenCalledWith(`sourceFunds-${mock._id}`)
        })
    it("should call next when path is <get> and there´s no cache", async () => {
        next = jest.fn()
        req = fakeRequest({ id: mock._id },
            {},
            {},
            `${sourceFundBaseUrl}get`)
        fakeCache.get = jest.fn().mockResolvedValue(null)

        await sourceFundCacheMiddleware(req, res, next, fakeCache)
        expect(next).toHaveBeenCalled()
    })
    it("should call next when path is <getAll> and there´s no cache", async () => {
        next = jest.fn()
        req = fakeRequest({ id: mock._id },
            {},
            {},
            `${sourceFundBaseUrl}getAll`)
        fakeCache.get = jest.fn().mockResolvedValue(null)

        await sourceFundCacheMiddleware(req, res, next, fakeCache)
        expect(next).toHaveBeenCalled()
    })
})