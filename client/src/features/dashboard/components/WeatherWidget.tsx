import { CloudRain, Sun, Cloud, Thermometer, Wind, CloudLightning } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const WeatherWidget = ({ trip }: { trip?: any }) => {
  if (!trip) {
    return (
      <Card className="border-border/50 bg-gradient-to-br from-slate-900 to-slate-800 text-white h-full flex flex-col items-center justify-center p-6 text-center">
        <Sun className="h-12 w-12 text-muted-foreground/30 mb-4 opacity-50" />
        <h3 className="font-semibold text-lg mb-2">No active trips</h3>
        <p className="text-sm text-slate-400">Plan a trip to see your destination's weather forecast here.</p>
      </Card>
    )
  }

  // Generate deterministic but random-looking weather based on the destination name length
  const temp = (trip.destination.length * 3) % 15 + 15; // 15 to 30 C
  const feelsLike = temp + 2;

  return (
    <Card className="border-border/50 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="font-semibold text-lg flex items-center justify-between">
          Destination Weather
          <CloudRain className="h-4 w-4 text-blue-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="font-medium mb-4">{trip.destination}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sun className="h-12 w-12 text-amber-400" />
              <div>
                <div className="text-4xl font-bold">{temp}°</div>
                <div className="text-sm text-slate-300 mt-1">Sunny & Clear</div>
              </div>
            </div>
            
            <div className="text-right text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-end gap-1">
                <Thermometer className="h-3 w-3" /> Feels like {feelsLike}°
              </div>
              <div className="flex items-center justify-end gap-1">
                <Wind className="h-3 w-3" /> 12 km/h
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center text-sm">
          <div>
            <div className="text-slate-400 mb-2 text-xs">Tomorrow</div>
            <Cloud className="h-5 w-5 mx-auto mb-1 text-slate-300" />
            <div>{temp - 1}°</div>
          </div>
          <div>
            <div className="text-slate-400 mb-2 text-xs">Wed</div>
            <Sun className="h-5 w-5 mx-auto mb-1 text-amber-400" />
            <div>{temp + 2}°</div>
          </div>
          <div>
            <div className="text-slate-400 mb-2 text-xs">Thu</div>
            <CloudLightning className="h-5 w-5 mx-auto mb-1 text-slate-300" />
            <div>{temp - 3}°</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
