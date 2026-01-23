import { Badge } from "@/components/ui/badge"

export default function EventCategories() {
  return (
    <div>
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">Event Categories</h3>
        <span className="text-sm text-primary">Manage</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge>Music 24</Badge>
        <Badge>Art 18</Badge>
        <Badge>Food 32</Badge>
        <Badge>Culture 15</Badge>
        <Badge>Festivals 8</Badge>
      </div>
    </div>
  )
}
