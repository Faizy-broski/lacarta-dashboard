import { ReceiptText, 
  // Plus 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import ActiveDeals from './components/ActiveDeals'
import ExpiredDeals from './components/ExpiredDeals'
import FeaturedDeals from './components/FeaturedDeals'
import ScheduledDeals from './components/ScheduledDeals'
import CreateDealModal from './components/createDealPage'
import DealsOverview from './components/filterDeals'
import PartnerSnapshot from './components/partnerSnapShot'
import TabsPage from './components/tabs.tsx'

export function DealsPage() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header />

      <Main>
        <div className='mb-10 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Deals</h1>
            <p className='text-xs text-muted-foreground'>
              Manage sponser offers and brands partnerships.
            </p>
          </div>
          <div>
            <Button className='mr-1 border bg-gray-100 text-black shadow hover:bg-black hover:text-white'>
              <ReceiptText size={30} /> Partner Directory
            </Button>
            <CreateDealModal />
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='mb-5 space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            <TabsPage />
          </TabsContent>
        </Tabs>

        <DealsOverview />
        <ActiveDeals />
        <ScheduledDeals />
        <ExpiredDeals />
        <FeaturedDeals />
        <PartnerSnapshot />
      </Main>
    </>
  )
}
