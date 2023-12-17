import { NextFunction,Request,Response} from "express"
import { sourceFundYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation"

export function validateSourceFundMdw(req:Request,res:Response,next:NextFunction){
    const schema = sourceFundYupSchema
    try {
        const sourceFund = req.body
        schema.validate(sourceFund)
        next()
    }
    catch(e:any){
        res.status(400).send(e.erros[0])
    }
}