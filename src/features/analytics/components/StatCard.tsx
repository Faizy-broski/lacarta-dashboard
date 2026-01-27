import {NotepadText,Clock4,DollarSign,Mail,Users,Eye} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const tabsData = [
    {
        title:"Total Visitors",
        icon :<Eye size={50} className="bg-yellow-50 text-yellow-600 p-3 rounded font-bold"/> ,
        quantity:"124.5K",
        duration:"vs Last 30 days",
        percentage:"12.5%",
        color:"bg-yellow-100 text-yellow-600"
    },
    
     {
        title:"New Users",
        icon :<Users size={50} className="bg-green-50 text-green-600 p-3 rounded font-bold"/> ,
        quantity:"8432",
        duration:"vs Last 30 days",
        percentage:"8.2%",
        color:"bg-green-100 text-green-600"
    },
    
     {
        title:"Published Articles",
        icon :<NotepadText size={50} className="bg-red-50 text-red-600 p-3 rounded font-bold"/> ,
        quantity:"156",
        duration:"This Month",
        percentage:"24%",
        color:"bg-red-100 text-red-600"
    },
    
     {
        title:"Newsletter Signups",
        icon :<Mail size={50} className="bg-yellow-50 text-yellow-600 p-3 rounded font-bold"/> ,
        quantity:"2847",
        duration:"vs Last 30 days",
        percentage:"15.3%",
        color:"bg-yellow-100 text-yellow-600"
    },
    
     {
        title:"Pending Comments",
        icon :<DollarSign size={50} className="bg-green-50 text-green-600 p-3 rounded font-bold"/> ,
        quantity:"$18,420",
        duration:"vs Last month",
        percentage:"3.2%",
        color:"bg-green-100 text-green-600"
    },
    {
        title:"Pending Reviews",
        icon :<Clock4 size={50} className="bg-red-50 text-red-600 p-3 rounded font-bold"/> ,
        quantity:"12",
        duration:"Awaiting approvals",
        percentage:"--",
        color:"bg-red-100 text-red-600"
        
    },
    
]

export default function TabsPage(){
    return(
        <>
            <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-6'>
                {tabsData.map((item) => (
              <Card className="p-2">
                <CardHeader className='flex flex-row justify-between space-y-0 px-0  pb-2'>
                      <div>
                    {item.icon}
                    </div>
                    <div>
                    <p className={`text-xs font-semibold p-1 rounded ${item.color}`}>{item.percentage}</p>
                    </div>
                </CardHeader>
                <CardContent className='px-0'>
                  <h2 className='text-xs font-bold text-muted-foreground'>{item.title}</h2>
                  <div className='text-3xl font-extrabold mb-2'>{item.quantity}</div>
                  <p className='text-xs font-bold text-muted-foreground'>{item.duration}</p>
                </CardContent>
              </Card>

                ))}
              
            </div>
        
        </>
    )
}