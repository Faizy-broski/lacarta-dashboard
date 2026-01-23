import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

import PlanGrid from "./components/PlanGrid"
import PaymentForm from "./components/PaymentForm"
import AccessControl from "./components/AccessControl"

export function Subscription() {
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
            Subscription
          </h1>
          <p className='mb-10 text-xs text-muted-foreground'>
            Manage Plans, Pricings, Limits and Access.
          </p>
        </div>
      <PlanGrid />
      <PaymentForm />
      <AccessControl />
      </Main>
    </>
  )
}
