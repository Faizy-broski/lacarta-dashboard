import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {Camera} from "lucide-react"

export default function PartnerSnapshot() {
  return (
    <Card className="w-full p-0">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold">
              <Camera size={45}/>
            </div>

            <div>
              <h3 className="font-bold text-base">Partner Snapshot</h3>
              <p className="text-sm text-muted-foreground">
                6 partners · 13 active deals
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full sm:w-auto border-yellow-300 text-yellow-600 hover:bg-yellow-50"
          >
            Manage Partners →
          </Button>
        </div>

        {/* Top Partners */}
        <div className="mt-6">
          <p className="text-sm font-bold mb-3 text-muted-foreground">Top Partners</p>

          <div className="flex flex-wrap lg:grid lg:grid-cols-6 gap-2">
            {[
              { name: "Casa San Agustín", count: 3 },
              { name: "La Vitrola", count: 2 },
              { name: "Cartagena Tours", count: 4 },
              { name: "Caribbean Yachts", count: 2 },
              { name: "Café del Mar", count: 1 },
            ].map((partner, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-1.5 rounded border bg-background shadow"
              >
                <span className="h-6 w-6 rounded-full bg-yellow-100 text-yellow-700 text-xs flex items-center justify-center font-medium">
                  {partner.name.charAt(0)}
                </span>

                <p className="text-xs font-medium">
                  {partner.name}
                </p>

                <Badge variant="secondary" className="text-xs">
                  {partner.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-6">
          <p className="text-sm font-bold mb-3 text-muted-foreground">Partner Categories</p>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-yellow-100 text-yellow-700 font-bold hover:bg-yellow-200">
              Hotels
            </Badge>
            <Badge className="bg-green-100 text-green-700 font-bold hover:bg-green-200">
              Food
            </Badge>
            <Badge className="bg-red-100 text-red-700 font-bold hover:bg-red-200">
              Tours
            </Badge>
            <Badge className="bg-orange-100 text-orange-700 font-bold hover:bg-orange-200">
              Culture
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
