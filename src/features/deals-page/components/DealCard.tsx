
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export default function DealCard({ image, title, name, date, tags, profile }) {
  return (
    <Card className="overflow-hidden gap-0 p-0">
      <div className="relative">
        <img  
          src={image}
          className="h-36 w-full object-cover"
          alt=""
        />
        <Badge className="absolute top-2 right-2 bg-green-50 font-bold text-green-600">
          Active
        </Badge>
        <Badge className="text-bold absolute top-2 left-2 bg-white text-dark">
          Homepage
        </Badge>
      </div>

      <CardContent className="p-4 space-y-2">
        <div className="flex gap-2 items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img src={profile} className="w-full h-full " alt="profile" />
          </div>
          <span className="text-sm font-semibold">{name}</span>
        </div>
        <p className="text-sm font-semibold">{title}</p>

        <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-600">
              {tags}
            </Badge>
        </div>

        <p className="text-xs text-muted-foreground">{date}</p>
        <hr></hr>

        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-2">
            <Button className="border border-yellow-500 text-yellow-500" size="sm" variant="outline">Edit</Button>
            <Button size="sm" variant="ghost">Preview</Button>
          </div>
          <MoreHorizontal size={18} />
        </div>
      </CardContent>
    </Card>
  )
}
