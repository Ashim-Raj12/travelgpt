import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, ArrowLeft, User, Users, Baby, UsersRound } from "lucide-react"
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
import { travelersSchema, type TravelersInput } from "../schemas"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
  defaultValues?: Partial<TravelersInput>
  onNext: (data: TravelersInput) => void
  onBack: () => void
}

const travelerTypes = [
  { id: "Solo", title: "Solo", icon: User },
  { id: "Couple", title: "Couple", icon: Users },
  { id: "Family", title: "Family", icon: Baby },
  { id: "Group", title: "Group", icon: UsersRound },
]

export const StepTravelers = ({ defaultValues, onNext, onBack }: Props) => {
  const form = useForm<TravelersInput>({
    resolver: zodResolver(travelersSchema),
    defaultValues: {
      travelersCount: defaultValues?.travelersCount || "1",
      travelersType: defaultValues?.travelersType as any,
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
        <h2 className="text-3xl font-bold tracking-tight mb-2">Who is traveling?</h2>
        <p className="text-muted-foreground">Tell us about your travel companions.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-8 max-w-xl mx-auto">
          <FormField
            control={form.control}
            name="travelersType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-center block mb-4">Travel Group Type</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {travelerTypes.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => {
                          field.onChange(opt.id)
                          if (opt.id === "Solo") form.setValue("travelersCount", "1")
                          if (opt.id === "Couple") form.setValue("travelersCount", "2")
                        }}
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
            name="travelersCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-center block mb-4">Total Number of Travelers</FormLabel>
                <FormControl>
                  <div className="flex justify-center items-center max-w-xs mx-auto">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => field.onChange(String(Math.max(1, parseInt(field.value || "1") - 1)))}
                    >
                      -
                    </Button>
                    <Input 
                      type="number" 
                      min="1"
                      className="w-24 text-center mx-4 text-lg font-bold" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => field.onChange(String(parseInt(field.value || "1") + 1))}
                    >
                      +
                    </Button>
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
