import { Card, CardContent } from "@/components/ui/card"

export default function Insights() {
  return (
    <div>
      <h3 className="font-semibold mb-3">Insights</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          "Most Viewed",
          "Busiest Day",
          "Next Featured",
          "Engagement"
        ].map((item, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{item}</p>
              <p className="font-semibold mt-1">—</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
