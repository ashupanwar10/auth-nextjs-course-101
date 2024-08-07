import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected");
        });

        connection.on("error", (error) => {
            console.log(`MongoDB connection error: ${error}`);
            process.exit(1);
        });

        connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    } catch (error) {
        console.log("Error connecting to MongoDB:");
        console.log(error);
        process.exit(1);
    }
}
