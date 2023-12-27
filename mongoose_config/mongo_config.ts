import mongoose from "mongoose";

export async function connectToMongo() {
    const uri = process.env.URI
    if(uri)
        await mongoose.connect(uri)
  }