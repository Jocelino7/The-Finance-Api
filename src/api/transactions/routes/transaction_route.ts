import express, { Request, Response } from "express"
import { NextFunction } from "connect"
import { validateId, validateUserId, verifyToken } from "../../../utils/midleware/validation/global_validation_midleware"
import { validateMonth, validateTransaction } from "../validation_midleware/transaction_validation_midleware"
import { Transactioncontroller } from "../controllers/transaction_controller"
import { transactionModel } from "../../../model/mongo_models/mongoose_model"
import { TransactionRepositoryImpl } from "../../../model/repositories/transaction/transaction_repo"
const baseUrl = "/t/f/transactions/"
const route = express.Router()
const controller = new Transactioncontroller(new TransactionRepositoryImpl(transactionModel))
route.post(
    `${baseUrl}add`,
    verifyToken,
    validateTransaction,
    (req:Request,res:Response)=>controller.addtransaction(req,res)
)
route.put(
    `${baseUrl}update`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateTransaction(req, res, next),
    (req: Request, res: Response) => controller.updateTransaction(req, res)
)
route.get(
    `${baseUrl}get/:id`,
    (req: Request, res: Response, next: NextFunction) => validateId(req, res, next),
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.getTransaction(req, res)
)
route.get(
    `${baseUrl}getAll/:userId`,
    (req: Request, res: Response, next: NextFunction) => validateUserId(req, res, next),
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.getTransactions(req, res)
)
route.get(
    `${baseUrl}report/:userId/:month`,
    (req: Request, res: Response, next: NextFunction) => validateUserId(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateMonth(req, res, next),
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.getMonthTransaction(req, res)
)
route.delete(
    `${baseUrl}delete/:id`,
    (req: Request, res: Response, next: NextFunction) => validateId(req, res, next), (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.deleteTransaction(req, res)
)
route.delete(
    `${baseUrl}delete_batch/`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.deleteTransactionBatch(req, res)
)
export default route