import { Request, Response, NextFunction } from "express";
import { Trip } from "../models/TripModel";
import { AppError } from "../utils/AppError";

class TripController {
  public async createTrip(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, destination, startDate, endDate, budget, travelers, travelStyle, generatedData } = req.body;
      
      const trip = await Trip.create({
        user: req.user?.id,
        title,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: budget || "moderate",
        travelers: Number(travelers) || 1,
        travelStyle,
        status: "upcoming",
        itinerary: [], // Leave empty for now, rely on generatedData for complex UI
        generatedData
      });

      res.status(201).json({
        status: "success",
        data: { trip }
      });
    } catch (error) {
      next(error);
    }
  }

  public async getUserTrips(req: Request, res: Response, next: NextFunction) {
    try {
      const trips = await Trip.find({ user: req.user?.id }).sort({ startDate: 1 });
      
      res.status(200).json({
        status: "success",
        results: trips.length,
        data: { trips }
      });
    } catch (error) {
      next(error);
    }
  }

  public async getTrip(req: Request, res: Response, next: NextFunction) {
    try {
      const trip = await Trip.findOne({ _id: req.params.id, user: req.user?.id });
      if (!trip) {
        return next(new AppError("No trip found with that ID", 404));
      }
      
      res.status(200).json({
        status: "success",
        data: { trip }
      });
    } catch (error) {
      next(error);
    }
  }

  public async getDashboardStats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const trips = await Trip.find({ user: userId });
      
      const totalTrips = trips.length;
      
      // Calculate unique countries/destinations
      const destinations = new Set(trips.map(t => t.destination));
      const countriesVisited = destinations.size;
      
      const now = new Date();
      const upcomingTrips = trips.filter(t => new Date(t.startDate) >= now).length;
      
      // Calculate total days traveled
      let daysTraveled = 0;
      trips.forEach(trip => {
        const diffTime = Math.abs(new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        daysTraveled += diffDays;
      });

      res.status(200).json({
        status: "success",
        data: {
          totalTrips,
          countriesVisited,
          upcomingTrips,
          daysTraveled
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export const tripController = new TripController();
