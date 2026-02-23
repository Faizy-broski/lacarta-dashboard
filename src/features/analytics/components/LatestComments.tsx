// // components/dashboard/LatestComments.tsx
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// const comments = [
//   {
//     author: "Carlos M.",
//     post: "Best Beaches in Cartagena",
//     comment: "Great article! Very helpful for planning our trip.",
//     date: "2 hours ago",
//   },
//   {
//     author: "Sarah J.",
//     post: "Street Food Guide",
//     comment: "The arepa stands you recommended were amazing!",
//     date: "4 hours ago",
//   },
//   {
//     author: "Miguel R.",
//     post: "Colonial Houses Tour",
//     comment: "Would love more photos of the interiors.",
//     date: "6 hours ago",
//   },
//   {
//     author: "Emily W.",
//     post: "Rosario Islands Day Trip",
//     comment: "What’s the best time of year to visit?",
//     date: "8 hours ago",
//   },
// ]
// export function LatestComments() {
//   return (
//     <Card className="my-10">
//       <CardHeader>
//         <div className="flex items-center justify-between">
//         <h3 className="font-semibold">Latest Comments</h3>
//         <Button className="text-xs bg-background border-none shadow-none text-red-500 font-bold">View all</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Author</TableHead>
//               <TableHead>Post</TableHead>
//               <TableHead>Comment</TableHead>
//               <TableHead className="text-right">Date</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {comments.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell className="flex items-center gap-2 font-bold">
//               <Avatar className="font-medium">
//                 <AvatarFallback >
//                   {item.author
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//                   {item.author}
//                 </TableCell>
//                 <TableCell className="text-red-600 font-bold">{item.post}</TableCell>
//                 <TableCell className="max-w-[420px] truncate">
//                   {item.comment}
//                 </TableCell>
//                 <TableCell className="text-right font-bold text-muted-foreground whitespace-nowrap">
//                   {item.date}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }
// components/dashboard/LatestComments.tsx
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

const comments = [
  {
    author: 'Carlos M.',
    post: 'Best Beaches in Cartagena',
    comment: 'Great article! Very helpful for planning our trip.',
    date: '2 hours ago',
  },
  {
    author: 'Sarah J.',
    post: 'Street Food Guide',
    comment: 'The arepa stands you recommended were amazing!',
    date: '4 hours ago',
  },
  {
    author: 'Miguel R.',
    post: 'Colonial Houses Tour',
    comment: 'Would love more photos of the interiors.',
    date: '6 hours ago',
  },
  {
    author: 'Emily W.',
    post: 'Rosario Islands Day Trip',
    comment: 'What’s the best time of year to visit?',
    date: '8 hours ago',
  },
  {
    author: 'Juan P.',
    post: 'Hotel Santa Clara Review',
    comment: 'Stayed here last month, highly recommend!',
    date: '12 hours ago',
  },
]

export function LatestComments() {
  return (
    <Card className='rounded-2xl bg-[#F9FAFB] px-8 shadow-sm'>
      {/* HEADER */}
      <div className='flex items-center justify-between'>
        <h2 className='font-antigua text-xl font-semibold'>Latest Comments</h2>

        <button className='text-sm font-medium text-red-600 hover:underline'>
          View all ›
        </button>
      </div>

      {/* TABLE HEADER */}
      <div className='grid grid-cols-4 border-b pb-2 text-sm tracking-wide text-muted-foreground'>
        <span>AUTHOR</span>
        <span>POST</span>
        <span>COMMENT</span>
        <span className='text-right'>DATE</span>
      </div>

      {/* ROWS */}
      <div>
        {comments.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-4 items-center border-b py-2 last:border-b-0'
          >
            {/* AUTHOR */}
            <div className='flex items-center gap-4'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700'>
                {item.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <span className='font-medium text-gray-900'>{item.author}</span>
            </div>

            {/* POST */}
            <span className='text-red-600'>{item.post}</span>

            {/* COMMENT */}
            <span className='truncate pr-2 text-gray-600'>{item.comment}</span>

            {/* DATE */}
            <span className='text-right whitespace-nowrap text-gray-500'>
              {item.date}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
