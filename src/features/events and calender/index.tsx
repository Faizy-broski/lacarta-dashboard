import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

import CalendarView from "./components/CalendarView"
import UpcomingEvents from "./components/UpcomingEvents"
import FeaturedEvents from "./components/FeaturedEvents"
import DraftEvents from "./components/DraftEvents"
import EventCategories from "./components/EventCategories"
import Insights from "./components/Insights"

export function Events() {
  return (
    <>
    {/* ===== Top Heading ===== */}
              <Header>
                {/* <TopNav links={topNav} /> */}
                <Search />
                <div className='ms-auto flex items-center space-x-4'>
                  <Button>New Article</Button>
                  <ThemeSwitch />
                  {/* <ConfigDrawer /> */}
                  <ProfileDropdown />
                </div>
              </Header>
    
              <Main>
         <div className='mb-2 space-y-2'>
              <h1 className='text-2xl font-bold tracking-tight'>
                Events & Calender
              </h1>
              <p className='mb-10 text-xs text-muted-foreground'>
                Manage cultural events and calender visibility.
              </p>
            </div>

    <div className="space-y-8 p-6">
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
