import { useState } from "react"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { Footer } from "./footer"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Map, Plane, Compass, Heart, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { icon: Plane, label: "My Trips", href: "#" },
  { icon: Compass, label: "Explore", href: "#" },
  { icon: Map, label: "Map View", href: "#" },
  { icon: Heart, label: "Saved", href: "#" },
]

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
      
      <Footer />

      <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DrawerContent className="h-[70vh]">
          <div className="mx-auto w-full max-w-sm flex flex-col gap-4 p-4">
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start text-lg h-12"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.label}
                </Button>
              ))}
            </nav>
            <div className="border-t pt-4 mt-auto">
              <Button
                variant="ghost"
                className="w-full justify-start text-lg h-12"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="mr-4 h-6 w-6" />
                Settings
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
