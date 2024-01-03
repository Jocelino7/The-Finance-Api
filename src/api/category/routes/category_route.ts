import express, { Request, Response } from "express"
import { NextFunction } from "connect"
import { validateId, validateUserId, verifyToken } from "../../../utils/midleware/validation/global_validation_midleware"
import { categoryModel } from "../../../model/mongo_models/mongoose_model"
import { CategoryController } from "../controllers/category_controller"
import { CategoryRepositoryImpl } from "../../../model/repositories/category/category_repo"
import { validateCategoryMdw } from "../validation_midleware/category_validation_midleware"
import { CacheImpl } from "../../../cache/cache"
import { categoryCacheMiddleware } from "../cache/category_cache_middleware"
const baseUrl = "/t/f/categories/"
const route = express.Router()
const cache = new CacheImpl()
const controller = new CategoryController(new CategoryRepositoryImpl(categoryModel),cache)
route.post(
    `${baseUrl}add`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateCategoryMdw(req, res, next),
    (req: Request, res: Response) => controller.addCategory(req, res)
)
route.put(
    `${baseUrl}update`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateCategoryMdw(req, res, next),
    (req: Request, res: Response) => controller.updateCategory(req, res)
)
route.get(
    `${baseUrl}get/:id`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateId(req, res, next),
    (req: Request, res: Response, next: NextFunction) => categoryCacheMiddleware(req, res, next,cache),
    (req: Request, res: Response) => controller.getCategory(req, res)
)
route.get(
    `${baseUrl}getAll/:userId`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateUserId(req, res, next),
    (req: Request, res: Response, next: NextFunction) => categoryCacheMiddleware(req, res, next,cache),
    (req: Request, res: Response) => controller.getCategories(req, res)
)
route.delete(
    `${baseUrl}delete/:id`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateId(req, res, next), (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.deleteCategory(req, res)
)
route.delete(
    `${baseUrl}delete_batch/`,
     (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.deleteCategoryInBatch(req, res)
)
export default route