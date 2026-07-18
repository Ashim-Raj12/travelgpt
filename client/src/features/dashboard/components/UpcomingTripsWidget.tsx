import { Calendar, MapPin, Users, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useNavigate } from "react-router"

interface UpcomingTripsWidgetProps {
  trips: any[];
}

export const UpcomingTripsWidget = ({ trips }: UpcomingTripsWidgetProps) => {
  const navigate = useNavigate()
  
  // Find the first upcoming trip
  const now = new Date()
  const upcomingTrip = trips
    .filter(t => new Date(t.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];

  if (!upcomingTrip) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-full"
      >
        <Card className="h-full flex flex-col items-center justify-center border-border/50 p-6 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <CardTitle className="text-lg">No Upcoming Trips</CardTitle>
          <p className="text-sm text-muted-foreground mt-2 mb-6">You have no trips planned in the near future.</p>
          <Button onClick={() => navigate("/plan")}>Plan a Trip</Button>
        </Card>
      </motion.div>
    )
  }

  // Calculate days until trip
  const diffTime = new Date(upcomingTrip.startDate).getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const startDate = new Date(upcomingTrip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endDate = new Date(upcomingTrip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  // Extract first activity if available
  const firstActivity = upcomingTrip.generatedData?.dailyPlan?.[0]?.activities?.[0] || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-border/50 group hover:shadow-md transition-shadow">
        <div className="h-48 relative overflow-hidden">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
            src="/images/dest_swiss_1784370021031.png" 
            alt={upcomingTrip.destination} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur text-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            In {diffDays} Days
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-serif text-2xl font-bold tracking-tight truncate">{upcomingTrip.title}</h3>
            <p className="text-white/80 text-sm flex items-center gap-1 mt-1 truncate">
              <MapPin className="h-3.5 w-3.5 shrink-0" /> {upcomingTrip.destination}
            </p>
          </div>
        </div>
      
        <CardContent className="flex-1 p-6 flex flex-col">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              <div className="truncate">
                <p className="font-medium text-foreground truncate">{startDate} - {endDate}</p>
                <p className="text-xs truncate">{upcomingTrip.generatedData?.duration || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary shrink-0" />
              <div className="truncate">
                <p className="font-medium text-foreground truncate">{upcomingTrip.travelers} People</p>
                <p className="text-xs truncate">{upcomingTrip.travelStyle || "Vacation"}</p>
              </div>
            </div>
          </div>

          {firstActivity && (
            <div className="space-y-3 mt-auto">
              <h4 className="text-sm font-semibold">First Item on Itinerary</h4>
              <div className="bg-muted/50 p-3 rounded-lg flex items-start gap-3 border border-border/50">
                <div className="bg-background rounded-md p-2 shadow-sm border border-border shrink-0">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{firstActivity.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{firstActivity.time}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Button className="flex-1" variant="default" onClick={() => navigate("/itinerary/new", { state: { destination: upcomingTrip.destination, generatedItinerary: upcomingTrip.generatedData, durationDays: diffDays, travelersCount: upcomingTrip.travelers, budget: upcomingTrip.budget } })}>
              View Itinerary
            </Button>
            <Button className="flex-1" variant="outline" disabled>
              Modify
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
