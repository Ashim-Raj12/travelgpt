import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin, CalendarDays, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { destinationSchema, type DestinationInput } from "../schemas"
import { motion } from "framer-motion"

interface Props {
  defaultValues?: Partial<DestinationInput>
  onNext: (data: DestinationInput) => void
  onBack: () => void
  isFirstStep: boolean
}

export const StepDestination = ({ defaultValues, onNext, onBack, isFirstStep }: Props) => {
  const form = useForm<DestinationInput>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      destination: defaultValues?.destination || "",
      durationDays: defaultValues?.durationDays || "",
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-xl mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Where do you want to go?</h2>
        <p className="text-muted-foreground">Pick a destination and how long you plan to stay.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Destination</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="e.g. Kyoto, Japan" className="pl-10 h-12 text-lg" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="durationDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Duration (Days)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input type="number" min="1" max="90" placeholder="e.g. 7" className="pl-10 h-12 text-lg" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-6">
            {!isFirstStep && (
              <Button type="button" variant="outline" size="lg" className="flex-1 h-12" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            <Button type="submit" size="lg" className="flex-1 h-12 w-full">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}
