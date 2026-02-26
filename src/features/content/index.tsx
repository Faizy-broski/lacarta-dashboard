// import { ReceiptText,
//   // Plus
//  } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import {
//   Tabs,
//   TabsContent,
//   // TabsList, TabsTrigger
// } from '@/components/ui/tabs'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

// import { Separator } from '@/components/ui/separator'
// import { SidebarNav } from './components/sidebar-nav'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
// import ArticleTable from './article/ArticleTable'
// import CategoryCard from './category/CategoryCard'
// import DraftCard from './draft/DraftCard'
// import FeaturedStoryCard from './featured/FeaturedStoryCard'
// import TravelToolCard from './travelTool/TravelToolCard'
// import QuickActionCard from './components/quickActions'
// import TabsPage from './components/tabs'

// const sidebarNavItems = [
//   {
//     title: 'Article',
//     href: '/content'
//   },
//   {
//     title: 'Draft',
//     href: '/content/drafts'
//   },
//   {
//     title: 'Category',
//     href: '/content/categories'
//   },
//   {
//     title: 'Featured',
//     href: '/content/featured-stories'
//   },
//   {
//     title: 'Travel Tool',
//     href: '/content/travel-tools'
//   },
// ]

export function ContentPage() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header />

      <Main>
        {/* <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'> */}

        {/* <div className='flex w-full overflow-y-hidden p-1'> */}
        <Outlet />
        {/* </div> */}
      </Main>
    </>
  )
}
