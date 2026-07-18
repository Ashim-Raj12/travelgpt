import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar?: string;
  preferences?: {
    currency: string;
    language: string;
  };
  isVerified: boolean;
  verificationToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
    },
    avatar: {
      type: String,
      default: "default.jpg",
    },
    preferences: {
      currency: { type: String, default: "USD" },
      language: { type: String, default: "en" },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password || "");
};

export const User = mongoose.model<IUser>("User", userSchema);
