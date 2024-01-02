import { NextFunction, Request, Response } from "express";
import { transactionYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation";
import { ValidationError } from "yup";
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
export function validateMonthAndYear(req:Request,res:Response,next:NextFunction){
    try {
        const {month} = req.params
        const {year} = req.params
        parseInt(month)
        parseInt(year)
        next()
    }
    catch(e:any){
        if(e instanceof ValidationError){
            res.status(400).json({
                message:"month or/& year must be a number"
            })
        }
        next(e)
    }
}