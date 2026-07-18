import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  targetModel: "Destination" | "Trip";
  targetId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    targetModel: {
      type: String,
      enum: ["Destination", "Trip"],
      required: [true, "Target model is required"],
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: [true, "Target ID is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Indexes
reviewSchema.index({ targetId: 1, targetModel: 1 });
reviewSchema.index({ user: 1 });

// Ensure a user can only review an item once
reviewSchema.index({ user: 1, targetId: 1, targetModel: 1 }, { unique: true });

export const Review = mongoose.model<IReview>("Review", reviewSchema);
