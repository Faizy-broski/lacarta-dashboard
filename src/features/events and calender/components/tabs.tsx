import {
  Calendar,
  CalendarDays,
  NotebookPen,
  Star,
  History,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'

const tabsData = [
  {
    title: 'Upcoming Events',
    icon: <Calendar size={50} className='h-5 w-5 text-gold' />,
    quantity: '24',
    color: 'bg-gold/10 rounded-md',
    border: 'bg-gold',
  },
  {
    title: 'Events This Week',
    icon: <CalendarDays size={50} className='h-5 w-5 text-green' />,
    quantity: '8',
    color: 'bg-green/10 rounded-md',
    border: 'bg-green',
  },
  {
    title: 'Featured Events',
    icon: <Star size={50} className='h-5 w-5 text-red' />,
    quantity: '5',
    color: 'bg-red/10 rounded-md',
    border: 'bg-red',
  },
  {
    title: 'Drafts Events',
    icon: <NotebookPen size={50} className='h-5 w-5 text-gold' />,
    quantity: '12',
    color: 'bg-gold/10 rounded-md',
    border: 'bg-gold',
  },
  {
    title: 'Past Events',
    icon: <History size={50} className='h-5 w-5 text-green' />,
    quantity: '156',
    color: 'bg-green/10 rounded-md',
    border: 'bg-green',
  },
]

export default function TabsPage() {
  return (
    <>
      <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-5'>
        {tabsData.map((item) => (
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0'>
              <CardTitle className={`${item.color} p-2 text-sm font-medium`}>
                {item.icon}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='font-antigua mb-2 text-3xl font-extrabold'>
                {item.quantity}
              </div>
              <h2 className='text-xs font-medium text-muted-foreground'>
                {item.title}
              </h2>
            </CardContent>
            <CardFooter>
              <div className={`h-[2px] w-10 ${item.border}`} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}
