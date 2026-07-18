import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, MapPin } from "lucide-react"
import { useNavigate } from "react-router"

interface Destination {
  name: string
  count: number
  image: string
}

export const PopularDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/trips/public/destinations")
        const result = await response.json()
        if (result.status === "success") {
          setDestinations(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch popular destinations", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDestinations()
  }, [])

  const handleDestinationClick = async (destName: string) => {
    if (isCheckingAuth) return
    setIsCheckingAuth(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/auth/me", {
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
      if (response.ok) {
        navigate(`/plan?destination=${encodeURIComponent(destName)}`)
      } else {
        navigate(`/login?redirect=${encodeURIComponent(`/plan?destination=${encodeURIComponent(destName)}`)}`)
      }
    } catch (error) {
      navigate(`/login?redirect=${encodeURIComponent(`/plan?destination=${encodeURIComponent(destName)}`)}`)
    } finally {
      setIsCheckingAuth(false)
    }
  }

  // Pre-calculate colspans for a dynamic bento grid look
  const getColSpan = (index: number) => {
    if (index === 0) return "col-span-1 md:col-span-2 row-span-2"
    if (index === 3) return "col-span-1 md:col-span-2 row-span-1"
    return "col-span-1 row-span-1"
  }

  return (
    <section id="destinations" className="py-24 bg-muted/30">
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
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => handleDestinationClick("Anywhere")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer bg-transparent border-0"
          >
            Explore all destinations <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-[600px] animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`bg-muted/50 rounded-2xl ${getColSpan(i-1)}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-4">
            {destinations.map((dest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleDestinationClick(dest.name)}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${getColSpan(index)}`}
              >
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col justify-end transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-2xl font-bold text-white mb-2 font-serif flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" /> {dest.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-200 text-sm font-medium">
                      {dest.count} trips planned
                    </p>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Plan a trip
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
