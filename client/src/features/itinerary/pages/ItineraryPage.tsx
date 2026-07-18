import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocation } from "react-router"
import { ItineraryHero } from "../components/ItineraryHero"
import { ItineraryActions } from "../components/ItineraryActions"
import { DailyTimeline } from "../components/DailyTimeline"
import { ItinerarySidebar } from "../components/ItinerarySidebar"
import { ItineraryPlaces } from "../components/ItineraryPlaces"
import { mockItineraryData } from "../data/mockItineraryData"

import { InteractiveMap } from "../components/InteractiveMap"

export const ItineraryPage = () => {
  const location = useLocation()
  const formData = location.state
  
  const aiData = formData?.generatedItinerary || null

  // Map AI data to frontend components or fallback to mock
  const data = formData ? {
    ...mockItineraryData,
    title: aiData?.overview?.title || formData.destination ? `${formData.destination} Trip` : mockItineraryData.title,
    destination: formData.destination || mockItineraryData.destination,
    duration: formData.durationDays ? `${formData.durationDays} Days` : mockItineraryData.duration,
    travelers: formData.travelersCount && formData.travelersType 
      ? `${formData.travelersCount} Person(s) (${formData.travelersType})` 
      : mockItineraryData.travelers,
    budgetLevel: formData.budget || mockItineraryData.budgetLevel,
    timeline: aiData?.dailyPlan || mockItineraryData.timeline,
    hotels: aiData?.hotels || mockItineraryData.hotels,
    restaurants: aiData?.restaurants || mockItineraryData.restaurants,
    packingList: aiData?.packing || [],
    emergencyContacts: aiData?.emergencyContacts || [],
    travelTips: aiData?.travelTips || [],
    weather: aiData?.weather || null,
  } : mockItineraryData

  // Extract coordinates for the Map
  const mapMarkers: any[] = []
  
  if (aiData) {
    if (aiData.overview?.coordinates) {
      mapMarkers.push({ id: "main-dest", title: aiData.overview.title, lat: aiData.overview.coordinates.lat, lng: aiData.overview.coordinates.lng, type: "main" })
    }
    aiData.hotels?.forEach((h: any, i: number) => {
      if (h.coordinates) mapMarkers.push({ id: `hotel-${i}`, title: h.name, subtitle: `${h.rating} Stars`, lat: h.coordinates.lat, lng: h.coordinates.lng, type: "hotel" })
    })
    aiData.restaurants?.forEach((r: any, i: number) => {
      if (r.coordinates) mapMarkers.push({ id: `food-${i}`, title: r.name, subtitle: r.cuisine, lat: r.coordinates.lat, lng: r.coordinates.lng, type: "food" })
    })
    aiData.dailyPlan?.forEach((day: any) => {
      day.activities?.forEach((act: any, i: number) => {
        if (act.coordinates) mapMarkers.push({ id: `act-${day.dayNumber}-${i}`, title: act.title, subtitle: act.time, lat: act.coordinates.lat, lng: act.coordinates.lng, type: "attraction" })
      })
    })
    aiData.nearbyAttractions?.forEach((att: any, i: number) => {
      if (att.coordinates) mapMarkers.push({ id: `near-${i}`, title: att.name, lat: att.coordinates.lat, lng: att.coordinates.lng, type: "attraction" })
    })
  }

  return (
    <DashboardLayout>
      <div className="w-full pb-20">
        <ItineraryHero data={data} />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 print:hidden">
            <h2 className="text-2xl font-bold tracking-tight">Your Detailed Plan</h2>
            <ItineraryActions />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-12">
              
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-8 h-12 print:hidden">
                  <TabsTrigger value="timeline" className="text-base h-10">Daily Timeline</TabsTrigger>
                  <TabsTrigger value="places" className="text-base h-10">Hotels & Dining</TabsTrigger>
                  <TabsTrigger value="map" className="text-base h-10">Map View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="mt-0 print:block">
                  <DailyTimeline timeline={data.timeline} />
                </TabsContent>
                
                <TabsContent value="places" className="mt-0 print:block">
                  <ItineraryPlaces hotels={data.hotels} restaurants={data.restaurants} />
                </TabsContent>

                <TabsContent value="map" className="mt-0 print:block h-[600px]">
                  <InteractiveMap markers={mapMarkers} />
                </TabsContent>
              </Tabs>
              
            </div>

            {/* Sidebar Widgets */}
            <div className="lg:col-span-1 print:hidden">
              <div className="sticky top-24">
                <ItinerarySidebar data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
