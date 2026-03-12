import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Clock,
  Star,
  MessageSquare,
  BarChart2,
  TrendingUp,
  AlertCircle,
  Eye,
  Filter,
  ChevronDown,
  Search,
} from "lucide-react"


const statCardData = [
    {
        title: "Casa San Agustín",
        ratio : "+15% this week",
        subtitle : "Most Viewed",
        icon : <Eye className="h-4 w-4 text-yellow-600" />
    },
    {
        title: "4.2% avg",
        ratio : "up 0.8%",
        subtitle : "Click-through",
        icon : <TrendingUp className="h-4 w-4 text-yellow-600" />
    },
    {
        title: "3 Deals",
        ratio : "This Week",
        subtitle : "Expiring Soon",
        icon : <Clock className="h-4 w-4 text-yellow-600" />
    },
    {
        title: "Most Viewed",
        ratio : "Above avg",
        subtitle : "8.7%",
        icon : <Star className="h-4 w-4 text-yellow-600" />
    },
]

export default function DealsOverview() {
  return (
    <div className="space-y-4 w-full">
      {/* Top Actions */}
      <div className="flex flex-wrap gap-2">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add New Deal
        </Button>

        <Button variant="outline">
          <Clock className="h-4 w-4 mr-2" />
          Review Expiring
          <Badge className="ml-2 bg-red-500 text-white">3</Badge>
        </Button>

        <Button variant="outline">
          <Star className="h-4 w-4 mr-2" />
          Feature a Deal
        </Button>

        <Button variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" />
          Contact Partner
        </Button>

        <Button variant="outline">
          <BarChart2 className="h-4 w-4 mr-2" />
          View Performance
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {statCardData.map((item)=>(

            <Card className="bg-yellow-50 border-yellow-200 p-0">
          <CardContent className="flex items-center justify-between p-2">
            <div className="flex gap-2 items-center">
              {item.icon}
              <div>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                <p className="text-xs font-bold">{item.title}</p>
              </div>
            </div>
            <div>
            <p className="text-xs font-semibold text-yellow-600 mt-2">
              {item.ratio}
            </p>
            </div>
          </CardContent>
        </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative  flex-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals by name or brand..."
            className="pl-9"
          />
        </div>

        {[
          "All Status",
          "All Categories",
          "All Visibility",
          "Newest",
        ].map((item) => (
          <Button
            key={item}
            variant="outline"
            className="justify-between flex-1"
          >
            {item}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        ))}

        <Button variant="outline" className="flex-1">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  )
}
