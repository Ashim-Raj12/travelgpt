import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { AuthLayout } from "../components/AuthLayout"
import { otpSchema, type OtpInput } from "../schemas"

export const OTPVerificationPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: { pin: "" },
  })

  async function onSubmit(data: OtpInput) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    
    if (data.pin === "123456") {
      toast.success("Verification successful!")
      navigate("/dashboard")
    } else {
      toast.error("Invalid OTP code. Try 123456.")
    }
  }

  return (
    <AuthLayout 
      title="Verify your account" 
      description="We have sent a verification code to your email or phone."
      imageSrc="/images/hero_bg_1784370008936.png"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="text-center w-full">
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <div className="flex justify-center w-full">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormDescription>
                  Please enter the 6-digit code sent to you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Code
          </Button>
        </form>
      </Form>
      
      <div className="mt-8 text-center text-sm">
        <span className="text-muted-foreground">Didn't receive a code?</span>{" "}
        <button onClick={() => toast.success("Code resent!")} className="font-semibold text-primary hover:underline">
          Resend
        </button>
      </div>
    </AuthLayout>
  )
}
