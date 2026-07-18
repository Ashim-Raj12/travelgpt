import mongoose, { Document, Schema } from "mongoose";

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId;
  itemType: "Trip" | "Destination";
  itemId: mongoose.Types.ObjectId;
  notes?: string;
}

const favoriteSchema = new Schema<IFavorite>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Favorite must belong to a user"],
    },
    itemType: {
      type: String,
      enum: ["Trip", "Destination"],
      required: [true, "Item type is required"],
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: [true, "Item ID is required"],
      // Dynamic reference is handled by application logic
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Indexes
favoriteSchema.index({ user: 1 });
favoriteSchema.index({ itemType: 1, itemId: 1 });
// Ensure a user can only favorite a specific item once
favoriteSchema.index({ user: 1, itemType: 1, itemId: 1 }, { unique: true });

export const Favorite = mongoose.model<IFavorite>("Favorite", favoriteSchema);
