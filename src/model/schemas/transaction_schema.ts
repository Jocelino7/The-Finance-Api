import mongoose from "mongoose";
import { Transaction, TransactionDate } from "../dtos/dto";
import { userSchema } from "./user_schema";
import { sourceFundSchema } from "./sourcefund_schemas";
import { categorySchema } from "./category_schema";
const transactionDateSchema = new mongoose.Schema<TransactionDate>({
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true }

})
export const transactionSchema = new mongoose.Schema<Transaction>({
    user: { type: userSchema, required: true },
    transactionDate: { type: transactionDateSchema, required: true },
    transactionType: { type: String, required: true },
    sourceFund: { type: sourceFundSchema, required: true },
    category: { type: categorySchema },
    amount: { type: Number, required: true },
    description:String,
}, { timestamps: true })