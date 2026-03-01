import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI, {
            dbName: process.env.DB_NAME
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}

export default dbConnect;