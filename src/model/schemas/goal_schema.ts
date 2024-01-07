import mongoose from "mongoose"
import { GoalType } from "../dtos/dto"
export const goalSchema = new mongoose.Schema<GoalType>(
    {
        userId:{type:String,required:true},
        name:{type:String,required:true},
        description:{type:String,required:true},
        finalBalance:{type:Number,required:true},
    },
    {timestamps:true}
)