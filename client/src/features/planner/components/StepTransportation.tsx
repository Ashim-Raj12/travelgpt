import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, ArrowLeft, Footprints, TrainFront, Car, Bus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { transportationSchema, type TransportationInput } from "../schemas"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
  defaultValues?: Partial<TransportationInput>
  onNext: (data: TransportationInput) => void
  onBack: () => void
}

const transitOptions = [
  { id: "Walking", title: "Walking", icon: Footprints },
  { id: "Public Transit", title: "Public Transit", icon: TrainFront },
  { id: "Rental Car", title: "Rental Car", icon: Car },
  { id: "Taxis/Rideshare", title: "Taxis / Rideshare", icon: Bus },
]

export const StepTransportation = ({ defaultValues, onNext, onBack }: Props) => {
  const form = useForm<TransportationInput>({
    resolver: zodResolver(transportationSchema),
    defaultValues: {
      transportation: defaultValues?.transportation || [],
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
        <h2 className="text-3xl font-bold tracking-tight mb-2">How will you get around?</h2>
        <p className="text-muted-foreground">Select all methods you are comfortable with.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
          <FormField
            control={form.control}
            name="transportation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                    {transitOptions.map((opt) => {
                      const isSelected = field.value.includes(opt.id)
                      return (
                        <div
                          key={opt.id}
                          onClick={() => {
                            if (isSelected) {
                              field.onChange(field.value.filter((i) => i !== opt.id))
                            } else {
                              field.onChange([...field.value, opt.id])
                            }
                          }}
                          className={cn(
                            "cursor-pointer rounded-xl border-2 p-6 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
                            isSelected ? "border-primary bg-primary/10 scale-105" : "border-border bg-card"
                          )}
                        >
                          <opt.icon className={cn("h-8 w-8 mb-3", isSelected ? "text-primary" : "text-muted-foreground")} />
                          <span className="font-semibold text-sm">{opt.title}</span>
                        </div>
                      )
                    })}
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
