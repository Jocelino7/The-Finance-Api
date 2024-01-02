import { goalCacheMiddleware } from "../../api/goals/cache/goal_cache_middleware"
import { goalBaseUrl } from "../../base_urls/base_urls"
import { categorymocks } from "../../mocks/category.mock"
import { goalMocks } from "../../mocks/goal.mock"
import { fakeCacheMock, fakeNextFunction, fakeRequest, fakeResponse } from "../test_helpers/test_helpers"

describe("goals middleware test", () => {
    const mocks = goalMocks
    const mock = mocks[0]
    const res = fakeResponse()
    let next = fakeNextFunction()
    const fakeCache = fakeCacheMock()
    let req = fakeRequest(
        { userId: mock.user._id },
        {},
        {},
        `${goalBaseUrl}getAll`
    )
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("when url is <getAll> should verify if there´s goals in cache, return goals from cache if exist, or call next function if it doesn´t",
        async () => {
            fakeCache.get = jest.fn().mockResolvedValue(JSON.stringify(mocks))
            res.json = jest.fn()
            await goalCacheMiddleware(req, res, next, fakeCache)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(fakeCache.get).toHaveBeenCalledWith(`goals-${req.params.userId}`)
        })

    it("when url is <get> should verify if there´s goals in cache, return goals from cache if exist, or call next function if it doesn´t",
        async () => {
            req = fakeRequest({ id: mock._id },
                {},
                {},
                `${goalBaseUrl}get`)
            fakeCache.get = jest.fn().mockResolvedValue(JSON.stringify(mock))
            await goalCacheMiddleware(req, res, next, fakeCache)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(fakeCache.get).toHaveBeenCalledWith(`goals-${mock._id}`)
        })
    it("should call next when path is <get> and there´s no cache", async () => {
        next = jest.fn()
        req = fakeRequest({ id: mock._id },
            {},
            {},
            `${goalBaseUrl}get`)
        fakeCache.get = jest.fn().mockResolvedValue(null)

        await goalCacheMiddleware(req, res, next, fakeCache)
        expect(next).toHaveBeenCalled()
    })
    it("should call next when path is <getAll> and there´s no cache", async () => {
        next = jest.fn()
        req = fakeRequest({ id: mock._id },
            {},
            {},
            `${goalBaseUrl}getAll`)
        fakeCache.get = jest.fn().mockResolvedValue(null)

        await goalCacheMiddleware(req, res, next, fakeCache)
        expect(next).toHaveBeenCalled()
    })
})