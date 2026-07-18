import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { AuthLayout } from "../components/AuthLayout"
import { forgotPasswordSchema, type ForgotPasswordInput } from "../schemas"

export const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(data: ForgotPasswordInput) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSent(true)
    toast.success("Reset link sent to your email.")
  }

  return (
    <AuthLayout 
      title={isSent ? "Check your email" : "Forgot Password?"} 
      description={isSent ? "We've sent a password reset link to your email." : "No worries, we'll send you reset instructions."}
      imageSrc="/images/dest_tokyo_1784370032130.png"
    >
      {!isSent ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reset Password
            </Button>
          </form>
        </Form>
      ) : (
        <Button onClick={() => setIsSent(false)} variant="outline" className="w-full">
          Didn't receive the email? Click to resend
        </Button>
      )}
      
      <div className="mt-8 text-center text-sm">
        <Link to="/login" className="font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to log in
        </Link>
      </div>
    </AuthLayout>
  )
}
