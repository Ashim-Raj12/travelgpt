import { z } from "zod"

export const destinationSchema = z.object({
  destination: z.string().min(2, "Please enter a destination."),
  durationDays: z.string().min(1, "Please enter the number of days."),
})
export type DestinationInput = z.infer<typeof destinationSchema>

export const budgetSchema = z.object({
  budget: z.enum(["Budget", "Moderate", "Luxury"], {
    required_error: "Please select a budget level.",
  }),
})
export type BudgetInput = z.infer<typeof budgetSchema>

export const travelersSchema = z.object({
  travelersCount: z.string().min(1, "Please specify number of travelers."),
  travelersType: z.enum(["Solo", "Couple", "Family", "Group"], {
    required_error: "Please select a traveler type.",
  }),
})
export type TravelersInput = z.infer<typeof travelersSchema>

export const styleSchema = z.object({
  travelStyle: z.enum(["Tourist Highlights", "Hidden Gems", "Mix of Both"], {
    required_error: "Please select a travel style.",
  }),
  pace: z.enum(["Relaxed", "Moderate", "Fast-Paced"], {
    required_error: "Please select a pace.",
  }),
})
export type StyleInput = z.infer<typeof styleSchema>

export const interestsSchema = z.object({
  interests: z.array(z.string()).min(1, "Please select at least one interest."),
})
export type InterestsInput = z.infer<typeof interestsSchema>

export const foodSchema = z.object({
  foodPreferences: z.array(z.string()).min(1, "Please select at least one food preference."),
})
export type FoodInput = z.infer<typeof foodSchema>

export const accommodationSchema = z.object({
  accommodation: z.enum(["Hostel", "Hotel", "Resort", "Airbnb", "Boutique"], {
    required_error: "Please select an accommodation type.",
  }),
})
export type AccommodationInput = z.infer<typeof accommodationSchema>

export const transportationSchema = z.object({
  transportation: z.array(z.string()).min(1, "Please select at least one transportation method."),
})
export type TransportationInput = z.infer<typeof transportationSchema>

// The aggregate type for the entire form
export type PlannerData = DestinationInput &
  BudgetInput &
  TravelersInput &
  StyleInput &
  InterestsInput &
  FoodInput &
  AccommodationInput &
  TransportationInput
