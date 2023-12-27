import { NextFunction,Request,Response} from "express"
import { userYupSchema } from "../../../model/schemas/schema_validation_yup/schema_validation"
import { ValidationError } from "yup";
import { internalServerError } from "../../../utils/constants";

export async function userValidationMdw(req:Request,res:Response,next:NextFunction){
    const schema = userYupSchema;
    try {
        const user = req.body;
        await schema.validate(user);
        next();
    } catch (e) {
        if (e instanceof ValidationError) {
            res.status(400).json({ message: e.message });
        } else {
            res.status(500).json({
                message:internalServerError
            }); // Envie outros tipos de erros para o próximo middleware de erro
        }
    }
}