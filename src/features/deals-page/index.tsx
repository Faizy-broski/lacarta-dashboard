import {
  Tabs,
  TabsContent,
  // TabsList, TabsTrigger
} from '@/components/ui/tabs'

import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

import ActiveDeals from "./components/ActiveDeals"
import ScheduledDeals from "./components/ScheduledDeals"
import ExpiredDeals from "./components/ExpiredDeals"
import FeaturedDeals from "./components/FeaturedDeals"
import TabsPage from "./components/tabs.tsx"

export function DealsPage() {
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
                        Deals
                      </h1>
                      <p className='mb-10 text-xs text-muted-foreground'>
                        Manage sponser offers and brands partnerships.
                      </p>
                    </div>
        
                    <Tabs 
                              orientation='vertical'
                              defaultValue='overview'
                              className='space-y-4 mb-5'
                            >
                             
                              <TabsContent value='overview' className='space-y-4'>
                                <TabsPage /> 
                              </TabsContent>
                            </Tabs>

      <ActiveDeals />
      <ScheduledDeals />
      <ExpiredDeals />
      <FeaturedDeals />

      </Main>
    </>
  )
}
