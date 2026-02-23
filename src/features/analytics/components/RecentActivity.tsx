// // components/dashboard/RecentActivity.tsx
// import {
//   FileText,
//   UserPlus,
//   MessageSquare,
//   Image,
//   DollarSign,
// } from 'lucide-react'
// import { Card, CardContent, CardHeader } from '@/components/ui/card'
// const activities = [
//   {
//     icon: FileText,
//     text: 'New article published',
//     meta: 'Hidden Gems of Getsemaní',
//     time: '2 minutes ago',
//   },
//   {
//     icon: UserPlus,
//     text: 'New contributor joined',
//     meta: 'Carlos Méndez',
//     time: '15 minutes ago',
//   },
//   {
//     icon: MessageSquare,
//     text: 'Comment pending review',
//     meta: 'Beach Safety Tips',
//     time: '1 hour ago',
//   },
//   {
//     icon: Image,
//     text: 'Gallery uploaded',
//     meta: 'Sunset at Rosario Islands',
//     time: '2 hours ago',
//   },
//   {
//     icon: DollarSign,
//     text: 'Campaign payment received',
//     meta: '$450 from TravelCo',
//     time: '3 hours ago',
//   },
// ]
// export function RecentActivity() {
//   return (
//     <Card>
//       <CardHeader>
//         <h3 className='font-antigua font-semibold'>Recent Activity</h3>
//       </CardHeader>
//       <CardContent className='space-y-4'>
//         {activities.map((activity, index) => {
//           const Icon = activity.icon
//           return (
//             <div key={index} className='flex gap-3'>
//               <div className='flex h-9 w-9 items-center justify-center rounded-full bg-muted'>
//                 <Icon className='h-4 w-4 text-muted-foreground' />
//               </div>
//               <div className='flex-1'>
//                 <p className='text-sm leading-tight'>{activity.text}</p>
//                 <p className='text-xs text-muted-foreground'>{activity.meta}</p>
//               </div>
//               <span className='text-xs whitespace-nowrap text-muted-foreground'>
//                 {activity.time}
//               </span>
//             </div>
//           )
//         })}
//       </CardContent>
//     </Card>
//   )
// }
// components/dashboard/RecentActivity.tsx
import {
  FileText,
  UserPlus,
  MessageSquare,
  Image,
  DollarSign,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const activities = [
  {
    icon: FileText,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-100',
    text: 'New article published: "Hidden Gems of Getsemaní"',
    time: '2 minutes ago',
  },
  {
    icon: UserPlus,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    text: 'New contributor joined: Carlos Mendez',
    time: '15 minutes ago',
  },
  {
    icon: MessageSquare,
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    text: 'Comment pending review on "Beach Safety Tips"',
    time: '32 minutes ago',
  },
  {
    icon: Image,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-100',
    text: 'Gallery uploaded: "Sunset at Rosario Islands"',
    time: '1 hour ago',
  },
  {
    icon: DollarSign,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    text: 'Campaign payment received: $450 from TravelCo',
    time: '2 hours ago',
  },
]

export function RecentActivity() {
  return (
    <Card className='rounded-xl bg-[#F9FAFB] shadow-sm'>
      <CardHeader className='pb-2'>
        <h3 className='font-antigua text-lg font-semibold'>Recent Activity</h3>
      </CardHeader>

      <CardContent className='space-y-5'>
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div key={index} className='flex items-start gap-4'>
              {/* ICON */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.bgColor}`}
              >
                <Icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>

              {/* TEXT */}
              <div>
                <p className='text-sm text-gray-900'>{activity.text}</p>
                <p className='text-xs text-muted-foreground'>{activity.time}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
