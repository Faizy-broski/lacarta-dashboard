// import { Button } from '@/components/ui/button'
// import { Card, CardHeader, CardContent } from '@/components/ui/card'
// import { Switch } from '@/components/ui/switch'
// import img from '/images/shadcn-admin.png'
// export default function FeaturedEvents() {
//   return (
//     <div>
//       <div className='mb-3 flex justify-between'>
//         <div>
//           <h2 className='font-bold'>Featured Events</h2>
//           <p className='text-sm text-muted-foreground'>
//             Drag to reorder homepage placements
//           </p>
//         </div>
//         <Button className='text-dark border bg-white text-sm'>
//           Manage Featured
//         </Button>
//       </div>
//       <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
//         {[1, 2, 3, 4].map((_, i) => (
//           <Card key={i} className='gap-0 overflow-hidden p-0'>
//             <CardHeader className='p-0'>
//               <div className='h-30 w-full bg-muted'>
//                 <img className='h-full w-full bg-muted' src={img} alt='alt' />
//               </div>
//             </CardHeader>
//             <CardContent className='space-y-1 py-3'>
//               <p className='font-bold'>Event Name</p>
//               <p className='text-sm text-muted-foreground'>Jan 4, 2026</p>
//               <hr className='my-2'></hr>
//               <div className='flex items-center justify-between'>
//                 <span className='text-xs text-muted-foreground'>Homepage</span>
//                 <Switch defaultChecked />
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

const events = [
  {
    id: 1,
    title: 'Cartagena Food Festival 2026',
    date: 'Jan 12, 2026',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Jazz Night at Plaza',
    date: 'Jan 8, 2026',
    image:
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Cumbia Festival',
    date: 'Jan 20, 2026',
    image:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Art Walk Getsemani',
    date: 'Jan 25, 2026',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
]

export default function FeaturedEvents() {
  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='font-antigua text-lg font-semibold'>
            Featured Events
          </h2>
          <p className='text-sm text-muted-foreground'>
            Drag to reorder homepage placement
          </p>
        </div>

        <Button variant='outline' className='bg-white text-sm font-medium'>
          Manage Featured
        </Button>
      </div>

      {/* Grid */}
      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {events.map((event, i) => (
          <Card
            key={event.id}
            className='overflow-hidden rounded-md border border-gray-200 shadow-xs pt-0 pb-3 gap-2'
          >
            {/* Image */}
            <CardHeader className='relative p-0 '>
              <div className='h-34 w-full bg-muted'>
                <img
                  className='h-full w-full bg-muted object-cover'
                  src={event.image}
                  alt='alt'
                />
              </div>
              {/* <div className='h-[150px] w-full'>
                <img
                  src={event.image}
                  alt={event.title}
                  className='h-full w-full object-cover'
                />
              </div> */}

              {/* Order badge */}
              <div className='absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-gold to-gold-light text-xs font-semibold text-white shadow'>
                {i + 1}
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className='px-4 '>
              <h3 className='font-antigua truncate text-sm font-medium py-0'>
                {event.title}
              </h3>

              <p className='text-xs text-muted-foreground'>{event.date}</p>
            </CardContent>
            <CardFooter className='px-4 '>
              <div className='flex w-full items-center justify-between border-t pt-3'>
                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <Eye size={12} />
                  Homepage
                </div>

                <Switch defaultChecked />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
