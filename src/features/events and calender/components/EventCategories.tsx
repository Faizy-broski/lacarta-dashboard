import { Badge } from "@/components/ui/badge"
import {Music,Palette,PartyPopper,Church,UtensilsCrossed} from 'lucide-react'

export default function EventCategories() {
  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="font-bold">Event Categories</h2>
        <span className="text-sm text-primary">Manage</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge className="px-4 font-bold flex justify-between py-2 bg-purple-100 text-purple-600 border border-purple-600 rounded-full items-center"><div className="flex gap-2 items-center"><Music size={13}/> Music </div><span className="rounded-full bg-white text-purple-600 py-1 px-2">24</span></Badge>
        <Badge className="px-4 font-bold flex justify-between py-2 bg-blue-100 text-blue-600 border border-blue-600 rounded-full items-center"><div className="flex gap-2 items-center"><Palette size={13}/> Art </div><span className="rounded-full bg-white text-blue-600 py-1 px-2">18</span></Badge>
        <Badge className="px-4 font-bold flex justify-between py-2 bg-green-100 text-green-600 border border-green-600 rounded-full items-center"><div className="flex gap-2 items-center"><UtensilsCrossed size={13}/> Food </div><span className="rounded-full bg-white text-green-600 py-1 px-2">32</span></Badge>
        <Badge className="px-4 font-bold flex justify-between py-2 bg-yellow-100 text-yellow-600 border border-yellow-600 rounded-full items-center"><div className="flex gap-2 items-center"><Church size={13}/> Culture </div><span className="rounded-full bg-white text-yellow-600 py-1 px-2">15</span></Badge>
        <Badge className="px-4 font-bold flex justify-between py-2 bg-red-100 text-red-600 border border-red-600 rounded-full items-center"><div className="flex gap-2 items-center"><PartyPopper size={13}/> Festivals </div><span className="rounded-full bg-white text-red-600 py-1 px-2">8</span></Badge>
      </div>
    </div>
  )
}
