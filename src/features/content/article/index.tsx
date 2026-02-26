import { Compass, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Main } from '@/components/layout/main'
import TabsPage from '../components/tabs'
import QuickActionCard from '../quickActions/QuickActionCard'
import CategoryCard from './../category/CategoryCard'
import DraftCard from './../draft/DraftCard'
import FeaturedStoryCard from './../featured/FeaturedStoryCard'
import TravelToolCard from './../travelTool/TravelToolCard'
import ArticleTable from './ArticleTable'

export function ArticleContent() {
  return (
    <>
      <Main>
        <div className='mb-5 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='font-antigua text-2xl font-bold tracking-tight'>
              Content
            </h1>
            <p className='text-sm text-muted-foreground'>
              Manage all editorial content across Lacarta
            </p>
          </div>
          <div className='flex gap-4'>
            <Button className='border bg-gray-100 text-black shadow hover:bg-gray-100 hover:text-black'>
              <Compass />
              Travel Tool
            </Button>
            <Button className='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white shadow hover:bg-black hover:text-white'>
              <Plus size={30} /> New Article
            </Button>
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

        <ArticleTable />

        {/* DRAFTS */}

        <DraftCard />

        {/* CATEGORIES */}

        <CategoryCard />

        {/* FEATURED STORIES */}
        <FeaturedStoryCard />

        {/* TRAVEL TOOLS */}

        <TravelToolCard />

        {/* QUICKACTIONS */}
        <QuickActionCard />
      </Main>
    </>
  )
}
