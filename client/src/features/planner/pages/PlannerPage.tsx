import { useState } from "react"
import { useNavigate } from "react-router"
import { AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { X, Sparkles } from "lucide-react"
import { toast } from "sonner"
import type { PlannerData } from "../schemas"

import { StepDestination } from "../components/StepDestination"
import { StepBudget } from "../components/StepBudget"
import { StepTravelers } from "../components/StepTravelers"
import { StepStyle } from "../components/StepStyle"
import { StepInterests } from "../components/StepInterests"
import { StepFood } from "../components/StepFood"
import { StepAccommodation } from "../components/StepAccommodation"
import { StepTransportation } from "../components/StepTransportation"
import { StepReview } from "../components/StepReview"

const TOTAL_STEPS = 9

export const PlannerPage = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<PlannerData>>({})

  // If a destination was passed in the URL (e.g. from Landing Page), pre-fill and stay on step 1
  useState(() => {
    const params = new URLSearchParams(window.location.search)
    const destParam = params.get("destination")
    if (destParam) {
      setFormData(prev => ({ ...prev, destination: destParam }))
    }
  })

  const handleNext = (stepData: Partial<PlannerData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleFinish = (itinerary: any) => {
    toast.success("Itinerary generated successfully!")
    navigate("/itinerary/new", { state: { ...formData, generatedItinerary: itinerary } })
  }

  const handleClose = () => {
    if (confirm("Are you sure you want to exit? Your progress will be lost.")) {
      navigate("/dashboard")
    }
  }

  const progressPercentage = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline-block">AI Trip Planner</span>
          </div>
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-xs text-muted-foreground text-center mt-1">
              Step {currentStep} of {TOTAL_STEPS}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        {/* Mobile Progress Bar */}
        <div className="md:hidden w-full h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-in-out" 
            style={{ width: `${progressPercentage}%` }} 
          />
        </div>
      </header>

      {/* Main Form Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
        {/* Decorative background gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-5xl relative z-10">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <StepDestination key="step1" defaultValues={formData} onNext={handleNext} onBack={handleBack} isFirstStep={true} />
            )}
            {currentStep === 2 && (
              <StepBudget key="step2" defaultValues={formData} onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 3 && (
              <StepTravelers key="step3" defaultValues={formData} onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 4 && (
              <StepStyle key="step4" defaultValues={formData} onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 5 && (
              <StepInterests key="step5" defaultValues={formData} onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 6 && (
              <StepFood key="step6" defaultValues={formData} onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 7 && (
              <StepAccommodation key="step7" defaultValues={formData} onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 8 && (
              <StepTransportation key="step8" defaultValues={formData} onNext={handleNext} onBack={handleBack} />
            )}
            {currentStep === 9 && (
              <StepReview key="step9" data={formData} onBack={handleBack} onSubmit={handleFinish} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
