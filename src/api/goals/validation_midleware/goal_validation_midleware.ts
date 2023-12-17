import { NextFunction,Request,Response} from "express"
import { goalYupSchema, sourceFundYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation"

export function validateGoalMdw(req:Request,res:Response,next:NextFunction){
    const schema = goalYupSchema
    try {
        const goal = req.body
        schema.validate(goal)
        next()
    }
    catch(e:any){
        res.status(400).send(e.erros[0])
    }
}