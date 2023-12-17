import { NextFunction, Request, Response } from "express";
import { transactionYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation";

export function validateTransaction(req:Request,res:Response,next:NextFunction){
    const schema = transactionYupSchema
    try {
        const transaction = req.body
        schema.validate(transaction)
        next()
    }
    catch(e:any){
        res.status(400).send(e.erros[0])
    }
}