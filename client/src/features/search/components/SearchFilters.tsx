import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"

interface SearchFiltersProps {
  activeTab: string
  budget: number[]
  setBudget: (val: number[]) => void
  minRating: string
  setMinRating: (val: string) => void
  maxDistance: number[]
  setMaxDistance: (val: number[]) => void
  amenities: string[]
  setAmenities: (val: string[]) => void
  sortBy: string
  setSortBy: (val: string) => void
}

const HOTEL_AMENITIES = ["WiFi", "Pool", "Breakfast", "Gym", "Spa", "Parking", "Pet Friendly"]
const FLIGHT_AMENITIES = ["Carry-on Included", "Seat Selection", "In-flight Meals", "No Cancellation Fee"]

export const SearchFilters = ({
  activeTab,
  budget, setBudget,
  minRating, setMinRating,
  maxDistance, setMaxDistance,
  amenities, setAmenities,
  sortBy, setSortBy
}: SearchFiltersProps) => {

  const currentAmenities = activeTab === "hotels" ? HOTEL_AMENITIES : FLIGHT_AMENITIES

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity))
    } else {
      setAmenities([...amenities, amenity])
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Sort */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sort By</h3>
            <RadioGroup value={sortBy} onValueChange={setSortBy}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cheapest" id="sort-cheap" />
                <Label htmlFor="sort-cheap">Cheapest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="best_rated" id="sort-rated" />
                <Label htmlFor="sort-rated">Best Rated</Label>
              </div>
              {activeTab === "flights" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fastest" id="sort-fast" />
                  <Label htmlFor="sort-fast">Fastest</Label>
                </div>
              )}
            </RadioGroup>
          </div>

          <Separator />

          {/* Budget */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Max Price</h3>
              <span className="font-medium">${budget[0]}</span>
            </div>
            <Slider 
              value={budget} 
              onValueChange={(val: any) => setBudget(val)} 
              max={2000} 
              step={50} 
              className="py-4"
            />
          </div>

          <Separator />

          {/* Rating */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Minimum Rating</h3>
            <RadioGroup value={minRating} onValueChange={setMinRating}>
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center space-x-2">
                  <RadioGroupItem value={stars.toString()} id={`star-${stars}`} />
                  <Label htmlFor={`star-${stars}`} className="flex items-center gap-1">
                    {Array(stars).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    {stars < 5 && <span className="text-muted-foreground ml-1">& Up</span>}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Distance (Hotels Only) */}
          {activeTab === "hotels" && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Distance from Center</h3>
                  <span className="font-medium">{maxDistance[0]} km</span>
                </div>
                <Slider 
                  value={maxDistance} 
                  onValueChange={(val: any) => setMaxDistance(val)} 
                  max={50} 
                  step={1} 
                  className="py-4"
                />
              </div>
            </>
          )}

          <Separator />

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preferences</h3>
            <div className="space-y-3">
              {currentAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`amenity-${amenity}`} 
                    checked={amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
