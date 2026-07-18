import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Map, Plane, Compass, Heart, Settings, Home, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router"

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Map, label: "Plan Trip", href: "/plan" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Compass, label: "Discover", href: "#" },
  { icon: Heart, label: "Saved Trips", href: "#" },
  { icon: User, label: "Profile", href: "/profile" },
]

export const Sidebar = ({ className, collapsed = false, ...props }: SidebarProps) => {
  const location = useLocation()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 250 }}
      className={cn(
        "hidden md:flex flex-col border-r bg-card text-card-foreground min-h-[calc(100vh-3.5rem)]",
        className
      )}
      {...props}
    >
      <div className="flex-1 py-4">
        <nav className="space-y-2 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Button
                key={item.label}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2 justify-center" : "px-4"
                )}
                asChild
              >
                <Link to={item.href} className="flex items-center">
                  <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            collapsed ? "px-2 justify-center" : "px-4"
          )}
        >
          <Settings className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>Settings</span>}
        </Button>
      </div>
    </motion.aside>
  )
}
