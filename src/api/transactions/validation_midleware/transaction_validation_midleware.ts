import { NextFunction, Request, Response } from "express";
import { transactionYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation";
import { ValidationError } from "yup";
import { internalServerError } from "../../../utils/constants";

export async function validateTransaction(req:Request,res:Response,next:NextFunction){
    const schema = transactionYupSchema
    try {
        const transaction = req.body
        await schema.validate(transaction)
        next()
    }
    catch(e:any){
        console.error(e)
        if(e instanceof ValidationError){
            res.status(400).json({
                message:e.errors[0]
            })
        }
        next(e)
    }
}
export function validateMonth(req:Request,res:Response,next:NextFunction){
    try {
        const {month} = req.params
        parseInt(month)
        next()
    }
    catch(e:any){
        if(e instanceof ValidationError){
            res.status(400).json({
                message:internalServerError
            })
        }
        next(e)
    }
}