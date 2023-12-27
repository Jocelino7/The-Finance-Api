import express, { Request, Response } from "express"
import { NextFunction } from "connect"
import { validateId, validateUserId, verifyToken } from "../../../utils/midleware/validation/global_validation_midleware"
import { goalModel } from "../../../model/mongo_models/mongoose_model"
import { GoalController } from "../controllers/goal_controller"
import { GoalRepositoryImpl } from "../../../model/repositories/goals/goal_repo"
import { validateGoalMdw } from "../validation_midleware/goal_validation_midleware"
const baseUrl = "/t/f/goals/"
const route = express.Router()
const controller = new GoalController(new GoalRepositoryImpl(goalModel))
route.post(
    `${baseUrl}add`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateGoalMdw(req, res, next),
    (req: Request, res: Response) => controller.addGoal(req, res)
)
route.put(
    `${baseUrl}update`,
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response, next: NextFunction) => validateGoalMdw(req, res, next),
    (req: Request, res: Response) => controller.updateGoal(req, res)
)
route.get(
    `${baseUrl}get/:id`,
    (req: Request, res: Response, next: NextFunction) => validateId(req, res, next),
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.getGoal(req, res)
)
route.get(
    `${baseUrl}getAll/:userId`,
    (req: Request, res: Response, next: NextFunction) => validateUserId(req, res, next),
    (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.getGoals(req, res)
)
route.delete(
    `${baseUrl}delete/:id`,
    (req: Request, res: Response, next: NextFunction) => validateId(req, res, next), (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.deleteGoal(req, res)
)
route.delete(
    `${baseUrl}delete_batch/`,
     (req: Request, res: Response, next: NextFunction) => verifyToken(req, res, next),
    (req: Request, res: Response) => controller.deleteGoalInBatch(req, res)
)
export default route