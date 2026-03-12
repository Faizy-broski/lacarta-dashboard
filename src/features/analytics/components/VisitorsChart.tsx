// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// const data = [
//   { day: "Mon", visitors: 4200, engagement: 2600 },
//   { day: "Tue", visitors: 3900, engagement: 2400 },
//   { day: "Wed", visitors: 4800, engagement: 3100 },
//   { day: "Thu", visitors: 4500, engagement: 2900 },
//   { day: "Fri", visitors: 5200, engagement: 3600 },
//   { day: "Sat", visitors: 5600, engagement: 3900 },
//   { day: "Sun", visitors: 5100, engagement: 3700 },
// ];
// export function VisitorsChart() {
//   return (
//     <Card className="my-10">
//       <CardHeader>
//         <h3 className="font-semibold">Visitors vs Engagement</h3>
//         <p className="text-sm text-muted-foreground">Last 7 days performance</p>
//       </CardHeader>
//       <CardContent className="h-[280px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={data}>
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Area type="monotone" dataKey="visitors" fillOpacity={0.2} strokeWidth={2} />
//             <Area type="monotone" dataKey="engagement" fillOpacity={0.2} strokeWidth={2} />
//           </AreaChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const data = [
  { day: 'Mon', activities: 1200, hotels: 3800, gastro: 2500, beaches: 6000 },
  { day: 'Tue', activities: 5000, hotels: 6800, gastro: 1200, beaches: 8200 },
  { day: 'Wed', activities: 4500, hotels: 6000, gastro: 3500, beaches: 7200 },
  { day: 'Thu', activities: 1300, hotels: 2500, gastro: 6000, beaches: 4000 },
  { day: 'Fri', activities: 5100, hotels: 1500, gastro: 2700, beaches: 6400 },
  { day: 'Sat', activities: 4600, hotels: 3600, gastro: 2200, beaches: 6000 },
  { day: 'Sun', activities: 6700, hotels: 5400, gastro: 4500, beaches: 2600 },
]

export function VisitorsChart() {
  return (
    <Card className='my-10 rounded-xl bg-[#F9FAFB] shadow-sm'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-semibold'>Visitors vs Engagement</h3>
            <p className='text-sm text-muted-foreground'>
              Last 7 days performance
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className='relative h-[340px]'>
        {/* Center KPI */}
        {/* <div className='absolute top-6 left-1/2 -translate-x-1/2 text-2xl font-semibold text-gray-800'>
          124.5K
        </div> */}

        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#E5E7EB'
            />

            <XAxis
              dataKey='day'
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />

            <Tooltip />

            <Legend
              verticalAlign='top'
              align='right'
              iconType='circle'
              wrapperStyle={{ paddingBottom: 20 }}
            />

            <Line
              type='monotone'
              dataKey='activities'
              stroke='#C81E1E'
              strokeWidth={2}
              dot={false}
            />

            <Line
              type='monotone'
              dataKey='hotels'
              stroke='#16A34A'
              strokeWidth={2}
              dot={false}
            />

            <Line
              type='monotone'
              dataKey='gastro'
              stroke='#CA8A04'
              strokeWidth={2}
              dot={false}
            />

            <Line
              type='monotone'
              dataKey='beaches'
              stroke='#0891B2'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
