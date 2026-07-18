import { DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export const TravelBudgetWidget = () => {
  const budget = 5000
  const spent = 3250
  const percentage = (spent / budget) * 100

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
          <p className="text-sm text-muted-foreground mb-1">Swiss Alps (Upcoming)</p>
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
            <span className="font-medium">$1,200</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Accommodation</span>
            </div>
            <span className="font-medium">$1,500</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Activities</span>
            </div>
            <span className="font-medium">$550</span>
          </div>
        </div>

        <div className="mt-6 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-3 rounded-lg flex items-start gap-3 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>You are projected to be under budget by $250! Consider booking a premium dinner experience.</p>
        </div>
      </CardContent>
    </Card>
  )
}
