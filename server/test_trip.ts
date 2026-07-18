import mongoose from "mongoose";
import { Trip } from "./src/models/TripModel";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  console.log("Connecting...");
  await mongoose.connect(process.env.MONGO_URI);
  try {
    const trip = new Trip({
      user: new mongoose.Types.ObjectId(),
      title: "Test Trip",
      destination: "Paris",
      startDate: new Date(),
      endDate: new Date(),
      budget: "moderate",
      travelers: 1,
      travelStyle: "Relaxed",
      status: "upcoming",
      itinerary: [],
      generatedData: {}
    });
    
    await trip.validate();
    console.log("Validation passed");
  } catch(err) {
    console.error("ERROR:", err);
  } finally {
    process.exit(0);
  }
}

run();
