import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const destinations = [
  {
    title: "Swiss Alps",
    location: "Switzerland",
    image: "/images/dest_swiss_1784370021031.png",
    colSpan: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    title: "Santorini",
    location: "Greece",
    image: "/images/dest_santorini_1784370051980.png",
    colSpan: "col-span-1 row-span-1",
  },
  {
    title: "Tokyo",
    location: "Japan",
    image: "/images/dest_tokyo_1784370032130.png",
    colSpan: "col-span-1 row-span-1",
  }
]

export const PopularDestinations = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-5xl font-bold mb-4"
            >
              Trending Destinations
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Explore the world's most breathtaking locations, flawlessly planned by AI.
            </motion.p>
          </div>
          <motion.a 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#" 
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Explore all destinations <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-[600px]">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${dest.colSpan}`}
            >
              <img 
                src={dest.image} 
                alt={dest.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-white/80 font-medium mb-1 tracking-wider text-sm uppercase">{dest.location}</p>
                <h3 className="text-3xl font-serif font-bold text-white">{dest.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
