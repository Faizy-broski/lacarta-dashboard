import { Card, CardContent } from "@/components/ui/card"
import {Eye,TrendingUp,Calendar} from 'lucide-react'

export default function Insights() {
  return (
    <div>
      <div className="flex gap-2 items-center">
      <h2 className="font-bold mb-3">Insights</h2>
      <div className="text-black"><hr className="text-black"></hr></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
           title: "Most Viewed",
           subTitle:"Jazz Night at Plaz",
           icon:<Eye size={35} className="p-2 bg-yellow-50 rounded text-yellow-500 font-bold"/>
          },
          {
           title: "Business Day",
           subTitle:"Saturday, Jan 2",
           icon:<Calendar size={35} className="p-2 bg-green-50 rounded text-green-500 font-bold"/>
          },
          {
           title: "Next Featured",
           subTitle:"Food Festival",
           icon:<TrendingUp size={35} className="p-2 bg-red-50 rounded text-red-500 font-bold"/>
          },
        ].map((item, i) => (
          <Card key={i}>
            <CardContent>
              <div className="flex gap-3 items-center">
                {item.icon}
                <div>
              <p className="text-sm font-bold text-muted-foreground">{item.title}</p>
              <p className="font-semibold mt-1">{item.subTitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
