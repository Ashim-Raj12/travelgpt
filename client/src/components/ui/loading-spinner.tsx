import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface LoadingSpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number
}

export const LoadingSpinner = ({ size = 24, className, ...props }: LoadingSpinnerProps) => {
  return (
    <Loader2 
      size={size} 
      className={cn("animate-spin text-muted-foreground", className)} 
      {...props} 
    />
  )
}
