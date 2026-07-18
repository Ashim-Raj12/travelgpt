import { Request, Response } from 'express';
import { z } from 'zod';
import { WeatherService } from '../services/WeatherService';
import { ApiError } from '../utils/ApiError';

export const weatherQuerySchema = z.object({
  query: z.object({
    lat: z.string().refine((val) => !isNaN(Number(val)), { message: "Latitude must be a number" }),
    lng: z.string().refine((val) => !isNaN(Number(val)), { message: "Longitude must be a number" }),
  })
});

export const getDashboardWeather = async (req: Request, res: Response) => {
  const { lat, lng } = req.query as { lat: string, lng: string };
  
  const weatherData = await WeatherService.getWeatherData(Number(lat), Number(lng));
  
  res.status(200).json({
    status: 'success',
    data: weatherData
  });
};
