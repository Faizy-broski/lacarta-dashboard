// components/dashboard/WishlistOverview.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Heart } from "lucide-react"

const items = [
  {
    title: "10 Things to Do in Cartagena Old Town",
    count: 342,
  },
  {
    title: "Complete Guide to Rosario Islands",
    count: 287,
  },
  {
    title: "Street Food Walking Tour Guide",
    count: 198,
  },
  {
    title: "Sunset Photography Spots in Cartagena",
    count: 156,
  },
]

export function WishlistOverview() {
  return (
    <Card className="my-10">
      <CardHeader>
        <h3 className="font-semibold">Wishlist Overview</h3>
        <p className="text-sm text-muted-foreground">
          Most popular items across all categories
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border p-4 space-y-2 hover:bg-muted/40 transition"
          >
            <p className="text-sm font-medium leading-snug line-clamp-2">
              {item.title}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Heart className="h-3.5 w-3.5" />
              {item.count} saves
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
