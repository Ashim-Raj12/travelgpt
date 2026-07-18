import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, Sparkles } from "lucide-react"
import { Link } from "react-router"

export const Navbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {onMenuClick && (
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight">
            <Sparkles className="h-6 w-6 text-primary" />
            TravelGPT
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
          <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Destinations</Link>
          <Link to="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
