import { Axios } from "axios";
import { Request, Response } from "express";
import { currencies, currenciesQuery } from "../../defaults/defaults";
import { CacheInterface } from "../interfaces/cache_interface";
import { CurrencyRate} from "../../model/dtos/dto";
import { internalServerError } from "../../utils/constants";
import { CurrencyRepository } from "../../model/repositories/currency/currency_repo";

export class CurrencyController {
    baseUrl = "http://apilayer.net/api/live"
    fetcher
    accessKey = process.env.CURRENCY_API_KEY
    cache
    currencyRepo
    constructor(
        fetcher: Axios,
        cache: CacheInterface,
        currencyRepo: CurrencyRepository
    ) {
        this.fetcher = fetcher
        this.cache = cache
        this.currencyRepo = currencyRepo
    }
    async addDefaultCurrency(req: Request, res: Response): Promise<void> {
        try {
            await this.currencyRepo.addDefaultCurrency(req.body)
            res.status(201).json({ message: "created" })
        } catch (e: any) {
            console.error(e)
            res.status(500).json({ message: internalServerError })
        }
    }
    async updateDefaultCurrency(req: Request, res: Response): Promise<void> {
        try {
            await this.currencyRepo.updateDefaultCurrency(req.body)
            res.status(200).json({ message: "ok" })
        } catch (e: any) {
            console.error(e)
            res.status(500).json({ message: internalServerError })
        }
    }
    async getDefaultCurrency(req:Request,res:Response){
        try{
            const {userId} = req.params
            const currency = await this.currencyRepo.getDefaultCurrency(userId)
            res.status(200).json(currency)
        }catch(e:any){
            console.log(e)
            res.status(500).json({message:internalServerError})

        }
    }

    async getRates(req: Request, res: Response) {
        const { source } = req.params
        try {
            const rate = await this.fetcher.get(`${this.baseUrl}?access_key=${this.accessKey}&currencies=${currenciesQuery}&source=${source}&format=1`)
            const data = rate.data
            const jsonData = JSON.stringify(data)
            await this.cache.set("rate", jsonData)
            const quotes = data.quotes
            const rateResponse: CurrencyRate = {
                success: data.success,
                source: data.source,
                rate: {
                    AOA: quotes[`${source}AOA`],
                    BTC: quotes[`${source}BTC`],
                    USD: quotes[`${source}USD`],
                    EUR: quotes[`${source}EUR`],
                    BRL: quotes[`${source}BRL`],
                    JPY: quotes[`${source}JPY`],
                    CNY: quotes[`${source}CNY`],
                    GBP: quotes[`${source}GBP`],
                    ZAR: quotes[`${source}ZAR`],
                    INR: quotes[`${source}INR`],
                    MZN: quotes[`${source}MZN`],
                    NGN: quotes[`${source}NGN`],
                }
            }
            res.status(200).json(rateResponse)
        } catch (e: any) {
            console.error(e)
            res.status(500).json({ message: internalServerError })
        }
    }
    getSupported(req: Request, res: Response) {
        res.json({
            data: currencies
        })
    }
}