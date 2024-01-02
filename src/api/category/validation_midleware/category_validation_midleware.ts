import { NextFunction,Request,Response} from "express"
import { categoryYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation"
import { ValidationError } from "yup"
import { internalServerError } from "../../../utils/constants"

export async function validateCategoryMdw(req:Request,res:Response,next:NextFunction){
    const schema = categoryYupSchema
    try {
        const category = req.body
        await schema.validate(category)
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