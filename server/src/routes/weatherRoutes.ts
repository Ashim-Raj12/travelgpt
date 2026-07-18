import express from 'express';
import { getDashboardWeather, weatherQuerySchema } from '../controllers/WeatherController';
import { validateRequest } from '../middlewares/validateRequest';
import { requireAuth } from '../middlewares/requireAuth';

const router = express.Router();

// Require auth to prevent abuse of the proxy endpoint
router.use(requireAuth);

router.get('/', validateRequest(weatherQuerySchema), getDashboardWeather);

export default router;
