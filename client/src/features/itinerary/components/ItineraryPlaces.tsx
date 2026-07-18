import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"

export const ItineraryPlaces = ({ hotels, restaurants }: { hotels: any[], restaurants: any[] }) => {
  return (
    <div className="space-y-12">
      {/* Hotels */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Where to Stay</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hotels.map((hotel, i) => (
            <Card key={i} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-2 py-1 rounded-md text-sm font-semibold flex items-center gap-1 shadow-sm">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {hotel.rating}
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{hotel.name}</h4>
                    <Badge variant="secondary" className="mt-1">{hotel.type}</Badge>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg">{hotel.pricePerNight}</span>
                    <span className="text-xs text-muted-foreground block">/ night</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{hotel.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Where to Eat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restaurants.map((place, i) => (
            <Card key={i} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow group flex flex-row h-32">
              <div className="w-1/3 overflow-hidden relative shrink-0">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-4 flex flex-col justify-center flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold">{place.name}</h4>
                  <div className="flex items-center gap-1 text-xs font-semibold">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {place.rating}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{place.cuisine}</span>
                  <span className="font-medium text-foreground">{place.price}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{place.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
