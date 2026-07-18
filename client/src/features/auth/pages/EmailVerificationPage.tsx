import { MailOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthLayout } from "../components/AuthLayout"
import { Link } from "react-router"

export const EmailVerificationPage = () => {
  return (
    <AuthLayout 
      title="Check your inbox" 
      description="We've sent a verification link to your email address."
      imageSrc="/images/dest_santorini_1784370051980.png"
    >
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
          <MailOpen className="h-10 w-10 text-primary" />
        </div>
        
        <p className="text-muted-foreground text-sm">
          Click the link in the email we just sent to verify your account and get started with TravelGPT.
        </p>

        <div className="w-full space-y-3 pt-4">
          <Button className="w-full" variant="outline">
            Resend Verification Email
          </Button>
          <Button className="w-full" asChild>
            <Link to="/login">
              Continue to Login <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
