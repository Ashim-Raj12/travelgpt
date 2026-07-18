import { MapPin, Star, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Hotel {
  id: string
  name: string
  description: string
  pricePerNight: number
  rating: number
  distanceFromCenter: number
  amenities: string[]
  imageType: string
  searchContext?: { origin: string, destination: string }
}

interface HotelCardProps {
  hotel: Hotel
}

// Map generic AI image types to our static placeholders for UI polish
const getHotelImage = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes("resort") || t.includes("beach")) return "/images/dest_santorini_1784370051980.png"
  if (t.includes("mountain") || t.includes("ski")) return "/images/dest_swiss_1784370021031.png"
  if (t.includes("city") || t.includes("urban")) return "/images/dest_tokyo_1784370032130.png"
  return "/images/hero_bg_1784370008936.png"
}

export const HotelCard = ({ hotel }: HotelCardProps) => {
  const destination = hotel.searchContext?.destination || "";
  const mapQuery = `${hotel.name} ${destination}`.trim();
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-all border-border/50">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="h-48 md:h-auto md:w-64 shrink-0 relative overflow-hidden">
              <img 
                src={getHotelImage(hotel.imageType)} 
                alt={hotel.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-serif cursor-pointer hover:text-primary transition-colors" onClick={() => window.open(mapUrl, "_blank")}>{hotel.name}</h3>
                  <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-md text-sm font-medium">
                    <Star className="h-4 w-4 fill-amber-500" />
                    {hotel.rating.toFixed(1)}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{hotel.distanceFromCenter} km from center</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {hotel.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      <Check className="h-3 w-3" /> {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 4 && (
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      +{hotel.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="p-6 md:w-48 flex flex-col justify-end items-end md:border-l border-border/50 bg-muted/5">
              <div className="text-right mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Price per night</p>
                <p className="text-3xl font-bold text-primary">${hotel.pricePerNight}</p>
                <p className="text-xs text-muted-foreground mt-1">Includes taxes & fees</p>
              </div>
              <Button className="w-full" onClick={() => window.open(mapUrl, "_blank")}>View on Map</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
