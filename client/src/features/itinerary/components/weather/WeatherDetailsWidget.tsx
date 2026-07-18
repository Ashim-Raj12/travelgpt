import { Card } from "@/components/ui/card"
import { Droplets, Wind, Sun, Wind as AirIcon } from "lucide-react"

export const WeatherDetailsWidget = ({ current }: { current: any }) => {
  const getUvRisk = (uvi: number) => {
    if (uvi < 3) return { text: "Low", color: "text-green-500" }
    if (uvi < 6) return { text: "Moderate", color: "text-yellow-500" }
    if (uvi < 8) return { text: "High", color: "text-orange-500" }
    if (uvi < 11) return { text: "Very High", color: "text-red-500" }
    return { text: "Extreme", color: "text-purple-500" }
  }

  const uvStatus = getUvRisk(current.uvi)

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Humidity */}
      <Card className="p-4 flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Droplets className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Humidity</span>
        </div>
        <div>
          <div className="text-3xl font-bold">{current.humidity}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            {current.humidity > 60 ? "Feeling humid" : "Comfortable"}
          </p>
        </div>
      </Card>

      {/* Wind */}
      <Card className="p-4 flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Wind className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Wind</span>
        </div>
        <div>
          <div className="text-3xl font-bold">{Math.round(current.wind_speed)}</div>
          <p className="text-xs text-muted-foreground mt-1">m/s speed</p>
        </div>
      </Card>

      {/* UV Index */}
      <Card className="p-4 flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Sun className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">UV Index</span>
        </div>
        <div>
          <div className="text-3xl font-bold">{current.uvi}</div>
          <p className={`text-xs font-medium mt-1 ${uvStatus.color}`}>
            {uvStatus.text} Risk
          </p>
        </div>
      </Card>

      {/* Air Quality (AQI) */}
      <Card className="p-4 flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <AirIcon className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Air Quality</span>
        </div>
        <div>
          <div className="text-3xl font-bold">{current.aqi.value}</div>
          <p className="text-xs font-medium mt-1 capitalize text-primary">
            {current.aqi.description}
          </p>
        </div>
      </Card>
    </div>
  )
}
