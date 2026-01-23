import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useState } from "react"


const upcoming = [
  { name: "Beach Guide", color: "bg-orange-500" },
  { name: "Restaurant Review", color: "bg-red-500" },
  { name: "Hotel Feature", color: "bg-purple-600" },
  { name: "Local Events", color: "bg-emerald-600" },
]

export default function EventsScheduled() {
  const [date, setDate] = useState<Date | undefined>(new Date(2024, 11, 25)) // December = 11

  return (
  <>
      {/* ====================== CALENDAR CARD ====================== */}
      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Events Scheduled
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="pt-1 pb-6 px-3 sm:px-6">
          {/* Calendar */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
            classNames={{
              head_row: "flex",
              head_cell:
                "text-muted-foreground rounded-md mx-auto  font-medium text-xs",
              row: "flex mt-2",
              cell: cn(
                "relative p-0 text-center text-sm",
                "focus-within:relative focus-within:z-20"
              ),
              day: cn(
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground"
              ),
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
            }}
            components={{
              IconLeft: () => null,
              IconRight: () => null,
            }}
          />
      {/* ====================== UPCOMING TAGS ====================== */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Upcoming</h3>

        <div className="grid grid-cols-5 gap-2">
          {upcoming.map((item) => (
            <Badge
              key={item.name}
              variant="secondary"
              className={cn(
                "px-3 py-1 text-xsm font-medium",
                item.color,
                "text-white hover:opacity-90 transition-opacity"
              )}
            >
              {item.name}
            </Badge>
          ))}
        </div>
      </div>
        </CardContent>
      </Card>

    </>
  )
}