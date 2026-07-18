import { AppError } from "../utils/AppError";

interface TripInput {
  destination: string;
  durationDays: string;
  budget: string;
  travelersCount: string;
  travelersType: string;
  travelStyle: string;
  pace: string;
  interests: string[];
  foodPreferences: string[];
  accommodation: string;
  transportation: string[];
}

export class AiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not defined. AI generation will fail.");
    }
  }

  public async generateItinerary(input: TripInput) {
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "missing" });

      const prompt = this.constructPrompt(input);
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        }
      });

      if (!response.text) {
        throw new AppError("Failed to generate itinerary. No response from AI.", 500);
      }

      // Parse and return the JSON
      return JSON.parse(response.text);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      throw new AppError("Failed to generate AI itinerary: " + error.message, 500);
    }
  }

  private constructPrompt(input: TripInput): string {
    return `
      You are an expert travel planner. Create a detailed ${input.durationDays}-day itinerary for a trip to ${input.destination}.
      
      User Profile:
      - Budget: ${input.budget}
      - Travelers: ${input.travelersCount} (${input.travelersType})
      - Travel Style: ${input.travelStyle}
      - Pace: ${input.pace}
      - Interests: ${input.interests.join(", ")}
      - Food Preferences: ${input.foodPreferences.join(", ")}
      - Accommodation: ${input.accommodation}
      - Transportation: ${input.transportation.join(", ")}

      CRITICAL: You MUST return a highly structured JSON object ONLY. No markdown wrapping (like \`\`\`json). Just the raw JSON object.

      The JSON schema MUST exactly match the following structure:
      {
        "overview": {
          "title": "String - Catchy title for the trip",
          "summary": "String - 2-3 sentence overview of the trip",
          "coordinates": { "lat": Number, "lng": Number } // Main destination coordinates
        },
        "dailyPlan": [
          {
            "dayNumber": 1,
            "theme": "String - Theme for the day",
            "activities": [
              {
                "time": "String (e.g. 09:00 AM)",
                "title": "String",
                "description": "String",
                "location": "String",
                "coordinates": { "lat": Number, "lng": Number },
                "cost": Number (Estimated cost per person in USD)
              }
            ]
          }
        ],
        "hotels": [
          {
            "name": "String",
            "description": "String",
            "pricePerNight": Number,
            "rating": Number (out of 5),
            "coordinates": { "lat": Number, "lng": Number }
          }
        ],
        "restaurants": [
          {
            "name": "String",
            "cuisine": "String",
            "priceRange": "String (e.g., $$, $$$)",
            "mustTry": "String (Dish recommendation)",
            "coordinates": { "lat": Number, "lng": Number }
          }
        ],
        "budget": {
          "estimatedTotal": Number,
          "breakdown": {
            "accommodation": Number,
            "food": Number,
            "activities": Number,
            "transportation": Number
          }
        },
        "packing": [
          "String (Item 1)",
          "String (Item 2)"
        ],
        "emergencyContacts": [
          {
            "name": "String (e.g. Police, Embassy, Hospital)",
            "number": "String"
          }
        ],
        "travelTips": [
          "String (Tip 1)",
          "String (Tip 2)"
        ],
        "weather": {
          "season": "String",
          "averageHigh": "String",
          "averageLow": "String",
          "advice": "String"
        },
        "nearbyAttractions": [
          { "name": "String", "coordinates": { "lat": Number, "lng": Number } }
        ]
      }
    `;
  }
}

export const aiService = new AiService();
