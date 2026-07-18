import { useState } from "react"
import { Plane, Building, Search, Loader2, Compass } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchFilters } from "../components/SearchFilters"
import { FlightCard } from "../components/FlightCard"
import { HotelCard } from "../components/HotelCard"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { motion } from "framer-motion"

export const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("flights")
  const [searchQuery, setSearchQuery] = useState("")
  const [originQuery, setOriginQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  
  // Filter States
  const [budget, setBudget] = useState([500])
  const [minRating, setMinRating] = useState("3")
  const [maxDistance, setMaxDistance] = useState([10])
  const [amenities, setAmenities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("cheapest")

  const handleSearch = async () => {
    if (!searchQuery.trim() || (activeTab === "flights" && !originQuery.trim())) {
      toast.error(activeTab === "flights" ? "Please enter both origin and destination" : "Please enter a destination")
      return
    }

    setIsLoading(true)
    setResults([])

    try {
      const endpoint = activeTab === "flights" ? "/api/search/flights" : "/api/search/hotels"
      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: { destination: searchQuery, origin: originQuery },
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
        // Pass origin/destination down for booking links if needed
        const mappedResults = data.data.map((item: any) => ({
          ...item,
          searchContext: { origin: originQuery, destination: searchQuery }
        }));
        setResults(mappedResults)
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
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="h-full flex flex-col md:flex-row gap-6 max-w-[1600px] mx-auto"
      >
        {/* Sidebar Filters */}
        <div className="w-full md:w-72 lg:w-80 shrink-0">
          <div className="sticky top-6">
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
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header Search */}
          <div className="bg-card rounded-xl border p-4 shadow-sm mb-6 z-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <Compass className="h-6 w-6 text-primary" />
                  Explore & Book
                </h1>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center">
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
                
                <div className="flex-1 w-full flex flex-col md:flex-row gap-2">
                  {activeTab === "flights" && (
                    <div className="relative flex-1">
                      <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-45" />
                      <Input 
                        placeholder="Where from?"
                        className="pl-9 h-10 w-full bg-muted/50 border-border"
                        value={originQuery}
                        onChange={(e) => setOriginQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>
                  )}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder={activeTab === "flights" ? "Where to?" : "Search hotels in..."}
                      className="pl-9 h-10 w-full bg-muted/50 border-border"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                </div>
                <Button onClick={handleSearch} className="h-10 w-full md:w-auto" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
                </Button>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            <div className="space-y-4">
              {!isLoading && results.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[40vh] flex flex-col items-center justify-center text-muted-foreground border border-dashed rounded-xl bg-card/50"
                >
                  <div className="bg-muted p-4 rounded-full mb-4">
                    {activeTab === "flights" ? <Plane className="h-10 w-10 text-muted-foreground opacity-50" /> : <Building className="h-10 w-10 text-muted-foreground opacity-50" />}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No results yet</h3>
                  <p className="text-muted-foreground max-w-sm text-center">Enter a destination above to start exploring available {activeTab === "flights" ? "flights" : "hotels"}.</p>
                </motion.div>
              )}
              
              {isLoading && (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 w-full bg-muted/40 animate-pulse rounded-xl border"></div>
                  ))}
                </div>
              )}
              
              {!isLoading && results.length > 0 && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                  }}
                  className="space-y-4"
                >
                  {activeTab === "flights" && results.map((flight, idx) => (
                    <motion.div key={flight.id || idx} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                      <FlightCard flight={flight} />
                    </motion.div>
                  ))}

                  {activeTab === "hotels" && results.map((hotel, idx) => (
                    <motion.div key={hotel.id || idx} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                      <HotelCard hotel={hotel} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
