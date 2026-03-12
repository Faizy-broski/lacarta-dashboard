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
    icon: <Eye className='h-5 w-5 text-[#CF9921]' />,
    quantity: '124.5K',
    duration: 'vs Last 30 days',
    percentage: '12.5%',
    color: 'bg-[#CF9921]/10 text-[#CF9921]',
  },

  {
    title: 'New Users',
    icon: <Users className='h-5 w-5 text-[#22C55E]' />,
    quantity: '8432',
    duration: 'vs Last 30 days',
    percentage: '8.2%',
    color: 'bg-[#22C55E]/10 text-[#22C55E]',
  },

  {
    title: 'Published Articles',
    icon: <NotepadText className='h-5 w-5 text-[#D40D00]' />,
    quantity: '156',
    duration: 'This Month',
    percentage: '24%',
    color: 'bg-[#D40D00]/10 text-[#D40D00]',
  },

  {
    title: 'Newsletter Signups',
    icon: <Mail className='h-5 w-5 text-[#CF9921]' />,
    quantity: '2847',
    duration: 'vs Last 30 days',
    percentage: '15.3%',
    color: 'bg-[#D2BB6B]/10 text-[#CF9921]',
  },

  {
    title: 'Pending Comments',
    icon: <DollarSign className='h-5 w-5 text-[#22C55E]' />,
    quantity: '$18,420',
    duration: 'vs Last month',
    percentage: '3.2%',
    color: 'bg-[#22C55E]/10 text-[#22C55E]',
  },
  {
    title: 'Pending Reviews',
    icon: <Clock4 className='h-5 w-5 text-[#D40D00]' />,
    quantity: '12',
    duration: 'Awaiting approvals',
    percentage: '--',
    color: 'bg-[#D40D00]/10 text-[#D40D00]',
  },
]

export default function TabsPage() {
  return (
    <>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-6'>
        {tabsData.map((item) => (
          <>
            {/* <Card className='relative overflow-hidden border-none shadow-md'>
               // <CardHeader className='flex flex-row justify-between space-y-0 px-0 pb-2'>  
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <div className='rounded-lg bg-white/20 p-2'>{item.icon}</div>
                <div
                  className={`flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium ${item.color}`}
                >
                   // <p className={`rounded p-1 text-xs font-semibold ${item.color}`}> 
                  <TrendingUp className='h-3 w-3' />
                  {item.percentage}
                  // </p>  
                </div>
              </CardHeader>
              // <CardContent className='px-0'>  
              <CardContent className='pt-2'>
                <p className='mb-0 text-sm text-muted-foreground'>
                  {item.title}
                </p>
                <div className='font-antigua mb-2 text-3xl font-bold'>
                  {item.quantity}
                </div>
                <p className='relative z-10 text-[10px] text-muted-foreground'>
                  {item.duration}
                </p>
              </CardContent>
            </Card> */}
            <Card className='relative overflow-hidden border-none shadow-md'>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <div className={`rounded-lg p-2 ${item.color}`}>
                  {item.icon}
                </div>
                <div
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${item.color}`}
                >
                  <TrendingUp className='h-3 w-3' />
                  {item.percentage}
                </div>
              </CardHeader>
              <CardContent className='pt-2'>
                <p className='mb-0 text-sm text-muted-foreground'>
                  {item.title}
                </p>
                <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                  {item.quantity}
                </div>
                <p className='relative z-10 text-[10px] text-muted-foreground'>
                  {item.duration}
                </p>
              </CardContent>
            </Card>
          </>
        ))}
        {/* <Card className='relative overflow-hidden border-none shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <div className='rounded-lg bg-white/20 p-2'>
              <Eye className='h-5 w-5 bg-yellow-50 text-yellow-600' />
            </div>
            <div
              className={`flex items-center gap-1 rounded-full bg-white/20 bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-600`}
            >
              <TrendingUp className='h-3 w-3' />
              12.5%
            </div>
          </CardHeader>
          <CardContent className='pt-2'>
            <p className='mb-0 text-sm text-muted-foreground'>Total Visitors</p>
            <div className='font-antigua mb-2 text-3xl tracking-tight'>
              124.5K
            </div>
            <p className='relative z-10 text-[10px] text-muted-foreground'>
              vs Last 30 days
            </p>
          </CardContent>
        </Card> */}
        {/* <Card className='relative overflow-hidden border-none shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <div className='rounded-lg bg-black/20 p-2'>
              <Eye className='h-5 w-5' />
            </div>
            <div className='flex items-center gap-1 rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium'>
              <TrendingUp className='h-3 w-3' />
              12.5%
            </div>
          </CardHeader>
          <CardContent className='pt-2'>
            <p className='mb-0 text-sm text-muted-foreground'>Total Visitors</p>
            <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
              124.5K
            </div>
            <p className='relative z-10 text-[10px] text-muted-foreground'>
              vs last 30 days
            </p>
          </CardContent>
        </Card>
        <Card className='relative overflow-hidden border-none shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <div className='rounded-lg bg-black/20 p-2'>
              <Eye className='h-5 w-5' />
            </div>
            <div className='flex items-center gap-1 rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium'>
              <TrendingUp className='h-3 w-3' />
              12.5%
            </div>
          </CardHeader>
          <CardContent className='pt-2'>
            <p className='mb-0 text-sm text-muted-foreground'>Total Visitors</p>
            <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
              124.5K
            </div>
            <p className='relative z-10 text-[10px] text-muted-foreground'>
              vs last 30 days
            </p>
          </CardContent>
        </Card>
        <Card className='relative overflow-hidden border-none shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <div className='rounded-lg bg-black/20 p-2'>
              <Eye className='h-5 w-5' />
            </div>
            <div className='flex items-center gap-1 rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium'>
              <TrendingUp className='h-3 w-3' />
              12.5%
            </div>
          </CardHeader>
          <CardContent className='pt-2'>
            <p className='mb-0 text-sm text-muted-foreground'>Total Visitors</p>
            <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
              124.5K
            </div>
            <p className='relative z-10 text-[10px] text-muted-foreground'>
              vs last 30 days
            </p>
          </CardContent>
        </Card>
        <Card className='relative overflow-hidden border-none shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <div className='rounded-lg bg-black/20 p-2'>
              <Eye className='h-5 w-5' />
            </div>
            <div className='flex items-center gap-1 rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium'>
              <TrendingUp className='h-3 w-3' />
              12.5%
            </div>
          </CardHeader>
          <CardContent className='pt-2'>
            <p className='mb-0 text-sm text-muted-foreground'>Total Visitors</p>
            <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
              124.5K
            </div>
            <p className='relative z-10 text-[10px] text-muted-foreground'>
              vs last 30 days
            </p>
          </CardContent>
        </Card>
        <Card className='relative overflow-hidden border-none shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <div className='rounded-lg bg-white/20 p-2'>
              <DollarSign className='h-5 w-5 bg-yellow-50 text-yellow-600' />
            </div>
            <div
              className={`flex items-center gap-1 rounded-full bg-green-100 bg-white/20 px-2.5 py-1 text-xs font-medium text-green-600`}
            >
              <TrendingUp className='h-3 w-3' />
              3.2%
            </div>
          </CardHeader>
          <CardContent className='pt-2'>
            <p className='mb-0 text-sm text-muted-foreground'>
              Pending Comments
            </p>
            <div className='font-antigua mb-2 text-3xl tracking-tight'>
              18,420
            </div>
            <p className='relative z-10 text-[10px] text-muted-foreground'>
              vs Last month
            </p>
          </CardContent>
        </Card>
        <Card className='relative overflow-hidden border-none shadow-md'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <div className='rounded-lg bg-white/20 p-2'>
              <Clock4 className='h-5 w-5 bg-red-50 text-red-600' />
            </div>
            <div
              className={`flex items-center gap-1 rounded-full bg-red-100 bg-white/20 px-2.5 py-1 text-xs font-medium text-red-600`}
            >
              <TrendingUp className='h-3 w-3' />
              24%
            </div>
          </CardHeader>
          <CardContent className='pt-2'>
            <p className='mb-0 text-sm text-muted-foreground'>
              Pending Reviews
            </p>
            <div className='font-antigua mb-2 text-3xl tracking-tight'>12</div>
            <p className='relative z-10 text-[10px] text-muted-foreground'>
              Awaiting approvals
            </p>
          </CardContent>
        </Card> */}
      </div>
    </>
  )
}
