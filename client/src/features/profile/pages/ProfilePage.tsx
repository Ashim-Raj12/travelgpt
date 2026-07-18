import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProfileHeader } from "../components/ProfileHeader"
import { OverviewTab } from "../components/OverviewTab"
import { JournalTab } from "../components/JournalTab"
import { SettingsTab } from "../components/SettingsTab"

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [trips, setTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userRes, statsRes, tripsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL || ""}/api/users/me`, { credentials: 'include' }),
          fetch(`${import.meta.env.VITE_API_URL || ""}/api/trips/stats`, { credentials: 'include' }),
          fetch(`${import.meta.env.VITE_API_URL || ""}/api/trips`, { credentials: 'include' })
        ])
        
        if (userRes.ok) {
          const userData = await userRes.json()
          setUser(userData.data.user)
        }
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData.data)
        }
        if (tripsRes.ok) {
          const tripsData = await tripsRes.json()
          setTrips(tripsData.data.trips)
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfileData()
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
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileHeader user={user} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <OverviewTab stats={stats} trips={trips} />
          </TabsContent>
          
          <TabsContent value="journal" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <JournalTab trips={trips} />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <SettingsTab user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
