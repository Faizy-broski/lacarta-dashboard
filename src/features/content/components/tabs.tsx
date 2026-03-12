import { FileText, PencilLine, FolderClosed, Star, Wrench } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const tabsData = [
  {
    title: 'Articles',
    icon: <FileText className='h-5 w-5 rounded font-bold text-gold' />,
    quantity: '247',
    subtitle: 'Homepage Stories',
    color: 'text-gold',
    bg: 'bg-gold/20',
  },
  {
    title: 'Drafts',
    icon: <PencilLine className='h-5 w-5 rounded font-bold text-green' />,
    bg: 'bg-green/20',
    quantity: '18',
    subtitle: 'Awaiting Review',
    color: 'text-green',
  },
  {
    title: 'Categories',
    icon: <FolderClosed className='h-5 w-5 rounded font-bold text-red' />,
    bg: 'bg-red/20',
    quantity: '14',
    subtitle: 'Active Categories',
    color: 'text-red',
  },
  {
    title: 'Featured',
    icon: <Star className='h-5 w-5 rounded font-bold text-gold' />,
    quantity: '6',
    subtitle: 'Homepage Stories',
    color: 'text-gold',
    bg: 'bg-gold/20',
  },
  {
    title: 'Travel Tools',
    icon: <Wrench className='h-5 w-5 rounded font-bold text-green' />,
    quantity: '23',
    bg: 'bg-green/20',
    subtitle: 'Guides & Planners',
    color: 'text-green',
  },
]

export default function TabsPage() {
  return (
    <>
      <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-5'>
        {tabsData.map((item, index) => (
          <Card
            key={index}
            className='border-gray-150 border-[1.5px] bg-white p-4 shadow-xs'
          >
            <CardHeader className='space-y-0 px-0'>
              <div className='flex items-center justify-between'>
                <div className={`${item.bg} w-fit rounded-lg p-2`}>
                  {item.icon}
                </div>
                {index === 0 && (
                  <p className='text-xs text-green'>+ 12 this month</p>
                )}
              </div>
            </CardHeader>
            <CardContent className='px-0'>
              <div className='font-georgia mb-2 text-3xl font-extrabold'>
                {item.quantity}
              </div>
              <div>
                <p className='text-xs font-semibold text-muted-foreground'>
                  {item.subtitle}
                </p>
              </div>
              <h2 className={`text-md font-semibold ${item.color}`}>
                {item.title}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
