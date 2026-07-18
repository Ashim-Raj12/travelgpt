import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { LandingPage } from "@/pages/landing-page"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <LandingPage />
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
