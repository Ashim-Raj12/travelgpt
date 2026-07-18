import { CheckCircle2, Plane, Download, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const activities = [
  {
    icon: Sparkles,
    title: "Generated Itinerary",
    description: "Tokyo Culinary Tour created by AI",
    time: "2 hours ago",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: CheckCircle2,
    title: "Accommodation Booked",
    description: "The Omnia Hotel, Zermatt",
    time: "Yesterday",
    iconColor: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Download,
    title: "PDF Exported",
    description: "Swiss Alps Itinerary downloaded",
    time: "3 days ago",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Plane,
    title: "Flight Updated",
    description: "LX 803 departure time changed",
    time: "1 week ago",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
]

export const RecentActivityWidget = () => {
  return (
    <Card className="border-border/50 h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="font-semibold text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="space-y-6"
        >
          {activities.map((activity, i) => (
            <motion.div 
              key={i} 
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 }
              }}
              className="flex gap-4 relative"
            >
              {i !== activities.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-border" />
              )}
              <div className={`h-10 w-10 shrink-0 rounded-full ${activity.bgColor} flex items-center justify-center relative z-10`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground/70">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
