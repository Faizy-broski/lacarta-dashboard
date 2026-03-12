import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Star ,Eye, Badge} from "lucide-react"

export default function FeaturedDeals() {
  return (
    <div className="my-5">
      <h2 className="font-bold mb-4">
        Featured Deals
        <span className="text-xs text-muted-foreground ml-2">
          Homepage placement
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {["1", "2", "3", "4"].map((i) => (
          <Card className="p-0">
            <CardContent className="flex items-center gap-4">
              <div className="w-30 h-30 relative">

              <img
                src="https://picsum.photos/200/120"
                className="w-full h-full  object-cover"
              />
              <Badge className="bg-yellow-500 text-white font-bold rounded-full p-1 absolute top-2 left-2">{i}</Badge>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star size={14} className="text-yellow-500" />
                 <p className="text-xs text-yellow-500 font-bold"> Featured Deal</p>
                </div>
                <p className="text-medium font-bold">Private City Tour</p>
                <p className="text-sm text-muted-foreground">Casa San Agustin</p>
                <div className="flex justify-between">
                <span className="flex text-muted-foreground gap-3 items-center"><Eye size={13}/><p className="text-xs text-muted-foreground">Preview Placement</p></span>
               <div className="flex gap-2 items-center">
              <span className="text-xs font-semibold text-muted-foreground">Featured</span>
              <Switch defaultChecked />
              </div>
              </div>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
