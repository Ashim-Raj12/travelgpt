"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AiController_1 = require("../controllers/AiController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateRequest_1 = require("../middlewares/validateRequest");
const router = express_1.default.Router();
// Require user to be authenticated to generate itineraries
router.use(authMiddleware_1.protect);
router.post("/generate", (0, validateRequest_1.validateRequest)(AiController_1.generateItinerarySchema), AiController_1.aiController.generateItinerary);
exports.default = router;
