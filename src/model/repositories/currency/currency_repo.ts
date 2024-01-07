import { Model } from "mongoose";
import { DefaultCurrency } from "../../dtos/dto";

export interface CurrencyRepository {
    addDefaultCurrency(currency: DefaultCurrency): Promise<void>
    updateDefaultCurrency(currency: DefaultCurrency): Promise<void>
    getDefaultCurrency(userId:string): Promise<DefaultCurrency | null>
}
export class CurrencyRepositoryImpl implements CurrencyRepository {
    currencyModel
    constructor(model: Model<DefaultCurrency>) {
        this.currencyModel = model
    }
    async getDefaultCurrency(userId:string): Promise<DefaultCurrency | null> {
        return await this.currencyModel.findOne({userId})

    }
    async addDefaultCurrency(currency: DefaultCurrency): Promise<void> {
        await this.currencyModel.create(currency)
    }
    async updateDefaultCurrency(currency: DefaultCurrency): Promise<void> {
        await this.currencyModel.updateOne({
            userId: currency.userId
        }, currency)
    }
}