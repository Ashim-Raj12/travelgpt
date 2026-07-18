import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Map, Plane, Compass, Heart, Settings, Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, Menu, Sparkles } from "lucide-react"
import { Link } from "react-router"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { icon: Plane, label: "My Trips", href: "/dashboard" },
  { icon: Compass, label: "Explore", href: "#" },
  { icon: Map, label: "Map View", href: "#" },
  { icon: Heart, label: "Saved", href: "#" },
]

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6 gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight mr-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline-block">TravelGPT</span>
          </Link>

          <div className="flex-1 max-w-md hidden md:flex items-center relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search destinations, itineraries..."
              className="w-full bg-muted/50 border-none pl-9 rounded-full focus-visible:ring-1 focus-visible:ring-primary/50"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80">
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  <div className="text-sm text-muted-foreground p-4 text-center border rounded-lg bg-muted/50">
                    No new notifications
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Avatar className="h-8 w-8 cursor-pointer border border-border">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">SJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
          <Sidebar className="h-full flex-shrink-0 border-r-0" />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DrawerContent className="h-[70vh]">
          <div className="mx-auto w-full max-w-sm flex flex-col gap-4 p-4 mt-4">
            <div className="mb-4 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-muted/50 border-none pl-9 rounded-full"
              />
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start text-base h-12 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="mr-4 h-5 w-5 text-muted-foreground" />
                  {item.label}
                </Button>
              ))}
            </nav>
            <div className="border-t pt-4 mt-auto">
              <Button
                variant="ghost"
                className="w-full justify-start text-base h-12 rounded-xl text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="mr-4 h-5 w-5" />
                Settings
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
