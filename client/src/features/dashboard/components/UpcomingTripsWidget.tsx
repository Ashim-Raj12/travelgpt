import { Calendar, MapPin, Users, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useNavigate } from "react-router"

export const UpcomingTripsWidget = () => {
  const navigate = useNavigate()

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
            alt="Swiss Alps" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur text-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            In 14 Days
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-serif text-2xl font-bold tracking-tight">Swiss Alps Winter Escape</h3>
            <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" /> Zermatt, Switzerland
            </p>
          </div>
        </div>
      
        <CardContent className="flex-1 p-6 flex flex-col">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">Dec 12 - Dec 18</p>
                <p className="text-xs">7 Days, 6 Nights</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">2 People</p>
                <p className="text-xs">Couples Trip</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            <h4 className="text-sm font-semibold">Next Item on Itinerary</h4>
            <div className="bg-muted/50 p-3 rounded-lg flex items-start gap-3 border border-border/50">
              <div className="bg-background rounded-md p-2 shadow-sm border border-border">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Flight LX 803</p>
                <p className="text-xs text-muted-foreground">JFK to ZRH • 8:40 PM Departure</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button className="flex-1" variant="default" onClick={() => navigate("/itinerary/1")}>
              View Itinerary
            </Button>
            <Button className="flex-1" variant="outline">
              Modify Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
