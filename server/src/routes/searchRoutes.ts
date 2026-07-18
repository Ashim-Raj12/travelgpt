import { Router } from "express";
import { searchController } from "../controllers/SearchController";

const router = Router();

// Allow public searching for flights and hotels
router.post("/flights", searchController.searchFlights);
router.post("/hotels", searchController.searchHotels);

export default router;
