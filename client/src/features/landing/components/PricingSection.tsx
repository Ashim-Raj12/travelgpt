import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Explorer",
    price: "Free",
    description: "Perfect for weekend getaways.",
    features: ["Up to 3 itineraries per month", "Standard AI recommendations", "Basic route optimization", "Export to PDF"],
    popular: false,
    buttonText: "Get Started",
  },
  {
    name: "Globetrotter",
    price: "$15",
    period: "/mo",
    description: "For the serious traveler.",
    features: ["Unlimited itineraries", "Advanced AI personalization", "Hidden gems & local secrets", "Real-time weather adjustments", "Export to Google Maps"],
    popular: true,
    buttonText: "Upgrade to Pro",
  },
  {
    name: "First Class",
    price: "$49",
    period: "/mo",
    description: "The ultimate luxury experience.",
    features: ["Everything in Globetrotter", "Live 24/7 human concierge support", "Direct booking integrations", "VIP lounge access guides", "Family itinerary sharing"],
    popular: false,
    buttonText: "Contact Sales",
  }
]

export const PricingSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold mb-6"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Choose the perfect plan for your travel style.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={plan.popular ? "md:-mt-8" : ""}
            >
              <Card className={`relative h-full flex flex-col ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10' : 'border-border/50'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-sans">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline text-4xl font-bold">
                    {plan.price}
                    {plan.period && <span className="text-lg text-muted-foreground font-normal ml-1">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
