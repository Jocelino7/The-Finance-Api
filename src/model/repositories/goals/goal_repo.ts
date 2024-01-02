import { Model } from "mongoose"
import { GoalType } from "../../dtos/dto"

export interface GoalRepository {
    getGoal(id: string): Promise<GoalType | null>
    getGoals(userId: string): Promise<GoalType[] | null>
    deleteGoal(id: string): Promise<boolean>
    addGoal(goal: GoalType): Promise<boolean>
    updateGoal(goal: GoalType): Promise<boolean>,
    search(value: string, userId: string): Promise<GoalType[]>,
    deleteGoalsInBatch(goals: GoalType[]): Promise<boolean>
}

export class GoalRepositoryImpl implements GoalRepository {
    goalModel: Model<GoalType>
    constructor(model: Model<GoalType>) {
        this.goalModel = model
    }
    async deleteGoalsInBatch(goals: GoalType[]): Promise<boolean> {
        try {
            const promises = goals.map(async (goalItem) => {
                await this.goalModel.deleteOne({ _id: goalItem._id })
            })
            await Promise.all(promises)
            return true
        }
        catch (e: any) {
            throw new Error(e.message)
        }
    }
    async getGoal(id: string): Promise<GoalType | null> {
        try {
            const goal = await this.goalModel.findOne({ _id: id })
            return goal
        }
        catch (e: any) {
            console.error(e)
            throw new Error(e.message)
        }
    }
    async getGoals(userId: string): Promise<GoalType[] | null> {
        try {
            const goal = await this.goalModel.find({ "user._id": userId })
            return goal
        }
        catch (e: any) {
            console.error(e)
            throw new Error(e.message)
        }
    }
    async deleteGoal(id: string): Promise<boolean> {
        try {
            const deleteResult = await this.goalModel.deleteOne({ _id: id })
            return deleteResult.acknowledged
        }
        catch (e: any) {
            console.error(e)
            throw new Error(e.message)
        }
    }
    async addGoal(goal: GoalType): Promise<boolean> {
        try {
            await this.goalModel.create(goal)
            return true
        }
        catch (e: any) {
            console.error(e)
            throw new Error(e.message)
        }
    }
    async updateGoal(goal: GoalType): Promise<boolean> {
        try {
            await this.goalModel.updateOne({ _id: goal._id }, goal)
            return true
        }
        catch (e: any) {
            console.error(e)
            throw new Error(e.message)
        }
    }
    async search(value: string, userId: string): Promise<GoalType[]> {
        try {
            const regex = new RegExp(value, "i")
            const goals = await this.goalModel.find({
                "user._id": userId, $or: [{
                    name: { "$regex": regex },
                    description: { "$regex": regex }
                }]
            })
            return goals
        }
        catch (e: any) {
            console.error(e)
            throw new Error(e.message)
        }
    }


}