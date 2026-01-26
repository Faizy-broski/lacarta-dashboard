import {
  Tabs,
  TabsContent,
  // TabsList, TabsTrigger
} from '@/components/ui/tabs'

import {ReceiptText , Plus} from "lucide-react"
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'


import TabsPage from "./components/tabs"
import TravelToolCard from "./components/TravelToolCard"
import ArticleTable from "./components/ArticleTable"
import DraftCard from "./components/DraftCard"
import CategoryCard from "./components/CategoryCard"
import FeaturedStoryCard from "./components/FeaturedStoryCard"
import QuickActionCard from "./components/quickActions"



export function ContentPage() {
  return (
    <>
      {/* ===== Top Heading ===== */}
                      <Header>
                        <Search />
                        <div className='ms-auto flex items-center space-x-4'>
                          <Button>New Article</Button>
                          <ThemeSwitch />
                          <ProfileDropdown />
                        </div>
                      </Header>
            
                      <Main>
                 <div className='mb-10 space-y-2 flex justify-between items-center'>
                  <div>
                      <h1 className='text-2xl font-bold tracking-tight'>
                        Active Deals
                      </h1>
                      <p className=' text-xs text-muted-foreground'>
                        Manage sponser offers and brands partnerships.
                      </p>
                    </div>
                    <div>
                      <Button className="mr-1 bg-gray-100 text-black shadow border hover:bg-black hover:text-white"><ReceiptText size={30}/>Travel Tool</Button>
                      <Button className="mr-1 bg-gray-100 text-black shadow border hover:bg-black hover:text-white"><ReceiptText size={30}/> New Article</Button>
                      
                    </div>
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

    <ArticleTable />  
    <DraftCard />
    <CategoryCard />
    <FeaturedStoryCard />                                        
    <TravelToolCard />
    <QuickActionCard />
</Main>
</>
  )
}