import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CloudRain, AlertTriangle } from "lucide-react"

export const RainAlertsWidget = ({ alerts, hourly }: { alerts: any[], hourly: any[] }) => {
  // Find if there's any immediate high chance of rain in the next 12 hours
  const upcomingRain = hourly.slice(0, 12).find(h => h.pop > 0.5)
  const officialAlert = alerts?.[0]

  if (officialAlert) {
    return (
      <Alert variant="destructive" className="border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle className="font-bold text-base">{officialAlert.event}</AlertTitle>
        <AlertDescription className="text-sm mt-1 leading-relaxed">
          {officialAlert.description}
        </AlertDescription>
      </Alert>
    )
  }

  if (upcomingRain) {
    const time = new Date(upcomingRain.dt * 1000).toLocaleTimeString([], { hour: 'numeric' })
    return (
      <Alert className="border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400">
        <CloudRain className="h-5 w-5" />
        <AlertTitle className="font-bold">Rain Expected Soon</AlertTitle>
        <AlertDescription className="text-sm mt-1">
          There is a {Math.round(upcomingRain.pop * 100)}% chance of rain around {time}. You might want to grab an umbrella!
        </AlertDescription>
      </Alert>
    )
  }

  return null
}
