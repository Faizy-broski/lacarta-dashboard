import { useState } from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { CalendarGrid, type CalendarEvent } from './components/CalendarGrid'
import DraftEvents from './components/DraftEvents'
import EventCategories from './components/EventCategories'
import FeaturedEvents from './components/FeaturedEvents'
import Insights from './components/Insights'
import UpcomingEvents from './components/UpcomingEvents'
import TabsPage from './components/tabs.tsx'

// ─── Dummy events (replace with DB fetch later) ─────────────────────────────
const DEMO_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Jazz Night at the Plaza',
    date: '2026-03-08',
    time: '20:00',
    category: 'Music',
  },
  {
    id: '2',
    title: 'Contemporary Art Expo',
    date: '2026-03-10',
    time: '10:00',
    category: 'Art',
  },
  {
    id: '3',
    title: 'Cartagena Food Fair',
    date: '2026-03-12',
    time: '11:00',
    category: 'Food',
  },
  {
    id: '4',
    title: 'Traditional Dance Show',
    date: '2026-03-15',
    time: '18:00',
    category: 'Culture',
  },
  {
    id: '5',
    title: 'Street Art Tour',
    date: '2026-03-18',
    time: '09:00',
    category: 'Art',
  },
  {
    id: '6',
    title: 'Cumbia Festival',
    date: '2026-03-20',
    time: '17:00',
    category: 'Festivals',
  },
  {
    id: '7',
    title: 'Wine & Culture Evening',
    date: '2026-03-22',
    time: '19:00',
    category: 'Food',
  },
  {
    id: '8',
    title: 'Literary Night',
    date: '2026-03-25',
    time: '20:00',
    category: 'Culture',
  },
  {
    id: '9',
    title: 'Salsa Music Live',
    date: '2026-03-11',
    time: '21:00',
    category: 'Music',
  },
  {
    id: '10',
    title: 'Vallenato Festival',
    date: '2026-03-11',
    time: '15:00',
    category: 'Festivals',
  },
  {
    id: '11',
    title: 'Gallery Vernissage',
    date: '2026-03-11',
    time: '14:00',
    category: 'Art',
  },
  {
    id: '12',
    title: 'Vallenato Festival',
    date: '2026-04-02',
    time: '15:00',
    category: 'Festivals',
  },
  {
    id: '13',
    title: 'Seafood Tasting Tour',
    date: '2026-04-10',
    time: '12:00',
    category: 'Food',
  },
  {
    id: '14',
    title: 'Gallery Vernissage',
    date: '2026-02-18',
    time: '14:00',
    category: 'Art',
  },
]

export function Events() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  return (
    <>
      <Header />

      <Main>
        <div className='mb-2 space-y-1'>
          <h1 className='font-antigua text-3xl font-bold tracking-tight'>
            Events & Calendar
          </h1>
          <p className='text-xs text-muted-foreground'>
            Manage cultural events and calendar visibility.
          </p>
        </div>

        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            <TabsPage />
          </TabsContent>
        </Tabs>

        <div className='space-y-8 p-2 sm:px-0 sm:py-6'>
          <CalendarGrid
            events={DEMO_EVENTS}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />
          <UpcomingEvents />
          <FeaturedEvents />
          <DraftEvents />
          <EventCategories />
          <Insights />
        </div>
      </Main>
    </>
  )
}
