import { useRef, useState } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  List,
  LayoutGrid,
} from 'lucide-react'
import { Button } from './ui/button'

function Legend({ color, label }: any) {
  return (
    <div className='flex items-center gap-2'>
      <span className={`h-3 w-3 rounded-full ${color}`} />
      {label}
    </div>
  )
}

export default function EventsCalendar() {
  const calendarRef = useRef<any>(null)
  const [title, setTitle] = useState('')
  const [view, setView] = useState('dayGridMonth')

  const handleDates = (arg: any) => {
    setTitle(arg.view.title)
  }

  const changeView = (newView: string) => {
    const api = calendarRef.current.getApi()
    api.changeView(newView)
    setView(newView)
  }

  const prev = () => calendarRef.current.getApi().prev()
  const next = () => calendarRef.current.getApi().next()

  const events = [
    {
      title: 'Jazz Night',
      date: '2026-01-08',
      extendedProps: { category: 'music' },
    },
    {
      title: 'Contemporary Art',
      date: '2026-01-10',
      extendedProps: { category: 'art' },
    },
    {
      title: 'Cartagena Food Festival',
      date: '2026-01-12',
      extendedProps: { category: 'music' },
    },
    {
      title: 'Cumbia Festival',
      date: '2026-01-20',
      extendedProps: { category: 'art' },
    },
    {
      title: 'Wine & Culture',
      date: '2026-01-22',
      extendedProps: { category: 'music' },
    },
    {
      title: 'Literary Night',
      date: '2026-01-25',
      extendedProps: { category: 'art' },
    },
  ]

  return (
    <div className='rounded-2xl border bg-white p-6'>
      {/* Toolbar */}
      <div className='mb-6 flex items-center justify-between'>
        {/* Month Navigation */}
        <div className='flex items-center gap-4'>
          <Button
            variant={'ghost'}
            onClick={prev}
            className='rounded-md p-2 hover:bg-gray-100'
          >
            <ChevronLeft size={20} />
          </Button>

          <h2 className='font-antigua text-2xl font-semibold'>{title}</h2>

          <Button
            variant={'ghost'}
            onClick={next}
            className='rounded-md p-2 hover:bg-gray-100'
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* View Tabs */}
        <div className='flex items-center rounded-lg bg-gray-100 p-1'>
          <button
            onClick={() => changeView('dayGridMonth')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${view === 'dayGridMonth' ? 'bg-white shadow' : ''} `}
          >
            <LayoutGrid size={16} />
            Month
          </button>

          <button
            onClick={() => changeView('timeGridWeek')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${view === 'timeGridWeek' ? 'bg-white shadow' : ''} `}
          >
            <Calendar size={16} />
            Week
          </button>

          <button
            onClick={() => changeView('listMonth')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${view === 'listMonth' ? 'bg-white shadow' : ''} `}
          >
            <List size={16} />
            List
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className='w-full overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='flex flex-wrap gap-6 text-sm text-gray-600'>
            <Legend color='bg-purple-500' label='Music' />
            <Legend color='bg-blue-500' label='Art' />
            <Legend color='bg-green-500' label='Food' />
            <Legend color='bg-yellow-500' label='Culture' />
            <Legend color='bg-red-500' label='Festivals' />
          </div>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView='dayGridMonth'
            headerToolbar={false}
            events={events}
            datesSet={handleDates}
            height='auto'
            fixedWeekCount={false}
            showNonCurrentDates={false}
            dayMaxEvents={2}
            eventContent={(info) => {
              const category = info.event.extendedProps.category

              const colors = {
                music: 'bg-purple-100 text-purple-700 border-purple-200',
                culture: 'bg-blue-100 text-blue-700 ',
                food: 'bg-green-100 text-green-700 ',
                art: 'bg-yellow-100 text-yellow-700 ',
                festival: 'bg-red-100 text-red-700 border-red-200',
              }

              return (
                <div
                  className={`flex w-full items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium  ${colors[category]}`}
                >
                  <span className='h-1.5 w-1.5 rounded-full bg-current'></span>
                  <span className='truncate'>{info.event.title}</span>
                </div>
              )
            }}
          />{' '}
        </div>
      </div>
      {/* <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView='dayGridMonth'
        headerToolbar={false}
        events={events}
        eventContent={(info) => {
          const category = info.event.extendedProps.category

          const colors = {
            music: 'bg-purple-100 text-purple-700',
            art: 'bg-blue-100 text-blue-700',
            food: 'bg-green-100 text-green-700',
            festival: 'bg-red-100 text-red-700',
          }

          return (
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${colors[category]}`}
            >
              <span className='h-2 w-2 rounded-full bg-current'></span>
              {info.event.title}
            </div>
          )
        }}
        datesSet={handleDates}
        height='auto'
      /> */}
    </div>
  )
}
