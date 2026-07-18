import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "TravelGPT completely changed how I plan my vacations. It built a 2-week Japan itinerary that was flawless. Every restaurant recommendation was a hit.",
    name: "Sarah Jenkins",
    role: "Frequent Traveler",
    initials: "SJ"
  },
  {
    quote: "The route optimization saved us hours of transit time in Europe. It's like having a luxury travel agent in your pocket, instantly available.",
    name: "David Chen",
    role: "Digital Nomad",
    initials: "DC"
  },
  {
    quote: "I was skeptical about AI planning my honeymoon, but the personalized touches and hidden gems it suggested made our trip truly unforgettable.",
    name: "Emma & James",
    role: "Newlyweds",
    initials: "EJ"
  }
]

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl font-bold mb-6"
          >
            Loved by Travelers Worldwide
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="text-4xl text-primary/20 absolute top-6 left-6 font-serif">"</div>
              <p className="text-lg mb-8 relative z-10 pt-4 font-medium leading-relaxed">
                {t.quote}
              </p>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-sm">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
