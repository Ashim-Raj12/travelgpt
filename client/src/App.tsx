import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Routes, Route } from "react-router"
import { LandingPage } from "@/pages/landing-page"
import { LoginPage } from "@/features/auth/pages/LoginPage"
import { SignupPage } from "@/features/auth/pages/SignupPage"
import { ForgotPasswordPage } from "@/features/auth/pages/ForgotPasswordPage"
import { ResetPasswordPage } from "@/features/auth/pages/ResetPasswordPage"
import { OTPVerificationPage } from "@/features/auth/pages/OTPVerificationPage"
import { EmailVerificationPage } from "@/features/auth/pages/EmailVerificationPage"
import { ProfileCompletionPage } from "@/features/auth/pages/ProfileCompletionPage"
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage"
import { PlannerPage } from "@/features/planner/pages/PlannerPage"
import { ItineraryPage } from "@/features/itinerary/pages/ItineraryPage"
import { SearchPage } from "@/features/search/pages/SearchPage"
import { ProfilePage } from "@/features/profile/pages/ProfilePage"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/complete-profile" element={<ProfileCompletionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/plan" element={<PlannerPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/itinerary/:id" element={<ItineraryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
