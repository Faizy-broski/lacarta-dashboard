import { useEffect, useState } from 'react'
import { Package } from 'lucide-react'
import { supabase } from '@/lib/supabase/supabase'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import PlanCard from './PlanCard'

// ── Types ────────────────────────────────────────────────────────────────────

type Category = { id: string; name: string; type: string }
type Tier = {
  id: string
  name: string
  tier_order: number
  is_admin_free: boolean
}

type TierPricingRecord = {
  id: string
  category_id: string
  tier_id: string
  monthly_price: number
  yearly_price: number
  yearly_discount_percent: number
  status: 'active' | 'inactive'
}

type Feature = { id: string; label: string }

// ── Component ────────────────────────────────────────────────────────────────

export default function PlanGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [tiers, setTiers] = useState<Tier[]>([])
  const [pricingRecords, setPricingRecords] = useState<TierPricingRecord[]>([])
  const [featuresMap, setFeaturesMap] = useState<Record<string, Feature[]>>({})
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    setLoading(true)
    const [catRes, tierRes, priceRes, featRes] = await Promise.all([
      supabase.from('categories').select('id, name, type').order('name'),
      supabase.from('subscription_tiers').select('*').order('tier_order'),
      supabase.from('tier_pricing').select('*'),
      supabase
        .from('tier_pricing_features')
        .select('tier_pricing_id, features(id, label)'),
    ])

    const cats = (catRes.data ?? []) as Category[]
    setCategories(cats)
    setTiers((tierRes.data ?? []) as Tier[])
    setPricingRecords((priceRes.data ?? []) as TierPricingRecord[])

    // Build features map
    const map: Record<string, Feature[]> = {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;((featRes.data ?? []) as any[]).forEach((row) => {
      if (!map[row.tier_pricing_id]) map[row.tier_pricing_id] = []
      if (row.features) map[row.tier_pricing_id].push(row.features as Feature)
    })
    setFeaturesMap(map)

    // Auto-select first category
    if (cats.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(cats[0].id)
    }
    setLoading(false)
  }

  // ── Derived data for current category ────────────────────────────────────

  const categoryPricing = pricingRecords.filter(
    (p) => p.category_id === selectedCategoryId
  )

  // Only show tiers that have a pricing record for this category
  const configuredTiers = tiers
    .filter((t) => categoryPricing.some((p) => p.tier_id === t.id))
    .map((tier) => {
      const record = categoryPricing.find((p) => p.tier_id === tier.id)!
      const features = featuresMap[record.id] ?? []
      return { tier, record, features }
    })

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <section className='my-4 space-y-4'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='font-antigua flex items-center text-xl font-semibold'>
          <Package className='mr-2 h-5 w-5 text-muted-foreground' /> Plan
          Overview
        </h2>

        {categories.length > 0 && (
          <Select
            value={selectedCategoryId}
            onValueChange={setSelectedCategoryId}
          >
            <SelectTrigger className='w-56'>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {loading ? (
        <p className='text-sm text-muted-foreground'>Loading plans…</p>
      ) : configuredTiers.length === 0 ? (
        <div className='rounded-xl border border-dashed p-8 text-center text-muted-foreground'>
          <p className='text-sm'>
            {categories.length === 0
              ? 'No categories found.'
              : `No tiers configured for ${selectedCategory?.name ?? 'this category'} yet.`}
          </p>
          <p className='mt-1 text-xs'>
            Configure tiers in the Admin Management section below.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {configuredTiers.map(({ tier, record, features }) => (
            <PlanCard
              key={tier.id}
              tierName={tier.name}
              tierOrder={tier.tier_order}
              monthlyPrice={record.monthly_price}
              yearlyPrice={record.yearly_price}
              yearlyDiscount={record.yearly_discount_percent}
              status={record.status}
              features={features.map((f) => f.label)}
              isAdminFree={tier.is_admin_free}
            />
          ))}
        </div>
      )}
    </section>
  )
}
