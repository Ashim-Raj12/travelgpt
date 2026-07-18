import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Trophy, Plane } from "lucide-react"

export const ProfileHeader = ({ user }: { user: any }) => {
  const initial = user?.firstName?.[0] || "U"
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Traveler"

  return (
    <Card className="border-border/50 bg-card overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary/80 to-blue-600/80 w-full" />
      <CardContent className="px-6 py-4 relative">
        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 md:-mt-20">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-lg">
            <AvatarImage src="https://i.pravatar.cc/300" alt={fullName} />
            <AvatarFallback className="text-3xl">{initial}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-1 mb-2">
            <h1 className="text-3xl font-bold font-serif tracking-tight">{fullName}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Based in New York, USA
            </p>
            <div className="flex gap-2 pt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trophy className="h-3 w-3 text-amber-500" />
                Level 8 Explorer
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Plane className="h-3 w-3 text-primary" />
                42,000 Miles
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
