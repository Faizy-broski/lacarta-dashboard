import {Calendar,CalendarDays,NotebookPen,Star,History} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const tabsData = [
    {
        title:"Upcoming Events",
        icon :<Calendar size={50} className="bg-yellow-50 text-yellow-600 p-3 rounded font-bold"/> ,
        quantity:"24"
    },
     {
        title:"Events This Week",
        icon :<CalendarDays size={50} className="bg-green-50 text-green-600 p-3 rounded font-bold"/> ,
        quantity:"8"
    },
     {
        title:"Featured Events",
        icon :<Star size={50} className="bg-red-50 text-red-600 p-3 rounded font-bold"/> ,
        quantity:"5"
    },
     {
        title:"Drafts Events",
        icon :<NotebookPen size={50} className="bg-yellow-50 text-yellow-600 p-3 rounded font-bold"/> ,
        quantity:"12"
    },
     {
        title:"Past Events",
        icon :<History size={50} className="bg-green-50 text-green-600 p-3 rounded font-bold"/> ,
        quantity:"156"
    },
]

export default function TabsPage(){
    return(
        <>
            <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-5'>
                {tabsData.map((item) => (
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {item.icon}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-3xl font-extrabold mb-2'>{item.quantity}</div>
                  <h2 className='text-xs font-bold text-muted-foreground'>{item.title}</h2>
                </CardContent>
              </Card>

                ))}
              
            </div>
        
        </>
    )
}