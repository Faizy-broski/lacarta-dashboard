// components/dashboard/PendingApprovals.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const approvals = [
  {
    type: "Article",
    title: "Weekend Guide to Bocagrande",
  },
  {
    type: "Comment",
    title: "Great tips for tourists!",
  },
  {
    type: "Listing",
    title: "Villa Carmen – ABR Colonial",
  },
]

export function PendingApprovals() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <h3 className="font-semibold">Pending Approvals</h3>
        <Button variant="ghost" size="sm">
          Review all
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {approvals.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-medium leading-tight">
                {item.title}
              </p>
              <Badge variant="secondary" className="mt-1 text-xs">
                {item.type}
              </Badge>
            </div>

            <Button size="sm" variant="outline">
              Review
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
