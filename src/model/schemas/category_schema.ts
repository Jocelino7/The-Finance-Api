import mongoose from "mongoose";
import { CategoryType } from "../dtos/dto";

export const categorySchema = new mongoose.Schema<CategoryType>({
    type: { type: String, required: true },
    user: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true }

})