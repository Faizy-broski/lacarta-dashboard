// components/dashboard/RecentActivity.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FileText, UserPlus, MessageSquare, Image, DollarSign } from "lucide-react"

const activities = [
  {
    icon: FileText,
    text: "New article published",
    meta: "Hidden Gems of Getsemaní",
    time: "2 minutes ago",
  },
  {
    icon: UserPlus,
    text: "New contributor joined",
    meta: "Carlos Méndez",
    time: "15 minutes ago",
  },
  {
    icon: MessageSquare,
    text: "Comment pending review",
    meta: "Beach Safety Tips",
    time: "1 hour ago",
  },
  {
    icon: Image,
    text: "Gallery uploaded",
    meta: "Sunset at Rosario Islands",
    time: "2 hours ago",
  },
  {
    icon: DollarSign,
    text: "Campaign payment received",
    meta: "$450 from TravelCo",
    time: "3 hours ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Recent Activity</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div key={index} className="flex gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex-1">
                <p className="text-sm leading-tight">{activity.text}</p>
                <p className="text-xs text-muted-foreground">{activity.meta}</p>
              </div>

              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
