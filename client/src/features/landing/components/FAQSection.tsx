import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the AI generate itineraries?",
    answer: "Our AI model analyzes millions of travel data points, reviews, and logistical parameters. When you provide your preferences, it maps out a customized day-by-day plan that optimizes for travel time, popularity, and your specific interests."
  },
  {
    question: "Can I edit the generated itinerary?",
    answer: "Absolutely. The generated itinerary is just a starting point. You can swap activities, change dining reservations, or adjust timings directly within our interactive planner."
  },
  {
    question: "Does TravelGPT handle bookings?",
    answer: "Yes, our Pro and First Class tiers include seamless integrations with major booking platforms, allowing you to secure hotels and flights directly from your itinerary."
  },
  {
    question: "Is my personal data secure?",
    answer: "We take privacy seriously. Your travel preferences and personal details are encrypted and never sold to third parties. Please review our Privacy Policy for more details."
  }
]

export const FAQSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type={"single" as "single"} collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card px-6 rounded-xl border border-border/50">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
