import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Star } from "lucide-react"

export const JournalTab = ({ trips = [] }: { trips?: any[] }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold tracking-tight">Travel Journal</h2>
        <span className="text-sm text-muted-foreground">{trips.length} entries</span>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-12 border rounded-xl bg-muted/20">
          <p className="text-muted-foreground">You haven't saved any trips yet!</p>
        </div>
      ) : (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {trips.map((trip, idx) => {
            const overview = trip.generatedData?.overview
            const image = overview?.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop"
            const date = new Date(trip.startDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })
            const summary = overview?.summary || `A wonderful ${trip.travelStyle || 'moderate'} trip to ${trip.destination}.`
            
            return (
              <div key={trip._id || idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                  <MapPin className="h-4 w-4" />
                </div>

                {/* Card */}
                <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden rounded-t-xl">
                    <img 
                      src={image} 
                      alt={trip.destination} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{trip.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" /> {date}
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 italic">"{summary}"</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
