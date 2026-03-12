import { Eye, Calendar, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const insights = [
  {
    title: "Most Viewed",
    subtitle: "Jazz Night at Plaza",
    icon: Eye,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    title: "Busiest Day",
    subtitle: "Saturday, Jan 20",
    icon: Calendar,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    title: "Next Featured",
    subtitle: "Food Festival",
    icon: TrendingUp,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "Engagement",
    subtitle: "+18% this week",
    icon: Activity,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
]

export default function Insights() {
  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-antigua text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Insights
        </h2>

        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {insights.map((item, i) => {
          const Icon = item.icon

          return (
            <Card
              key={i}
              className="rounded-xl border bg-white shadow-sm p-0"
            >
              <CardContent className="flex items-center gap-3 p-3">

                {/* Icon */}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}
                >
                  <Icon size={18} className={item.iconColor} />
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground">
                    {item.title}
                  </p>

                  <p className="text-sm font-normal">
                    {item.subtitle}
                  </p>
                </div>

              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}


// import { Card, CardContent } from "@/components/ui/card"
// import {Eye,TrendingUp,Calendar} from 'lucide-react'

// export default function Insights() {
//   return (
//     <div>
//       <div className="flex gap-2 items-center">
//       <h2 className="font-bold mb-3">Insights</h2>
//       <div className="text-black"><hr className="text-black"></hr></div>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
//         {[
//           {
//            title: "Most Viewed",
//            subTitle:"Jazz Night at Plaz",
//            icon:<Eye size={35} className="p-2 bg-yellow-50 rounded text-yellow-500 font-bold"/>
//           },
//           {
//            title: "Business Day",
//            subTitle:"Saturday, Jan 2",
//            icon:<Calendar size={35} className="p-2 bg-green-50 rounded text-green-500 font-bold"/>
//           },
//           {
//            title: "Next Featured",
//            subTitle:"Food Festival",
//            icon:<TrendingUp size={35} className="p-2 bg-red-50 rounded text-red-500 font-bold"/>
//           },
//         ].map((item, i) => (
//           <Card key={i}>
//             <CardContent>
//               <div className="flex gap-3 items-center">
//                 {item.icon}
//                 <div>
//               <p className="text-sm font-bold text-muted-foreground">{item.title}</p>
//               <p className="font-semibold mt-1">{item.subTitle}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }
