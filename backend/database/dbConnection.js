import mongoose from "mongoose";


export const dbConnection = () => {
    mongoose.connect(process.env.MONOGO_URI, {
        dbName: "JOBVISTA",
    })
    .then(() => {
        console.log("MongoDB connected successfully")
    })
    .catch((err) => {
        console.log(`error connecting to MongoDB: ${err}`)
    })
}