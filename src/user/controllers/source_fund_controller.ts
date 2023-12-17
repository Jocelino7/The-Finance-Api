import { Request,Response } from "express";
import { SourceFundRepository } from "../../model/repositories/source_fund/source_fund_repo";

class SouceFundController{
    sourceFundRepo:SourceFundRepository
    constructor(repo:SourceFundRepository){
        this.sourceFundRepo = repo
    }
    async addSourceFund(req:Request,res:Response){
        try{
            const sourceFund = await this.sourceFundRepo.addSourceFund(req.body)
            return res.sendStatus(201)
        }
        catch(e:any){
            console.error(e.message)
            return res.sendStatus(500)
        }

    }
    async getSourceFund(req:Request,res:Response){
        try{
            const {id}= req.params
            const sourceFund = await this.sourceFundRepo.getSourceFund(id)
            return res.status(200).json(sourceFund)
        }
        catch(e:any){
            console.error(e.message)
            return res.sendStatus(500)
        }

    }
    async getSourceFunds(req:Request,res:Response){
        try{
            const {userId}= req.params
            const sourceFunds = await this.sourceFundRepo.getSourceFunds(userId)
            return res.status(200).json(sourceFunds)
        }
        catch(e:any){
            console.error(e.message)
            return res.sendStatus(500)
        }

    }
    async updateSourceFund(req:Request,res:Response){
        try{
            await this.sourceFundRepo.updateSourceFund(req.body)
            return res.sendStatus(200)
        }
        catch(e:any){
            console.error(e.message)
            return res.sendStatus(500)
        }

    }
    async deleSourceFund(req:Request,res:Response){
        try{
            const {id} = req.params
            this.sourceFundRepo.deleteSourceFund(id)
            return res.sendStatus(200)
        }
        catch(e:any){
            console.error(e.message)
            return res.sendStatus(500)
        }

    }
    async deleteSourceFundInBatch(req:Request,res:Response){
        try{
            const sourceFunds = req.body.sourceFunds
            this.sourceFundRepo.deleteSourceFundInBatch(sourceFunds)
            return res.sendStatus(200)
        }
        catch(e:any){
            console.error(e.message)
            return res.sendStatus(500)
        }

    }


}
