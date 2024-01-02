import { NextFunction,Request,Response } from "express"
import { CacheImpl } from "../../cache/cache"

export function fakeRequest(
    params: { [key: string]: string | number | undefined | null },
    body: { [key: string]: any },
    query:{[key: string]: any} = {},
    url:string=""
) {
    return {
        params,
        body,
        query,
        url
    } as unknown as Request
}
export function fakeResponse():Response {
    return {
        status: jest.fn().mockImplementation((value: number) => fakeResponse() ),
        sendStatus: jest.fn().mockImplementation((value: number) => { }),
        json: jest.fn().mockImplementation((value: any) =>  fakeResponse() ),
        send:jest.fn()
    } as unknown as Response
}
export function fakeNextFunction() {
    return jest.fn() as unknown as NextFunction
}
export function testMocks() {
    jest.mock("../../model/mongo_models/mongoose_model")
}
export function fakeCacheMock() {
    jest.mock("../../cache/cache")
    const fakeCache = new CacheImpl()
    fakeCache.get = jest.fn()
    fakeCache.set = jest.fn()
    fakeCache.remove = jest.fn()
    return fakeCache
}
export  const DeleteResult = {
    acknowledged: true
}