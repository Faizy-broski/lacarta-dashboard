// // components/dashboard/UsersWishlist.tsx
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Heart } from "lucide-react"
// const users = [
//   { name: "Carlos Rodriguez", email: "carlos@gmail.com", items: 24 },
//   { name: "Maria Santos", email: "maria@gmail.com", items: 18 },
//   { name: "John Smith", email: "john@gmail.com", items: 15 },
//   { name: "Ana Garcia", email: "ana@gmail.com", items: 12 },
//   { name: "Pedro Martinez", email: "pedro@gmail.com", items: 9 },
// ]
// export function UsersWishlist({ className }: { className?: string }) {
//   return (
//     <Card className={className}>
//       <CardHeader>
//         <div className="flex  justify-between">
//         <h3 className="font-bold text-lg">Users with Wishlist</h3>
//         <Button className="text-xs text-red-500 font-bold border-none bg-background shadow-none">View All</Button>
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         {users.map((user, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between gap-3 rounded-lg border p-3"
//           >
//             <div className="flex items-center gap-3">
//               <Avatar>
//                 <AvatarFallback>
//                   {user.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="text-sm font-medium leading-none">
//                   {user.name}
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   {user.email}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-1 text-sm">
//               <Heart className="h-4 w-4 text-red-500" />
//               {user.items}
//             </div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   )
// }
// components/dashboard/UsersWishlist.tsx
import { Heart } from 'lucide-react'
import { Card } from '@/components/ui/card'

const users = [
  { name: 'Carlos Rodriguez', email: 'carlos.r@email.com', items: 24 },
  { name: 'Maria Santos', email: 'maria.santos@email.com', items: 18 },
  { name: 'John Smith', email: 'john.s@email.com', items: 15 },
  { name: 'Ana Garcia', email: 'ana.g@email.com', items: 12 },
  { name: 'Pedro Martinez', email: 'pedro.m@email.com', items: 9 },
  { name: 'John Smith', email: 'john.s@email.com', items: 15 },
]

export function UsersWishlist({ className }: { className?: string }) {
  return (
    <Card className={`rounded-2xl bg-[#F9FAFB] px-8 shadow-sm ${className}`}>
      {/* HEADER */}
      <div className='flex items-center justify-between'>
        <h2 className='font-antigua text-xl font-semibold'>
          Users with Wishlist
        </h2>

        <button className='text-sm font-medium text-red-600 hover:underline'>
          View all ›
        </button>
      </div>

      {/* TABLE HEADER */}
      <div className='grid grid-cols-3 border-b pb-2 text-sm text-muted-foreground'>
        <span>USER</span>
        <span>EMAIL</span>
        <span className='text-right'>WISHLIST ITEMS</span>
      </div>

      {/* ROWS */}
      <div>
        {users.map((user, index) => (
          <div
            key={index}
            className='grid grid-cols-3 items-center border-b py-2 last:border-b-0'
          >
            {/* USER */}
            <div className='flex items-center gap-4'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700'>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>

              <span className='font-medium text-gray-900'>{user.name}</span>
            </div>

            {/* EMAIL */}
            <span className='text-gray-600'>{user.email}</span>

            {/* WISHLIST COUNT */}
            <div className='flex items-center justify-end gap-2'>
              <Heart className='h-4 w-4 text-red-600' />
              <span className='font-semibold text-red-600'>{user.items}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
