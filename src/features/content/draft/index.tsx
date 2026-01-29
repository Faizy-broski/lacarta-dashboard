import { ReceiptText, 
  // Plus
 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  // TabsList, TabsTrigger
} from '@/components/ui/tabs'

import { Main } from '@/components/layout/main'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'

import DraftCard from './DraftCard'
import TabsPage from '../components/tabs'

export function DraftContent() {
  return (
    <>
    

      <Main>
        <div className='mb-10 flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Drafts</h1>
            <p className='text-xs text-muted-foreground'>
              Manage all Drafts across Lacarta.
            </p>
          </div>
          <div>
            <Button className='mr-1 border bg-gray-100 text-black shadow hover:bg-black hover:text-white'>
              <ReceiptText size={30} />
              Travel Tool
            </Button>
            <Button className='mr-1 border bg-gray-100 text-black shadow hover:bg-black hover:text-white'>
              <ReceiptText size={30} /> New Drafts
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

        
          <DraftCard />
       
      </Main>
    </>
  )
}
