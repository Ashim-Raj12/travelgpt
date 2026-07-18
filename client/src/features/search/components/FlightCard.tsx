import { Plane, Clock, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Flight {
  id: string
  airline: string
  flightNumber: string
  departureTime: string
  arrivalTime: string
  duration: string
  stops: number
  price: number
  rating: number
  searchContext?: { origin: string, destination: string }
}

interface FlightCardProps {
  flight: Flight
}

export const FlightCard = ({ flight }: FlightCardProps) => {
  const origin = flight.searchContext?.origin || "";
  const destination = flight.searchContext?.destination || "";
  const bookUrl = `https://www.google.com/travel/flights?q=Flights%20from%20${encodeURIComponent(origin)}%20to%20${encodeURIComponent(destination)}%20on%20${encodeURIComponent(flight.airline)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-all border-border/50">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Airline Info */}
            <div className="p-6 md:w-1/4 flex flex-col justify-center items-center md:items-start bg-muted/20 border-b md:border-b-0 md:border-r border-border/50">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Plane className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-center md:text-left">{flight.airline}</h4>
              <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
              
              <div className="flex items-center gap-1 mt-3 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                <Star className="h-3 w-3 fill-amber-500" />
                {flight.rating.toFixed(1)}
              </div>
            </div>

            {/* Flight Times */}
            <div className="p-6 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold font-serif">{flight.departureTime}</p>
                  <p className="text-sm text-muted-foreground mt-1">Departure</p>
                </div>

                <div className="flex-1 px-8 flex flex-col items-center">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Clock className="h-3 w-3" />
                    {flight.duration}
                  </div>
                  <div className="w-full flex items-center">
                    <div className="h-[2px] flex-1 bg-border rounded-l-full" />
                    <Plane className="h-4 w-4 text-primary mx-2" />
                    <div className="h-[2px] flex-1 bg-border rounded-r-full" />
                  </div>
                  <div className="text-xs mt-2 font-medium text-primary">
                    {flight.stops === 0 ? "Direct" : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold font-serif">{flight.arrivalTime}</p>
                  <p className="text-sm text-muted-foreground mt-1">Arrival</p>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="p-6 md:w-48 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-border/50 bg-muted/10">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Per traveler</p>
              <p className="text-3xl font-bold text-primary mb-4">${flight.price}</p>
              <Button className="w-full" onClick={() => window.open(bookUrl, "_blank", "noopener,noreferrer")}>Book Ticket</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
