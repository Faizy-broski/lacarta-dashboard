import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CalendarView() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">January 2026</h2>
          <div className="flex gap-2">
            <Badge>Month</Badge>
            <Badge variant="outline">Week</Badge>
            <Badge variant="outline">List</Badge>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-3 text-sm">
          {Array.from({ length: 31 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-md border p-1 relative"
            >
              <span className="text-xs text-muted-foreground">
                {i + 1}
              </span>

              {i === 7 && (
                <Badge className="absolute bottom-1 left-1 bg-purple-500">
                  Jazz Night
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
