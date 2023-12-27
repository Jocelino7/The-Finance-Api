import { NextFunction,Request,Response} from "express"
import { goalYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation"
import { ValidationError } from "yup"


export async function validateGoalMdw(req:Request,res:Response,next:NextFunction){
    const schema = goalYupSchema
    try {
        const goal = req.body
        await schema.validate(goal)
        next()
    }
    catch(e:any){
        if(e instanceof ValidationError){
            res.status(400).json({
                message:e.errors[0]
            })
        }
        next(e)
    }
}