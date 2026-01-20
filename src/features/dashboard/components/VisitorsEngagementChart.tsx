// src/components/dashboard/VisitorsEngagementChart.tsx
'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  // Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

// Sample data — replace with your real data (API, state, etc.)
const chartData = [
  { day: 'Mon', visitors: 2400, engagement: 1800 },
  { day: 'Tue', visitors: 2100, engagement: 1600 },
  { day: 'Wed', visitors: 9800, engagement: 7200 },
  { day: 'Thu', visitors: 4200, engagement: 2800 },
  { day: 'Fri', visitors: 4800, engagement: 3400 },
  { day: 'Sat', visitors: 3800, engagement: 2600 },
  { day: 'Sun', visitors: 4300, engagement: 3100 },
]

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'hsl(var(--chart-1))', // ≈ red/pink
  },
  engagement: {
    label: 'Engagement',
    color: 'hsl(var(--chart-2))', // ≈ yellow/orange/gold
  },
} satisfies ChartConfig

export function VisitorsEngagementChart() {
  return (
    <Card className='flex flex-col lg:col-span-4'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Visitors vs Engagement</CardTitle>
        <CardDescription>Last 7 days performance</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-4'>
        <div className='mb-2 text-center text-sm text-muted-foreground'>
          <span className='inline-flex items-center'>
            <span className='mr-1.5 size-2 rounded-full bg-[hsl(var(--chart-1))]'></span>
            Visitors
          </span>
          <span className='ml-4 inline-flex items-center'>
            <span className='mr-1.5 size-2 rounded-full bg-[hsl(var(--chart-2))]'></span>
            Engagement
          </span>
        </div>

        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[280px] w-full'
        >
          <ResponsiveContainer>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis
                dataKey='day'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Area
                type='monotone'
                dataKey='visitors'
                stackId='1'
                stroke='var(--color-visitors)'
                fill='var(--color-visitors)'
                fillOpacity={0.4}
              />
              <Area
                type='monotone'
                dataKey='engagement'
                stackId='2'
                stroke='var(--color-engagement)'
                fill='var(--color-engagement)'
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
