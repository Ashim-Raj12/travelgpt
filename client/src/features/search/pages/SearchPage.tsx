import { useState } from "react"
import { Plane, Building, Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchFilters } from "../components/SearchFilters"
import { FlightCard } from "../components/FlightCard"
import { HotelCard } from "../components/HotelCard"
import { toast } from "react-hot-toast"

export const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("flights")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  
  // Filter States
  const [budget, setBudget] = useState([500])
  const [minRating, setMinRating] = useState("3")
  const [maxDistance, setMaxDistance] = useState([10])
  const [amenities, setAmenities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("cheapest")

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a destination or query")
      return
    }

    setIsLoading(true)
    setResults([])

    try {
      const endpoint = activeTab === "flights" ? "/api/search/flights" : "/api/search/hotels"
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: { destination: searchQuery },
          filters: {
            maxBudget: budget[0],
            minRating: parseInt(minRating),
            maxDistance: maxDistance[0],
            amenities,
          },
          sortBy
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setResults(data.data)
      } else {
        toast.error("Failed to fetch results")
      }
    } catch (err) {
      toast.error("An error occurred during search")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full min-h-screen bg-background">
      {/* Sidebar Filters */}
      <div className="w-80 border-r bg-card hidden md:block">
        <SearchFilters
          activeTab={activeTab}
          budget={budget}
          setBudget={setBudget}
          minRating={minRating}
          setMinRating={setMinRating}
          maxDistance={maxDistance}
          setMaxDistance={setMaxDistance}
          amenities={amenities}
          setAmenities={setAmenities}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Search */}
        <div className="border-b bg-background sticky top-0 z-10 p-4 shadow-sm">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold font-serif">Explore & Book</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setResults([]); }} className="w-full md:w-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="flights" className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Flights
                  </TabsTrigger>
                  <TabsTrigger value="hotels" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Hotels
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={activeTab === "flights" ? "Search flights to..." : "Search hotels in..."}
                  className="pl-9 h-10 w-full bg-muted/50 border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="h-10" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
              </Button>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-muted/20">
          <div className="max-w-4xl mx-auto space-y-6">
            {!isLoading && results.length === 0 && (
              <div className="h-[40vh] flex flex-col items-center justify-center text-muted-foreground space-y-4">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  {activeTab === "flights" ? <Plane className="h-12 w-12 text-primary/40" /> : <Building className="h-12 w-12 text-primary/40" />}
                </div>
                <p className="text-lg">No results found yet. Try searching above.</p>
              </div>
            )}
            
            {activeTab === "flights" && results.map((flight, idx) => (
              <FlightCard key={flight.id || idx} flight={flight} />
            ))}

            {activeTab === "hotels" && results.map((hotel, idx) => (
              <HotelCard key={hotel.id || idx} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
