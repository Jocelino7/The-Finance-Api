import { NextFunction, Request, Response } from "express";
import { CacheImpl } from "../../../cache/cache";


export async function currencyCacheMiddleware(req: Request, res: Response, next: NextFunction, cache: CacheImpl) {
    try {
        const cacheKey = `rates`
        const currencyCache = await cache.get(cacheKey)
        const currencyParsed = JSON.parse(currencyCache)
        if (currencyCache) {
            return res.status(200).json(currencyParsed)
        }
        next()

    } catch (e: any) {
        console.error(e)
        next()
    }
}