// import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
import AccessControl from './components/AccessControl'
import PaymentForm from './components/PaymentForm'
import PlanGrid from './components/PlanGrid'

export function Subscription() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header />

      <Main>
        <div className='mb-2 space-y-2'>
          <h1 className='font-antigua text-3xl font-bold tracking-tight'>
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
