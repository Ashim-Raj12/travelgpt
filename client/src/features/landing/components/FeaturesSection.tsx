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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-muted/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="font-sans text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
