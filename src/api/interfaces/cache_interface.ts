export interface CacheInterface{
    set(key:string,value:string):Promise<void>
    get(key:string):Promise<any>
    remove(key:string):Promise<any>
    hSet(key:string,data:Object):Promise<void>
}