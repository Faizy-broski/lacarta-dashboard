import {
  NotepadText,
  Clock4,
  DollarSign,
  Mail,
  Users,
  Eye,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const tabsData = [
  {
    title: 'Total Visitors',
    icon: <Eye className='h-5 w-5 bg-yellow-50 text-yellow-600' />,
    quantity: '124.5K',
    duration: 'vs Last 30 days',
    percentage: '12.5%',
    color: 'bg-yellow-100 text-yellow-600',
  },

  {
    title: 'New Users',
    icon: <Users className='h-5 w-5 bg-green-50 text-green-600' />,
    quantity: '8432',
    duration: 'vs Last 30 days',
    percentage: '8.2%',
    color: 'bg-green-100 text-green-600',
  },

  {
    title: 'Published Articles',
    icon: <NotepadText className='h-5 w-5 bg-red-50 text-red-600' />,
    quantity: '156',
    duration: 'This Month',
    percentage: '24%',
    color: 'bg-red-100 text-red-600',
  },

  {
    title: 'Newsletter Signups',
    icon: <Mail className='h-5 w-5 bg-yellow-50 text-yellow-600' />,
    quantity: '2847',
    duration: 'vs Last 30 days',
    percentage: '15.3%',
    color: 'bg-yellow-100 text-yellow-600',
  },

  {
    title: 'Pending Comments',
    icon: <DollarSign className='h-5 w-5 bg-green-50 text-green-600' />,
    quantity: '$18,420',
    duration: 'vs Last month',
    percentage: '3.2%',
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Pending Reviews',
    icon: <Clock4 className='h-5 w-5 bg-red-50 text-red-600' />,
    quantity: '12',
    duration: 'Awaiting approvals',
    percentage: '--',
    color: 'bg-red-100 text-red-600',
  },
]

export default function TabsPage() {
  return (
    <>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-6'>
        {tabsData.map((item) => (
          <Card className='relative overflow-hidden border-none shadow-md'>
            {/* <CardHeader className='flex flex-row justify-between space-y-0 px-0 pb-2'> */}
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
              <div className='rounded-lg bg-white/20 p-2'>{item.icon}</div>
              <div
                className={`flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium ${item.color}`}
              >
                {/* <p
                  className={`rounded p-1 text-xs font-semibold ${item.color}`}
                > */}
                <TrendingUp className='h-3 w-3' />
                {item.percentage}
                {/* </p> */}
              </div>
            </CardHeader>
            {/* <CardContent className='px-0'> */}
            <CardContent className='pt-2'>
              <p className='mb-0 text-sm text-muted-foreground'>{item.title}</p>
              <div className='font-antigua mb-2 text-3xl font-bold'>
                {item.quantity}
              </div>
              <p className='relative z-10 text-[10px] text-muted-foreground'>
                {item.duration}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
