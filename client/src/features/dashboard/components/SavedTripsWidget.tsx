import { MoreHorizontal, ExternalLink, CalendarDays } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

const savedTrips = [
  {
    id: 1,
    title: "Romantic Paris",
    location: "France",
    duration: "5 Days",
    image: "/images/hero_bg_1784370008936.png",
    status: "Planned",
  },
  {
    id: 2,
    title: "Santorini Getaway",
    location: "Greece",
    duration: "7 Days",
    image: "/images/dest_santorini_1784370051980.png",
    status: "Draft",
  },
  {
    id: 3,
    title: "Tokyo Culinary Tour",
    location: "Japan",
    duration: "10 Days",
    image: "/images/dest_tokyo_1784370032130.png",
    status: "Planned",
  },
]

export const SavedTripsWidget = () => {
  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-semibold text-lg">Saved Itineraries</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          View All
        </Button>
      </CardHeader>
      <CardContent>
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
            {savedTrips.map((trip) => (
              <motion.div 
                key={trip.id} 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300 } }
                }}
                className="w-[280px] shrink-0 overflow-hidden rounded-xl border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="h-32 relative group cursor-pointer overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={trip.image} 
                    alt={trip.title} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 bg-background/50 backdrop-blur hover:bg-background/80 text-foreground rounded-full" />}>
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
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${trip.status === 'Planned' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-3 mt-2">
                    <span className="flex items-center gap-1"><ExternalLink className="h-3 w-3" /> {trip.location}</span>
                    <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {trip.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
