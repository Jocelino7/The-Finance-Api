import express, { Request, Response } from "express";
import route from "../user/routes/user_router";
import { CacheImpl } from "../../cache/cache";
import axios from "axios";
import { CurrencyController } from "./currency_controller";
import { CurrencyRepositoryImpl } from "../../model/repositories/currency/currency_repo";
import { currencyModel } from "../../model/mongo_models/mongoose_model";
import { currencyValidationMdw } from "./validation_middleware/currency_validation_middleware";
const router = express.Router()
const baseUrl = `/t/f/currencies/`
const cache = new CacheImpl()
const model = currencyModel
const repo = new CurrencyRepositoryImpl(model)
const controller = new CurrencyController(axios, cache, repo)
route.get(`${baseUrl}default/:userId`, (req: Request, res: Response) => controller.getDefaultCurrency(req, res))
route.get(`${baseUrl}rates/:source`, (req: Request, res: Response) => controller.getRates(req, res))
router.get(`${baseUrl}supported`, (req: Request, res: Response) => controller.getSupported(req, res))
router.post(`${baseUrl}add`, currencyValidationMdw, (req: Request, res: Response) => controller.addDefaultCurrency(req, res))
router.put(`${baseUrl}update`, currencyValidationMdw, (req: Request, res: Response) => controller.updateDefaultCurrency(req, res))
export default router 