import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function FeaturedEvents() {
  return (
    <div>
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">Featured Events</h3>
        <span className="text-sm text-primary">Manage Featured</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <Card key={i}>
            <CardContent className="space-y-1">
              <div className="h-28 bg-muted rounded-md" />
              <p className="font-medium">Event Name</p>
              <p className="text-sm text-muted-foreground">Jan 4, 2026</p>
              <hr></hr>
              <div className="flex justify-between items-center">
                <span className="text-xs">Homepage</span>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
