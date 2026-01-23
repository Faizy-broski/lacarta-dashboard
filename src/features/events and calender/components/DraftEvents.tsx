import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DraftEvents() {
  return (
    <div>
      <h3 className="font-semibold mb-3">Drafts & Pending</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {["Coffee Tasting", "Sunset Boat Tour", "Salsa Dancing"].map(
          (title, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-2">
                <p className="font-medium">{title}</p>
                <Badge variant="outline">Needs Review</Badge>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  )
}
