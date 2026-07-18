import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Wallet, CloudSun, Phone, AlertCircle, PhoneCall, Stethoscope, MapPin } from "lucide-react"

import { InteractiveMap } from "./InteractiveMap"

export const ItinerarySidebar = ({ data, markers }: { data: any, markers?: any[] }) => {
  return (
    <div className="space-y-6">
      {/* Mini Interactive Map */}
      <Card className="overflow-hidden border-border/50">
        <div className="h-[200px] relative">
          {markers && markers.length > 0 ? (
            <InteractiveMap markers={markers} />
          ) : (
            <div className="h-full bg-muted flex flex-col items-center justify-center text-muted-foreground">
              <MapPin className="h-8 w-8 mb-2 text-primary" />
              <span className="font-medium text-sm">No Location Data</span>
            </div>
          )}
        </div>
      </Card>

      {/* Weather Forecast */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CloudSun className="h-4 w-4 text-primary" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
            <div>
              <p className="text-2xl font-bold">-2°C</p>
              <p className="text-xs text-muted-foreground">Snow Showers</p>
            </div>
            <CloudSun className="h-8 w-8 text-blue-400" />
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Expect heavy snowfall during your trip. Dress warmly!
          </p>
        </CardContent>
      </Card>

      {/* Budget Summary */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            Budget Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-3xl font-bold text-center mb-2">
            ${data.budget.total.toLocaleString()}
          </div>
          <div className="space-y-2">
            {data.budget.breakdown.map((item: any, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.category}</span>
                <span className="font-medium">${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Packing List */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            Packing List
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.packingList.map((cat: any, i: number) => (
            <div key={i}>
              <h4 className="text-sm font-semibold mb-2 text-muted-foreground">{cat.category}</h4>
              <div className="space-y-2">
                {cat.items.map((item: string, j: number) => (
                  <div key={j} className="flex items-start space-x-2">
                    <Checkbox id={`pack-${i}-${j}`} className="mt-0.5" />
                    <label 
                      htmlFor={`pack-${i}-${j}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="border-border/50 border-red-500/20 bg-red-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-red-500">
            <Phone className="h-4 w-4" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-2"><AlertCircle className="h-3 w-3" /> Police</span>
            <Badge variant="outline" className="font-mono bg-background">{data.emergency.police}</Badge>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-2"><PhoneCall className="h-3 w-3" /> Ambulance</span>
            <Badge variant="outline" className="font-mono bg-background">{data.emergency.ambulance}</Badge>
          </div>
          <div className="pt-2 border-t border-red-500/10">
            <span className="text-xs text-muted-foreground flex items-center gap-2 mb-1"><Stethoscope className="h-3 w-3" /> Nearest Hospital</span>
            <p className="text-sm font-medium">{data.emergency.hospital}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{data.emergency.hospitalPhone}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
