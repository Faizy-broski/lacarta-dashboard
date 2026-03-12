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
    color: '#de2828', // red
  },
  engagement: {
    label: 'Engagement',
    color: '#eab308', // gold/yellow
  },
} satisfies ChartConfig

export function VisitorsEngagementChart() {
  return (
    <Card className='flex flex-col lg:col-span-4'>
      <CardHeader className='flex items-center justify-between pb-0'>
        <div>
          <CardTitle className='font-antigua'>Visitors vs Engagement</CardTitle>
          <CardDescription>Last 7 days performance</CardDescription>
        </div>
        <div className='flex'>
          <div className='mb-2 flex items-center text-center text-sm text-muted-foreground'>
            <span className='inline-flex items-center'>
              <span className='mr-1.5 size-2 rounded-full bg-[#d40d00]'></span>
              Visitors
            </span>
            <span className='ml-4 inline-flex items-center'>
              <span className='mr-1.5 size-2 rounded-full bg-[#cf9910]'></span>
              Engagement
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex-1 pb-4'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[280px] w-full'
        >
          <ResponsiveContainer>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorVisitors' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#de2828' stopOpacity={0.6} />
                  <stop offset='95%' stopColor='#de2828' stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id='colorEngagement'
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop offset='5%' stopColor='#eab308' stopOpacity={0.6} />
                  <stop offset='95%' stopColor='#eab308' stopOpacity={0} />
                </linearGradient>
              </defs>
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
                strokeWidth={2}
                fill='url(#colorVisitors)'
                fillOpacity={1}
              />
              <Area
                type='monotone'
                dataKey='engagement'
                stackId='2'
                stroke='var(--color-engagement)'
                strokeWidth={2}
                fill='url(#colorEngagement)'
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
