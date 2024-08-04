import mongoose from 'mongoose';

class DBconnection {
    async connect(): Promise<void> {
        try {
            const mongoUri = process.env.MONGO_URI;
            if (!mongoUri) {
                throw new Error("MONGO_URI is not defined");
            }

            await mongoose.connect(mongoUri);
            console.log("MongoDB connected");
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
        }
    }
}

export default DBconnection;

