import { ReceiptText, 
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
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
import TabsPage from './components/StatCard.tsx'
import { VisitorsChart } from "./components/VisitorsChart";
import { TopArticles } from "./components/TopArticles";
import { RecentActivity } from "./components/RecentActivity";
import { AudienceGeography } from "./components/AudienceGeography";
import { ContentCalendar } from "./components/ContentCalendar";
import { PendingApprovals } from "./components/PendingApprovals";
import { WishlistOverview } from "./components/WishlistOverview";
import { UsersWishlist } from "./components/UsersWishlist";
import { LatestComments } from "./components/LatestComments";
import { NewAccounts } from "./components/NewAccounts";



export function AnalyticsPage() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header />

      <Main>
        <div className='mb-10 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Admin Analytics</h1>
          </div>
          <div>
            <Switch>
            </Switch>
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


 {/* Chart */}
      <VisitorsChart />
      {/* Top + Activity */}
      <div className="grid gap-6 my-10 lg:grid-cols-3">
        <TopArticles className="lg:col-span-2" />
        <RecentActivity />
      </div>

      {/* Geo + Calendar + Approvals */}
      <div className="grid gap-6  my-10 lg:grid-cols-3">
        <AudienceGeography />
        <ContentCalendar />
        <PendingApprovals />
      </div>

      {/* Wishlist */}
      <WishlistOverview />

      {/* Users + Comments */}
      <div className="grid gap-6 lg:grid-cols-3 my-10">
        <UsersWishlist className="lg:col-span-2" />
        <NewAccounts />
      </div>
        <LatestComments />

      </Main>
    </>
  )
}
