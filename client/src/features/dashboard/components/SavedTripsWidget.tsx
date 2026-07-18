import { MoreHorizontal, ExternalLink, CalendarDays } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { useNavigate } from "react-router"

interface SavedTripsWidgetProps {
  trips: any[]
}

export const SavedTripsWidget = ({ trips }: SavedTripsWidgetProps) => {
  const navigate = useNavigate()

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-semibold text-lg">Saved Itineraries</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {trips.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground text-sm">
            <p>You haven't saved any itineraries yet.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate("/plan")}>
              Plan Your First Trip
            </Button>
          </div>
        ) : (
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="flex w-max space-x-4"
            >
              {trips.map((trip) => {
                const diffTime = new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                return (
                  <motion.div 
                    key={trip._id} 
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300 } }
                    }}
                    className="w-[280px] shrink-0 overflow-hidden rounded-xl border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="h-32 relative group cursor-pointer overflow-hidden" onClick={() => navigate("/itinerary/new", { state: { destination: trip.destination, generatedItinerary: trip.generatedData, durationDays: diffDays, travelersCount: trip.travelers, budget: trip.budget } })}>
                      <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={trip.generatedData?.hotels?.[0]?.image || "/images/dest_tokyo_1784370032130.png"} 
                        alt={trip.title} 
                        className="absolute inset-0 w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 bg-background/50 backdrop-blur hover:bg-background/80 text-foreground rounded-full")}>
                              <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Itinerary</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-sm truncate pr-2">{trip.title}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${trip.status === 'upcoming' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground gap-3 mt-2">
                        <span className="flex items-center gap-1 truncate"><ExternalLink className="h-3 w-3 shrink-0" /> {trip.destination}</span>
                        <span className="flex items-center gap-1 shrink-0"><CalendarDays className="h-3 w-3 shrink-0" /> {diffDays} Days</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
