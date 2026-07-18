import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { Loader2, Upload, Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { AuthLayout } from "../components/AuthLayout"
import { profileCompletionSchema, type ProfileCompletionInput } from "../schemas"

const travelPreferences = [
  { id: "adventure", label: "Adventure & Outdoors" },
  { id: "luxury", label: "Luxury & Comfort" },
  { id: "culture", label: "Culture & History" },
  { id: "food", label: "Food & Culinary" },
  { id: "relaxation", label: "Beach & Relaxation" },
  { id: "city", label: "City Explorations" },
]

export const ProfileCompletionPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<ProfileCompletionInput>({
    resolver: zodResolver(profileCompletionSchema),
    defaultValues: {
      phoneNumber: "",
      preferences: [],
    },
  })

  async function onSubmit(data: ProfileCompletionInput) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    
    toast.success("Profile completed successfully!")
    navigate("/dashboard")
  }

  return (
    <AuthLayout 
      title="Complete your profile" 
      description="Tell us a bit more about yourself to personalize your AI travel experience."
      imageSrc="/images/ui_mockup_bg_1784370062474.png"
    >
      <div className="flex justify-center mb-8">
        <div className="relative h-24 w-24 rounded-full bg-muted border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors group">
          <Camera className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-[10px] text-muted-foreground mt-1">Upload Photo</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferences"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Travel Preferences</FormLabel>
                  <FormDescription>
                    Select the types of experiences you enjoy the most.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {travelPreferences.map((pref) => (
                    <FormField
                      key={pref.id}
                      control={form.control}
                      name="preferences"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={pref.id}
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm cursor-pointer hover:border-primary/50 transition-colors"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(pref.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, pref.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== pref.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              {pref.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full mt-8" size="lg" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Profile
          </Button>
        </form>
      </Form>
    </AuthLayout>
  )
}
