import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Map, Plane, Compass, Heart, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}

const navItems = [
  { icon: Plane, label: "My Trips", href: "#" },
  { icon: Compass, label: "Explore", href: "#" },
  { icon: Map, label: "Map View", href: "#" },
  { icon: Heart, label: "Saved", href: "#" },
]

export const Sidebar = ({ className, collapsed = false, ...props }: SidebarProps) => {
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
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                collapsed ? "px-2 justify-center" : "px-4"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
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
