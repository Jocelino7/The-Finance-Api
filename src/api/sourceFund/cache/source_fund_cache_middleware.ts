import { NextFunction, Request, Response } from "express";
import { CacheImpl } from "../../../cache/cache";
import { sourceFundBaseUrl } from "../../../base_urls/base_urls";

export async function sourceFundCacheMiddleware(req: Request, res: Response, next: NextFunction, cache: CacheImpl) {
    const baseUrl = sourceFundBaseUrl
    const url = req.url
    
    if (url.startsWith(`${baseUrl}getAll`)) {
       
        try {
            const cacheKey = `sourceFunds-${req.params.userId}`
            const sourceFundsCache = await cache.get(cacheKey)
            if (sourceFundsCache) {
                const parsedSourceFundsCache = JSON.parse(sourceFundsCache)
                return res.status(200).json(parsedSourceFundsCache)
            }
            next()

        } catch (e: any) {
            console.error(e)
            next()
        }

    }
    if (url.startsWith(`${baseUrl}get/`)) {
        try {
            const cacheKey = `sourceFunds-${req.params.id}`
            const sourceFundCache = await cache.get(cacheKey)
            if (sourceFundCache) {
                const parsedSourceFund = JSON.parse(sourceFundCache)
                return res.status(200).json(parsedSourceFund)
            }
            next()

        } catch (e: any) {
            console.error(e)
            next()
        }

    }
    



}