import { MapPin, Plus, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface RecentActivityWidgetProps {
  trips: any[]
}

export const RecentActivityWidget = ({ trips }: RecentActivityWidgetProps) => {
  // Generate some recent activity based on the trips
  // In a real app, you'd have a separate Activity feed API
  const activities = trips.slice(0, 3).map((trip, i) => ({
    id: i + 1,
    action: i === 0 ? "Saved" : "Planned",
    target: trip.title,
    time: i === 0 ? "Just now" : `${i + 2} days ago`,
    icon: i === 0 ? Save : Plus,
  }))

  if (activities.length === 0) {
    activities.push({
      id: 999,
      action: "Created",
      target: "Account",
      time: "Recently",
      icon: Plus,
    })
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="font-semibold text-sm flex items-center gap-2">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-start gap-3"
            >
              <div className="bg-primary/10 p-2 rounded-full shrink-0">
                <activity.icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium text-foreground">{activity.action}</span>{" "}
                  <span className="text-muted-foreground">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
