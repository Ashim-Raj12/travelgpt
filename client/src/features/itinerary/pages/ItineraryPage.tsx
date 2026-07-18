import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItineraryHero } from "../components/ItineraryHero"
import { ItineraryActions } from "../components/ItineraryActions"
import { DailyTimeline } from "../components/DailyTimeline"
import { ItinerarySidebar } from "../components/ItinerarySidebar"
import { ItineraryPlaces } from "../components/ItineraryPlaces"
import { mockItineraryData } from "../data/mockItineraryData"

export const ItineraryPage = () => {
  // In a real app, we would fetch the itinerary by ID from URL params.
  const data = mockItineraryData

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
                <TabsList className="w-full grid grid-cols-2 mb-8 h-12 print:hidden">
                  <TabsTrigger value="timeline" className="text-base h-10">Daily Timeline</TabsTrigger>
                  <TabsTrigger value="places" className="text-base h-10">Hotels & Dining</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="mt-0 print:block">
                  <DailyTimeline timeline={data.timeline} />
                </TabsContent>
                
                <TabsContent value="places" className="mt-0 print:block">
                  <ItineraryPlaces hotels={data.hotels} restaurants={data.restaurants} />
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
