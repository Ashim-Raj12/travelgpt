import { Request, Response, NextFunction } from "express";
import { aiService } from "../services/AiService";
import { AppError } from "../utils/AppError";

export class SearchController {
  public async searchFlights(req: Request, res: Response, next: NextFunction) {
    try {
      const { query, filters, sortBy } = req.body;
      if (!query) {
        throw new AppError("Search query is required", 400);
      }

      const results = await aiService.searchFlights(query, filters || {}, sortBy || "cheapest");
      res.status(200).json({
        success: true,
        data: results.flights || []
      });
    } catch (error) {
      next(error);
    }
  }

  public async searchHotels(req: Request, res: Response, next: NextFunction) {
    try {
      const { query, filters, sortBy } = req.body;
      if (!query) {
        throw new AppError("Search query is required", 400);
      }

      const results = await aiService.searchHotels(query, filters || {}, sortBy || "cheapest");
      res.status(200).json({
        success: true,
        data: results.hotels || []
      });
    } catch (error) {
      next(error);
    }
  }
}

export const searchController = new SearchController();
