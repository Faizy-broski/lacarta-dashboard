// components/dashboard/UsersWishlist.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart } from "lucide-react"

const users = [
  { name: "Carlos Rodriguez", email: "carlos@gmail.com", items: 24 },
  { name: "Maria Santos", email: "maria@gmail.com", items: 18 },
  { name: "John Smith", email: "john@gmail.com", items: 15 },
  { name: "Ana Garcia", email: "ana@gmail.com", items: 12 },
  { name: "Pedro Martinez", email: "pedro@gmail.com", items: 9 },
]

export function UsersWishlist({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex  justify-between">
        <h3 className="font-bold text-lg">Users with Wishlist</h3>
        <Button className="text-xs text-red-500 font-bold border-none bg-background shadow-none">View All</Button>

        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-3 rounded-lg border p-3"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <Heart className="h-4 w-4 text-red-500" />
              {user.items}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
