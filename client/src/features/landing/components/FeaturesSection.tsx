import { motion } from "framer-motion"
import { Compass, Sparkles, Map, Heart, Plane, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Itineraries",
    description: "Get personalized day-by-day travel plans tailored to your exact preferences and travel style."
  },
  {
    icon: Map,
    title: "Smart Route Optimization",
    description: "Our algorithm calculates the most efficient routes between attractions to save you time and energy."
  },
  {
    icon: Compass,
    title: "Hidden Gems",
    description: "Discover local secrets and off-the-beaten-path experiences curated from vast travel data."
  },
  {
    icon: Heart,
    title: "Curated Stays & Dining",
    description: "Receive highly rated recommendations for luxury hotels, boutique stays, and world-class dining."
  },
  {
    icon: Plane,
    title: "Real-time Adaptability",
    description: "Plans change? Your AI planner adjusts your itinerary instantly based on weather or delays."
  },
  {
    icon: ShieldCheck,
    title: "Premium Support",
    description: "Enjoy 24/7 priority assistance and seamless booking integrations for a worry-free journey."
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold mb-6"
          >
            Redefining Travel Planning
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            TravelGPT combines cutting-edge artificial intelligence with deep travel expertise to deliver an unparalleled planning experience.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-6"
        >
          {features.map((feature, index) => {
            let colSpan = "col-span-1"
            let rowSpan = "row-span-1"
            
            // Create a bento box layout
            if (index === 0) {
              colSpan = "md:col-span-2 lg:col-span-2"
              rowSpan = "md:row-span-2"
            } else if (index === 1) {
              colSpan = "md:col-span-1 lg:col-span-2"
              rowSpan = "md:row-span-1"
            } else if (index === 2) {
              colSpan = "md:col-span-1 lg:col-span-1"
              rowSpan = "md:row-span-2"
            } else if (index === 3) {
              colSpan = "md:col-span-1 lg:col-span-1"
              rowSpan = "md:row-span-1"
            } else if (index === 4) {
              colSpan = "md:col-span-2 lg:col-span-2"
              rowSpan = "md:row-span-1"
            } else if (index === 5) {
              colSpan = "md:col-span-1 lg:col-span-2"
              rowSpan = "md:row-span-1"
            }

            return (
            <motion.div key={index} variants={itemVariants} className={`${colSpan} ${rowSpan}`}>
              <Card className="h-full w-full bg-card/60 backdrop-blur-md border-muted/30 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group relative overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <CardTitle className="font-sans text-2xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
