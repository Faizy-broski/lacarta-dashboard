// src/components/dashboard/EventsAndDeals.tsx
'use client'

import { useState } from 'react'
import { Check, X, Clock, FileText } from 'lucide-react'
// import { Calendar } from "@/components/ui/calendar"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { isSameDay } from "date-fns"
import EventsScheduled from './calender-sec'

const pendingDeals = [
  {
    title: 'Rooftop Bars Guide 2024',
    author: 'Sofía Rivera • Article • 2 hours ago',
    status: 'Needs Review',
    class: 'bg-[#22C55E]/5 text-[#22C55E]',
  },
  {
    title: 'Interview: Chef María López',
    author: 'Juan Pablo Gómez • Article • 5 hours ago',
    status: 'Needs Review',
    class: 'bg-[#22C55E]/5 text-[#22C55E]',
  },
  {
    title: 'Walled City Walking Tour',
    author: 'Ana García • Travel Tool • 1 day ago',
    status: 'Revision Requested',
    class: 'bg-[#CF9921]/5 text-[#CF9921]',
  },
]

export function EventsAndDeals() {
  const [date, setDate] = useState<Date | undefined>(new Date(2024, 11, 25))

  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {/* Events Scheduled - Calendar */}
      <EventsScheduled />

      {/* Pending Deals – unchanged, looks good */}
      <Card className='flex flex-col rounded-xl border bg-white p-4 shadow-sm'>
        <CardHeader className='px-0 pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='font-antigua text-base font-semibold'>
              Pending Deals
            </CardTitle>

            <Badge
              variant='secondary'
              className='flex items-center gap-1 rounded-full bg-[#FDF2E2] px-2 py-1 text-xs font-medium text-[#CF9921]'
            >
              <Clock className='h-3 w-3' />3
            </Badge>
          </div>

          <p className='text-sm text-muted-foreground'>
            3 items awaiting review
          </p>
        </CardHeader>

        <CardContent className='flex flex-col gap-3 px-0'>
          {pendingDeals.map((deal, i) => (
            <div
              key={i}
              className='flex items-center justify-between rounded-lg bg-[#F9FAFB] p-4'
            >
              {/* Left Section */}
              <div className='flex items-start gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#FDF2E2]'>
                  <FileText className='h-4 w-4 text-[#CF9921]' />
                </div>

                <div>
                  <p className='font-georgia text-sm font-medium text-gray-900'>
                    {deal.title}
                  </p>
                  <p className='text-xs text-muted-foreground'>{deal.author}</p>
                </div>
              </div>

              {/* Right Section */}
              <div className='flex items-center gap-2'>
                <Badge
                  className={`rounded-full border-none px-3 py-1 text-xs ${deal.class}`}
                >
                  {deal.status}
                </Badge>

                <Button
                  size='icon'
                  variant='ghost'
                  className='h-8 w-8 text-green-600 hover:text-green-700'
                >
                  <Check className='h-4 w-4' />
                </Button>

                <Button
                  size='icon'
                  variant='ghost'
                  className='h-8 w-8 text-red-600 hover:text-red-700'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}

          <Button
            variant='link'
            className='mt-2 self-center px-0 text-sm font-medium text-[#22C55E]'
          >
            View All Pending Items
          </Button>
        </CardContent>
      </Card>
      {/* <Card className='flex flex-col'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='font-antigua text-base font-medium'>
              Pending Deals
            </CardTitle>
            <Badge
              variant='secondary'
              className='rounded-full bg-[#FDF2E2] text-[#CF9921]'
            >
              <Clock className='mr-1 h-3 w-3' /> 3
            </Badge>
          </div>
          <span className='text-muted-foreground'>3 items awaiting review</span>
        </CardHeader>
        <CardContent className='flex-1 space-y-4 text-center'>
          {pendingDeals.map((deal, i) => (
            <div
              key={i}
              className='flex items-center justify-between rounded-md bg-gray-100 pb-3'
            >
              <div className='flex items-center gap-2'>
                <FileText className='text-[#CF9921]' />
                <div>
                  <p className='font-georgia font-normal'>{deal.title}</p>
                  <p className='text-xs text-muted-foreground'>{deal.author}</p>
                </div>
              </div>
              <div className='flex gap-1'>
                <Badge
                  variant='outline'
                  className={`mt-1 rounded-full border-none text-xs ${deal.class}`}
                >
                  {deal.status}
                </Badge>
                <Button
                  size='icon'
                  variant='ghost'
                  className='h-8 w-8 text-green-600 hover:text-green-700'
                >
                  <Check className='h-4 w-4' />
                </Button>
                <Button
                  size='icon'
                  variant='ghost'
                  className='h-8 w-8 text-red-600 hover:text-red-700'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}

          <Button variant='link' className='-center mt-2 px-0 text-[#22C55E]'>
            View All Pending Items
          </Button>
        </CardContent>
      </Card> */}
    </div>
  )
}
