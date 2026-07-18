import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, ArrowLeft, Camera, Map, Star, Coffee, Footprints, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { styleSchema, type StyleInput } from "../schemas"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
  defaultValues?: Partial<StyleInput>
  onNext: (data: StyleInput) => void
  onBack: () => void
}

const styles = [
  { id: "Tourist Highlights", title: "Tourist Highlights", icon: Camera, desc: "Must-see attractions" },
  { id: "Hidden Gems", title: "Hidden Gems", icon: Map, desc: "Off the beaten path" },
  { id: "Mix of Both", title: "Mix of Both", icon: Star, desc: "Best of both worlds" },
]

const paces = [
  { id: "Relaxed", title: "Relaxed", icon: Coffee, desc: "Take it easy" },
  { id: "Moderate", title: "Moderate", icon: Footprints, desc: "Balanced daily flow" },
  { id: "Fast-Paced", title: "Fast-Paced", icon: Zap, desc: "See as much as possible" },
]

export const StepStyle = ({ defaultValues, onNext, onBack }: Props) => {
  const form = useForm<StyleInput>({
    resolver: zodResolver(styleSchema),
    defaultValues: {
      travelStyle: defaultValues?.travelStyle as any,
      pace: defaultValues?.pace as any,
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">What's your travel style?</h2>
        <p className="text-muted-foreground">This helps us curate the perfect experience for you.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-8 max-w-xl mx-auto">
          <FormField
            control={form.control}
            name="travelStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-center block mb-4">Itinerary Focus</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {styles.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => field.onChange(opt.id)}
                        className={cn(
                          "cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center text-center transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
                          field.value === opt.id ? "border-primary bg-primary/10" : "border-border bg-card"
                        )}
                      >
                        <opt.icon className={cn("h-6 w-6 mb-2", field.value === opt.id ? "text-primary" : "text-muted-foreground")} />
                        <span className="font-medium text-sm">{opt.title}</span>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pace"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-center block mb-4">Travel Pace</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {paces.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => field.onChange(opt.id)}
                        className={cn(
                          "cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center text-center transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
                          field.value === opt.id ? "border-primary bg-primary/10" : "border-border bg-card"
                        )}
                      >
                        <opt.icon className={cn("h-6 w-6 mb-2", field.value === opt.id ? "text-primary" : "text-muted-foreground")} />
                        <span className="font-medium text-sm">{opt.title}</span>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-6">
            <Button type="button" variant="outline" size="lg" className="flex-1 h-12" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" size="lg" className="flex-1 h-12">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}
