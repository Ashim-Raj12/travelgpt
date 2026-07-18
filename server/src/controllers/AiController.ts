import { Request, Response, NextFunction } from "express";
import { aiService } from "../services/AiService";
import { z } from "zod";

// Validation schema for incoming AI generation request
export const generateItinerarySchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  durationDays: z.string().min(1, "Duration is required"),
  budget: z.string().min(1, "Budget is required"),
  travelersCount: z.string().min(1, "Travelers count is required"),
  travelersType: z.string().min(1, "Travelers type is required"),
  travelStyle: z.string().min(1, "Travel style is required"),
  pace: z.string().min(1, "Pace is required"),
  interests: z.array(z.string()).default([]),
  foodPreferences: z.array(z.string()).default([]),
  accommodation: z.string().min(1, "Accommodation is required"),
  transportation: z.array(z.string()).default([]),
});

class AiController {
  public async generateItinerary(req: Request, res: Response, next: NextFunction) {
    try {
      // The request body is already validated by the global validateRequest middleware
      const tripInput = req.body;
      
      const itinerary = await aiService.generateItinerary(tripInput);

      res.status(200).json({
        status: "success",
        data: {
          itinerary,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const aiController = new AiController();
