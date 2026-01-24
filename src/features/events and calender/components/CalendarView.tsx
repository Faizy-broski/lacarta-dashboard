import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function CalendarView() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">January 2026</h2>

          <div className="flex gap-2">
            <Badge>Month</Badge>
            <Badge variant="outline">Week</Badge>
            <Badge variant="outline">List</Badge>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 text-sm">
          {Array.from({ length: 31 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-md border p-2 relative flex flex-col"
            >
              <span className="text-xs text-muted-foreground">
                {i + 1}
              </span>

              {/* Event with bullet inside button */}
              {i === 7 && (
                <Button
                  size="sm"
                  className="absolute bottom-1 left-1 right-1 h-6 px-2 text-xs flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  <span className="w-2 h-2 rounded-full bg-white" />
                  Jazz Night
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
