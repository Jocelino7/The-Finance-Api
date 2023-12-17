import { NextFunction,Request,Response} from "express"
import { categoryYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation"

export function validateCategoryMdw(req:Request,res:Response,next:NextFunction){
    const schema = categoryYupSchema
    try {
        const category = req.body
        schema.validate(category)
        next()
    }
    catch(e:any){
        res.status(400).send(e.erros[0])
    }
}