import { Request, Response } from "express";
import { SourceFundRepository } from "../../../model/repositories/source_fund/source_fund_repo";
import { CacheInterface } from "../../interfaces/cache_interface";
import { SourceFundType } from "../../../model/dtos/dto";
import { internalServerError } from "../../../utils/constants";

export class SourceFundController {
    sourceFundRepo: SourceFundRepository
    cache
    key = "source_funds"
    constructor(repo: SourceFundRepository, cache: CacheInterface) {
        this.sourceFundRepo = repo
        this.cache = cache
    }
    async addSourceFund(req: Request, res: Response) {
        try {
            const sourceFund: SourceFundType = req.body
            await this.sourceFundRepo.addSourceFund(sourceFund)
            await this.cache.remove(`${this.key}-${sourceFund.userId}`)
            return res.status(201).json({ message: "created" })
        }
        catch (e: any) {
            console.error(e.message)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async getSourceFund(req: Request, res: Response) {
        try {
            const { id } = req.params
            const sourceFund = await this.sourceFundRepo.getSourceFund(id)
            const jsonSourceFund = JSON.stringify(sourceFund)
            await this.cache.set(`${this.key}-${id}`, jsonSourceFund)
            return res.status(200).json({data:sourceFund})
        }
        catch (e: any) {
            console.error(e.message)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async getSourceFunds(req: Request, res: Response) {
        try {
            const { userId } = req.params
            const { q } = req.query
            const sourceFunds = q ? await this.sourceFundRepo.search(q.toString(), userId) : await this.sourceFundRepo.getSourceFunds(userId)
            const jsonSourceFunds = JSON.stringify(sourceFunds)
            q ? await this.cache.set(`${this.key}-${userId}-q`, jsonSourceFunds) : await this.cache.set(`${this.key}-${userId}`, jsonSourceFunds)
            return res.status(200).json({data:sourceFunds})
        }
        catch (e: any) {
            console.error(e.message)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async updateSourceFund(req: Request, res: Response) {
        try {
            const sourceFund: SourceFundType = req.body
            await this.sourceFundRepo.updateSourceFund(req.body)
            await this.cache.remove(`${this.key}-${sourceFund._id}`)
            await this.cache.remove(`${this.key}-${sourceFund?.userId}`)
            return res.sendStatus(200)
        }
        catch (e: any) {
            console.error(e.message)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async deleSourceFund(req: Request, res: Response) {
        try {
            const { id } = req.params
            const sourceFund = await this.sourceFundRepo.getSourceFund(id)
            this.sourceFundRepo.deleteSourceFund(id)
            await this.cache.remove(`${this.key}-${id}`)
            await this.cache.remove(`${this.key}-${sourceFund?.userId}`)
            return res.sendStatus(200)
        }
        catch (e: any) {
            console.error(e.message)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async deleteSourceFundInBatch(req: Request, res: Response) {
        try {
            const sourceFunds = req.body.sourceFunds
            await this.sourceFundRepo.deleteSourceFundInBatch(sourceFunds)
            const promises = sourceFunds.map(async (sourceFund: SourceFundType) => {
                await this.cache.remove(`${this.key}-${sourceFund._id}`)
            })
            promises.push(await this.cache.remove(`${this.key}-${sourceFunds[0].userId}`))
            Promise.all(promises)
            return res.sendStatus(200)
        }
        catch (e: any) {
            console.error(e.message)
            return res.status(500).json({ message: internalServerError })
        }

    }


}
