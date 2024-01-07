import mongoose, { Model } from "mongoose";
import { userSchema } from "../schemas/user_schema";
import { CategoryType, DefaultCurrency, GoalType, SourceFundType, Transaction, User } from "../dtos/dto";
import { transactionSchema } from "../schemas/transaction_schema";
import { categorySchema } from "../schemas/category_schema";
import { goalSchema } from "../schemas/goal_schema";
import { sourceFundSchema } from "../schemas/sourcefund_schemas";
import { currencySchema } from "../schemas/currency_schema";

export const userModel:Model<User> = mongoose.model("User",userSchema)
export const transactionModel:Model<Transaction> = mongoose.model("Transaction",transactionSchema)
export const categoryModel:Model<CategoryType> = mongoose.model("Category",categorySchema)
export const goalModel:Model<GoalType> = mongoose.model("Goal",goalSchema)
export const sourceFundModel:Model<SourceFundType> = mongoose.model("Source_Funds",sourceFundSchema)
export const currencyModel:Model<DefaultCurrency> = mongoose.model("currency",currencySchema)

