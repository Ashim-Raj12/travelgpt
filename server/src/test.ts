import { aiService } from "./services/AiService";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  try {
    const res = await aiService.generateItinerary({
      destination: "Paris",
      durationDays: "3",
      budget: "Moderate",
      travelersCount: "2",
      travelersType: "Couples",
      travelStyle: "Relaxed",
      pace: "Medium",
      interests: ["Art", "Food"],
      foodPreferences: ["Vegetarian"],
      accommodation: "Hotel",
      transportation: ["Public Transport"]
    });
    console.log("SUCCESS");
  } catch (err) {
    console.error("FAILED:", err);
  }
}
run();
