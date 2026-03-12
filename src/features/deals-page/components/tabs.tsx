import {Calendar,CalendarDays,NotebookPen,Star,History} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const tabsData = [
    {
        title:"Active Deals",
        icon :<Calendar size={50} className="bg-yellow-50 text-yellow-600 p-3 rounded font-bold"/> ,
        quantity:"24",
        duration:"This Week"
    },
     {
        title:"Scheduled Deals",
        icon :<CalendarDays size={50} className="bg-green-50 text-green-600 p-3 rounded font-bold"/> ,
        quantity:"8",
        duration:"This Week"
    },
     {
        title:"Expired Deals",
        icon :<Star size={50} className="bg-red-50 text-red-600 p-3 rounded font-bold"/> ,
        quantity:"5",
        duration:"This Week"
    },
     {
        title:"Featured Deals",
        icon :<NotebookPen size={50} className="bg-yellow-50 text-yellow-600 p-3 rounded font-bold"/> ,
        quantity:"12",
        duration:"This Week"
    },
     {
        title:"Total Partners",
        icon :<History size={50} className="bg-green-50 text-green-600 p-3 rounded font-bold"/> ,
        quantity:"156",
        duration:"This Week"
    },
]

export default function TabsPage(){
    return(
        <>
            <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-5'>
                {tabsData.map((item) => (
              <Card className="p-2">
                <CardHeader className='flex flex-row justify-between space-y-0 px-0  pb-2'>
                      <div>
                    {item.icon}
                    </div>
                    <div>
                    <p className='text-xs font-semibold text-muted-foreground'>{item.duration}</p>
                    </div>
                </CardHeader>
                <CardContent className='px-0'>
                  <div className='text-3xl font-extrabold mb-2'>{item.quantity}</div>
                  <h2 className='text-xs font-bold text-muted-foreground'>{item.title}</h2>
                </CardContent>
              </Card>

                ))}
              
            </div>
        
        </>
    )
}