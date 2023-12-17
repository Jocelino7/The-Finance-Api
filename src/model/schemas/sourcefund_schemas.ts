import mongoose from "mongoose";
import { SourceFundType } from "../dtos/dto";
import { userSchema } from "./user_schema";
import { goalSchema } from "./goal_schema";

export const sourceFundSchema =new mongoose.Schema<SourceFundType>({
    user:{type:userSchema,required:true},
    name:{type:String,required:true},
    icon:{type:String,required:true},
    goal:goalSchema,

},{timestamps:true}) 
const sourceFundSchema