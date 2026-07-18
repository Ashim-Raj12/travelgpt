import express from 'express';
import { tripController } from '../controllers/TripController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Public routes
router.get('/public/destinations', tripController.getPublicDestinations);

router.use(protect); // All trip routes below require auth

router.get('/stats', tripController.getDashboardStats);
router.post('/', tripController.createTrip);
router.get('/', tripController.getUserTrips);
router.get('/:id', tripController.getTrip);

export default router;
