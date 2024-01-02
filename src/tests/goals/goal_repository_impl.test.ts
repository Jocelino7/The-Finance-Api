import { goalMocks } from "../../mocks/goal.mock";
import { goalModel } from "../../model/mongo_models/mongoose_model";
import { GoalRepositoryImpl } from "../../model/repositories/goals/goal_repo";
import { regexp } from "../../utils/helpers";
import { DeleteResult } from "../test_helpers/test_helpers";


jest.mock("../../model/mongo_models/mongoose_model")
test("categoryRepositoryImplTest", async () => {
  
    goalModel.find = jest.fn().mockResolvedValue(goalMocks)
    goalModel.findOne = jest.fn().mockResolvedValue(goalMocks[0])
    goalModel.deleteOne = jest.fn().mockResolvedValue(DeleteResult)
    goalModel.deleteMany = jest.fn().mockResolvedValue(DeleteResult)
    goalModel.updateOne = jest.fn()
    goalModel.create = jest.fn()
    const repoImpl = new GoalRepositoryImpl(goalModel)
    await repoImpl.addGoal(goalMocks[0])
    await repoImpl.deleteGoalsInBatch(goalMocks)
    await repoImpl.updateGoal(goalMocks[0])
    await repoImpl.getGoals(goalMocks[0].user._id!)
    await repoImpl.getGoal(goalMocks[0]._id!)
    await repoImpl.search("test", goalMocks[0].user._id!)
    const deleteResult = await repoImpl.deleteGoal(goalMocks[0]._id!)

    expect(goalModel.find).toHaveBeenCalledWith({
        "user._id": goalMocks[0].user._id
    })
    expect(goalModel.find).toHaveBeenCalledWith(
        {
            "user._id": goalMocks[0].user._id, $or: [{
                name: { "$regex": regexp("test") },
                description: { "$regex": regexp("test") }
            }]
        })
    expect(goalModel.findOne).toHaveBeenCalledWith({
        "_id": goalMocks[0]._id
    })
    expect(
        goalModel.create
    ).toHaveBeenCalledWith(goalMocks[0])
    expect(
        goalModel.deleteOne
    ).toHaveBeenCalledWith(
        {
            _id: goalMocks[0]._id
        }
    )
    expect(goalModel.deleteOne).toHaveBeenCalledWith({
        _id: goalMocks[goalMocks.length - 1]._id
    })
    expect(deleteResult).toBe(true)
    expect(goalModel.updateOne).toHaveBeenCalledWith({
        _id: goalMocks[0]._id,

    }, goalMocks[0])

})