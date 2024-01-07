import mongoose from "mongoose";
import {DefaultCurrency } from "../dtos/dto";

export const currencySchema = new mongoose.Schema<DefaultCurrency>({
    code: { type: String, required: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
})