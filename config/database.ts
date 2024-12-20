import mongoose from 'mongoose';

export const connect = async (): Promise<void> => {
    try{
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined");
        }
        await mongoose.connect(mongoUrl);
        console.log("database connected");
    } catch (error) {
        console.log("database connection failed");
    }
}