import {FileText , PencilLine,FolderClosed,Star,Wrench} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const tabsData = [
    {
        title:"Articles",
        icon :<FileText size={50} className="bg-yellow-50 text-yellow-600 p-3 rounded font-bold"/> ,
        quantity:"247",
        subtitle:"Homepage Stories",
        color:"yellow"
    },
     {
        title:"Drafts",
        icon :<PencilLine size={50} className="bg-green-50 text-green-600 p-3 rounded font-bold"/> ,
        quantity:"18",
        subtitle:"Awaiting Review",
        color:"green"

    },
     {
        title:"Categories",
        icon :<FolderClosed size={50} className="bg-red-50 text-red-600 p-3 rounded font-bold"/> ,
        quantity:"14",
        subtitle:"Active Categories",
        color:"red"

    },
     {
        title:"Featured",
        icon :<Star size={50} className="bg-yellow-50 text-yellow-600 p-3 rounded font-bold"/> ,
        quantity:"6",
        subtitle:"Homepage Stories",
        color:"yellow"

    },
     {
        title:"Travel Tools",
        icon :<Wrench size={50} className="bg-green-50 text-green-600 p-3 rounded font-bold"/> ,
        quantity:"23",
        subtitle:"Guides & Planners",
        color:"green"

    },
]

export default function TabsPage(){
    return(
        <>
            <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-5'>
                {tabsData.map((item) => (
              <Card className="p-4">
                <CardHeader className='space-y-0 px-0 '>
                      <div>
                    {item.icon}
                    </div>
                
                </CardHeader>
                <CardContent className='px-0'>
                  <div className='text-3xl font-extrabold mb-2'>{item.quantity}</div>
                   <div>
                    <p className='text-xs font-semibold text-muted-foreground'>{item.subtitle}</p>
                    </div>
                  <h2 className={`text-md font-bold text-${item.color}-600`}>{item.title}</h2>
                </CardContent>
              </Card>

                ))}
              
            </div>
        
        </>
    )
}