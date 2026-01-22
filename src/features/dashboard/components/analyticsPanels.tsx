// src/components/dashboard/AnalyticsPanels.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Globe } from "lucide-react"

type StatItem = {
  label: string
  value: string
  percent: number
  color: string
}

const inquiries: StatItem[] = [
  { label: "Phone Calls", value: "45.0K", percent: 42, color: "bg-amber-400" },
  { label: "Web Link Clicks", value: "28.0K", percent: 26, color: "bg-yellow-400" },
  { label: "Third Party Platform clicks", value: "12.0K", percent: 11, color: "bg-orange-400" },
  { label: "Directions", value: "8.5K", percent: 8, color: "bg-amber-600" },
]

const engagement: StatItem[] = [
  { label: "Visitors", value: "45.0K", percent: 42, color: "bg-green-500" },
  { label: "Clicks", value: "28.0K", percent: 26, color: "bg-green-400" },
  { label: "Scrolled", value: "52.0K", percent: 50, color: "bg-emerald-500" },
  { label: "Deals Clicked", value: "8.5K", percent: 8, color: "bg-green-600" },
  { label: "Reviews", value: "6.2K", percent: 86, color: "bg-teal-500" },
  { label: "Heart Saved", value: "7.8K", percent: 7, color: "bg-green-700" },
  { label: "Inquiries", value: "7.8K", percent: 7, color: "bg-emerald-600" },
]

const geography: StatItem[] = [
  { label: "Colombia", value: "45.0K", percent: 42, color: " bg-red-600" },
  { label: "United States", value: "28.0K", percent: 26, color: "bg-red-400" },
  { label: "Spain", value: "12.0K", percent: 11, color: "bg-red-600" },
  { label: "Mexico", value: "8.5K", percent: 8, color: "bg-rose-500" },
  { label: "Argentina", value: "6.2K", percent: 6, color: "bg-red-700" },
  { label: "Other", value: "7.8K", percent: 7, color: "bg-gray-400" },
]

function StatBar({ item }: { item: StatItem }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold">{item.label}</span>
        <span className="font-medium">
          {item.value} ({item.percent}%)
        </span>
      </div>
      <Progress value={item.percent} className={`h-2  ${item.color}`}  />
    </div>
  )
}

export function AnalyticsPanels() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Inquiries Analytics */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold">Inquiries vs Analytics</CardTitle>
            <span className="text-xs text-red-600 font-bold cursor-pointer hover:underline">View All</span>
          </div>
          <p className="text-xs text-muted-foreground">All time vs last 30 days</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {inquiries.map((item, i) => (
            <StatBar key={i} item={item} />
          ))}
        </CardContent>
      </Card>

      {/* Engagement */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold">Engagement</CardTitle>
            <span className="text-xs text-red-600 font-bold cursor-pointer hover:underline">View All</span>
          </div>
          <p className="text-xs text-muted-foreground">Latest updates & actions</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {engagement.map((item, i) => (
            <StatBar key={i} item={item} />
          ))}
        </CardContent>
      </Card>

      {/* Audience Geography */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold">Audience Geography</CardTitle>
            <Globe className="h-4 w-4 text-red-600 font-bold" />
          </div>
          <p className="text-xs text-muted-foreground">Where your readers come from</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {geography.map((item, i) => (
            <StatBar key={i} item={item} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}