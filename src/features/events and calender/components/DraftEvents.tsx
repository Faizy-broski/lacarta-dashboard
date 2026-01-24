import { Card, CardContent ,CardFooter} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {NotebookPen} from 'lucide-react'
import img from '../../../../public/images/shadcn-admin.png'

export default function DraftEvents() {
  return (
    <div>
      <h2 className="font-bold mb-3">Drafts & Pending</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {["Coffee Tasting", "Sunset Boat Tour", "Salsa Dancing"].map(
          (title, i) => (
            <Card key={i} className="gap-0 py-3">
              <CardContent className="py-0 space-y-2">
                <div className="flex gap-2 items-center">
                  <NotebookPen size={18} className="bg-yellow-100 text-yellow-500"/>
                <p className="font-medium">{title}</p>
                </div>
                <div className="flex gap-2 mb-2 items-center">
                <div className="flex w-10 h-10 rounded-full overflow-hidden gap-2 rounded-full overflow-hidden mb-2">
               <img src={img} className="w-full h-full"></img>
               </div>
                <p className="text-sm text-muted-foreground">created by maria Garcia</p>
                </div>
              <hr className="py-2"></hr>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-2">
                                <span className="text-xs text-muted-foreground">Homepage</span>
                                <Badge variant="outline">Needs Review</Badge>
                  </div>
                                <Button className="text-sm bg-white text-yellow-500 shadow-none">Continue</Button>
                              </div>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  )
}
