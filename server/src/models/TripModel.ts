import mongoose, { Document, Schema } from "mongoose";

export interface IActivity {
  time?: string;
  title: string;
  description?: string;
  location?: string;
  cost?: number;
}

export interface IDay {
  dayNumber: number;
  date: Date;
  activities: IActivity[];
}

export interface ITrip extends Document {
  user: mongoose.Types.ObjectId;
  destination: string;
  title: string;
  startDate: Date;
  endDate: Date;
  budget: "cheap" | "moderate" | "luxury";
  travelers: number;
  travelStyle?: string;
  status: "planning" | "upcoming" | "ongoing" | "completed";
  itinerary: IDay[];
  generatedData?: any;
}

const activitySchema = new Schema<IActivity>({
  time: String,
  title: { type: String, required: true },
  description: String,
  location: String,
  cost: Number,
});

const daySchema = new Schema<IDay>({
  dayNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  activities: [activitySchema],
});

const tripSchema = new Schema<ITrip>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Trip must belong to a user"],
    },
    destination: {
      type: String,
      required: [true, "Trip must have a destination"],
    },
    title: {
      type: String,
      required: [true, "Trip title is required"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    budget: {
      type: String,
      enum: ["cheap", "moderate", "luxury"],
      default: "moderate",
    },
    travelers: {
      type: Number,
      min: [1, "At least 1 traveler required"],
      default: 1,
    },
    travelStyle: String,
    status: {
      type: String,
      enum: ["planning", "upcoming", "ongoing", "completed"],
      default: "planning",
    },
    itinerary: [daySchema],
    generatedData: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Custom validation for dates
tripSchema.pre("validate", function () {
  if (this.startDate && this.endDate && this.startDate > this.endDate) {
    this.invalidate("endDate", "End date must be after start date.");
  }
});

// Indexes
tripSchema.index({ user: 1 });
tripSchema.index({ startDate: 1 });
tripSchema.index({ destination: 1 });

export const Trip = mongoose.model<ITrip>("Trip", tripSchema);
