import { Card } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export const DailyForecastWidget = ({ daily }: { daily: any[] }) => {
  // Find absolute min and max across the week for relative progress bars
  const minOfWeek = Math.min(...daily.map(d => d.temp.min))
  const maxOfWeek = Math.max(...daily.map(d => d.temp.max))
  const tempRange = maxOfWeek - minOfWeek || 1

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalendarDays className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">7-Day Forecast</h3>
      </div>
      
      <div className="space-y-4">
        {daily.slice(0, 7).map((day, index) => {
          const date = new Date(day.dt * 1000)
          const isToday = index === 0
          
          const dayName = isToday 
            ? 'Today' 
            : date.toLocaleDateString('en-US', { weekday: 'short' })
            
          // Calculate percentages for the gradient bar
          const minPercent = ((day.temp.min - minOfWeek) / tempRange) * 100
          const maxPercent = ((day.temp.max - minOfWeek) / tempRange) * 100
          const barWidth = maxPercent - minPercent
          
          return (
            <div key={day.dt} className="flex items-center justify-between gap-4">
              <span className="w-12 font-medium text-sm">{dayName}</span>
              
              <div className="flex items-center justify-center w-12 shrink-0 relative">
                <img 
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`} 
                  alt={day.weather.description} 
                  className="w-8 h-8"
                />
                {day.pop >= 0.2 && (
                  <span className="absolute -right-2 top-0 text-[10px] text-blue-400 font-bold">
                    {Math.round(day.pop * 100)}%
                  </span>
                )}
              </div>
              
              <span className="w-8 text-right font-semibold text-sm opacity-70">
                {Math.round(day.temp.min)}°
              </span>
              
              <div className="flex-1 h-2 bg-muted rounded-full relative overflow-hidden">
                <div 
                  className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 via-primary to-orange-400 opacity-80"
                  style={{
                    left: `${minPercent}%`,
                    width: `${Math.max(barWidth, 5)}%` // Ensure at least a small dot
                  }}
                />
              </div>
              
              <span className="w-8 font-semibold text-sm">
                {Math.round(day.temp.max)}°
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
