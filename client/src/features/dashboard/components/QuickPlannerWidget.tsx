import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { motion } from "framer-motion"

export const QuickPlannerWidget = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-muted/30 shadow-md">
        {/* Decorative background element */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" 
        />
        
        <div className="relative p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-semibold text-lg">AI Quick Planner</h3>
          </div>
          
          <p className="text-muted-foreground text-sm mb-6 max-w-md">
            Instantly generate a tailored itinerary. Tell us where you want to go and what you want to do.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault()
              toast.success("AI is generating your itinerary...")
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input 
              placeholder="e.g. A 5-day food tour in Tokyo for two..." 
              className="flex-1 bg-background h-12 rounded-xl shadow-inner border-muted focus-visible:ring-primary/50 transition-all duration-300 focus:scale-[1.01]"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" size="lg" className="h-12 w-full sm:w-auto rounded-xl shrink-0">
                Generate <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </form>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {["Weekend in Paris", "Bali Yoga Retreat", "Swiss Alps Ski Trip"].map((suggestion, i) => (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
                key={suggestion}
                className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-background border border-border text-muted-foreground cursor-pointer transition-colors"
                onClick={() => toast.success(`Selected suggestion: ${suggestion}`)}
              >
                {suggestion}
              </motion.span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
