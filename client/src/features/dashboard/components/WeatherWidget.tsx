import { CloudRain, Sun, Cloud, Thermometer, Wind } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const WeatherWidget = () => {
  return (
    <Card className="border-border/50 bg-gradient-to-br from-blue-500/10 to-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="font-semibold text-lg flex items-center justify-between">
          Destination Weather
          <CloudRain className="h-4 w-4 text-blue-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium mb-4">Zermatt, Switzerland</p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Cloud className="h-12 w-12 text-blue-400" />
            <div>
              <div className="text-4xl font-bold">-2°</div>
              <p className="text-sm text-muted-foreground">Snow Showers</p>
            </div>
          </div>
          
          <div className="space-y-2 text-xs text-muted-foreground text-right">
            <div className="flex items-center justify-end gap-2">
              <Thermometer className="h-3 w-3" /> Feels like -6°
            </div>
            <div className="flex items-center justify-end gap-2">
              <Wind className="h-3 w-3" /> 14 km/h
            </div>
          </div>
        </div>

        <Separator className="mb-4 bg-blue-500/10" />

        <div className="flex justify-between">
          {/* 3-day forecast */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">Tomorrow</span>
            <CloudRain className="h-5 w-5 text-blue-400 my-1" />
            <span className="text-sm font-medium">-1°</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">Wed</span>
            <Sun className="h-5 w-5 text-amber-400 my-1" />
            <span className="text-sm font-medium">1°</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">Thu</span>
            <Sun className="h-5 w-5 text-amber-400 my-1" />
            <span className="text-sm font-medium">3°</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
