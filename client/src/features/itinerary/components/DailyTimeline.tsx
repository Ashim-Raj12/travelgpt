import { MapPin, Train, Coffee, Hotel, Camera, Compass } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface Props {
  timeline: any[]
}

const getIconForType = (type: string) => {
  switch (type) {
    case "transport": return <Train className="h-5 w-5" />
    case "food": return <Coffee className="h-5 w-5" />
    case "hotel": return <Hotel className="h-5 w-5" />
    case "activity": return <Camera className="h-5 w-5" />
    default: return <Compass className="h-5 w-5" />
  }
}

const getColorForType = (type: string) => {
  switch (type) {
    case "transport": return "bg-blue-500 text-white"
    case "food": return "bg-orange-500 text-white"
    case "hotel": return "bg-purple-500 text-white"
    case "activity": return "bg-primary text-primary-foreground"
    default: return "bg-gray-500 text-white"
  }
}

export const DailyTimeline = ({ timeline }: Props) => {
  return (
    <div className="space-y-12">
      {timeline.map((day, dayIdx) => (
        <div key={day.day || day.dayNumber || dayIdx} className="relative">
          {/* Day Header */}
          <div className="sticky top-16 z-20 bg-background/95 backdrop-blur py-4 mb-6 border-b">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-lg">
                Day {day.day || day.dayNumber || (dayIdx + 1)}
              </span>
              {day.title || day.theme}
            </h3>
            {day.date && <p className="text-muted-foreground mt-1 text-sm font-medium">{day.date}</p>}
          </div>

          {/* Timeline */}
          <div className="relative mt-8 space-y-4 md:space-y-6">

            {day.activities.map((activity: any, actIdx: number) => (
              <motion.div 
                key={actIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: actIdx * 0.1 }}
                className="relative flex items-start gap-3 md:gap-6"
              >
                {/* Time Indicator */}
                <div className="w-14 md:w-20 pt-1.5 text-right shrink-0">
                  <span className="text-xs md:text-sm font-bold text-muted-foreground">{activity.time}</span>
                </div>

                {/* Icon Node & Vertical Line */}
                <div className="relative flex flex-col items-center shrink-0">
                  {/* The vertical line connecting to the next item */}
                  {actIdx !== day.activities.length - 1 && (
                    <div className="absolute top-8 bottom-[-2rem] w-px bg-border" />
                  )}
                  
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${getColorForType(activity.type)}`}>
                    {getIconForType(activity.type)}
                  </div>
                </div>

                {/* Content Card */}
                <Card className="flex-1 border-border/50 shadow-sm hover:shadow-md transition-shadow mb-4">
                  <CardContent className="p-4 md:p-5">
                    <h4 className="font-semibold text-lg mb-2">{activity.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 inline-flex px-2.5 py-1.5 rounded-md">
                      <MapPin className="h-3.5 w-3.5" />
                      {activity.location}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
