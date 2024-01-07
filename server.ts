import mongoose from "mongoose"
import { app } from "./index"
import { connectToMongo } from "./src/config/mongo_config"
connectToMongo().catch((e: any) => console.error("error while connecting to mongo " + e))
mongoose.connection.once("open", () => {
    console.log("connected to mongo")
})
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})