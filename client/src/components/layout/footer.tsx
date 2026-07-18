import { cn } from "@/lib/utils"

export const Footer = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <footer className={cn("border-t bg-muted/40 py-6 md:py-0", className)} {...props}>
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row text-center md:text-left">
        <p className="text-sm leading-loose text-muted-foreground">
          Built for travelers by {" "}
          <span className="font-semibold text-foreground">
            TravelGPT
          </span>
          . All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:underline underline-offset-4">Terms</a>
          <a href="#" className="hover:underline underline-offset-4">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
