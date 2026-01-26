// import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  // TabsList, TabsTrigger
} from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
import CalendarView from './components/CalendarView'
import DraftEvents from './components/DraftEvents'
import EventCategories from './components/EventCategories'
import FeaturedEvents from './components/FeaturedEvents'
import Insights from './components/Insights'
import UpcomingEvents from './components/UpcomingEvents'
import TabsPage from './components/tabs.tsx'

export function Events() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header />

      <Main>
        <div className='mb-2 space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Events & Calender
          </h1>
          <p className='mb-10 text-xs text-muted-foreground'>
            Manage cultural events and calender visibility.
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

        <div className='space-y-8 p-6'>
          <CalendarView />
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
