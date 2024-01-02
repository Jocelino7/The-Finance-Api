import { Request, Response } from "express";
import { GoalRepository } from "../../../model/repositories/goals/goal_repo";
import { CacheInterface } from "../../interfaces/cache_interface";
import { GoalType } from "../../../model/dtos/dto";

export class GoalController {
    goalRepo: GoalRepository
    cache
    key = "goals"
    constructor(repo: GoalRepository, cache: CacheInterface) {
        this.goalRepo = repo
        this.cache = cache
    }
    async addGoal(req: Request, res: Response) {
        try {
            const goal = req.body
            await this.goalRepo.addGoal(goal)
            await this.cache.remove(`${this.key}-${goal.user._id}`)
            return res.sendStatus(201)
        } catch (e: any) {
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async getGoal(req: Request, res: Response) {
        try {
            const { id } = req.params
            const goal = await this.goalRepo.getGoal(id)
            const jsonGoal = JSON.stringify(goal)
            await this.cache.set(`${this.key}-${id}`, jsonGoal)
            return res.status(200).json(goal)

        } catch (e: any) {
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async getGoals(req: Request, res: Response) {
        try {
            const { userId } = req.params
            const { q } = req.query
            const goals = q ? await this.goalRepo.search(q.toString(), userId) : await this.goalRepo.getGoals(userId)
            const jsonGoals = JSON.stringify(goals)
            q ? await this.cache.set(`${this.key}-${userId}-q`, jsonGoals) : await this.cache.set(`${this.key}-${userId}`, jsonGoals)
            return res.status(200).json(goals)

        } catch (e: any) {
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async deleteGoal(req: Request, res: Response) {
        try {
            const { id } = req.params
            const goal = await this.goalRepo.getGoal(id)
            await this.goalRepo.deleteGoal(id)
            await this.cache.remove(`${this.key}-${id}`)
            await this.cache.remove(`${this.key}-${goal?.user._id}`)
            return res.sendStatus(200)
        } catch (e: any) {
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async updateGoal(req: Request, res: Response) {
        try {
            const goal:GoalType = req.body
            await this.goalRepo.updateGoal(goal)
            await this.cache.remove(`${this.key}-${goal._id}`)
            await this.cache.remove(`${this.key}-${goal.user._id}`)
            return res.status(200)
        } catch (e: any) {
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async deleteGoalInBatch(req: Request, res: Response) {
        try {
            const goals:GoalType[] = req.body.goals
            const deleteResult = await this.goalRepo.deleteGoalsInBatch(goals)
            const promise = goals.map(async(goal:GoalType)=>{
                await this.cache.remove(`${this.key}-${goal._id}`)

            })
            promise.push(await this.cache.remove(`${this.key}-${goals[0].user._id}`))
            await Promise.all(promise)
            if (deleteResult)
                return res.sendStatus(200)
            return res.sendStatus(500)

        } catch (e: any) {
            console.log(e)
            return res.sendStatus(500)
        }
    }
}