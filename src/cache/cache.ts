import { CacheInterface } from "../api/interfaces/cache_interface";
import { redis } from "../config/redis_config";

export class CacheImpl implements CacheInterface {
    async set(key: string, value: string): Promise<void> {
        try {
            await redis.set(key, value)
        } catch (e: any) {
            console.error(e)
        }
    }
    async get(key: string): Promise<any> {
        const cache =false
        if(cache)
            return await redis.get(key)
    }
    async remove(key: string): Promise<any> {
        try {
            await redis.del(key)
        }
        catch (e: any) {
            console.error(e)
        }
    }
    hSet(key: string, data: Object): Promise<void> {
        throw new Error("Method not implemented.");
    }

}