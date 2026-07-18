import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export const CurrentWeatherWidget = ({ current }: { current: any }) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <img 
          src={`https://openweathermap.org/img/wn/${current.weather.icon}@4x.png`} 
          alt="Weather Icon Background" 
          className="w-32 h-32 transform scale-150 translate-x-4 -translate-y-4"
        />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">Current Weather</span>
        </div>
        
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-6xl font-bold tracking-tighter">
            {Math.round(current.temp)}°
          </h2>
          <img 
            src={`https://openweathermap.org/img/wn/${current.weather.icon}@2x.png`} 
            alt={current.weather.description} 
            className="w-16 h-16"
          />
        </div>
        
        <p className="text-xl font-semibold capitalize mb-1">
          {current.weather.description}
        </p>
        <p className="text-sm text-muted-foreground">
          Feels like {Math.round(current.feels_like)}°
        </p>
      </div>
    </Card>
  )
}
