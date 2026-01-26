import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import img from '/images/shadcn-admin.png'

export default function UpcomingEvents() {
  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="font-bold">Upcoming Events</h2>
        <span className="text-sm text-primary cursor-pointer">View all →</span>
      </div>

      <Card>
        <CardContent className="divide-y">
          {[
            "Jazz Night at Plaza de la Aduana",
            "Contemporary Art Exhibition",
            "Cartagena Street Food Festival"
          ].map((event, i) => (
            <div key={i} className="py-3 flex justify-between">
              <div className="flex gap-4 items-center">
                <div className=" w-25">
                <img className="rounded w-full" src={img}></img>
                </div>
                <div>
                <p className="font-medium">{event}</p>
                <span className="text-xs text-muted-foreground">
                  Jan {8 + i}, 2026
                </span>
                </div>
              </div>
              <Button className="bg-light font-bold text-green-700 listed"><li>Published</li></Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
