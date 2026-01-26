
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function ScheduledDeals() {
  return (
    <div className="my-5">
      <h2 className="font-bold mb-4">
        Scheduled Deals <span className="text-muted-foreground">(3)</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {["Carnaval Special", "Valentine Rooftop Dinner", "Spring Break"].map(
          (title, i) => (
            <Card key={i} className="p-2">
              <CardContent className=" space-y-2">
                <div className="flex justify-between">
                <Badge className="bg-green-100 rounded-full text-green-700 p-2 font-bold">
                  Scheduled
                </Badge>
                <Badge className="font-bold bg-white">
                   <Switch></Switch>
                   <span className="text-yellow-600">Auto Publish</span>
                   
                </Badge>
                </div>
                <h2 className="font-bold text-sm">{title}</h2>
                <p className="text-sm font-semibold text-muted-foreground">{title}</p>
                <div className="flex gap-2 items-center">
                <Calendar size={18} />
                <p className="text-sm font-semibold text-muted-foreground">
                   Starts Feb 10, 2025
                </p>
                </div>
                <hr></hr>
                <Button variant="outline" size="sm" className="w-full border border-yellow-600 font-bold text-yellow-600">
                  Edit Schedule
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  )
}