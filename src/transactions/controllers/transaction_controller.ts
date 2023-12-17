import { NextFunction, Request, Response } from "express";
import { TransationRepository } from "../../model/repositories/transaction/transaction_repo";
import { transactionYupSchema } from "../../model/schemas/schema_validation_yup/schema_validation";
import { internalServerError } from "../../utils/constants";

class Transactioncontroller{
    transactionRepo:TransationRepository
    constructor(repo:TransationRepository){
        this.transactionRepo = repo
    }
    async addtransaction(req:Request,res:Response){
        try{
            await this.transactionRepo.addTransaction(req.body)
            return res.sendStatus(201)
        }catch(e){
            console.log(e)
            return res.status(500).json({message:internalServerError})
        }
    }
    async getTransaction(req:Request,res:Response){
        try{
            const {id} = req.params
            const transaction = await this.transactionRepo.getTransaction(id)
            return res.status(200).json(transaction)
        }catch(e){
            console.log(e)
            return res.status(500).json({message:internalServerError})
        }
    }
    async getTransactions(req:Request,res:Response){
        try{
            const {id} = req.params
            const transaction = await this.transactionRepo.getTransactions(id)
            return res.status(200).json(transaction)
        }catch(e){
            console.log(e)
            return res.status(500).json({message:internalServerError})
        }

    }
    async getSourceFundTransaction(req:Request,res:Response){
        try{
            const transaction = await this.transactionRepo.getTransactionsFromSourceFund(req.body)
            return res.status(200).json(transaction)
        }catch(e){
            console.log(e)
            return res.status(500).json({message:internalServerError})
        }

    }
    async getMonthTransaction(req:Request,res:Response){
        try{
            const month = parseInt(req.params.month)
            const transaction = await this.transactionRepo.getAllTransactionFromMonth(month,req.body)
            return res.status(200).json(transaction)
        }catch(e){
            console.log(e)
            return res.status(500).json({message:internalServerError})
        }

    }
    async updateTransaction(req:Request,res:Response){
        try{
            await this.transactionRepo.updateTransaction(req.body)
            return res.status(200)
        }catch(e){
            console.log(e)
            return res.status(500).json({message:internalServerError})
        }

    }
    async deleteTransaction(req:Request,res:Response){
        try{
            const {id} = req.params
            const result = await this.transactionRepo.deleteTransaction(id)
            if(result)
                return res.status(200)
            return res.status(500).json({message:"Error while deleting transaction"})
        }catch(e){
            console.log(e)
            return res.status(500).json({message:internalServerError})
        }

    }
    async deleteTransactionBatch(req:Request,res:Response){
        try{
            const transactions = req.body.transactions
            const result = await this.transactionRepo.deleteTransactionInBatch(transactions)
            if(result)
                return res.status(200)
            return res.status(500).json({message:"Error while deleting transaction"})
        }catch(e){
            console.log(e)
            return res.status(500).json({message:internalServerError})
        }

    }
    validateTransaction(req:Request,res:Response,next:NextFunction){
        try{
            transactionYupSchema.validate(req.body())
            next()
        }catch(e:any){
            return res.status(400).json({message:e.message})
        }
    }
}