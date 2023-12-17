import { Request, Response } from "express";
import { GoalRepository } from "../../../model/repositories/goals/goal_repo";

export class GoalController {
    goalRepo:GoalRepository
    constructor(repo:GoalRepository){
        this.goalRepo = repo
    }
    async addGoal(req:Request,res:Response){
        try{
            await this.goalRepo.addGoal(req.body)
            return res.sendStatus(201)
        }catch(e:any){
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async getGoal(req:Request,res:Response){
        try{
            const {id}=req.params
            const goal = await this.goalRepo.getGoal(id)
            return res.status(200).json(goal)
            
        }catch(e:any){
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async getGoals(req:Request,res:Response){
        try{
            const {id}=req.params
            const goals = await this.goalRepo.getGoals(id)
            return res.status(200).json(goals)
            
        }catch(e:any){
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async deleteGoal(req:Request,res:Response){
        try{
            const {userId}=req.params
            await this.goalRepo.deleteGoal(userId)
            return res.sendStatus(200)
            
        }catch(e:any){
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async updateGoal(req:Request,res:Response){
        try{
            const goal = await this.goalRepo.updateGoal(req.body)
            return res.status(200).json(goal)
            
        }catch(e:any){
            console.log(e)
            return res.sendStatus(500)
        }
    }
    async deleteGoalInBatch(req:Request,res:Response){
        try{
            const goals=req.body.goals
            const deleteResult = await this.goalRepo.deleteGoalsInBatch(goals)
            if(deleteResult)
                return res.sendStatus(200)
            return res.sendStatus(500)

        }catch(e:any){
            console.log(e)
            return res.sendStatus(500)
        }
    }
}