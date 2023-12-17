import { NextFunction,Request,Response} from "express"
import { sourceFundYupSchema, userYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation"

export function userValidationMdw(req:Request,res:Response,next:NextFunction){
    const schema = userYupSchema
    try {
        const user = req.body
        schema.validate(user)
        next()
    }
    catch(e:any){
        res.status(400).send(e.erros[0])
    }
}