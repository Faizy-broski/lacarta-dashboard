import { useAuthStore } from '@/lib/auth/auth.store'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import AccessControl from './components/AccessControl'
import FeaturesLibrary from './components/FeaturesLibrary'
import PaymentForm from './components/PaymentForm'
import PlanGrid from './components/PlanGrid'
import TierPricingPanel from './components/TierPricingPanel'

export function Subscription() {
  const user = useAuthStore((s) => s.user)
  const role = user?.role?.[0]

  const isClient = role === 'client'
  const isOwner = role === 'owner'
  const isAdminOrAbove = role === 'owner' || role === 'admin'

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
            {isClient ? 'View and manage your subscription plan.' : 'Manage Plans, Pricings, Limits and Access.'}
          </p>
        </div>

        {/* ===== Client-Facing: Plan cards + Payment ===== */}
        {(isClient || isOwner) && (
          <>
            <PlanGrid />
            <PaymentForm />
          </>
        )}

        {/* ===== Owner/Admin Management ===== */}
        {isAdminOrAbove && (
          <>
            <hr className='my-8 border-dashed' />
            <div className='mb-2 space-y-1'>
              <h1 className='font-antigua text-2xl font-bold tracking-tight'>
                Admin Management
              </h1>
              <p className='text-xs text-muted-foreground'>
                Configure tiers, pricing rules, features and access control.
              </p>
            </div>
            <AccessControl />
            <TierPricingPanel />
            <FeaturesLibrary />
          </>
        )}
      </Main>
    </>
  )
}
