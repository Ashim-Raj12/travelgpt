import mongoose, { Document, Schema } from "mongoose";

export interface IMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface IChatHistory extends Document {
  user: mongoose.Types.ObjectId;
  trip?: mongoose.Types.ObjectId;
  messages: IMessage[];
}

const messageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatHistorySchema = new Schema<IChatHistory>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Chat history must belong to a user"],
    },
    trip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

// Indexes
chatHistorySchema.index({ user: 1 });
chatHistorySchema.index({ trip: 1 });

export const ChatHistory = mongoose.model<IChatHistory>("ChatHistory", chatHistorySchema);
