import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, Plane, CalendarDays, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const OverviewTab = ({ stats, trips }: { stats?: any, trips?: any[] }) => {
  const statCards = [
    { label: "Total Trips", value: stats?.totalTrips || "0", icon: Plane, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Countries Visited", value: stats?.countriesVisited || "0", icon: Map, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Days Traveled", value: stats?.daysTraveled || "0", icon: CalendarDays, color: "text-amber-500", bg: "bg-amber-500/10" },
  ]

  const totalTrips = stats?.totalTrips || 0
  const achievements = [
    { name: "First Step", desc: "Saved your first trip", icon: "🌱", active: totalTrips >= 1 },
    { name: "Globetrotter", desc: "Saved 3+ trips", icon: "🌍", active: totalTrips >= 3 },
    { name: "Frequent Flyer", desc: "Saved 10+ trips", icon: "✈️", active: totalTrips >= 10 },
  ]

  // Extract unique destinations
  const uniqueDestinations = Array.from(new Set(trips?.map(t => t.destination.split(',').pop()?.trim()) || []))
  const visitedCountries = uniqueDestinations.map(dest => ({
    name: dest,
    flag: "📍" // Generic pin since we can't easily map all strings to flags
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-xl font-bold tracking-tight mb-4">Travel Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((stat, i) => (
            <Card key={i} className="border-border/50 bg-card">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className={`p-3 rounded-full ${stat.bg} mb-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-xl font-bold tracking-tight mb-4 pt-4">Visited Countries</h2>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              {visitedCountries.map((country, i) => (
                <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm flex items-center gap-2 font-normal">
                  <span className="text-lg">{country.flag}</span>
                  {country.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Column */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight mb-4">Achievements</h2>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {achievements.map((acc, i) => (
                <div key={i} className={`p-4 flex items-start gap-4 transition-colors ${acc.active ? 'hover:bg-muted/50' : 'opacity-50 grayscale'}`}>
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-2xl shrink-0 ${acc.active ? 'bg-primary/10' : 'bg-muted'}`}>
                    {acc.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{acc.name}</h4>
                    <p className="text-xs text-muted-foreground">{acc.desc}</p>
                  </div>
                  {acc.active && <Award className="h-4 w-4 text-primary ml-auto mt-1 shrink-0 opacity-50" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
