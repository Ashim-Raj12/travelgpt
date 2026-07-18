import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  trip: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  category: "flight" | "hotel" | "food" | "activity" | "transport" | "other";
  amount: number;
  currency: string;
  date?: Date;
  description?: string;
}

const expenseSchema = new Schema<IExpense>(
  {
    trip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: [true, "Expense must belong to a trip"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Expense must belong to a user"],
    },
    category: {
      type: String,
      enum: ["flight", "hotel", "food", "activity", "transport", "other"],
      required: [true, "Expense category is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    currency: {
      type: String,
      default: "USD",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Indexes
expenseSchema.index({ trip: 1 });
expenseSchema.index({ category: 1 });
expenseSchema.index({ user: 1 });

export const Expense = mongoose.model<IExpense>("Expense", expenseSchema);
