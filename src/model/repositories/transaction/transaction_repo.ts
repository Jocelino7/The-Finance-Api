import { Model } from "mongoose"
import { ReportType, SourceFundType, Transaction, User } from "../../dtos/dto"
import { generateReport } from "../../../utils/helpers"


export interface TransationRepository {
    getTransaction(id: string): Promise<Transaction | null | undefined>
    getTransactions(userId: string): Promise<Transaction[] | null>
    getTransactionsFromSourceFund(sourceFund: SourceFundType): Promise<Transaction[] | null>
    getAllTransactionFromMonth(month: number, userId: string): Promise<Transaction[] | null>
    getReport(userId: string, month: number,year:number): Promise<ReportType | null>,
    deleteTransaction(id: string): Promise<boolean | null>
    addTransaction(transaction: Transaction): Promise<boolean>
    updateTransaction(transaction: Transaction): Promise<boolean | null>,
    search(value: string, userId: string): Promise<Transaction[] | null>
    deleteTransactionInBatch(transactions: Transaction[]): Promise<boolean | null>
}

export class TransactionRepositoryImpl implements TransationRepository {
    private transactionModel: Model<Transaction>
    constructor(model: Model<Transaction>) {
        this.transactionModel = model
    }
    async getReport(userId: string, month: number,year:number): Promise<ReportType | null> {
        const monthTransaction:Transaction[] | null = await this.transactionModel.find({ "transactionDate.year": year,"transactionDate.month": month, "userId": userId })
        if (monthTransaction)
            return generateReport(monthTransaction)
        return null
    }
    async deleteTransactionInBatch(transactions: Transaction[]): Promise<boolean | null> {
        try {
            const promises = transactions.map(async (transactionItem) => {
                await this.transactionModel.deleteOne({ _id: transactionItem._id })
            })
            await Promise.all(promises)
            return true
        }
        catch (e: any) {
            throw new Error(e.message)
        }
    }
    async getTransaction(id: string): Promise<Transaction | null | undefined> {
        try {
            const transaction = await this.transactionModel.findOne({ _id: id })
            return transaction

        } catch (e: any) {
            console.error(e)
            return null
        }

    }
    async getTransactions(userId: string): Promise<Transaction[] | null> {
        try {
            const transaction = await this.transactionModel.find({ "userId": userId })
            return transaction

        } catch (e: any) {
            console.error(e)
            return null
        }

    }
    async getTransactionsFromSourceFund(sourceFund: SourceFundType): Promise<Transaction[] | null> {
        try {
            const transaction = await this.transactionModel.find({ "sourceFund._id": sourceFund._id })
            return transaction
        } catch (e: any) {
            console.error(e)
            return null
        }
    }
    async getAllTransactionFromMonth(month: number, userId: string): Promise<Transaction[] | null> {
        try {
            const transaction = await this.transactionModel.find({ "transactionDate.month": month, "userId": userId })
            return transaction
        } catch (e: any) {
            console.error(e)
            return null
        }

    }
    async deleteTransaction(id: string): Promise<boolean | null> {
        try {
            const deleteResult = await this.transactionModel.deleteOne({ _id: id })
            return deleteResult.acknowledged
        } catch (e: any) {
            console.error(e)
            return null
        }
    }
    async addTransaction(transaction: Transaction): Promise<boolean> {
        try {
            await this.transactionModel.create(transaction)
            return true
        } catch (e: any) {
            console.error(e)
            return false
        }
    }
    async updateTransaction(transaction: Transaction): Promise<boolean> {
        try {
            await this.transactionModel.updateOne({ _id: transaction._id }, transaction)
            return true
        } catch (e: any) {
            console.error(e)
            return false
        }
    }
    async search(value: string, userId: string): Promise<Transaction[] | null> {
        try {
            const regex = new RegExp(value,"i")
            const searchResult = await this.transactionModel.find({
                "userId": userId,
                $or: [{ "sourceFund.name": { "$regex":regex } }, { "description": { "$regex":regex }  }, { "category.name": { "$regex":regex } }]
            })
            return searchResult
        } catch (e: any) {
            console.error(e)
            return null
        }
    }
}