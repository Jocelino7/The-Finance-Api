import { NextFunction, Request, Response } from "express";
import { CacheImpl } from "../../../cache/cache";
import { transactionBaseUrl } from "../../../base_urls/base_urls";
import { redis } from "../../../config/redis_config";

export async function transactionCacheMiddleware(req: Request, res: Response, next: NextFunction, cache: CacheImpl) {
    const baseUrl = transactionBaseUrl
    const url = req.url
    const { month, year, userId } = req.params
    if (url.startsWith(`${baseUrl}report/`)) {
        
        try {
           
            const cacheKey = `report-${month}-${year}-${userId}`
            const cacheReport = await cache.get(cacheKey)
            if (cacheReport) {
                const parsedReport = JSON.parse(cacheReport)
                return res.status(200).json(parsedReport)
            }
            next()

        } catch (e: any) {
            console.error(e)
            next()
        }

    }
    if (url.startsWith(`${baseUrl}getAll`)) {
       
        try {
            
            const cacheKey = `transactions-${req.params.userId}`
            const transactionsCache = await cache.get(cacheKey)
            if (transactionsCache) {
                const parsedTransactions = JSON.parse(transactionsCache)
                return res.status(200).json(parsedTransactions)
            }
            next()

        } catch (e: any) {
            console.error(e)
            next()
        }

    }
    if (url.startsWith(`${baseUrl}get/`)) {
        console.log("fluxo")
        try {
            const cacheKey = `transactions-${req.params.id}`
            const transactionCache = await cache.get(cacheKey)
            if (transactionCache) {
                const parsedTransaction =JSON.parse(transactionCache)
                return res.status(200).json(parsedTransaction)
            }
            next()

        } catch (e: any) {
            console.error(e)
            next()
        }

    }
    



}