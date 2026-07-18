"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiService = exports.AiService = void 0;
const AppError_1 = require("../utils/AppError");
class AiService {
    constructor() { }
    async generateItinerary(input) {
        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY is not defined. AI generation will fail.");
        }
        try {
            const { GoogleGenAI } = await import("@google/genai");
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "missing" });
            const prompt = this.constructPrompt(input);
            const response = await ai.models.generateContent({
                model: "gemini-3.5-flash",
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
    async searchFlights(query, filters, sortBy) {
        if (!process.env.GEMINI_API_KEY)
            throw new AppError_1.AppError("GEMINI_API_KEY is missing", 500);
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = this.constructFlightSearchPrompt(query, filters, sortBy);
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json", temperature: 0.7 }
        });
        if (!response.text)
            throw new AppError_1.AppError("Failed to generate flight results", 500);
        return JSON.parse(response.text);
    }
    async searchHotels(query, filters, sortBy) {
        if (!process.env.GEMINI_API_KEY)
            throw new AppError_1.AppError("GEMINI_API_KEY is missing", 500);
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = this.constructHotelSearchPrompt(query, filters, sortBy);
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json", temperature: 0.7 }
        });
        if (!response.text)
            throw new AppError_1.AppError("Failed to generate hotel results", 500);
        return JSON.parse(response.text);
    }
    constructFlightSearchPrompt(query, filters, sortBy) {
        return `
      You are a flight search API. Generate 5 fictional but highly realistic flight search results for a query.
      Query: ${JSON.stringify(query)}
      Filters applied: ${JSON.stringify(filters)}
      Sort order: ${sortBy}

      The flights must strictly adhere to the budget, direct/stops preference, and be logically sorted by ${sortBy} (cheapest, fastest, or best_rated).

      CRITICAL: Return ONLY a JSON object containing an array called "flights".
      {
        "flights": [
          {
            "id": "String",
            "airline": "String (e.g. Delta, Emirates, Oceanic)",
            "flightNumber": "String",
            "departureTime": "String (e.g. 08:00 AM)",
            "arrivalTime": "String",
            "duration": "String (e.g. 5h 30m)",
            "stops": Number (0 for direct),
            "price": Number,
            "rating": Number (out of 5)
          }
        ]
      }
    `;
    }
    constructHotelSearchPrompt(query, filters, sortBy) {
        return `
      You are a hotel search API. Generate 5 fictional but highly realistic hotel search results for a query in ${query.destination || 'the requested city'}.
      Query: ${JSON.stringify(query)}
      Filters applied: ${JSON.stringify(filters)} (Includes max budget, min rating, max distance from center, required amenities)
      Sort order: ${sortBy}

      The hotels must strictly adhere to the filters and be logically sorted by ${sortBy} (cheapest, best_rated).
      
      CRITICAL: Return ONLY a JSON object containing an array called "hotels".
      {
        "hotels": [
          {
            "id": "String",
            "name": "String",
            "description": "String (short 1 sentence)",
            "pricePerNight": Number,
            "rating": Number (out of 5),
            "distanceFromCenter": Number (in km),
            "amenities": ["String", "String"],
            "imageType": "String (e.g., modern, resort, boutique)"
          }
        ]
      }
    `;
    }
}
exports.AiService = AiService;
exports.aiService = new AiService();
