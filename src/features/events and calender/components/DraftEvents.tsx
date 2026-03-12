// import { NotebookPen } from 'lucide-react'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardFooter } from '@/components/ui/card'
// import img from '/images/shadcn-admin.png'
// export default function DraftEvents() {
//   return (
//     <div>
//       <h2 className='mb-3 font-bold'>Drafts & Pending</h2>
//       <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
//         {['Coffee Tasting', 'Sunset Boat Tour', 'Salsa Dancing'].map(
//           (title, i) => (
//             <Card key={i} className='gap-0 py-3'>
//               <CardContent className='space-y-2 py-0'>
//                 <div className='flex items-center gap-2'>
//                   <NotebookPen
//                     size={18}
//                     className='bg-yellow-100 text-yellow-500'
//                   />
//                   <p className='font-medium'>{title}</p>
//                 </div>
//                 <div className='mb-2 flex items-center gap-2'>
//                   <div className='mb-2 flex h-10 w-10 gap-2 overflow-hidden rounded-full'>
//                     <img src={img} className='h-full w-full'></img>
//                   </div>
//                   <p className='text-sm text-muted-foreground'>
//                     created by maria Garcia
//                   </p>
//                 </div>
//                 <hr className='py-2'></hr>
//               </CardContent>
//               <CardFooter>
//                 <div className='flex w-full items-center justify-between'>
//                   <div className='flex gap-2'>
//                     <span className='text-xs text-muted-foreground'>
//                       Homepage
//                     </span>
//                     <Badge variant='outline'>Needs Review</Badge>
//                   </div>
//                   <Button className='bg-white text-sm text-yellow-500 shadow-none'>
//                     Continue
//                   </Button>
//                 </div>
//               </CardFooter>
//             </Card>
//           )
//         )}
//       </div>
//     </div>
//   )
// }
import { NotebookPen, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const drafts = [
  {
    title: 'Colombian Coffee Tasting Experience',
    author: 'María Garcia',
    time: '2 hours ago',
    status: 'Needs Review',
    avatar: 'https://i.pravatar.cc/40?img=12',
  },
  {
    title: 'Sunset Boat Tour to Islas del Rosario',
    author: 'Carlos Mendez',
    time: 'Yesterday',
    status: 'In Progress',
    avatar: 'https://i.pravatar.cc/40?img=32',
  },
  {
    title: 'Salsa Dancing Night at Café Havana',
    author: 'Ana Rodriguez',
    time: '3 days ago',
    status: 'Needs Review',
    avatar: 'https://i.pravatar.cc/40?img=48',
  },
]

export default function DraftEvents() {
  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='font-antigua text-lg font-semibold'>
            Drafts & Pending
          </h2>
          <p className='text-sm text-muted-foreground'>{drafts.length} items</p>
        </div>
      </div>

      {/* Cards */}
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
        {drafts.map((draft, i) => (
          <Card
            key={i}
            className='rounded-xl border bg-white p-4 pb-3 shadow-sm transition hover:shadow-md'
          >
            <CardContent className='flex h-full flex-col justify-between space-y-4 p-0'>
              {/* Title */}
              <div className='flex items-start gap-3 sm:items-center'>
                <div className='flex shrink-0 items-center justify-center rounded-lg bg-gold/10 p-2'>
                  <NotebookPen size={18} className='text-gold' />
                </div>

                <p className='truncate text-sm font-medium'>{draft.title}</p>
              </div>

              {/* Author */}
              <div className='flex items-center gap-2'>
                <img
                  src={draft.avatar}
                  className='h-6 w-6 shrink-0 rounded-full object-cover'
                />

                <p className='text-xs text-muted-foreground'>
                  Created by {draft.author}
                </p>
              </div>

              {/* Divider */}
              {/* <div className="h-px w-full bg-border" /> */}

              {/* Footer */}
              <CardFooter className='p-0'>
                <div className='flex w-full flex-wrap items-center justify-between gap-2 border-t pt-2 sm:pt-0'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                      <Clock size={14} />
                      {draft.time}
                    </div>

                    {draft.status === 'Needs Review' && (
                      <Badge className='rounded-full bg-red-100 text-xs font-normal text-red-600 hover:bg-red-100'>
                        Needs Review
                      </Badge>
                    )}

                    {draft.status === 'In Progress' && (
                      <Badge className='rounded-full bg-green-100 text-xs font-normal text-green-700 hover:bg-green-100'>
                        In Progress
                      </Badge>
                    )}
                  </div>

                  <Button
                    variant='ghost'
                    className='p-0 text-xs font-normal text-gold-light hover:bg-transparent hover:text-gold'
                  >
                    Continue →
                  </Button>
                </div>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    // <div className='space-y-5'>
    //   {/* Header */}

    //   <div className='flex items-start justify-between'>
    //     <div>
    //       <h2 className='font-antigua text-lg font-semibold'>
    //         Drafts & Pending
    //       </h2>
    //       <p className='text-sm text-muted-foreground'>{drafts.length} items</p>
    //     </div>
    //   </div>

    //   {/* Cards */}
    //   <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
    //     {drafts.map((draft, i) => (
    //       <Card key={i} className='rounded-xl border bg-white p-4 shadow-sm'>
    //         <CardContent className='space-y-4 p-0'>
    //           {/* Title */}
    //           <div className='flex items-center gap-3'>
    //             <div className='flex items-center justify-center rounded-lg bg-gold/10 p-2'>
    //               <NotebookPen size={18} className='text-gold' />
    //             </div>

    //             <p className='truncate text-sm font-medium'>{draft.title}</p>
    //           </div>

    //           {/* Author */}
    //           <div className='flex items-center gap-3'>
    //             <img
    //               src={draft.avatar}
    //               className='h-6 w-6 rounded-full object-cover'
    //             />

    //             <p className='text-xs text-muted-foreground'>
    //               Created by {draft.author}
    //             </p>
    //           </div>

    //           {/* Divider */}
    //           <div className='h-px w-full bg-border' />

    //           {/* Footer */}
    //           <CardFooter className='flex items-center justify-between p-0'>
    //             <div className='flex items-center gap-3'>
    //               <div className='flex items-center gap-1 text-xs text-muted-foreground'>
    //                 <Clock size={14} />
    //                 {draft.time}
    //               </div>

    //               {draft.status === 'Needs Review' && (
    //                 <Badge className='rounded-full bg-red-100 text-xs font-normal text-red-600 hover:bg-red-100'>
    //                   Needs Review
    //                 </Badge>
    //               )}

    //               {draft.status === 'In Progress' && (
    //                 <Badge className='rounded-full bg-green-100 text-xs font-normal text-green-700 hover:bg-green-100'>
    //                   In Progress
    //                 </Badge>
    //               )}
    //             </div>

    //             <Button
    //               variant='ghost'
    //               className='p-0 text-xs font-normal text-gold-light hover:bg-transparent hover:text-gold/50'
    //             >
    //               Continue →
    //             </Button>
    //           </CardFooter>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>
    // </div>
  )
}
