import { categoryCacheMiddleware } from "../../api/category/cache/category_cache_middleware"
import { categoryBaseUrl } from "../../base_urls/base_urls"
import { categorymocks } from "../../mocks/category.mock"
import { fakeCacheMock, fakeNextFunction, fakeRequest, fakeResponse } from "../test_helpers/test_helpers"

describe("categories middleware test", () => {
    const mocks = categorymocks
    const mock = mocks[0]
    const res = fakeResponse()
    let next = fakeNextFunction()
    const fakeCache = fakeCacheMock()
    let req = fakeRequest(
        { userId: mock.userId },
        {},
        {},
        `${categoryBaseUrl}getAll`
    )
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("when url is <getAll> should verify if there´s categories in cache, return categories from cache if exist, or call next function if it doesn´t",
        async () => {
            fakeCache.get = jest.fn().mockResolvedValue(JSON.stringify(mocks))
            res.json = jest.fn()
            await categoryCacheMiddleware(req, res, next, fakeCache)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(fakeCache.get).toHaveBeenCalledWith(`categories-${req.params.userId}`)
        })

    it("when url is <get> should verify if there´s categories in cache, return categories from cache if exist, or call next function if it doesn´t",
        async () => {
            req = fakeRequest({ id: mock._id },
                {},
                {},
                `${categoryBaseUrl}get`)
            fakeCache.get = jest.fn().mockResolvedValue(JSON.stringify(mock))
            await categoryCacheMiddleware(req, res, next, fakeCache)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(fakeCache.get).toHaveBeenCalledWith(`categories-${mock._id}`)
        })
    it("should call next when path is <get> and there´s no cache", async () => {
        next = jest.fn()
        req = fakeRequest({ id: mock._id },
            {},
            {},
            `${categoryBaseUrl}get`)
        fakeCache.get = jest.fn().mockResolvedValue(null)

        await categoryCacheMiddleware(req, res, next, fakeCache)
        expect(next).toHaveBeenCalled()
    })
    it("should call next when path is <getAll> and there´s no cache", async () => {
        next = jest.fn()
        req = fakeRequest({ id: mock._id },
            {},
            {},
            `${categoryBaseUrl}getAll`)
        fakeCache.get = jest.fn().mockResolvedValue(null)

        await categoryCacheMiddleware(req, res, next, fakeCache)
        expect(next).toHaveBeenCalled()
    })
})