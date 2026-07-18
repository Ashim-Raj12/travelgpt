import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
})
export type LoginInput = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})
export type SignupInput = z.infer<typeof signupSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
})
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

export const otpSchema = z.object({
  pin: z.string().min(6, "Your one-time password must be 6 characters."),
})
export type OtpInput = z.infer<typeof otpSchema>

export const profileCompletionSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  preferences: z.array(z.string()).min(1, "Select at least one travel preference"),
})
export type ProfileCompletionInput = z.infer<typeof profileCompletionSchema>
