import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

const items = [
  "Require email verification",
  "Allow package switching",
  "Auto-downgrade on expiry",
]

export default function AccessControl() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Access Control Settings</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {items.map((item) => (
            <div className="flex justify-between bg-gray-100 p-3">
            <span className="text-sm">{item}</span>
            <Switch className="bg-danger"/>
            </div>
        ))}
        </div>
      </CardContent>
    </Card>
  )
}
