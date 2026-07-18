"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiService = exports.AiService = void 0;
const AppError_1 = require("../utils/AppError");
class AiService {
    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY is not defined. AI generation will fail.");
        }
    }
    async generateItinerary(input) {
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
                throw new AppError_1.AppError("Failed to generate itinerary. No response from AI.", 500);
            }
            // Parse and return the JSON
            return JSON.parse(response.text);
        }
        catch (error) {
            console.error("Gemini Error:", error);
            throw new AppError_1.AppError("Failed to generate AI itinerary: " + error.message, 500);
        }
    }
    constructPrompt(input) {
        return `
      You are an expert travel planner. Create a detailed ${input.days}-day itinerary for a trip to ${input.destination}.
      
      User Profile:
      - Budget: ${input.budget}
      - Travelers: ${input.travelers}
      - Travel Style: ${input.travelStyle}
      - Interests: ${input.interests.join(", ")}
      - Food Preferences: ${input.food.join(", ")}

      CRITICAL: You MUST return a highly structured JSON object ONLY. No markdown wrapping (like \`\`\`json). Just the raw JSON object.

      The JSON schema MUST exactly match the following structure:
      {
        "overview": {
          "title": "String - Catchy title for the trip",
          "summary": "String - 2-3 sentence overview of the trip"
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
            "rating": Number (out of 5)
          }
        ],
        "restaurants": [
          {
            "name": "String",
            "cuisine": "String",
            "priceRange": "String (e.g., $$, $$$)",
            "mustTry": "String (Dish recommendation)"
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
            "name": "String (e.g. Police, Embassy)",
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
          "String", "String"
        ]
      }
    `;
    }
}
exports.AiService = AiService;
exports.aiService = new AiService();
