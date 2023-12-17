import { Model } from "mongoose"
import { SourceFundType, Transaction, User } from "../../dtos/dto"


export interface TransationRepository {
    getTransaction(id: string): Promise<Transaction | null | undefined>
    getTransactions(userId: string): Promise<Transaction[] | null>
    getTransactionsFromSourceFund(sourceFund: SourceFundType): Promise<Transaction[] | null>
    getAllTransactionFromMonth(month: number, user: User): Promise<Transaction[] | null>
    deleteTransaction(id: string): Promise<boolean | null>
    addTransaction(transaction: Transaction): Promise<boolean>
    updateTransaction(transaction: Transaction): Promise<boolean | null>,
    search(value: string, user: User): Promise<Transaction[] | null>
    deleteTransactionInBatch(transactions:Transaction[]):Promise<boolean | null>
}

export class TransactionRepositoryImpl implements TransationRepository {
    private transactionModel: Model<Transaction>
    constructor(model: Model<Transaction>) {
        this.transactionModel = model
    }
    async deleteTransactionInBatch(transactions: Transaction[]): Promise<boolean | null> {
        try {
            const promises = transactions.map(async (transactionItem) => {
                await this.transactionModel.deleteOne({ _id: transactionItem._id })
            })
            await Promise.all(promises)
            return true
        }
        catch (e:any) {
            throw new Error(e.message)
        }
    }
    async getTransaction(id: string): Promise<Transaction | null | undefined> {
        try {
            const transaction = await this.transactionModel.findOne({ _id: id })
            return transaction

        } catch (e:any) {
            console.error(e)
            return null
        }

    }
    async getTransactions(userId: string): Promise<Transaction[] | null> {
        try {
            const transaction = await this.transactionModel.find({ "user._id": userId })
            return transaction

        } catch (e:any) {
            console.error(e)
            return null
        }

    }
    async getTransactionsFromSourceFund(sourceFund: SourceFundType): Promise<Transaction[] | null> {
        try {
            const transaction = await this.transactionModel.find({ "sourceFund._id": sourceFund._id })
            return transaction
        } catch (e:any) {
            console.error(e)
            return null
        }
    }
    async getAllTransactionFromMonth(month: number, user: User): Promise<Transaction[] | null> {
        try {
            const transaction = await this.transactionModel.find({ "transactionDate.month": month, "user.id": user._id })
            return transaction
        } catch (e:any) {
            console.error(e)
            return null
        }

    }
    async deleteTransaction(id: string): Promise<boolean | null> {
        try {
            const deleteResult = await this.transactionModel.deleteOne({ _id: id })
            return deleteResult.acknowledged
        } catch (e:any) {
            console.error(e)
            return null
        }
    }
    async addTransaction(transaction: Transaction): Promise<boolean> {
        try {
            await this.transactionModel.create(transaction)
            return true
        } catch (e:any) {
            console.error(e)
            return false
        }
    }
    async updateTransaction(transaction: Transaction): Promise<boolean> {
        try {
            await this.transactionModel.updateOne({ _id: transaction._id }, transaction)
            return true
        } catch (e:any) {
            console.error(e)
            return false
        }
    }
    async search(value: string, user: User): Promise<Transaction[] | null> {
        try {
            const searchResult = await this.transactionModel.find({
                _id: user._id,
                $or: [{ amount: parseFloat(value) }, { description: { RegExp: value } }, { "category.name": { RegExp: value } }]
            })
            return searchResult
        } catch (e:any) {
            console.error(e)
            return null
        }
    }
}