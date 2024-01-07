import { Response, Request } from "express";
import { CategoryRepository } from "../../../model/repositories/category/category_repo";
import { CacheInterface } from "../../interfaces/cache_interface";
import { CategoryType } from "../../../model/dtos/dto";

export class CategoryController {
    categoryRepo: CategoryRepository
    cache
    key ="categories"
    constructor(repo: CategoryRepository,cache:CacheInterface) {
        this.categoryRepo = repo
        this.cache = cache
    }
    async addCategory(req: Request, res: Response) {
        try {
            const userId = req.body.userId
            await this.categoryRepo.addCategory(req.body)
            await this.cache.remove(`${this.key}-${userId}`)
            return res.sendStatus(201)
        }
        catch (e: any) {
            console.log(e)
            return res.sendStatus(500)
        }

    }
    async getCategory(req: Request, res: Response) {
        try {
            const { id } = req.params
            const category = await this.categoryRepo.getCategory(id)
            const jsonCategory = JSON.stringify(category)
            await this.cache.set(`${this.key}-${id}`, jsonCategory)
            return res.status(200).json({data:category})
        }
        catch (e: any) {
            console.log(e)
            return res.sendStatus(500)
        }

    }
    async getCategories(req: Request, res: Response) {
        try {
            const { userId } = req.params
            const { q } = req.query
            const categories = q ? await this.categoryRepo.search(q.toString(), userId) : await this.categoryRepo.getCategories(userId)
            const jsonCategories = JSON.stringify(categories)
            q ? await this.cache.set(`${this.key}-${userId}-q`, jsonCategories) : await this.cache.set(`${this.key}-${userId}`, jsonCategories)
            return res.status(200).json({data:categories})

        } catch (e: any) {
            console.error(e)
            res.sendStatus(500)
        }
    }
    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params
            const category = await this.categoryRepo.getCategory(id)
            const deleteResult = await this.categoryRepo.deleteCategory(id)
            if (deleteResult){
                await this.cache.remove(`${this.key}-${id}`)
                await this.cache.remove(`${this.key}-${category?.userId}`)
                return res.sendStatus(200)
            }
            res.sendStatus(500)
        } catch (e: any) {
            console.error(e)
            res.sendStatus(500)
        }

    }
    async updateCategory(req: Request, res: Response) {
        try {
            const category:CategoryType = req.body
            await this.categoryRepo.updateCategory(category)
            await this.cache.remove(`${this.key}-${category._id}`)
            await this.cache.remove(`${this.key}-${category.userId}`)
            return res.sendStatus(200)
        } catch (e: any) {
            console.error(e)
            res.sendStatus(500)
        }

    }
    async deleteCategoryInBatch(req: Request, res: Response) {
        try {
            const categories:CategoryType[] = req.body.categories
            await this.categoryRepo.deleteCategoriesInBatch(categories)
            const promises = categories.map(async(category:CategoryType)=>{
                await this.cache.remove(`${this.key}-${category._id}`)
            })
            promises.push(await this.cache.remove(`${this.key}-${categories[0].userId}`))
            await Promise.all(promises)
            return res.sendStatus(200)
        } catch (e: any) {
            console.error(e)
            res.sendStatus(500)
        }

    }
}