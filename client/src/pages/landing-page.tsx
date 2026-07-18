import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/features/landing/components/HeroSection"
import { FeaturesSection } from "@/features/landing/components/FeaturesSection"
import { PopularDestinations } from "@/features/landing/components/PopularDestinations"
import { AIPlannerSection } from "@/features/landing/components/AIPlannerSection"
import { TestimonialsSection } from "@/features/landing/components/TestimonialsSection"
import { PricingSection } from "@/features/landing/components/PricingSection"
import { FAQSection } from "@/features/landing/components/FAQSection"
import { LandingFooter } from "@/features/landing/components/LandingFooter"
import { useState } from "react"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              <Button variant="ghost" className="w-full text-lg h-12" asChild onClick={() => setMobileMenuOpen(false)}>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="w-full text-lg h-12 mt-4" asChild onClick={() => setMobileMenuOpen(false)}>
                <Link to="/signup">Get Started</Link>
              </Button>
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
