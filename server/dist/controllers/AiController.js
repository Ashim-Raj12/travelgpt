"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiController = exports.generateItinerarySchema = void 0;
const AiService_1 = require("../services/AiService");
const zod_1 = require("zod");
// Validation schema for incoming AI generation request
exports.generateItinerarySchema = zod_1.z.object({
    body: zod_1.z.object({
        destination: zod_1.z.string().min(1, "Destination is required"),
        durationDays: zod_1.z.string().min(1, "Duration is required"),
        budget: zod_1.z.string().min(1, "Budget is required"),
        travelersCount: zod_1.z.string().min(1, "Travelers count is required"),
        travelersType: zod_1.z.string().min(1, "Travelers type is required"),
        travelStyle: zod_1.z.string().min(1, "Travel style is required"),
        pace: zod_1.z.string().min(1, "Pace is required"),
        interests: zod_1.z.array(zod_1.z.string()).default([]),
        foodPreferences: zod_1.z.array(zod_1.z.string()).default([]),
        accommodation: zod_1.z.string().min(1, "Accommodation is required"),
        transportation: zod_1.z.array(zod_1.z.string()).default([]),
    })
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
