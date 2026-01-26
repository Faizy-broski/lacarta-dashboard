import { Card, CardHeader,CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import img from '../../../../public/images/shadcn-admin.png'

export default function FeaturedEvents() {
  return (
    <div>
      <div className="flex justify-between mb-3">
        <div>
        <h2 className="font-bold">Featured Events</h2>
        <p className="text-sm text-muted-foreground">Drag to reorder homepage placements</p>
        </div>
        <Button className="text-sm text-dark border bg-white">Manage Featured</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <Card key={i} className="p-0 gap-0 overflow-hidden">
            <CardHeader className="p-0">
              <div className="h-30 w-full bg-muted " >
              <img className="w-full h-full bg-muted" src={img} />
              </div>

            </CardHeader>
            <CardContent className="space-y-1 py-3">
              <p className="font-bold">Event Name</p>
              <p className="text-sm text-muted-foreground">Jan 4, 2026</p>
              <hr className="my-2"></hr>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Homepage</span>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
