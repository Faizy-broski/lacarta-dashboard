// import { Button } from '@/components/ui/button'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { ConfigDrawer } from '@/components/config-drawer'
// import { Header } from '@/components/layout/header'
// import { Main } from '@/components/layout/main'
// import { TopNav } from '@/components/layout/top-nav'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
// import { Analytics } from './components/analytics'
// import { Overview } from './components/overview'
// import { RecentSales } from './components/recent-sales'
// export function Dashboard() {
//   return (
//     <>
//       {/* ===== Top Heading ===== */}
//       <Header>
//         <TopNav links={topNav} />
//         <div className='ms-auto flex items-center space-x-4'>
//           <Search />
//           <ThemeSwitch />
//           <ConfigDrawer />
//           <ProfileDropdown />
//         </div>
//       </Header>
//       {/* ===== Main ===== */}
//       <Main>
//         <div className='mb-2 flex items-center justify-between space-y-2'>
//           <h1 className='text-2xl font-bold tracking-tight'>Welcome back, <span className='text-2xl font-bold tracking-tight'>Maria</span></h1>
//           <div className='flex items-center space-x-2'>
//             <Button>Download</Button>
//           </div>
//         </div>
//         <Tabs
//           orientation='vertical'
//           defaultValue='overview'
//           className='space-y-4'
//         >
//           {/* <div className='w-full overflow-x-auto pb-2'>
//             <TabsList>
//               <TabsTrigger value='overview'>Overview</TabsTrigger>
//               <TabsTrigger value='analytics'>Analytics</TabsTrigger>
//               <TabsTrigger value='reports' disabled>
//                 Reports
//               </TabsTrigger>
//               <TabsTrigger value='notifications' disabled>
//                 Notifications
//               </TabsTrigger>
//             </TabsList>
//           </div> */}
//           <TabsContent value='overview' className='space-y-4'>
//             <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-6'>
//               <Card>
//                 <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                   <CardTitle className='text-sm font-medium'>
//                     Total Publisheds
//                   </CardTitle>
//                   <svg
//                     xmlns='http://www.w3.org/2000/svg'
//                     viewBox='0 0 24 24'
//                     fill='none'
//                     stroke='currentColor'
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     strokeWidth='2'
//                     className='h-4 w-4 text-muted-foreground'
//                   >
//                     <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
//                   </svg>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='text-2xl font-bold'>247</div>
//                   <p className='text-xs text-muted-foreground'>
//                     Articles
//                   </p>
//                 </CardContent>
//               </Card>
//                  <Card>
//                 <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                   <CardTitle className='text-sm font-medium'>
//                     Total Publisheds
//                   </CardTitle>
//                   <svg
//                     xmlns='http://www.w3.org/2000/svg'
//                     viewBox='0 0 24 24'
//                     fill='none'
//                     stroke='currentColor'
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     strokeWidth='2'
//                     className='h-4 w-4 text-muted-foreground'
//                   >
//                     <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
//                   </svg>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='text-2xl font-bold'>247</div>
//                   <p className='text-xs text-muted-foreground'>
//                     Articles
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                   <CardTitle className='text-sm font-medium'>
//                     Awaiting Reviews
//                   </CardTitle>
//                   <svg
//                     xmlns='http://www.w3.org/2000/svg'
//                     viewBox='0 0 24 24'
//                     fill='none'
//                     stroke='currentColor'
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     strokeWidth='2'
//                     className='h-4 w-4 text-muted-foreground'
//                   >
//                     <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
//                     <circle cx='9' cy='7' r='4' />
//                     <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
//                   </svg>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='text-2xl font-bold'>18</div>
//                   <p className='text-xs text-muted-foreground'>
//                     Drafts
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                   <CardTitle className='text-sm font-medium'>Active Catagories</CardTitle>
//                   <svg
//                     xmlns='http://www.w3.org/2000/svg'
//                     viewBox='0 0 24 24'
//                     fill='none'
//                     stroke='currentColor'
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     strokeWidth='2'
//                     className='h-4 w-4 text-muted-foreground'
//                   >
//                     <rect width='20' height='14' x='2' y='5' rx='2' />
//                     <path d='M2 10h20' />
//                   </svg>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='text-2xl font-bold'>14</div>
//                   <p className='text-xs text-muted-foreground'>
//                     Categories
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                   <CardTitle className='text-sm font-medium'>
//                    Homepage Stories
//                   </CardTitle>
//                   <svg
//                     xmlns='http://www.w3.org/2000/svg'
//                     viewBox='0 0 24 24'
//                     fill='none'
//                     stroke='currentColor'
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     strokeWidth='2'
//                     className='h-4 w-4 text-muted-foreground'
//                   >
//                     <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
//                   </svg>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='text-2xl font-bold'>6</div>
//                   <p className='text-xs text-muted-foreground'>
//                     Featured
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//                   <CardTitle className='text-sm font-medium'>
//                    Guides & Planners
//                                      </CardTitle>
//                   <svg
//                     xmlns='http://www.w3.org/2000/svg'
//                     viewBox='0 0 24 24'
//                     fill='none'
//                     stroke='currentColor'
//                     strokeLinecap='round'
//                     strokeLinejoin='round'
//                     strokeWidth='2'
//                     className='h-4 w-4 text-muted-foreground'
//                   >
//                     <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
//                   </svg>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='text-2xl font-bold'>28</div>
//                   <p className='text-xs text-muted-foreground'>
//                     Travel Tools
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//             <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
//               <Card className='col-span-1 lg:col-span-4'>
//                 <CardHeader>
//                   <CardTitle>Overview</CardTitle>
//                 </CardHeader>
//                 <CardContent className='ps-2'>
//                   <Overview />
//                 </CardContent>
//               </Card>
//               <Card className='col-span-1 lg:col-span-3'>
//                 <CardHeader>
//                   <CardTitle>Recent Sales</CardTitle>
//                   <CardDescription>
//                     You made 265 sales this month.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <RecentSales />
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//           <TabsContent value='analytics' className='space-y-4'>
//             <Analytics />
//           </TabsContent>
//         </Tabs>
//       </Main>
//     </>
//   )
// }
// const topNav = [
//   {
//     title: 'Overview',
//     href: 'dashboard/overview',
//     isActive: true,
//     disabled: false,
//   },
//   {
//     title: 'Customers',
//     href: 'dashboard/customers',
//     isActive: false,
//     disabled: true,
//   },
//   {
//     title: 'Products',
//     href: 'dashboard/products',
//     isActive: false,
//     disabled: true,
//   },
//   {
//     title: 'Settings',
//     href: 'dashboard/settings',
//     isActive: false,
//     disabled: true,
//   },
// ]
// import React from 'react'
// import { Plus, Bell } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { RecentSales } from './components/recent-sales'
import {
  Eye,
  Users,
  FileText,
  Mail,
  Link as LinkIcon,
  TrendingUp,
  Clock,
  TrendingDown,
} from 'lucide-react'
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  // CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  // TabsList, TabsTrigger
} from '@/components/ui/tabs'
// import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
// import { TopNav } from '@/components/layout/top-nav'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
// import { Overview } from './components/overview'
import { VisitorsEngagementChart } from './components/VisitorsEngagementChart'
import { Analytics } from './components/analytics'
import { AnalyticsPanels } from './components/analyticsPanels'
import { EventsAndDeals } from './components/eventsAndDeals'
import { QuickActions } from './components/quick-action'

export function Dashboard() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header />

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-6 h-20 space-y-1 pt-2'>
          <h1 className='font-antigua font-serif text-4xl font-semibold tracking-normal text-[#1a1c1e] dark:text-white'>
            Welcome back, <span className='text-[#c4a04d]'>Maria</span>
          </h1>
          <p className='text-sm text-muted-foreground'>
            Here's what's happening with LaCarta.co today.
          </p>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          {/* <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
          </div> */}
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-6'>
              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <Eye className='h-5 w-5 text-white' />
                  </div>
                  <div className='flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium'>
                    <TrendingUp className='h-3 w-3' />
                    12.5%
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Total Visitors</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    124.5K
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    vs last 30 days
                  </p>
                </CardContent>
              </Card>

              {/* <Card className='relative overflow-hidden border-none bg-[#1a8542] bg-gradient-to-r from-[#980001] to-[#D40D00] text-white shadow-md'> */}
              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#22C55E] to-[#105F2D] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <Users className='h-5 w-5 text-white' />
                  </div>
                  <div className='flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium'>
                    <TrendingUp className='h-3 w-3' />
                    8.2%
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>New Users</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    8,432
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    vs last 30 days
                  </p>
                </CardContent>
              </Card>

              {/* <Card className='relative overflow-hidden border-none bg-[#a81c1c] bg-gradient-to-r from-[#22C55E] to-[#105F2D] text-white shadow-md'> */}
              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#980001] to-[#D40D00] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <FileText className='h-5 w-5 text-white' />
                  </div>
                  <div className='flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium'>
                    <TrendingUp className='h-3 w-3' />
                    24%
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Engagement</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    156
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    this month
                  </p>
                </CardContent>
              </Card>

              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <Mail className='h-5 w-5 text-white' />
                  </div>
                  <div className='flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium'>
                    <TrendingUp className='h-3 w-3' />
                    15.3%
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Heart Saves</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    2,847
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    vs last 30 days
                  </p>
                </CardContent>
              </Card>
              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#22C55E] to-[#105F2D] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <LinkIcon className='h-5 w-5 text-white' />
                  </div>
                  <div className='flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium'>
                    <TrendingDown className='h-3 w-3' />
                    3.2%
                  </div>
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Link Clicks</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    18,420
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    vs last month
                  </p>
                </CardContent>
              </Card>
              <Card className='relative overflow-hidden border-none bg-gradient-to-r from-[#980001] to-[#D40D00] text-white shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <div className='rounded-lg bg-white/20 p-2'>
                    <Clock className='h-5 w-5 text-white' />
                  </div>
                  {/* <div className='flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium'>
                    <TrendingUp className='h-3 w-3' />
                    24%
                  </div> */}
                </CardHeader>
                <CardContent className='pt-2'>
                  <p className='mb-0 text-sm text-white/90'>Inquiries</p>
                  <div className='font-georgia mb-2 text-[34px] font-bold tracking-tight'>
                    12
                  </div>
                  <p className='relative z-10 text-[10px] text-white/75'>
                    avaiting approval
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <VisitorsEngagementChart />
              {/* <Card className='lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card> */}
              <QuickActions />
            </div>
            <AnalyticsPanels />
            <EventsAndDeals />
          </TabsContent>
          <TabsContent value='analytics' className='space-y-4'>
            <Analytics />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

// const topNav = [
//   {
//     title: 'Overview',
//     href: 'dashboard/overview',
//     isActive: true,
//     disabled: false,
//   },
//   {
//     title: 'Customers',
//     href: 'dashboard/customers',
//     isActive: false,
//     disabled: true,
//   },
//   {
//     title: 'Products',
//     href: 'dashboard/products',
//     isActive: false,
//     disabled: true,
//   },
//   {
//     title: 'Settings',
//     href: 'dashboard/settings',
//     isActive: false,
//     disabled: true,
//   },
// ]
