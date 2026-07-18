import { motion } from "framer-motion"
import { Sparkles, MapPin, Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero_bg_1784370008936.png" 
          alt="Luxury Tropical Destination" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            Design Your Dream Trip <br /> With Artificial Intelligence
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow">
            Experience the future of travel planning. Tell TravelGPT what you want, and let our AI curate the perfect luxury itinerary in seconds.
          </p>
        </motion.div>

        {/* AI Search Box - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-3xl"
        >
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 p-2 sm:p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex-1 w-full relative flex items-center bg-white/20 dark:bg-black/30 rounded-xl px-4 py-3">
              <Sparkles className="h-5 w-5 text-white mr-3 shrink-0" />
              <Input 
                type="text" 
                placeholder="Where do you want to go? e.g. A 7-day romantic getaway in Paris..." 
                className="border-0 bg-transparent text-white placeholder:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-base shadow-none w-full"
              />
            </div>
            <Button size="lg" className="w-full sm:w-auto h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 shrink-0">
              Generate Itinerary
            </Button>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5 backdrop-blur-md bg-black/20 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">
              <MapPin className="h-4 w-4" /> Kyoto, Japan
            </span>
            <span className="flex items-center gap-1.5 backdrop-blur-md bg-black/20 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">
              <Calendar className="h-4 w-4" /> 2 Weeks in Italy
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
