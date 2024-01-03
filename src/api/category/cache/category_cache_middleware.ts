import { NextFunction, Request, Response } from "express";
import { CacheImpl } from "../../../cache/cache";
import { categoryBaseUrl } from "../../../base_urls/base_urls";

export async function categoryCacheMiddleware(req: Request, res: Response, next: NextFunction, cache: CacheImpl) {
    const baseUrl = categoryBaseUrl
    const url = req.url
    
    if (url.startsWith(`${baseUrl}getAll`)) {
       
        try {
            const cacheKey = `categories-${req.params.userId}`
            const categoriesCache = await cache.get(cacheKey)
            if (categoriesCache) {
                return res.status(200).json(categoriesCache)
            }
            next()

        } catch (e: any) {
            console.error(e)
            next()
        }

    }
    if (url.startsWith(`${baseUrl}get`)) {
        try {
            const cacheKey = `categories-${req.params.id}`
            const categoryCache = await cache.get(cacheKey)
            if (categoryCache) {
                return res.status(200).json(categoryCache)
            }
            next()

        } catch (e: any) {
            console.error(e)
            next()
        }

    }
    



}