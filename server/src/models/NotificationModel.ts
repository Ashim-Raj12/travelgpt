import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  type: "system" | "reminder" | "alert";
  title: string;
  message: string;
  read: boolean;
  relatedTrip?: mongoose.Types.ObjectId;
}

const notificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Notification must belong to a user"],
    },
    type: {
      type: String,
      enum: ["system", "reminder", "alert"],
      default: "system",
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
    },
    read: {
      type: Boolean,
      default: false,
    },
    relatedTrip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
    },
  },
  { timestamps: true }
);

// Indexes
notificationSchema.index({ user: 1, read: 1 });
notificationSchema.index({ createdAt: -1 });

export const Notification = mongoose.model<INotification>("Notification", notificationSchema);
