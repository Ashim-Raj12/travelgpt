import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TravelStatsWidget } from "../components/TravelStatsWidget"
import { QuickPlannerWidget } from "../components/QuickPlannerWidget"
import { UpcomingTripsWidget } from "../components/UpcomingTripsWidget"
import { SavedTripsWidget } from "../components/SavedTripsWidget"
import { TravelBudgetWidget } from "../components/TravelBudgetWidget"
import { WeatherWidget } from "../components/WeatherWidget"
import { RecentActivityWidget } from "../components/RecentActivityWidget"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export const DashboardPage = () => {
  const [stats, setStats] = useState<any>(null)
  const [trips, setTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, tripsRes] = await Promise.all([
          fetch('/api/trips/stats', { credentials: 'include' }),
          fetch('/api/trips', { credentials: 'include' })
        ])

        if (!statsRes.ok || !tripsRes.ok) throw new Error("Failed to fetch dashboard data")

        const statsData = await statsRes.json()
        const tripsData = await tripsRes.json()

        setStats(statsData.data)
        setTrips(tripsData.data.trips)
      } catch (error) {
        toast.error("Failed to load dashboard data. Please try logging in again.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

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

        <TravelStatsWidget stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <QuickPlannerWidget />
            <SavedTripsWidget trips={trips} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TravelBudgetWidget trip={trips[0]} />
              <div className="space-y-6">
                <WeatherWidget trip={trips[0]} />
                <RecentActivityWidget trips={trips} />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <UpcomingTripsWidget trips={trips} />
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
