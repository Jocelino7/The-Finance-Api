import express, { Request, Response } from "express"
import { NextFunction } from "connect"
import { validateId, validateUserId, verifyToken } from "../../../utils/midleware/validation/global_validation_midleware"
import { sourceFundModel } from "../../../model/mongo_models/mongoose_model"
import { SourceFundController } from "../controllers/source_fund_controller"
import { SourceFundRepositoryImpl } from "../../../model/repositories/source_fund/source_fund_repo"
import { validateSourceFundMdw } from "../validation_midleware/source_fund_validation_midleware"
import { CacheImpl } from "../../../cache/cache"
import { sourceFundCacheMiddleware } from "../cache/source_fund_cache_middleware"
const baseUrl = "/t/f/source_funds/"
const route = express.Router()
const cache = new CacheImpl()
const controller = new SourceFundController(new SourceFundRepositoryImpl(sourceFundModel),cache)
route.post(
    `${baseUrl}add`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateSourceFundMdw(req, res, next),
    (req: Request, res: Response) => controller.addSourceFund(req, res)
)
route.put(
    `${baseUrl}update`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateSourceFundMdw(req, res, next),
    (req: Request, res: Response) => controller.updateSourceFund(req, res)
)
route.get(
    `${baseUrl}get/:id`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateId(req, res, next),
    (req: Request, res: Response, next: NextFunction) => sourceFundCacheMiddleware(req, res, next,cache),
    (req: Request, res: Response) => controller.getSourceFund(req, res)
)
route.get(
    `${baseUrl}getAll/:userId`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateUserId(req, res, next),
    (req: Request, res: Response, next: NextFunction) => sourceFundCacheMiddleware(req, res, next,cache),
    (req: Request, res: Response) => controller.getSourceFunds(req, res)
)
route.delete(
    `${baseUrl}delete/:id`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateId(req, res, next), (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.deleSourceFund(req, res)
)
route.delete(
    `${baseUrl}delete_batch/`,
     (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.deleteSourceFundInBatch(req, res)
)
export default route