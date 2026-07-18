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
  const aiBudget = trip.generatedData?.budget;
  
  const budgetStr = typeof trip.budget === 'string' ? trip.budget : trip.budget?.total;
  let totalBudget = 0;
  if (budgetStr === "luxury") totalBudget = 10000;
  else if (budgetStr === "moderate") totalBudget = 5000;
  else if (budgetStr === "budget") totalBudget = 2000;
  else totalBudget = parseInt(budgetStr) || 5000;

  // Use AI breakdown or simulate it
  const flights = aiBudget?.breakdown?.transportation || Math.floor(totalBudget * 0.25);
  const accommodation = aiBudget?.breakdown?.accommodation || Math.floor(totalBudget * 0.40);
  const activities = aiBudget?.breakdown?.activities || Math.floor(totalBudget * 0.20);
  const food = aiBudget?.breakdown?.food || Math.floor(totalBudget * 0.15);

  const estimatedCost = aiBudget?.estimatedTotal || (flights + accommodation + activities + food);
  const percentage = Math.round((estimatedCost / totalBudget) * 100);
  
  const isOverBudget = estimatedCost > totalBudget;
  const difference = Math.abs(totalBudget - estimatedCost);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="font-semibold text-lg flex items-center justify-between">
          Trip Budget Estimate
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-1">{trip.destination} (Upcoming)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${estimatedCost.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/ ${totalBudget.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Estimated ({percentage}%)</span>
            <span>${difference.toLocaleString()} {isOverBudget ? 'over' : 'remaining'}</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Transportation & Flights</span>
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
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Food & Dining</span>
            </div>
            <span className="font-medium">${food.toLocaleString()}</span>
          </div>
        </div>

        <div className={cn("mt-6 border p-3 rounded-lg flex items-start gap-3 text-sm", 
          isOverBudget 
            ? "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400" 
            : "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
        )}>
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            {isOverBudget 
              ? `You are projected to be OVER budget by $${difference.toLocaleString()}! Consider cheaper accommodations.` 
              : `You are projected to be under budget by $${difference.toLocaleString()}! Consider booking a premium dinner experience.`}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
