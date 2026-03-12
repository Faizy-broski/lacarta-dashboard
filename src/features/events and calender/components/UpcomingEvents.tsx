import { Clock, MapPin, MoreVertical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const events = [
  {
    id: 1,
    title: 'Jazz Night at Plaza de la Aduana',
    category: 'music',
    featured: true,
    date: 'Jan 8, 2026',
    time: '8:00 PM',
    location: 'Plaza de la Aduana',
    status: 'Published',
    statusColor: 'text-green-600',
    img: 'https://picsum.photos/80?random=1',
  },
  {
    id: 2,
    title: 'Contemporary Art Exhibition Opening',
    category: 'art',
    featured: false,
    date: 'Jan 10, 2026',
    time: '10:00 AM',
    location: 'Museo de Arte Moderno',
    status: 'Published',
    statusColor: 'text-green-600',
    img: 'https://picsum.photos/80?random=2',
  },
  {
    id: 3,
    title: 'Cartagena Street Food Festival',
    category: 'food',
    featured: true,
    date: 'Jan 12, 2026',
    time: '12:00 PM',
    location: 'Centro Histórico',
    status: 'Scheduled',
    statusColor: 'text-red-500',
    img: 'https://picsum.photos/80?random=3',
  },
  {
    id: 4,
    title: 'Traditional Colombian Dance Workshop',
    category: 'culture',
    featured: false,
    date: 'Jan 15, 2026',
    time: '4:00 PM',
    location: 'Teatro Heredia',
    status: 'Draft',
    statusColor: 'text-yellow-500',
    img: 'https://picsum.photos/80?random=4',
  },
]

const categoryColors = {
  music: 'bg-purple-100 text-purple-700',
  art: 'bg-blue-100 text-blue-700',
  food: 'bg-green-100 text-green-700',
  culture: 'bg-gold/10 text-gold/70',
  festivals: 'bg-red/10 text-red/70',
}

export default function UpcomingEvents() {
  return (
    <div>
      {/* Header */}
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='font-antigua text-xl font-semibold'>Upcoming Events</h2>

        <Button
          variant='ghost'
          size={'sm'}
          className='text-red-500 hover:bg-background hover:text-red-600'
        >
          View all →
        </Button>
      </div>

      {/* Card */}
      <div className='space-y-3'>
        {events.map((event) => (
          <Card key={event.id} className='hover:bg-muted/30'>
            <CardContent className='p-0'>
              <div className='flex flex-col gap-3 px-4 transition sm:flex-row sm:items-center sm:justify-between'>
                {/* LEFT SIDE */}
                <div className='flex items-start gap-3 sm:items-center sm:gap-4'>
                  <img
                    src={event.img}
                    className='h-12 w-16 flex-shrink-0 rounded-lg object-cover sm:h-13 sm:w-18'
                  />

                  <div className='min-w-0'>
                    {/* TITLE */}
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='truncate text-sm font-semibold sm:text-base'>
                        {event.title}
                      </p>

                      {event.featured && (
                        <Badge className='rounded-full bg-gradient-to-b from-gold to-gold-light text-xs text-white'>
                          ★ Featured
                        </Badge>
                      )}
                    </div>

                    {/* CATEGORY + META */}
                    <div className='mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground'>
                      <Badge
                        variant='secondary'
                        className={`${categoryColors[event.category]} rounded-full font-normal`}
                      >
                        {event.category}
                      </Badge>

                      <div className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' />
                        {event.date} • {event.time}
                      </div>

                      <div className='flex items-center gap-1'>
                        <MapPin className='h-3 w-3' />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className='flex items-center justify-between gap-4 sm:justify-end'>
                  <div
                    className={`flex items-center gap-2 text-xs sm:text-sm ${event.statusColor}`}
                  >
                    <span className='h-2 w-2 rounded-full bg-current'></span>
                    {event.status}
                  </div>

                  <MoreVertical className='h-4 w-4 flex-shrink-0 cursor-pointer text-muted-foreground' />
                </div>
              </div>
            </CardContent>
          </Card>
          // <Card key={event.id} className='hover:bg-muted/30'>
          //   <CardContent className='p-0'>
          //     <div className='flex items-center justify-between px-4 transition '>
          //       {/* LEFT SIDE */}
          //       <div className='flex items-center gap-4'>
          //         <img
          //           src={event.img}
          //           className='h-13 w-18 rounded-lg object-cover'
          //         />

          //         <div>
          //           <div className='flex items-center gap-2'>
          //             <p className='font-semibold'>{event.title}</p>

          //             {event.featured && (
          //               <Badge className='rounded-full bg-gradient-to-b from-gold to-gold-light text-white'>
          //                 ★ Featured
          //               </Badge>
          //             )}
          //           </div>

          //           {/* Category */}
          //           <div className='mt-1 flex items-center gap-2'>
          //             <Badge
          //               variant='secondary'
          //               className={`${categoryColors[event.category]} rounded-full font-normal`}
          //             >
          //               {event.category}
          //             </Badge>

          //             <div className='flex items-center gap-1 text-xs text-muted-foreground'>
          //               <Clock className='h-3 w-3' />
          //               {event.date} • {event.time}
          //             </div>

          //             <div className='flex items-center gap-1 text-xs text-muted-foreground'>
          //               <MapPin className='h-3 w-3' />
          //               {event.location}
          //             </div>
          //           </div>
          //         </div>
          //       </div>

          //       {/* RIGHT SIDE */}
          //       <div className='flex items-center gap-4'>
          //         <div
          //           className={`flex items-center gap-2 text-sm ${event.statusColor}`}
          //         >
          //           <span className='h-2 w-2 rounded-full bg-current'></span>
          //           {event.status}
          //         </div>

          //         <MoreVertical className='h-4 w-4 cursor-pointer text-muted-foreground' />
          //       </div>
          //     </div>
          //   </CardContent>
          // </Card>
        ))}
      </div>
    </div>
  )
}
