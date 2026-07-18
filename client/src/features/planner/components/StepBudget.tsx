import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, ArrowLeft, Wallet, Coins, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { budgetSchema, type BudgetInput } from "../schemas"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
  defaultValues?: Partial<BudgetInput>
  onNext: (data: BudgetInput) => void
  onBack: () => void
}

const budgetOptions = [
  { id: "Budget", title: "Budget-friendly", icon: Coins, desc: "Hostels, street food, public transit" },
  { id: "Moderate", title: "Moderate", icon: Wallet, desc: "3-4 star hotels, mixed dining" },
  { id: "Luxury", title: "Luxury", icon: Gem, desc: "5-star hotels, fine dining, private transfers" },
]

export const StepBudget = ({ defaultValues, onNext, onBack }: Props) => {
  const form = useForm<BudgetInput>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      budget: defaultValues?.budget as any,
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
        <h2 className="text-3xl font-bold tracking-tight mb-2">What's your budget?</h2>
        <p className="text-muted-foreground">This helps us tailor accommodations and activities.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {budgetOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => field.onChange(opt.id)}
                        className={cn(
                          "cursor-pointer rounded-xl border-2 p-6 flex flex-col items-center text-center transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
                          field.value === opt.id ? "border-primary bg-primary/10" : "border-border bg-card"
                        )}
                      >
                        <div className={cn("p-4 rounded-full mb-4", field.value === opt.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                          <opt.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{opt.title}</h3>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage className="text-center" />
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
