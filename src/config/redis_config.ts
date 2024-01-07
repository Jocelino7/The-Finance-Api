import { createClient } from 'redis';
export const redis = createClient()
export async function connectToRedis() {
    const cache = false
    try {
        redis.on('error', err => console.log('Redis Client Error', err));
        await redis.connect();
        console.log("connected to redis") 
    }
    catch (e: any) {
        console.error("error while connecting to redis" + e)
    }
}

 