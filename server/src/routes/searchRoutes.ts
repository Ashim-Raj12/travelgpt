import { Router } from "express";
import { searchController } from "../controllers/SearchController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

// Using protect middleware to ensure only logged in users can search
router.post("/flights", protect, searchController.searchFlights);
router.post("/hotels", protect, searchController.searchHotels);

export default router;
