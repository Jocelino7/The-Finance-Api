import { Request, Response } from "express";
import { TransationRepository } from "../../../model/repositories/transaction/transaction_repo";
import { internalServerError } from "../../../utils/constants";
import { CacheInterface } from "../../interfaces/cache_interface";
import { Transaction } from "../../../model/dtos/dto";

export class Transactioncontroller {
    transactionRepo: TransationRepository
    cache: CacheInterface
    transactionCacheKey = "transactions"
    reportKey = "report"
    constructor(repo: TransationRepository, cache: CacheInterface) {
        this.transactionRepo = repo
        this.cache = cache
    }

    async addtransaction(req: Request, res: Response) {
        try {
            const transaction: Transaction = req.body
            await this.transactionRepo.addTransaction(transaction)
            await this.cache.remove(`${this.transactionCacheKey}-${transaction.userId}`)
            res.status(201).json({ message: "created" })
        } catch (e: any) {
            console.log(e)
            res.status(500).json({ message: internalServerError })
        }
    }
    async getTransaction(req: Request, res: Response) {
        try {
            const { id } = req.params
            const transaction = await this.transactionRepo.getTransaction(id)
            const jsonTransaction = JSON.stringify(transaction)
            await this.cache.set(`${this.transactionCacheKey}-${id}`, jsonTransaction)
            res.status(200).json({data:transaction})
        } catch (e: any) {
            console.log(e)
            res.status(500).json({ message: internalServerError })
        }
    }
    async getTransactions(req: Request, res: Response) {
        try {
            console.log("fluxo-2-inicio")
            const { userId } = req.params
            const { q } = req.query
            const transactions = q ? await this.transactionRepo.search(q.toString(), userId) : await this.transactionRepo.getTransactions(userId)
            const jsonTransaction = JSON.stringify(transactions)
            q ? await this.cache.set(`${this.transactionCacheKey}-${userId}-q`, jsonTransaction) : await this.cache.set(`${this.transactionCacheKey}-${userId}`, jsonTransaction)
            console.log("fluxo-2-fim")
            res.status(200).json({
                data: transactions,
            })
        } catch (e: any) {
            console.log(e)
            res.status(500).json({ message: internalServerError })
        }

    }
    async getSourceFundTransaction(req: Request, res: Response) {
        try {
            const transaction = await this.transactionRepo.getTransactionsFromSourceFund(req.body)
            res.status(200).json(transaction)
        } catch (e: any) {
            console.log(e)
            res.status(500).json({ message: internalServerError })
        }

    }
    async getMonthTransaction(req: Request, res: Response) {
        try {
            const month = parseInt(req.params.month)
            const transaction = await this.transactionRepo.getAllTransactionFromMonth(month, req.body)
            res.status(200).json(transaction)
        } catch (e: any) {
            console.log(e)
            res.status(500).json({ message: internalServerError })
        }

    }
    async updateTransaction(req: Request, res: Response) {
        try {
            await this.transactionRepo.updateTransaction(req.body)
            const transaction: Transaction = req.body
            const year = transaction.transactionDate.year
            const month = transaction.transactionDate.month
            await this.cache.remove(`${this.transactionCacheKey}-${transaction._id}`)
            await this.cache.remove(`${this.transactionCacheKey}-${transaction.userId}`)
            await this.cache.remove(`${this.reportKey}-${month}-${year}-${transaction.userId}`)

            res.status(200).json({ message: "ok" })
        } catch (e: any) {
            console.log(e)
            res.status(500).json({ message: internalServerError })
        }
    }
    async deleteTransaction(req: Request, res: Response) {
        try {
            const { id } = req.params
            const transaction = await this.transactionRepo.getTransaction(id)
            if (!transaction) {
                res.status(400).json({ message: "There´s no transaction with this id" })
                return
            }
            const result = await this.transactionRepo.deleteTransaction(id)
            if (result) {
                await this.cache.remove(`${this.transactionCacheKey}-${id}`)
                await this.cache.remove(`${this.transactionCacheKey}-${transaction.userId}`)
                await this.cache.remove(`${this.reportKey}-${transaction.transactionDate.month}-${transaction.transactionDate.year}-${transaction.userId}`)

                res.status(200).json({ message: "ok" })
                return
            }
            res.status(500).json({ message: "Error while deleting transaction" })
        } catch (e: any) {
            console.log(e)
            res.status(500).json({ message: internalServerError })
        }

    }
    async deleteTransactionBatch(req: Request, res: Response) {
        try {
            const transactions: Transaction[] = req.body.transactions
            const result = await this.transactionRepo.deleteTransactionInBatch(transactions)
            if (result) {
                const promises = transactions.map(async (transaction) => {
                    await this.cache.remove(`${this.reportKey}-${transaction.transactionDate.month}-${transaction.transactionDate.year}-${transaction.userId}`)
                    await this.cache.remove(`${this.transactionCacheKey}-${transaction._id}`)

                })
                promises.push(await this.cache.remove(`${this.transactionCacheKey}-${transactions[0].userId}`))
                await Promise.all(promises)
                res.status(200).json({ message: "ok" })
                return
            }
            res.status(500).json({ message: "Error while deleting transaction" })
        } catch (e: any) {
            console.log(e)
            res.status(500).json({ message: internalServerError })
        }
    }
    async getReport(req: Request, res: Response) {
        try {
            const { userId, month, year } = req.params
            const monthNumber = parseInt(month)
            const yearNumber = parseInt(year)
            const report = await this.transactionRepo.getReport(userId, monthNumber, yearNumber)
            if(report){
                const jsonReport = JSON.stringify(report)
                await this.cache.set(`${this.reportKey}-${month}-${year}-${userId}`, jsonReport)
                res.status(200).json(report)
                return
            }
            res.status(200).json({})
           
        }
        catch (e: any) {
            console.log(e)
            res.status(500).json({ message: internalServerError })
        }
    }

}