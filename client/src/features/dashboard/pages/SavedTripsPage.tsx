import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { MoreHorizontal, ExternalLink, CalendarDays, Plus, Heart } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const SavedTripsPage = () => {
  const [trips, setTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/trips', { credentials: 'include' })
        if (!response.ok) throw new Error("Failed to fetch trips")
        
        const data = await response.json()
        setTrips(data.data.trips)
      } catch (error) {
        toast.error("Failed to load saved trips.")
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Heart className="h-8 w-8 text-rose-500 fill-rose-500/20" />
              Saved Trips
            </h1>
            <p className="text-muted-foreground mt-1">All your planned itineraries and dream destinations in one place.</p>
          </div>
          <Button onClick={() => navigate("/plan")}>
            <Plus className="mr-2 h-4 w-4" /> Plan New Trip
          </Button>
        </div>

        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl bg-card border-dashed">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Heart className="h-10 w-10 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No saved trips yet</h3>
            <p className="text-muted-foreground max-w-sm mb-6">You haven't saved any itineraries. Start exploring and planning your next adventure!</p>
            <Button onClick={() => navigate("/plan")} size="lg">
              Start Planning
            </Button>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4"
          >
            {trips.map((trip) => {
              const diffTime = new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              return (
                <motion.div 
                  key={trip._id} 
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300 } }
                  }}
                  className="w-full overflow-hidden rounded-xl border bg-card hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="h-48 relative cursor-pointer overflow-hidden" onClick={() => navigate("/itinerary/new", { state: { destination: trip.destination, generatedItinerary: trip.generatedData, durationDays: diffDays, travelersCount: trip.travelers, budget: trip.budget } })}>
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      src={trip.generatedData?.hotels?.[0]?.image || "/images/dest_tokyo_1784370032130.png"} 
                      alt={trip.title} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 bg-background/50 backdrop-blur hover:bg-background/90 text-foreground rounded-full")}>
                            <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate("/itinerary/new", { state: { destination: trip.destination, generatedItinerary: trip.generatedData, durationDays: diffDays, travelersCount: trip.travelers, budget: trip.budget } })}>View Itinerary</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium shadow-sm backdrop-blur-md ${trip.status === 'upcoming' ? 'bg-primary/90 text-primary-foreground' : 'bg-secondary/90 text-secondary-foreground'}`}>
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-semibold text-lg line-clamp-1 mb-2 group-hover:text-primary transition-colors cursor-pointer" onClick={() => navigate("/itinerary/new", { state: { destination: trip.destination, generatedItinerary: trip.generatedData, durationDays: diffDays, travelersCount: trip.travelers, budget: trip.budget } })}>
                      {trip.title}
                    </h4>
                    
                    <div className="mt-auto space-y-2 pt-4 border-t border-border/50">
                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <ExternalLink className="h-4 w-4 shrink-0 text-primary/70" /> 
                        <span className="truncate">{trip.destination}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <CalendarDays className="h-4 w-4 shrink-0 text-primary/70" /> 
                        <span>{diffDays} Days • {trip.travelers} Travelers</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  )
}
