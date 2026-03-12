// // components/dashboard/PendingApprovals.tsx
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// const approvals = [
//   {
//     type: "Article",
//     title: "Weekend Guide to Bocagrande",
//   },
//   {
//     type: "Comment",
//     title: "Great tips for tourists!",
//   },
//   {
//     type: "Listing",
//     title: "Villa Carmen – ABR Colonial",
//   },
// ]
// export function PendingApprovals() {
//   return (
//     <Card>
//       <CardHeader className="flex-row items-center justify-between">
//         <h3 className="font-semibold">Pending Approvals</h3>
//         <Button variant="ghost" size="sm">
//           Review all
//         </Button>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {approvals.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between gap-4"
//           >
//             <div>
//               <p className="text-sm font-medium leading-tight">
//                 {item.title}
//               </p>
//               <Badge variant="secondary" className="mt-1 text-xs">
//                 {item.type}
//               </Badge>
//             </div>
//             <Button size="sm" variant="outline">
//               Review
//             </Button>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   )
// }
// components/dashboard/PendingApprovals.tsx
import { CircleAlert } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const approvals = [
  {
    type: 'ARTICLE',
    title: 'Weekend Guide to Bocagrande',
  },
  {
    type: 'COMMENT',
    title: 'Great tips for tourists!',
  },
  {
    type: 'LISTING',
    title: 'Villa Carmen - 4BR Colonial',
  },
]

export function PendingApprovals() {
  return (
    <Card className='rounded-xl bg-[#F9FAFB] shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div className='flex items-center gap-3'>
          <h3 className='font-antigua text-lg font-semibold'>
            Pending Approvals
          </h3>

          <span className='rounded-full bg-[#CF9921]/10 px-3 py-0.5 text-xs font-medium text-[#CF9921]'>
            23 items
          </span>
        </div>

        <button className='text-sm font-medium text-red-600 hover:underline'>
          Review all ›
        </button>
      </CardHeader>

      <CardContent className='space-y-4'>
        {approvals.map((item, index) => (
          <div
            key={index}
            className='flex items-center gap-4 rounded-xl bg-gray-100 p-4'
          >
            {/* Icon */}
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#CF9921]/10'>
              <CircleAlert className='h-4 w-4 text-[#CF9921]' />
            </div>

            {/* Text */}
            <div>
              <p className='text-xs font-semibold tracking-wide text-muted-foreground'>
                {item.type}
              </p>
              <p className='text-sm font-medium text-gray-900'>{item.title}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
