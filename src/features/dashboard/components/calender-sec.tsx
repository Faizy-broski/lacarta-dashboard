import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'

const upcoming = [
  {
    name: 'Beach Guide',
    color: 'bg-gradient-to-r from-[#CF9921] to-[#D2BB6B]',
  },
  {
    name: 'Restaurant Review',
    color: 'bg-gradient-to-r from-[#980001] to-[#D40D00]',
  },
  {
    name: 'Hotel Feature',
    color: 'bg-gradient-to-r from-[#22C55E]  to-[#105F2D]',
  },
  {
    name: 'Local Events',
    color: 'bg-gradient-to-r from-[#6FC6E2] to-[#1B81B2]',
  },
]

const eventDays = {
  beach: [new Date(2024, 11, 3)],
  restaurant: [new Date(2024, 11, 5), new Date(2024, 11, 18)],
  hotel: [new Date(2024, 11, 8), new Date(2024, 11, 25)],
  local: [new Date(2024, 11, 12), new Date(2024, 11, 15)],
}

export default function EventsScheduled() {
  const [date, setDate] = useState<Date | undefined>(new Date(2024, 12, 25)) // December = 11

  return (
    <>
      {/* ====================== CALENDAR CARD ====================== */}
      <Card className='overflow-hidden rounded-xl border bg-[#F9FAFB] shadow-sm'>
        <CardHeader className='px-6 pt-5 pb-2'>
          <div className='flex items-start justify-between'>
            <div>
              <CardTitle className='font-antigua text-xl font-semibold'>
                Events Scheduled
              </CardTitle>
              <p className='mt-1 text-sm text-muted-foreground'>
                December 2024
              </p>
            </div>

            {/* Arrows */}
            <div className='flex items-center gap-3 text-muted-foreground'>
              <button className='hover:text-black'>‹</button>
              <button className='hover:text-black'>›</button>
            </div>
          </div>
        </CardHeader>

        <CardContent className='px-6'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            month={new Date(2024, 11)}
            showOutsideDays={false}
            fixedWeeks
            modifiers={eventDays}
            modifiersClassNames={{
              beach:
                'after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-yellow-500',
              restaurant:
                'after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-green-500',
              hotel:
                'after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-red-500',
              local:
                'after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-blue-500',
            }}
            className='w-full'
            classNames={{
              months: 'w-full',
              month: 'w-full',
              table: 'w-full border-collapse',
              head_row: 'grid grid-cols-7 mb-3',
              head_cell:
                'text-center text-xs font-medium text-muted-foreground',
              row: 'grid grid-cols-7 mt-3',
              cell: 'relative flex items-center justify-center h-11',
              day: `
      h-10 w-10 flex items-center justify-center 
      text-sm font-normal text-gray-700 
      rounded-full hover:bg-gray-200
    `,
              day_selected: `
      border-2 border-teal-500 
      text-red-600 
      bg-transparent 
      rounded-xl
    `,
              day_today: 'bg-transparent',
              caption: 'hidden', // remove default month header
            }}
          />
          {/* <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            modifiers={eventDays}
            modifiersClassNames={{
              beach:
                'after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-yellow-500',
              restaurant:
                'after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-green-500',
              hotel:
                'after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-red-500',
              local:
                'after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-blue-500',
            }}
            className='w-full'
            classNames={{
              // months: 'w-full',
              // month: 'w-full space-y-4',
              // head_row: 'flex justify-between',
              head_row: 'flex w-full',

              head_cell:
                'w-9 text-xs font-medium text-muted-foreground text-center',
              // row: 'flex justify-between mt-3',
              cell: 'relative h-10 w-9 text-center',
              day: 'h-9 w-9 text-sm font-normal rounded-full hover:bg-gray-200',
              day_selected:
                'border-2 border-teal-500 text-red-600 bg-transparent rounded-xl',
              day_today: 'bg-transparent',
            }}
          />
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-md'
            classNames={{
              head_row: 'flex',
              head_cell:
                'text-muted-foreground rounded-md mx-auto  font-medium text-xs',
              row: 'flex mt-2',
              cell: cn(
                'relative p-0 text-center text-sm',
                'focus-within:relative focus-within:z-20'
              ),
              day: cn(
                'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground'
              ),
              day_selected:
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
              day_today: 'bg-accent text-accent-foreground',
            }}
          /> */}

          {/* Divider */}
          {/* <div className='mt-6 border-t pt-4'>
            <h3 className='text-sm font-medium text-muted-foreground'>
              Upcoming
            </h3>

            <div className='mt-3 flex flex-wrap gap-2'>
              {upcoming.map((item) => (
                <Badge
                  key={item.name}
                  className={`rounded-full px-4 py-1 text-xs font-medium text-white ${item.color}`}
                >
                  {item.name}
                </Badge>
              ))}
            </div>
          </div> */}
        </CardContent>
        <CardFooter className='border-t p-2'>
          <div className='space-y-3'>
            {/* <h3 className='text-lg font-semibold'>Upcoming</h3> */}
            <h3 className='text-sm font-medium text-muted-foreground'>
              Upcoming
            </h3>

            {/* <div className='flex gap-2'>
              {upcoming.map((item) => (
                <Badge
                  key={item.name}
                  variant='secondary'
                  className={cn(
                    'text-xsm px-3 py-1 font-medium',
                    item.color,
                    'text-white transition-opacity hover:opacity-90'
                  )}
                >
                  {item.name}
                </Badge>
              ))}
            </div> */}
            <div className='mt-3 flex flex-wrap gap-2'>
              {upcoming.map((item) => (
                <Badge
                  key={item.name}
                  className={`rounded-full px-3 py-1 text-xs font-medium text-white ${item.color}`}
                >
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
      {/* <Card className='overflow-hidden border p-0 shadow-sm'>
        <CardHeader className='pt-4 pb-2'>
          <div className='flex items-center justify-between'>
            <CardTitle className='font-antigua text-xl font-semibold'>
              Events Scheduled
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className='px-3 pt-1 pb-6 sm:px-6'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-md'
            classNames={{
              head_row: 'flex',
              head_cell:
                'text-muted-foreground rounded-md mx-auto  font-medium text-xs',
              row: 'flex mt-2',
              cell: cn(
                'relative p-0 text-center text-sm',
                'focus-within:relative focus-within:z-20'
              ),
              day: cn(
                'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground'
              ),
              day_selected:
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
              day_today: 'bg-accent text-accent-foreground',
            }}
          />
        </CardContent>
        <CardFooter className='p-2'>
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold'>Upcoming</h3>

            <div className='flex gap-2'>
              {upcoming.map((item) => (
                <Badge
                  key={item.name}
                  variant='secondary'
                  className={cn(
                    'text-xsm px-3 py-1 font-medium',
                    item.color,
                    'text-white transition-opacity hover:opacity-90'
                  )}
                >
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card> */}
    </>
  )
}
