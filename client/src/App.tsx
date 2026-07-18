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
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
