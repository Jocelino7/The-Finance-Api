import { Request, Response } from "express";
import { TransationRepository } from "../../../model/repositories/transaction/transaction_repo";
import { internalServerError } from "../../../utils/constants";

export class Transactioncontroller {
    transactionRepo: TransationRepository
    constructor(repo: TransationRepository) {
        this.transactionRepo = repo
    }
    async addtransaction(req: Request, res: Response) {
        try {
            await this.transactionRepo.addTransaction(req.body)
            return res.sendStatus(201)
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({ message: internalServerError })
        }
    }
    async getTransaction(req: Request, res: Response) {
        try {
            const { id } = req.params
            const transaction = await this.transactionRepo.getTransaction(id)
            return res.status(200).json(transaction)
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({ message: internalServerError })
        }
    }
    async getTransactions(req: Request, res: Response) {
        try {
            const { userId } = req.params
            const transaction = await this.transactionRepo.getTransactions(userId)
            return res.status(200).json(transaction)
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async getSourceFundTransaction(req: Request, res: Response) {
        try {
            const transaction = await this.transactionRepo.getTransactionsFromSourceFund(req.body)
            return res.status(200).json(transaction)
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async getMonthTransaction(req: Request, res: Response) {
        try {
            const month = parseInt(req.params.month)
            const transaction = await this.transactionRepo.getAllTransactionFromMonth(month, req.body)
            return res.status(200).json(transaction)
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async updateTransaction(req: Request, res: Response) {
        try {
            await this.transactionRepo.updateTransaction(req.body)
            return res.sendStatus(200)
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async deleteTransaction(req: Request, res: Response) {
        try {
            const { id } = req.params
            const result = await this.transactionRepo.deleteTransaction(id)
            if (result)
                return res.sendStatus(200)
            return res.status(500).json({ message: "Error while deleting transaction" })
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async deleteTransactionBatch(req: Request, res: Response) {
        try {
            const transactions = req.body.transactions
            const result = await this.transactionRepo.deleteTransactionInBatch(transactions)
            if (result)
                return res.sendStatus(200)
            return res.status(500).json({ message: "Error while deleting transaction" })
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({ message: internalServerError })
        }

    }
    async getReport(req: Request, res: Response) {
        try {
            const { userId, month } = req.params
            const monthNumber = parseInt(month)
            const report = this.transactionRepo.getReport(userId, monthNumber)
            return res.status(200).json(report)
        }
        catch (e: any) {
            console.log(e)
            res.sendStatus(500)
        }
    }
  
}