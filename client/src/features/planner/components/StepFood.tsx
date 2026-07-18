import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { foodSchema, type FoodInput } from "../schemas"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
  defaultValues?: Partial<FoodInput>
  onNext: (data: FoodInput) => void
  onBack: () => void
}

const foodOptions = [
  "Local Cuisine", "Street Food", "Fine Dining", "Casual Dining",
  "Cafes & Bakeries", "Seafood", "Vegan / Vegetarian", 
  "Gluten-Free", "Halal", "Kosher", "Wine & Vineyards", "Breweries"
]

export const StepFood = ({ defaultValues, onNext, onBack }: Props) => {
  const form = useForm<FoodInput>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      foodPreferences: defaultValues?.foodPreferences || [],
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
        <h2 className="text-3xl font-bold tracking-tight mb-2">Food & Dining Preferences</h2>
        <p className="text-muted-foreground">Select all that apply.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
          <FormField
            control={form.control}
            name="foodPreferences"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-wrap justify-center gap-3">
                    {foodOptions.map((opt) => {
                      const isSelected = field.value.includes(opt)
                      return (
                        <div
                          key={opt}
                          onClick={() => {
                            if (isSelected) {
                              field.onChange(field.value.filter((i) => i !== opt))
                            } else {
                              field.onChange([...field.value, opt])
                            }
                          }}
                          className={cn(
                            "cursor-pointer rounded-full border px-6 py-3 text-sm font-medium transition-all duration-200 select-none",
                            isSelected 
                              ? "border-primary bg-primary text-primary-foreground shadow-md scale-105" 
                              : "border-border bg-card text-muted-foreground hover:border-primary/50"
                          )}
                        >
                          {opt}
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
