"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const activitySchema = new mongoose_1.Schema({
    time: String,
    title: { type: String, required: true },
    description: String,
    location: String,
    cost: Number,
});
const daySchema = new mongoose_1.Schema({
    dayNumber: { type: Number, required: true },
    date: { type: Date, required: true },
    activities: [activitySchema],
});
const tripSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Trip must belong to a user"],
    },
    destination: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Destination",
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
}, { timestamps: true });
// Custom validation for dates
tripSchema.pre("validate", function (next) {
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
        this.invalidate("endDate", "End date must be after start date.");
    }
    next();
});
// Indexes
tripSchema.index({ user: 1 });
tripSchema.index({ startDate: 1 });
tripSchema.index({ destination: 1 });
exports.Trip = mongoose_1.default.model("Trip", tripSchema);
