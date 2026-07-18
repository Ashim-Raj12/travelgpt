"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dns_1 = __importDefault(require("dns"));
const connectDB = async () => {
    try {
        // Force Node to use Google DNS for SRV lookups to prevent ECONNREFUSED on Windows
        dns_1.default.setServers(["8.8.8.8", "8.8.4.4"]);
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/travelgpt";
        console.log("Attempting to connect to:", mongoURI);
        const conn = await mongoose_1.default.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
