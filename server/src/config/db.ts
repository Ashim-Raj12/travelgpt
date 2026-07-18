import mongoose from "mongoose";
import dns from "dns";

export const connectDB = async () => {
  try {
    // Force Node to use Google DNS for SRV lookups to prevent ECONNREFUSED on Windows
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/travelgpt";
    console.log("Attempting to connect to:", mongoURI);
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
