// components/dashboard/ContentCalendar.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export function ContentCalendar() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <h3 className="font-semibold">Content Calendar</h3>
        <span className="text-xs text-muted-foreground">January 2025</span>
      </CardHeader>

      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={new Date()}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  )
}
