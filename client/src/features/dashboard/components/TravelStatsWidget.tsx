import { Globe, PlaneTakeoff, Map, CalendarHeart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface TravelStatsWidgetProps {
  stats: any
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export const TravelStatsWidget = ({ stats }: TravelStatsWidgetProps) => {
  const dynamicStats = [
    {
      title: "Countries Visited",
      value: stats?.countriesVisited || "0",
      icon: Globe,
      description: "Based on unique destinations",
    },
    {
      title: "Total Trips",
      value: stats?.totalTrips || "0",
      icon: PlaneTakeoff,
      description: `${stats?.upcomingTrips || 0} upcoming`,
    },
    {
      title: "Cities Explored",
      value: stats?.countriesVisited || "0",
      icon: Map,
      description: "Unique cities visited",
    },
    {
      title: "Days Traveled",
      value: stats?.daysTraveled || "0",
      icon: CalendarHeart,
      description: "Total travel duration",
    },
  ]

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {dynamicStats.map((stat, i) => (
        <motion.div 
          key={i} 
          variants={item}
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="border-border/50 shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
