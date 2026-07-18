import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, ArrowLeft, Home, Building2, Palmtree, Bed, Tent } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { accommodationSchema, type AccommodationInput } from "../schemas"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
  defaultValues?: Partial<AccommodationInput>
  onNext: (data: AccommodationInput) => void
  onBack: () => void
}

const accommodations = [
  { id: "Hostel", title: "Hostel", icon: Bed },
  { id: "Hotel", title: "Hotel", icon: Building2 },
  { id: "Resort", title: "Resort", icon: Palmtree },
  { id: "Airbnb", title: "Airbnb / Apartment", icon: Home },
  { id: "Boutique", title: "Boutique / Unique", icon: Tent },
]

export const StepAccommodation = ({ defaultValues, onNext, onBack }: Props) => {
  const form = useForm<AccommodationInput>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      accommodation: defaultValues?.accommodation as any,
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Preferred Accommodation</h2>
        <p className="text-muted-foreground">Where would you like to stay?</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
          <FormField
            control={form.control}
            name="accommodation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-wrap justify-center gap-4">
                    {accommodations.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => field.onChange(opt.id)}
                        className={cn(
                          "cursor-pointer rounded-xl border-2 p-6 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 w-[140px] h-[140px]",
                          field.value === opt.id ? "border-primary bg-primary/10 scale-105" : "border-border bg-card"
                        )}
                      >
                        <opt.icon className={cn("h-8 w-8 mb-3", field.value === opt.id ? "text-primary" : "text-muted-foreground")} />
                        <span className="font-semibold text-sm">{opt.title}</span>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage className="text-center mt-4" />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-6 max-w-xl mx-auto">
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
