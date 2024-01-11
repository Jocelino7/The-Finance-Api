import { NextFunction, Request, Response } from "express";
import { CacheImpl } from "../../../cache/cache";
import { goalBaseUrl } from "../../../base_urls/base_urls";

export async function goalCacheMiddleware(req: Request, res: Response, next: NextFunction, cache: CacheImpl) {
    const baseUrl = goalBaseUrl
    const url = req.url
    
    if (url.startsWith(`${baseUrl}getAll`)) {
       
        try {
            const cacheKey = `goals-${req.params.userId}`
            const goalsCache = await cache.get(cacheKey)
            if (goalsCache) {
                const parsedGoals = JSON.parse(goalsCache)
                return res.status(200).json(parsedGoals)
            }
            next()

        } catch (e: any) {
            console.error(e)
            next()
        }

    }
    if (url.startsWith(`${baseUrl}get/`)) {
        try {
            const cacheKey = `goals-${req.params.id}`
            const goalCache = await cache.get(cacheKey)
            if (goalCache) {
                const parsedGoal = JSON.parse(goalCache)
                return res.status(200).json(parsedGoal)
            }
            next()

        } catch (e: any) {
            console.error(e)
            next()
        }

    }
}