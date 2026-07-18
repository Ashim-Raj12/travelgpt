import { ArrowLeft, CheckCircle2, Sparkles, MapPin, CalendarDays, Wallet, Users, Palmtree, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { PlannerData } from "../schemas"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useState } from "react"

interface Props {
  data: Partial<PlannerData>
  onBack: () => void
  onSubmit: (itinerary: any) => void
}

export const StepReview = ({ data, onBack, onSubmit }: Props) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    toast.info("AI is crafting your perfect itinerary...")
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || "Failed to generate itinerary")
      
      setIsGenerating(false)
      onSubmit(result.data.itinerary)
    } catch (error: any) {
      setIsGenerating(false)
      toast.error(error.message || "An error occurred while generating the itinerary.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto w-full"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Ready for your adventure?</h2>
        <p className="text-muted-foreground">Review your preferences before we generate the itinerary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-card border-border/50 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Destination</h4>
                <p className="text-lg font-medium">{data.destination}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Duration</h4>
                <p className="text-lg font-medium">{data.durationDays} Days</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Travelers</h4>
                <p className="text-lg font-medium">{data.travelersCount} Person(s) • {data.travelersType}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Budget Level</h4>
                <p className="text-lg font-medium">{data.budget}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Palmtree className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Interests</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {data.interests?.map((i) => (
                    <span key={i} className="text-xs bg-muted px-2 py-1 rounded-md">{i}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <Utensils className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">Food</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {data.foodPreferences?.map((f) => (
                    <span key={f} className="text-xs bg-muted px-2 py-1 rounded-md">{f}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Accommodation</h4>
              <p className="text-sm">{data.accommodation}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">Pace & Style</h4>
              <p className="text-sm">{data.pace} • {data.travelStyle}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-2 max-w-xl mx-auto">
        <Button 
          type="button" 
          variant="outline" 
          size="lg" 
          className="flex-1 h-12" 
          onClick={onBack}
          disabled={isGenerating}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Edit
        </Button>
        <Button 
          onClick={handleGenerate} 
          size="lg" 
          className="flex-1 h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Sparkles className="h-5 w-5" />
            </motion.div>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" /> Generate Itinerary
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
