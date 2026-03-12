// src/components/dashboard/AnalyticsPanels.tsx
import { Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

type StatItem = {
  label: string
  value: string
  percent: number
  color: string
}

const inquiries: StatItem[] = [
  { label: 'Phone Calls', value: '45.0K', percent: 42, color: 'bg-[#d1aa46]' },
  {
    label: 'Web Link Clicks',
    value: '28.0K',
    percent: 26,
    color: 'bg-[#d1aa46]',
  },
  {
    label: 'Third Party Platform clicks',
    value: '12.0K',
    percent: 11,
    color: 'bg-[#d1aa46]',
  },
  { label: 'Directions', value: '8.5K', percent: 8, color: 'bg-[#d1aa46]' },
]

const engagement: StatItem[] = [
  { label: 'Visitors', value: '45.0K', percent: 42, color: 'bg-[#1daa51]' },
  { label: 'Clicks', value: '28.0K', percent: 26, color: 'bg-[#1daa51]' },
  { label: 'Scrolled', value: '52.0K', percent: 50, color: 'bg-[#1daa51]' },
  { label: 'Deals Clicked', value: '8.5K', percent: 8, color: 'bg-[#1daa51]' },
  { label: 'Reviews', value: '6.2K', percent: 86, color: 'bg-[#1daa51]' },
  { label: 'Heart Saved', value: '7.8K', percent: 7, color: 'bg-[#1daa51]' },
  { label: 'Inquiries', value: '7.8K', percent: 7, color: 'bg-[#1daa51]' },
]

const geography: StatItem[] = [
  { label: 'Colombia', value: '45.0K', percent: 42, color: ' bg-[#b50700]' },
  {
    label: 'United States',
    value: '28.0K',
    percent: 26,
    color: 'bg-[#b50700]',
  },
  { label: 'Spain', value: '12.0K', percent: 11, color: 'bg-[#b50700]' },
  { label: 'Mexico', value: '8.5K', percent: 8, color: 'bg-[#b50700]' },
  { label: 'Argentina', value: '6.2K', percent: 6, color: 'bg-[#b50700]' },
  { label: 'Other', value: '7.8K', percent: 7, color: 'bg-[#b50700]' },
]

function StatBar({ item }: { item: StatItem }) {
  return (
    <div className='space-y-1.5'>
      <div className='flex items-center justify-between text-sm'>
        <span className='font-bold'>{item.label}</span>
        <span className='font-medium'>
          {item.value} ({item.percent}%)
        </span>
      </div>
      <Progress
        value={item.percent}
        className={`h-2`}
        indicatorClassName={item.color}
      />
    </div>
  )
}

export function AnalyticsPanels() {
  return (
    <div className='grid gap-6 md:grid-cols-3'>
      {/* Inquiries Analytics */}
      <Card>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='font-antigua text-base font-bold'>
              Inquiries vs Analytics
            </CardTitle>
            <span className='cursor-pointer text-xs text-red-600 hover:underline'>
              View All
            </span>
          </div>
          <p className='text-xs text-muted-foreground'>
            All time vs last 30 days
          </p>
        </CardHeader>
        <CardContent className='space-y-4'>
          {inquiries.map((item, i) => (
            <StatBar key={i} item={item} />
          ))}
        </CardContent>
      </Card>

      {/* Engagement */}
      <Card>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='font-antigua text-base font-bold'>
              Engagement
            </CardTitle>
            <span className='cursor-pointer text-xs text-red-600 hover:underline'>
              View All
            </span>
          </div>
          <p className='text-xs text-muted-foreground'>
            Latest updates & actions
          </p>
        </CardHeader>
        <CardContent className='space-y-4'>
          {engagement.map((item, i) => (
            <StatBar key={i} item={item} />
          ))}
        </CardContent>
      </Card>

      {/* Audience Geography */}
      <Card>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='font-antigua text-base font-bold'>
              Audience Geography
            </CardTitle>
            <Globe className='h-6 w-6 rounded-sm bg-[#F3F1ED] p-1 text-[#cf9921]' />
          </div>
          <p className='text-xs text-muted-foreground'>
            Where your readers come from
          </p>
        </CardHeader>
        <CardContent className='space-y-4'>
          {geography.map((item, i) => (
            <StatBar key={i} item={item} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
