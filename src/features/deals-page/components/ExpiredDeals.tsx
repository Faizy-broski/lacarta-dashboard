
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {Copy,RefreshCw} from "lucide-react"

export default function ExpiredDeals() {
  return (
    <div className="my-5">
      <h2 className="font-bold mb-4">
        Expired Deals <span className="text-muted-foreground">(3)</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {["New Year's Eve Gala", "Holiday Spa Retreat", "Christmas Market"].map(
          (title, i) => (
            <Card key={i}>
              <CardContent className="space-y-3">
                <Badge variant="destructive" className="bg-red-100 text-red-600 font-bold rounded-full px-3 py-1">Expired</Badge>
                <p className="font-semibold text-muted-foreground">{title}</p>
                <p className="text-xs font-semibold text-muted-foreground">
                  Ended Dec 31, 2024
                </p>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-green-100 text-green-700 font bold">
                    <RefreshCw className="font-bold" size={38}/>
                    Renew
                  </Button>
                  <Button size="sm" variant="outline" className="flex">
                    <Copy size={38}/>
                    Duplicate
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  )
}
