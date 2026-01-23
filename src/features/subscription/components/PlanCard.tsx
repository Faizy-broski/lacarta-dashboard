import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlanCardProps {
  title: string
  price: string
  subtitle?: string
  features: string[]
  active?: boolean
  accent: "gray" | "gold" | "red" | "green"
}

const accentMap = {
  gray: "from-slate-500 to-slate-600",
  gold: "from-yellow-500 to-yellow-600",
  red: "from-red-500 to-red-600",
  green: "from-emerald-500 to-emerald-600",
}

export default function PlanCard({
  title,
  price,
  subtitle,
  features,
  active,
  accent,
}: PlanCardProps) {
  return (
    <Card
      className={cn(
        "relative p-0 overflow-hidden border",
        active && "ring-2 ring-primary shadow-xl"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "px-4 py-3 text-white bg-gradient-to-r",
          accentMap[accent]
        )}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{title}</h3>
          {active && (
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
              Active
            </span>
          )}
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <div>
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-sm text-muted-foreground"> /month</span>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        <hr className="my-2"></hr>
        </div>

        <ul className="space-y-2 text-sm">
          {features.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-2 m-auto flex gap-2">
        <Button variant="outline">
          View
        </Button>
        <Button
          className={cn(
            active ? "bg-emerald-600 hover:bg-emerald-700" : " bg-gradient-to-r from-yellow-500 to-yellow-600 hover:bg-yellow-300"
          )}
        >
          {active ? "Manage" : "Upgrade"}
        </Button>
      </CardFooter>
    </Card>
  )
}
