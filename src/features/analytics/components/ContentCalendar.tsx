// // components/dashboard/ContentCalendar.tsx
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Calendar } from "@/components/ui/calendar"
// export function ContentCalendar() {
//   return (
//     <Card>
//       <CardHeader className="flex-row items-center justify-between">
//         <h3 className="font-semibold">Content Calendar</h3>
//         <span className="text-xs text-muted-foreground">January 2025</span>
//       </CardHeader>
//       <CardContent className="flex justify-center">
//         <Calendar
//           mode="single"
//           selected={new Date()}
//           className="rounded-md border"
//         />
//       </CardContent>
//     </Card>
//   )
// }
// components/dashboard/ContentCalendar.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const scheduledDays = [
  new Date(2026, 0, 5),
  new Date(2026, 0, 12),
  new Date(2026, 0, 15),
  new Date(2026, 0, 18),
  new Date(2026, 0, 22),
  new Date(2026, 0, 28),
]

export function ContentCalendar() {
  return (
    <Card className='rounded-xl bg-[#F9FAFB] shadow-sm'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <h3 className='font-antigua text-lg font-semibold'>Content Calendar</h3>

        {/* <div className='flex items-center gap-3 text-sm text-muted-foreground'>
          <ChevronLeft className='h-4 w-4 cursor-pointer' />
          <span className='font-medium text-gray-800'>January 2026</span>
          <ChevronRight className='h-4 w-4 cursor-pointer' />
        </div> */}
      </CardHeader>

      <CardContent>
        <Calendar
          mode='single'
          month={new Date(2026, 0)}
          selected={new Date(2026, 0, 2)}
          showOutsideDays={false}
          fixedWeeks
          modifiers={{
            scheduled: scheduledDays,
          }}
          modifiersClassNames={{
            scheduled:
              'after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[#C9A227]',
          }}
          classNames={{
            caption: 'hidden',
            head_row: 'grid grid-cols-7 mb-4',
            head_cell: 'text-center text-xs font-medium text-muted-foreground',
            row: 'grid grid-cols-7 mt-3',
            cell: 'relative flex items-center justify-center h-11',
            day: `
              h-10 w-10 flex items-center justify-center 
              text-sm text-gray-700 rounded-full
              hover:bg-gray-200
            `,
            day_selected: `
              bg-[#C9A227] text-white rounded-full
              hover:bg-[#C9A227]
            `,
            day_today: 'text-[#C9A227]',
          }}
        />

        {/* Divider */}
        <div className='mt-6 flex items-center gap-6 border-t pt-4 text-xs text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <span className='h-2 w-2 rounded-full bg-[#C9A227]' />
            Today
          </div>

          <div className='flex items-center gap-2'>
            <span className='h-2 w-2 rounded-full bg-[#C9A227]/70' />
            Scheduled
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
