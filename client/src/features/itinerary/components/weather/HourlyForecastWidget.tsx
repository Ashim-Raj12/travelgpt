import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"

export const HourlyForecastWidget = ({ hourly }: { hourly: any[] }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Hourly Forecast</h3>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        {hourly.map((hour, index) => {
          const date = new Date(hour.dt * 1000)
          const isNow = index === 0
          
          return (
            <div 
              key={hour.dt} 
              className={`flex flex-col items-center min-w-[80px] p-3 rounded-2xl ${
                isNow ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-muted/50 transition-colors'
              }`}
            >
              <span className="text-sm font-medium mb-2">
                {isNow ? 'Now' : date.toLocaleTimeString([], { hour: 'numeric' })}
              </span>
              <img 
                src={`https://openweathermap.org/img/wn/${hour.weather.icon}.png`} 
                alt={hour.weather.description} 
                className="w-10 h-10 my-1"
              />
              <span className="text-lg font-bold">
                {Math.round(hour.temp)}°
              </span>
              {hour.pop > 0 && (
                <span className="text-[10px] text-blue-400 font-semibold mt-1">
                  {Math.round(hour.pop * 100)}%
                </span>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
