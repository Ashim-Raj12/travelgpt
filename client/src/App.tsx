import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/layout/app-layout"
import { EmptyState } from "@/components/ui/empty-state"
import { Plane } from "lucide-react"
import { Button } from "@/components/ui/button"

import { TooltipProvider } from "@/components/ui/tooltip"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <AppLayout>
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome to your AI Travel Planner design system preview.
            </p>
          </div>
          
          <EmptyState
            icon={<Plane className="h-10 w-10 text-primary" />}
            title="No trips planned yet"
            description="Start building your dream itinerary with AI. Your upcoming trips will appear here."
            action={<Button>Create New Trip</Button>}
          />
        </div>
      </AppLayout>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
