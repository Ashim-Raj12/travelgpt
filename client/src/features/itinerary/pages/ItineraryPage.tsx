import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocation } from "react-router"
import { useState } from "react"
import { ItineraryHero } from "../components/ItineraryHero"
import { ItineraryActions } from "../components/ItineraryActions"
import { DailyTimeline } from "../components/DailyTimeline"
import { ItinerarySidebar } from "../components/ItinerarySidebar"
import { ItineraryPlaces } from "../components/ItineraryPlaces"
import { mockItineraryData } from "../data/mockItineraryData"

import { InteractiveMap } from "../components/InteractiveMap"
import { WeatherDashboard } from "../components/weather/WeatherDashboard"
import { toast } from "sonner"

export const ItineraryPage = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("timeline")
  const formData = location.state
  
  const aiData = formData?.generatedItinerary || null

  const handleSaveTrip = async () => {
    if (!aiData) {
      toast.error("No trip data to save.");
      return;
    }
    
    try {
      // Default to starting in 30 days
      const startDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const durationNum = parseInt(formData?.durationDays || "7");
      const endDate = new Date(startDate.getTime() + durationNum * 24 * 60 * 60 * 1000);
      
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: aiData.overview?.title || formData?.destination + " Trip",
          destination: formData?.destination || "Unknown Destination",
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          budget: formData?.budget || "moderate",
          travelers: parseInt(formData?.travelersCount || "1"),
          travelStyle: formData?.travelStyle,
          generatedData: aiData
        })
      });
      
      if (!response.ok) throw new Error("Failed to save");
      toast.success("Trip saved successfully to Dashboard!");
    } catch (error) {
      toast.error("Could not save trip. Make sure you are logged in.");
      throw error;
    }
  }

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
    budget: aiData?.budget ? {
      total: aiData.budget.estimatedTotal || 0,
      currency: "USD",
      breakdown: [
        { category: "Accommodation", amount: aiData.budget.breakdown?.accommodation || 0 },
        { category: "Food & Dining", amount: aiData.budget.breakdown?.food || 0 },
        { category: "Activities", amount: aiData.budget.breakdown?.activities || 0 },
        { category: "Transportation", amount: aiData.budget.breakdown?.transportation || 0 }
      ]
    } : mockItineraryData.budget,
    timeline: aiData?.dailyPlan || mockItineraryData.timeline,
    hotels: (aiData?.hotels || mockItineraryData.hotels).map((h: any, i: number) => ({
      ...h,
      image: h.image || (i % 2 === 0 ? "/images/hero_bg_1784370008936.png" : "/images/dest_swiss_1784370021031.png")
    })),
    restaurants: (aiData?.restaurants || mockItineraryData.restaurants).map((r: any, i: number) => ({
      ...r,
      image: r.image || (i % 2 === 0 ? "/images/dest_santorini_1784370051980.png" : "/images/dest_tokyo_1784370032130.png")
    })),
    packingList: aiData?.packing ? [{ category: "Recommended Items", items: aiData.packing }] : mockItineraryData.packingList,
    emergency: aiData?.emergencyContacts ? {
      police: aiData.emergencyContacts.find((c: any) => c.name.toLowerCase().includes('police'))?.number || "911",
      ambulance: aiData.emergencyContacts.find((c: any) => c.name.toLowerCase().includes('ambulance'))?.number || "911",
      hospital: aiData.emergencyContacts.find((c: any) => c.name.toLowerCase().includes('hospital'))?.name || "Local Hospital",
      hospitalPhone: aiData.emergencyContacts.find((c: any) => c.name.toLowerCase().includes('hospital'))?.number || "Contact local authorities"
    } : mockItineraryData.emergency,
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
            <ItineraryActions onSave={handleSaveTrip} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-12">
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-4 mb-8 h-12 print:hidden">
                  <TabsTrigger value="timeline" className="text-base h-10">Daily Timeline</TabsTrigger>
                  <TabsTrigger value="places" className="text-base h-10">Hotels & Dining</TabsTrigger>
                  <TabsTrigger value="map" className="text-base h-10">Map View</TabsTrigger>
                  <TabsTrigger value="weather" className="text-base h-10">Weather</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="mt-0 print:block">
                  <DailyTimeline timeline={data.timeline} />
                </TabsContent>
                
                <TabsContent value="places" className="mt-0 print:block">
                  <ItineraryPlaces hotels={data.hotels} restaurants={data.restaurants} />
                </TabsContent>

                <TabsContent value="map" className="mt-0 print:block">
                  {activeTab === "map" && (
                    <div className="h-[600px] w-full">
                      <InteractiveMap markers={mapMarkers} />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="weather" className="mt-0 print:block">
                  {activeTab === "weather" && (
                    <WeatherDashboard 
                      lat={mapMarkers[0]?.lat || 48.8566} 
                      lng={mapMarkers[0]?.lng || 2.3522} 
                    />
                  )}
                </TabsContent>
              </Tabs>
              
            </div>

            {/* Sidebar Widgets */}
            <div className="lg:col-span-1 print:hidden">
              <div className="sticky top-24">
                <ItinerarySidebar data={data} markers={mapMarkers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
