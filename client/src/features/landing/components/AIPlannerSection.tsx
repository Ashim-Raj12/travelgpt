import { motion } from "framer-motion"
import { Sparkles, CalendarDays, CheckCircle2 } from "lucide-react"

export const AIPlannerSection = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Copy */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" /> The Magic of AI
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                Your Personal Travel Concierge, Available 24/7.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Gone are the days of spending hours researching flights, hotels, and attractions. TravelGPT understands your preferences, budget, and travel style to instantly generate a seamless, personalized itinerary.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Intelligent scheduling to avoid crowds",
                  "Personalized dining recommendations",
                  "Real-time weather and delay adjustments",
                  "One-click booking integrations"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-3 text-foreground font-medium"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Side: UI Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background blur image */}
            <div className="absolute -inset-4 md:-inset-10 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl opacity-50 rounded-full" />
            
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-card">
              {/* Mockup Header */}
              <div className="border-b border-border bg-muted/30 p-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                  <CalendarDays className="h-3 w-3" /> Day 1: Exploring Kyoto
                </div>
              </div>
              
              {/* Mockup Body with Generated Image */}
              <div className="relative h-[400px]">
                <img 
                  src="/images/ui_mockup_bg_1784370062474.png" 
                  alt="UI Background" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-20"
                />
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
                
                {/* Mock Itinerary Cards */}
                <div className="relative z-10 p-6 flex flex-col gap-4">
                  {[
                    { time: "09:00 AM", title: "Breakfast at Nishiki Market", type: "Dining" },
                    { time: "11:30 AM", title: "Fushimi Inari Shrine Tour", type: "Activity" },
                    { time: "02:00 PM", title: "Traditional Tea Ceremony", type: "Experience" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (i * 0.15) }}
                      className="bg-card border border-border p-4 rounded-xl shadow-sm flex items-start gap-4"
                    >
                      <div className="w-16 text-sm font-semibold text-primary shrink-0">{item.time}</div>
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <span className="text-xs text-muted-foreground mt-1 inline-block px-2 py-0.5 rounded-full bg-muted">{item.type}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
