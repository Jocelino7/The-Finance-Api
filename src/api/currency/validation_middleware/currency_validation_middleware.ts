import { NextFunction,Request,Response} from "express"
import { currencyYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation"
import { ValidationError } from "yup";
import { internalServerError } from "../../../utils/constants";

export async function currencyValidationMdw(req:Request,res:Response,next:NextFunction){
    const schema = currencyYupSchema;
    try {
        const currency = req.body;
        await schema.validate(currency);
        next();
    } catch (e) {
        if (e instanceof ValidationError) {
            res.status(400).json({ message: e.message });
        } else {
            res.status(500).json({
                message:internalServerError
            }); 
        }
    }
}