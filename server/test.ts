
import mongoose from 'mongoose';
import { Trip } from './src/models/TripModel.ts';
const trip = new Trip({
  user: new mongoose.Types.ObjectId(),
  title: 'Test Trip',
  destination: 'Paris',
  startDate: new Date(),
  endDate: new Date(),
  budget: 'moderate',
  travelers: 1,
  travelStyle: 'Relaxed',
  status: 'upcoming',
  itinerary: [],
  generatedData: {}
});
console.log('Validation Error:', trip.validateSync());
