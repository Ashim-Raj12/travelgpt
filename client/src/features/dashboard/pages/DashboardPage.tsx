import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TravelStatsWidget } from "../components/TravelStatsWidget"
import { QuickPlannerWidget } from "../components/QuickPlannerWidget"
import { UpcomingTripsWidget } from "../components/UpcomingTripsWidget"
import { SavedTripsWidget } from "../components/SavedTripsWidget"
import { TravelBudgetWidget } from "../components/TravelBudgetWidget"
import { WeatherWidget } from "../components/WeatherWidget"
import { RecentActivityWidget } from "../components/RecentActivityWidget"
import { motion } from "framer-motion"

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your travel plans.</p>
        </div>

        <TravelStatsWidget />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <QuickPlannerWidget />
            <SavedTripsWidget />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TravelBudgetWidget />
              <div className="space-y-6">
                <WeatherWidget />
                <RecentActivityWidget />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <UpcomingTripsWidget />
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
