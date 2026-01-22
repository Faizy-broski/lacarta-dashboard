// src/components/dashboard/QuickActions.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FilePlus, Download, Upload, Calendar, UserPlus, BarChart3 } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="border-none shadow-sm lg:col-span-3">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
        <p className="text-sm font-semibold text-muted-foreground">
          Common tasks at your fingertips
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 border-0 bg-red-500/10 hover:bg-red-500/20 "
          >
            <FilePlus className="h-6 w-6" />
            New Article
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 border-0 bg-green-500/10 hover:bg-green-500/20"
          >
            <Download className="h-6 w-6" />
            Download Report
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 border-0 "
          >
            <Upload className="h-6 w-6" />
            Upload Media
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 border-0  "
          >
            <Calendar className="h-6 w-6" />
            Schedule Post
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 border-0 "
          >
            <UserPlus className="h-6 w-6" />
            Invite User
          </Button>

          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 border-0 "
          >
            <BarChart3 className="h-6 w-6" />
            View Reports
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}