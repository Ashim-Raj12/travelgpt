import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

interface Props {
  data: any
}

export const ItineraryHero = ({ data }: Props) => {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-b-3xl">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full bg-background/50 backdrop-blur-md hover:bg-background/80 border-0"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/80 backdrop-blur text-primary-foreground text-xs font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            AI Generated
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-md">
            {data.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm md:text-base font-medium text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 opacity-80" />
              {data.destination}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 opacity-80" />
              {data.duration} ({data.startDate})
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 opacity-80" />
              {data.travelers}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
