import mongoose from "mongoose";
import { SourceFundType } from "../dtos/dto";
import { goalSchema } from "./goal_schema";

const sourceFundSchema =new mongoose.Schema<SourceFundType>({
    userId:{type:String,required:true},
    name:{type:String,required:true},
    icon:{type:String,required:true},
    goal:goalSchema,
    code:{type:String,required:true},

},{timestamps:true}) 
export {sourceFundSchema}
