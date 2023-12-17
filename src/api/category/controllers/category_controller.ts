import { Response, Request } from "express";
import { CategoryRepository } from "../../../model/repositories/category/category_repo";


export class CategoryController {
    categoryRepo: CategoryRepository
    constructor(repo: CategoryRepository) {
        this.categoryRepo = repo
    }
    async addCategory(req: Request, res: Response) {
        try {
            await this.categoryRepo.addCategory(req.body)
            return res.sendStatus(201)        }
        catch (e:any) {
            console.log(e)
            return res.sendStatus(500)
        }

    }
    async getCategory(req: Request, res: Response) {
        try {
            const { id } = req.params
            const category = await this.categoryRepo.getCategory(id)
            return res.status(200).json(category)
        }
        catch (e:any) {
            console.log(e)
            return res.sendStatus(500)
        }

    }
    async getCategories(req: Request, res: Response) {
        try {
            const { userId } = req.params
            const categories = await this.categoryRepo.getCategories(userId)
            return res.status(200).json(categories)

        } catch (e:any) {
            console.error(e)
            res.sendStatus(500)
        }



    }
    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params
            const deleteResult = await this.categoryRepo.deleteCategory(id)
            if (deleteResult)
                return res.sendStatus(200)
            res.sendStatus(500)

        } catch (e:any) {
            console.error(e)
            res.sendStatus(500)
        }

    }
    async updateCategory(req: Request, res: Response) {
        try {

            await this.categoryRepo.updateCategory(req.body)
            return res.sendStatus(200)
        } catch (e:any) {
            console.error(e)
            res.sendStatus(500)
        }

    }
    async deleteCategoryInBatch(req: Request, res: Response) {
        try {
            const categories = req.body.categories
            await this.categoryRepo.deleteCategoriesInBatch(categories)
            return res.sendStatus(200)
        } catch (e:any) {
            console.error(e)
            res.sendStatus(500)
        }

    }
}