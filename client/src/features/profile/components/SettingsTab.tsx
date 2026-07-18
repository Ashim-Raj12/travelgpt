import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Camera, Save } from "lucide-react"
import { toast } from "react-hot-toast"

export const SettingsTab = ({ user }: { user: any }) => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Profile settings updated successfully!")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-border/50">
        <form onSubmit={handleSave}>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your personal information and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Avatar Upload */}
            <div className="flex flex-col gap-3">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full border-4 border-muted flex items-center justify-center bg-muted/50 overflow-hidden relative group cursor-pointer">
                  <img src="https://i.pravatar.cc/300" alt="Current Avatar" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={user?.firstName || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue={user?.lastName || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user?.email || ""} disabled className="bg-muted/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="homeAirport">Home Airport</Label>
                <Input id="homeAirport" defaultValue="JFK (New York)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Preferred Currency</Label>
                <Input id="currency" defaultValue="USD ($)" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Travel Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell others about your travel style..." 
                className="resize-none" 
                rows={4}
                defaultValue="Avid traveler and amateur photographer. I love exploring hidden gems and trying local street food across the globe."
              />
            </div>
            
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-6 bg-muted/20">
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
