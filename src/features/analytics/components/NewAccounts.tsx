// // components/dashboard/PendingApprovals.tsx
// import { Star } from 'lucide-react'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader } from '@/components/ui/card'
// export function NewAccounts() {
//   return (
//     <>
//       <Card className='border-none p-0 shadow-none'>
//         <CardContent className='space-y-4 p-0'>
//           <Card>
//             <CardContent>
//               <CardHeader className='p-0'>
//                 <div className='flex justify-between'>
//                   <div>
//                     <h3 className='text-md font-bold'>New Accounts</h3>
//                   </div>
//                   <div>
//                     <p className='text-sm text-muted-foreground'>
//                       Last 30 Days
//                     </p>
//                   </div>
//                 </div>
//               </CardHeader>
//               <div className='flex items-center gap-3'>
//                 <div>
//                   <Star
//                     size={50}
//                     className='rounded bg-yellow-50 p-2 text-yellow-500'
//                   />
//                 </div>
//                 <div>
//                   <div className='flex gap-2'>
//                     <h2 className='text-md font-bold text-black'>447</h2>
//                     <p className='font-semibold text-yellow-600'>12.5%</p>
//                   </div>
//                   <p className='text-sm text-muted-foreground'>
//                     New Registered Users
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//             <div className='my-2 grid grid-cols-3 border-t pt-3 text-center'>
//               <div>
//                 <h3 className='text-sm font-bold'>678</h3>
//                 <p className='text-sm font-semibold text-muted-foreground'>
//                   FaceBook
//                 </p>
//               </div>
//               <div>
//                 <h3 className='text-sm font-bold'>498</h3>
//                 <p className='text-sm font-semibold text-muted-foreground'>
//                   Google
//                 </p>
//               </div>
//               <div>
//                 <h3 className='text-sm font-bold'>218</h3>
//                 <p className='text-sm font-semibold text-muted-foreground'>
//                   Email
//                 </p>
//               </div>
//             </div>
//           </Card>
//           <Card>
//             <CardContent>
//               <CardHeader className='p-0'>
//                 <div className='flex justify-between'>
//                   <div>
//                     <h3 className='text-md font-bold'>Total Clients</h3>
//                   </div>
//                   <div>
//                     <p className='text-sm text-muted-foreground'>
//                       Last 30 Days
//                     </p>
//                   </div>
//                 </div>
//               </CardHeader>
//               <div className='flex items-center gap-3'>
//                 <div>
//                   <Star
//                     size={50}
//                     className='rounded bg-yellow-50 p-2 text-yellow-500'
//                   />
//                 </div>
//                 <div>
//                   <div className='flex gap-2'>
//                     <h2 className='text-md font-bold text-black'>447</h2>
//                     <p className='font-semibold text-yellow-600'>12.5%</p>
//                   </div>
//                   <p className='text-sm text-muted-foreground'>
//                     New Registered Users
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//             <div className='my-2 grid grid-cols-5 gap-2 border-t px-1 pt-3 text-center'>
//               <div>
//                 <h3 className='text-sm font-bold'>678</h3>
//                 <p className='text-xs font-semibold text-muted-foreground'>
//                   FaceBook
//                 </p>
//               </div>
//               <div>
//                 <h3 className='text-sm font-bold'>678</h3>
//                 <p className='text-xs font-semibold text-muted-foreground'>
//                   FaceBook
//                 </p>
//               </div>
//               <div>
//                 <h3 className='text-sm font-bold'>678</h3>
//                 <p className='text-xs font-semibold text-muted-foreground'>
//                   FaceBook
//                 </p>
//               </div>
//               <div>
//                 <h3 className='text-sm font-bold'>498</h3>
//                 <p className='text-xs font-semibold text-muted-foreground'>
//                   Google
//                 </p>
//               </div>
//               <div>
//                 <h3 className='text-sm font-bold'>218</h3>
//                 <p className='text-xs font-semibold text-muted-foreground'>
//                   Email
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </CardContent>
//       </Card>
//     </>
//   )
// }
// components/dashboard/AccountStats.tsx
import { Users, ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function AccountStats() {
  return (
    <div className='space-y-6'>
      {/* ================= NEW ACCOUNTS ================= */}
      <Card className='rounded-2xl bg-[#F9FAFB] px-4 shadow-sm'>
        {/* Header */}
        <div className='mb-2 flex items-center justify-between'>
          <h2 className='font-antigua text-xl font-semibold'>New Accounts</h2>
          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            Last 30 Days
            <ChevronDown className='h-4 w-4' />
          </div>
        </div>

        {/* Main KPI */}
        <div className='flex items-center gap-6'>
          <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100'>
            <Users className='h-8 w-8 text-green-600' />
          </div>

          <div>
            <div className='flex items-center gap-3'>
              <span className='text-4xl font-semibold text-gray-900'>847</span>
              <span className='flex items-center gap-1 font-medium text-green-600'>
                ↗ +12.5%
              </span>
            </div>

            <p className='mt-1 text-sm text-muted-foreground'>
              new registered users
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className='my-2 border-t' />

        {/* Bottom Stats */}
        <div className='grid grid-cols-3 text-center'>
          <div>
            <p className='text-xl font-semibold'>412</p>
            <p className='text-sm text-muted-foreground'>Facebook</p>
          </div>
          <div>
            <p className='text-xl font-semibold'>298</p>
            <p className='text-sm text-muted-foreground'>Google</p>
          </div>
          <div>
            <p className='text-xl font-semibold'>137</p>
            <p className='text-sm text-muted-foreground'>Email</p>
          </div>
        </div>
      </Card>

      {/* ================= TOTAL CLIENTS ================= */}
      <Card className='rounded-2xl bg-[#F9FAFB] px-4 shadow-sm'>
        {/* Header */}
        <div className='mb-2 flex items-center justify-between'>
          <h2 className='font-antigua text-xl font-semibold'>Total Clients</h2>
          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            Last 30 Days
            <ChevronDown className='h-4 w-4' />
          </div>
        </div>

        {/* Main KPI */}
        <div className='flex items-center gap-6'>
          <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100'>
            <Users className='h-8 w-8 text-yellow-600' />
          </div>

          <div>
            <div className='flex items-center gap-3'>
              <span className='text-4xl font-semibold text-gray-900'>447</span>
              <span className='flex items-center gap-1 font-medium text-yellow-600'>
                ↗ +12.5%
              </span>
            </div>

            <p className='mt-1 text-sm text-muted-foreground'>
              listing of clients
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className='my-2 border-t' />

        {/* Bottom Stats */}
        <div className='grid grid-cols-5 text-center'>
          <div>
            <p className='text-lg font-semibold'>412</p>
            <p className='truncate text-xs text-muted-foreground'>Gastronomy</p>
          </div>
          <div>
            <p className='text-lg font-semibold'>298</p>
            <p className='truncate text-xs text-muted-foreground'>
              Real Estate
            </p>
          </div>
          <div>
            <p className='text-lg font-semibold'>137</p>
            <p className='text-xs text-muted-foreground'>Beaches</p>
          </div>
          <div>
            <p className='text-lg font-semibold'>137</p>
            <p className='truncate text-xs text-muted-foreground'>
              Accommodations
            </p>
          </div>
          <div>
            <p className='text-lg font-semibold'>137</p>
            <p className='text-xs text-muted-foreground'>Beaches</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
