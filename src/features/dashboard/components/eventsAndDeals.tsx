// src/components/dashboard/EventsAndDeals.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, Clock, Document } from "lucide-react"
import { isSameDay } from "date-fns"
import EventsScheduled from "./calender-sec"

const pendingDeals = [
  {
    title: "Rooftop Bars Guide 2024",
    author: "Sofía Rivera • Article • 2 hours ago",
    status: "Needs Review",
  },
  {
    title: "Interview: Chef María López",
    author: "Juan Pablo Gómez • Article • 5 hours ago",
    status: "Needs Review",
  },
  {
    title: "Walled City Walking Tour",
    author: "Ana García • Travel Tool • 1 day ago",
    status: "Revision Requested",
  },
]

export function EventsAndDeals() {
  const [date, setDate] = useState<Date | undefined>(new Date(2024, 11, 25))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Events Scheduled - Calendar */}
     <EventsScheduled  className="flex flex-col"/>

      {/* Pending Deals – unchanged, looks good */}
      <Card className="flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Pending Deals</CardTitle>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              <Clock className="mr-1 h-3 w-3" /> 3 items awaiting review
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-center  flex-1">
          {pendingDeals.map((deal, i) => (
            <div
              key={i}
              className="flex items-start justify-between bg-gray-100 rounded-md pb-3"
            >
              <div className="flex gap-2 align-items-center">
                <Check className="h-4 w-4" />
                <div>
                <p className="font-medium">{deal.title}</p>
                <p className="text-xs text-muted-foreground">{deal.author}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Badge variant="outline" className="text-green-600 mt-1 text-xs">
                  {deal.status}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-green-600 hover:text-green-700"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="link" className="mt-2 -center px-0 text-green-600">
            View All Pending Items
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}