import express from "express";
import { aiController, generateItinerarySchema } from "../controllers/AiController";
import { protect } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

// Require user to be authenticated to generate itineraries
router.use(protect);

router.post("/generate", validateRequest(generateItinerarySchema), aiController.generateItinerary);

export default router;
