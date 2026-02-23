import {
  ReceiptText,
  // Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Tabs,
  TabsContent,
  // TabsList, TabsTrigger
} from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { AudienceGeography } from './components/AudienceGeography'
import { ContentCalendar } from './components/ContentCalendar'
import { LatestComments } from './components/LatestComments'
import { AccountStats } from './components/NewAccounts'
import { PendingApprovals } from './components/PendingApprovals'
import { RecentActivity } from './components/RecentActivity'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
import TabsPage from './components/StatCard.tsx'
import { TopArticles } from './components/TopArticles'
import { UsersWishlist } from './components/UsersWishlist'
import { VisitorsChart } from './components/VisitorsChart'
import { WishlistOverview } from './components/WishlistOverview'

export function AnalyticsPage() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header />

      <Main>
        <div className='mb-6 flex h-20 items-center justify-between space-y-1'>
          <div>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>
              Admin Analytics
            </h1>
          </div>
          <div>
            <Switch />
          </div>
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

        {/* Chart */}
        <VisitorsChart />
        {/* Top + Activity */}
        <div className='my-10 grid gap-6 lg:grid-cols-3'>
          <TopArticles className='lg:col-span-2' />
          <RecentActivity />
        </div>

        {/* Geo + Calendar + Approvals */}
        <div className='my-10 grid gap-6 lg:grid-cols-3'>
          <AudienceGeography />
          <ContentCalendar />
          <PendingApprovals />
        </div>

        {/* Wishlist */}
        <WishlistOverview />

        {/* Users + Comments */}
        <div className='my-10 grid gap-6 lg:grid-cols-3'>
          <UsersWishlist className='lg:col-span-2' />
          <AccountStats />
        </div>
        <LatestComments />
      </Main>
    </>
  )
}
