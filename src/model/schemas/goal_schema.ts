import mongoose from "mongoose"
import { GoalType } from "../dtos/dto"
import { userSchema } from "./user_schema"
export const goalSchema = new mongoose.Schema<GoalType>(
    {
        user:{type:userSchema,required:true},
        name:{type:String,required:true},
        description:{type:String,required:true},
        finalBalance:{type:Number,required:true},
    },
    {timestamps:true}
)