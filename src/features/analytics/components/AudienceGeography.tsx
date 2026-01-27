// components/dashboard/AudienceGeography.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const countries = [
  { name: "Colombia", value: 42 },
  { name: "United States", value: 28 },
  { name: "Spain", value: 12 },
  { name: "Mexico", value: 8 },
  { name: "Argentina", value: 6 },
  { name: "Other", value: 4 },
]

export function AudienceGeography() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Audience Geography</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        {countries.map((country) => (
          <div key={country.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{country.name}</span>
              <span className="text-muted-foreground">{country.value}%</span>
            </div>
            <Progress value={country.value} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
