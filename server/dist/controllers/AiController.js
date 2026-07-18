"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiController = exports.generateItinerarySchema = void 0;
const AiService_1 = require("../services/AiService");
const zod_1 = require("zod");
// Validation schema for incoming AI generation request
exports.generateItinerarySchema = zod_1.z.object({
    destination: zod_1.z.string().min(1, "Destination is required"),
    budget: zod_1.z.string().min(1, "Budget is required"),
    travelers: zod_1.z.string().min(1, "Travelers is required"),
    days: zod_1.z.number().min(1, "At least 1 day is required").max(30, "Maximum 30 days allowed"),
    travelStyle: zod_1.z.string().min(1, "Travel style is required"),
    interests: zod_1.z.array(zod_1.z.string()).default([]),
    food: zod_1.z.array(zod_1.z.string()).default([]),
});
class AiController {
    async generateItinerary(req, res, next) {
        try {
            // The request body is already validated by the global validateRequest middleware
            const tripInput = req.body;
            const itinerary = await AiService_1.aiService.generateItinerary(tripInput);
            res.status(200).json({
                status: "success",
                data: {
                    itinerary,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.aiController = new AiController();
