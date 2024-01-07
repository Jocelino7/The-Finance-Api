import mongoose from "mongoose";
import { User } from "../dtos/dto";


export const userSchema = new mongoose.Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photoUrl: String,
    isEmailVerified:{type:Boolean, required:false}
})

