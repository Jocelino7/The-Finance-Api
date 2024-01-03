import { GoalController } from "../../api/goals/controllers/goal_controller"
import { goalMocks } from "../../mocks/goal.mock"
import { goalModel } from "../../model/mongo_models/mongoose_model"
import { GoalRepository, GoalRepositoryImpl } from "../../model/repositories/goals/goal_repo"
import { DeleteResult, fakeCacheMock, fakeRequest, fakeResponse, testMocks } from "../test_helpers/test_helpers"

function fakeReq() {
    const mock = goalMocks[0]
    return fakeRequest({
        userId: mock.user._id,
        id: mock._id
    }, mock)
}
describe("transaction controller test", () => {
    const mock = goalMocks[0]
    const res = fakeResponse()
    let req = fakeReq()
    const model = goalModel
    const fakeRepo: GoalRepository = new GoalRepositoryImpl(model)
    const fakeCache = fakeCacheMock()
    beforeEach(() => {
        jest.mock("../../model/repositories/goals/goal_repo")
        testMocks()
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should add goals to cache after retrieve them", async () => {
        model.find = jest.fn().mockResolvedValue(goalMocks)
        const fakeController = new GoalController(fakeRepo, fakeCache)
        await fakeController.getGoals(req, res)
        expect(fakeCache.set).toHaveBeenCalledWith(`goals-${mock.user._id}`, JSON.stringify(goalMocks))
    })
    it("should add goal to cache after retrieve it", async () => {
        model.findOne = jest.fn().mockResolvedValue(mock)
        const fakeController = new GoalController(fakeRepo, fakeCache)
        await fakeController.getGoal(req, res)
        expect(fakeCache.set).toHaveBeenCalledWith(`goals-${mock._id}`, JSON.stringify(mock))
    })
   
    it("should remove goals from cache after delete one transaction", async () => {
        model.deleteOne = jest.fn().mockResolvedValue(DeleteResult)
        model.findOne = jest.fn().mockResolvedValue(mock)
        const fakeController = new GoalController(fakeRepo, fakeCache)
        await fakeController.deleteGoal(req, res)
        expect(fakeCache.remove).toHaveBeenCalledWith(`goals-${mock._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`goals-${mock.user._id}`)
    })
    it("should remove each goal from cache when deleting in batch", async () => {
        const mocks = goalMocks
        req = fakeRequest({
            ...req.params
        },
            {
                goals: mocks
            })
        model.deleteOne = jest.fn()
        const lastgoal = mocks[mocks.length-1]
        const fakeController = new GoalController(fakeRepo, fakeCache)
        await fakeController.deleteGoalInBatch(req, res)
        expect(fakeCache.remove).toHaveBeenCalledTimes(goalMocks.length)
        expect(fakeCache.remove).toHaveBeenLastCalledWith(`goals-${lastgoal._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`goals-${mock.user._id}`)
    })
    it("should remove goals from cache after updated", async () => {
        req = fakeRequest({
            ...req.params
        },
            mock)
        model.updateOne = jest.fn()
        const fakeController = new GoalController(fakeRepo, fakeCache)
        await fakeController.updateGoal(req, res)
        expect(fakeCache.remove).toHaveBeenCalledWith(`goals-${mock._id}`)
        expect(fakeCache.remove).toHaveBeenCalledWith(`goals-${mock.user._id}`)

    })

})