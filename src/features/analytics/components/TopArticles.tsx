// components/dashboard/TopArticles.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, MessageCircle } from "lucide-react"

const articles = [
  {
    title: "Best Beaches in Cartagena for 2024",
    category: "Travel",
    views: "12.4k",
    likes: 982,
    comments: 134,
  },
  {
    title: "Top 10 Restaurants in the Walled City",
    category: "Gastronomy",
    views: "9.8k",
    likes: 654,
    comments: 89,
  },
  {
    title: "Luxury Hotels with Ocean Views",
    category: "Hotels",
    views: "8.2k",
    likes: 521,
    comments: 67,
  },
  {
    title: "Colonial Houses for Rent: Monthly Guide",
    category: "Real Estate",
    views: "7.1k",
    likes: 445,
    comments: 53,
  },
]

export function TopArticles({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="font-semibold">Top Performing Articles</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="flex items-start justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
          >
            <div className="space-y-1">
              <p className="font-medium leading-tight">{article.title}</p>
              <Badge variant="secondary" className="text-xs">
                {article.category}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {article.views}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                {article.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                {article.comments}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
