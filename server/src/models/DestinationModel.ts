import mongoose, { Document, Schema } from "mongoose";

export interface IDestination extends Document {
  name: string;
  country: string;
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  images: string[];
  popularTags: string[];
}

const destinationSchema = new Schema<IDestination>(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    images: {
      type: [String],
      default: [],
    },
    popularTags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Indexes
destinationSchema.index({ name: "text" });
destinationSchema.index({ country: 1 });

export const Destination = mongoose.model<IDestination>("Destination", destinationSchema);
