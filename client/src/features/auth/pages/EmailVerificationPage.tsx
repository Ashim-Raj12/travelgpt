import { MailOpen, ArrowRight, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthLayout } from "../components/AuthLayout"
import { Link, useSearchParams } from "react-router"
import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"

export const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const hasAttempted = useRef(false);

  useEffect(() => {
    if (token && !hasAttempted.current) {
      hasAttempted.current = true;
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (tokenString: string) => {
    setStatus("loading");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/auth/verify/${tokenString}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Verification failed");
      }
      
      setStatus("success");
      setMessage(result.message);
      toast.success(result.message);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message);
      toast.error(error.message);
    }
  };

  return (
    <AuthLayout 
      title={status === "loading" ? "Verifying..." : status === "success" ? "Email Verified!" : status === "error" ? "Verification Failed" : "Check your inbox"} 
      description={status === "success" ? "Your account is now ready." : "We've sent a verification link to your email address."}
      imageSrc="/images/dest_santorini_1784370051980.png"
    >
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className={`h-20 w-20 rounded-full flex items-center justify-center ${status === "success" ? "bg-green-100" : status === "error" ? "bg-red-100" : "bg-primary/10"}`}>
          {status === "loading" ? <Loader2 className="h-10 w-10 text-primary animate-spin" /> : 
           status === "success" ? <CheckCircle2 className="h-10 w-10 text-green-600" /> :
           status === "error" ? <XCircle className="h-10 w-10 text-red-600" /> :
           <MailOpen className="h-10 w-10 text-primary" />}
        </div>
        
        <p className="text-muted-foreground text-sm">
          {status === "loading" ? "Please wait while we verify your email..." :
           status === "success" ? message :
           status === "error" ? message :
           "Click the link in the email we just sent to verify your account and get started with TravelGPT."}
        </p>

        <div className="w-full space-y-3 pt-4">
          {(status === "error" || status === "idle") && (
            <Link to="/signup" className="w-full block">
              <Button className="w-full" variant="outline">
                Back to Sign Up
              </Button>
            </Link>
          )}
          
          {(status === "success" || status === "idle") && (
            <Link to="/login" className="w-full block">
              <Button className="w-full bg-gradient-to-r from-primary to-blue-600 text-white">
                Continue to Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </AuthLayout>
  )
}
