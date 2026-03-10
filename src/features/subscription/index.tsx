import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import AccessControl from './components/AccessControl'
import FeaturesLibrary from './components/FeaturesLibrary'
import PaymentForm from './components/PaymentForm'
import PlanGrid from './components/PlanGrid'
import TierPricingPanel from './components/TierPricingPanel'

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

        {/* ===== User-Facing ===== */}
        <PlanGrid />
        <PaymentForm />
        <AccessControl />

        {/* ===== Admin Management ===== */}
        <hr className='my-8 border-dashed' />
        <div className='mb-2 space-y-1'>
          <h1 className='font-antigua text-2xl font-bold tracking-tight'>
            Admin Management
          </h1>
          <p className='text-xs text-muted-foreground'>
            Configure tiers, pricing rules, features and access control.
          </p>
        </div>
        <TierPricingPanel />
        <FeaturesLibrary />
      </Main>
    </>
  )
}
