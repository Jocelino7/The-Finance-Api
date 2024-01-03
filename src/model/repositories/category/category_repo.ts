import { Model } from "mongoose"
import { CategoryType } from "../../dtos/dto"

export interface CategoryRepository {
    getCategory(id: string): Promise<CategoryType | null>
    getSpendCategories(userId: string): Promise<CategoryType[]>
    getIncomeCategories(userId: string): Promise<CategoryType[]>
    getCategories(userId: string): Promise<CategoryType[]>
    deleteCategory(id: string): Promise<boolean>
    addCategory(category: CategoryType): Promise<boolean>
    updateCategory(category: CategoryType): Promise<boolean>,
    search(value: string, userId: string): Promise<CategoryType[]>,
    deleteCategoriesInBatch(categories: CategoryType[]): Promise<boolean | null>
}

export class CategoryRepositoryImpl implements CategoryRepository {
    categoryModel: Model<CategoryType>
    constructor(model: Model<CategoryType>) {
        this.categoryModel = model
    }
    async getSpendCategories(userId: string): Promise<CategoryType[]> {
        try {
            const categories = await this.categoryModel.find({ "user._id": userId, type: "spends" })
            return categories
        }
        catch (e: any) {
            console.log(e)
            throw new Error(e.message)
        }
    }
    async getIncomeCategories(userId: string): Promise<CategoryType[]> {
        try {
            const categories = await this.categoryModel.find({ "user._id": userId, type: "incomes" })
            return categories
        }
        catch (e: any) {
            console.log(e)
            throw new Error(e.message)
        }
    }
    async getCategory(id: string): Promise<CategoryType | null> {
        try {
            const category = await this.categoryModel.findOne({ _id: id })
            return category
        }
        catch (e: any) {
            console.log(e)
            throw new Error(e.message)
        }

    }
    async getCategories(userId: string): Promise<CategoryType[]> {
        try {
            const categories = await this.categoryModel.find({ "user._id": userId })
            return categories
        }
        catch (e: any) {
            console.error(e)
            throw new Error(e.message)
        }
    }
    async deleteCategory(id: string): Promise<boolean> {
        try {
            const deleteResult = await this.categoryModel.deleteOne({ _id: id })
            return deleteResult.acknowledged
        }
        catch (e: any) {
            console.log(e)
            throw new Error(e.message)
        }
    }
    async addCategory(category: CategoryType): Promise<boolean> {
        try {
            await this.categoryModel.create(category)
            return true
        }
        catch (e: any) {
            console.log(e)
            throw new Error(e.message)
        }
    }
    async updateCategory(category: CategoryType): Promise<boolean> {
        try {
            await this.categoryModel.updateOne({ _id: category._id }, category)
            return true
        }
        catch (e: any) {
            console.log(e)
            throw new Error(e.message)
        }
    }
    async search(value: string, userId: string): Promise<CategoryType[]> {
        const regex = new RegExp(value, "i")
        try {
            const categories = await this.categoryModel.find({
                "user._id": userId, $or: [
                    {
                        name: { "$regex": regex }
                    }
                ]
            })
            return categories
        }
        catch (e: any) {
            console.log(e)
            throw new Error(e.message)
        }
    }
    async deleteCategoriesInBatch(categories: CategoryType[]): Promise<boolean | null> {
        try {
            const promises = categories.map(async (categoryItem) => {
                await this.categoryModel.deleteOne({ _id: categoryItem._id })
            })
            await Promise.all(promises)
            return true
        }
        catch (e: any) {
            throw new Error(e.message)
        }

    }

}