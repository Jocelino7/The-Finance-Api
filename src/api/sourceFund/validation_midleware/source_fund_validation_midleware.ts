import { NextFunction,Request,Response} from "express"
import { sourceFundYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation"
import { ValidationError } from "yup"
import { internalServerError } from "../../../utils/constants"

export async function validateSourceFundMdw(req:Request,res:Response,next:NextFunction){
    const schema = sourceFundYupSchema
    try {
        const sourceFund = req.body
        await schema.validate(sourceFund)
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