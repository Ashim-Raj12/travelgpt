import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/features/landing/components/HeroSection"
import { FeaturesSection } from "@/features/landing/components/FeaturesSection"
import { PopularDestinations } from "@/features/landing/components/PopularDestinations"
import { AIPlannerSection } from "@/features/landing/components/AIPlannerSection"
import { TestimonialsSection } from "@/features/landing/components/TestimonialsSection"
import { PricingSection } from "@/features/landing/components/PricingSection"
import { FAQSection } from "@/features/landing/components/FAQSection"
import { LandingFooter } from "@/features/landing/components/LandingFooter"
import { useState, useEffect } from "react"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/api/auth/me", { 
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => setIsLoggedIn(res.ok))
      .catch(() => setIsLoggedIn(false))
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
      setIsLoggedIn(false)
      toast.success("Logged out successfully")
      navigate("/")
    } catch {
      toast.error("Failed to log out")
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <PopularDestinations />
        <AIPlannerSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>

      <LandingFooter />

      {/* Mobile Navigation Drawer for Landing Page */}
      <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DrawerContent className="h-[50vh]">
          <div className="mx-auto w-full max-w-sm flex flex-col gap-4 p-4 mt-8">
            <nav className="space-y-4">
              <Button variant="ghost" className="w-full text-lg h-12" onClick={() => setMobileMenuOpen(false)}>Features</Button>
              <Button variant="ghost" className="w-full text-lg h-12" onClick={() => setMobileMenuOpen(false)}>Destinations</Button>
              
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="block w-full">
                    <Button variant="ghost" className="w-full text-lg h-12" onClick={() => setMobileMenuOpen(false)}>
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full text-lg h-12 mt-4" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block w-full">
                    <Button variant="ghost" className="w-full text-lg h-12" onClick={() => setMobileMenuOpen(false)}>
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup" className="block w-full">
                    <Button className="w-full text-lg h-12 mt-4" onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
