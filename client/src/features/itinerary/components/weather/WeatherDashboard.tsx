import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CurrentWeatherWidget } from "./CurrentWeatherWidget"
import { HourlyForecastWidget } from "./HourlyForecastWidget"
import { DailyForecastWidget } from "./DailyForecastWidget"
import { WeatherDetailsWidget } from "./WeatherDetailsWidget"
import { RainAlertsWidget } from "./RainAlertsWidget"
import { CloudOff } from "lucide-react"
import { api } from "@/lib/api"

export const WeatherDashboard = ({ lat, lng }: { lat: number, lng: number }) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(false)
        const response = await api.get(`/weather?lat=${lat}&lng=${lng}`)
        setData(response.data.data)
      } catch (err) {
        console.error("Failed to fetch weather:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    
    if (lat && lng) {
      fetchWeather()
    }
  }, [lat, lng])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-64 rounded-xl md:col-span-1" />
        <Skeleton className="h-64 rounded-xl md:col-span-2" />
        <Skeleton className="h-48 rounded-xl md:col-span-3" />
        <Skeleton className="h-96 rounded-xl md:col-span-3" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <Card className="h-64 flex flex-col items-center justify-center text-muted-foreground bg-muted/50">
        <CloudOff className="h-12 w-12 mb-4 opacity-50" />
        <p className="font-medium">Weather Data Unavailable</p>
        <p className="text-sm mt-1">Please ensure your OpenWeather API key is configured.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <RainAlertsWidget alerts={data.alerts} hourly={data.hourly} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Current & Details */}
        <div className="lg:col-span-1 space-y-6">
          <CurrentWeatherWidget current={data.current} />
          <WeatherDetailsWidget current={data.current} />
        </div>
        
        {/* Right Column: Forecasts */}
        <div className="lg:col-span-2 space-y-6">
          <HourlyForecastWidget hourly={data.hourly} />
          <DailyForecastWidget daily={data.daily} />
        </div>
      </div>
    </div>
  )
}
