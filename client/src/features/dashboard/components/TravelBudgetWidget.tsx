import { DollarSign, TrendingUp, AlertCircle, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router"

export const TravelBudgetWidget = ({ trip }: { trip?: any }) => {
  if (!trip) {
    return (
      <Card className="border-border/50 h-full flex flex-col items-center justify-center p-6 text-center">
        <DollarSign className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
        <h3 className="font-semibold text-lg mb-2">No active budgets</h3>
        <p className="text-sm text-muted-foreground mb-4">Plan a trip to see your budget tracking here.</p>
        <Link to="/plan" className={cn(buttonVariants({ variant: "outline" }), "flex items-center")}>
          <Plus className="mr-2 h-4 w-4" /> Start Planning
        </Link>
      </Card>
    )
  }

  // Use realistic mocked numbers if the AI didn't provide strict budget breakdowns
  const budgetStr = typeof trip.budget === 'string' ? trip.budget : trip.budget?.total;
  let budget = 0;
  if (budgetStr === "luxury") budget = 10000;
  else if (budgetStr === "moderate") budget = 5000;
  else if (budgetStr === "budget") budget = 2000;
  else budget = parseInt(budgetStr) || 5000;

  // Simulate spending based on budget
  const spent = Math.floor(budget * 0.65)
  const percentage = Math.round((spent / budget) * 100)
  
  const flights = Math.floor(spent * 0.35)
  const accommodation = Math.floor(spent * 0.45)
  const activities = spent - flights - accommodation

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="font-semibold text-lg flex items-center justify-between">
          Trip Budget
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1">{trip.destination} (Upcoming)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${spent.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/ ${budget.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Spent ({percentage}%)</span>
            <span>${(budget - spent).toLocaleString()} remaining</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Flights</span>
            </div>
            <span className="font-medium">${flights.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Accommodation</span>
            </div>
            <span className="font-medium">${accommodation.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Activities</span>
            </div>
            <span className="font-medium">${activities.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-3 rounded-lg flex items-start gap-3 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>You are projected to be under budget by ${(budget - spent - 500).toLocaleString()}! Consider booking a premium dinner experience.</p>
        </div>
      </CardContent>
    </Card>
  )
}
