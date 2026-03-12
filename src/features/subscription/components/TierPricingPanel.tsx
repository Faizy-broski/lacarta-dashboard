/**
 * Required DB migrations (run once in Supabase SQL editor):
 *
 * ALTER TABLE tier_pricing
 *   ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active'
 *   CHECK (status IN ('active', 'inactive'));
 *
 * CREATE TABLE IF NOT EXISTS tier_pricing_features (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   tier_pricing_id UUID NOT NULL REFERENCES tier_pricing(id) ON DELETE CASCADE,
 *   feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   UNIQUE (tier_pricing_id, feature_id)
 * );
 */
import { useEffect, useState } from 'react'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Crown,
  Pencil,
  Plus,
  Settings,
  Sparkles,
  Tag,
  Trash2,
  User,
  Star,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// ── Types ──────────────────────────────────────────────────────────────────────

type Tier = {
  id: string
  name: string
  tier_order: number
  is_admin_free: boolean
}

type Category = {
  id: string
  name: string
  type: string
}

type Feature = {
  id: string
  slug: string
  label: string
  category_scope: string
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

type CustomFeature = {
  _key: string
  label: string
  slug: string
  category_scope: string
}

type PricingForm = {
  monthly_price: number
  yearly_price: number
  yearly_discount_percent: number
  status: 'active' | 'inactive'
}

// ── Constants ──────────────────────────────────────────────────────────────────

const TIER_GRADIENTS: Record<number, string> = {
  0: 'bg-linear-to-r from-[#65758B] to-[#808EA3]',
  1: 'bg-linear-to-r from-[#CF9921] to-[#D2BB6B]',
  2: 'bg-linear-to-r from-[#980001] to-[#D40D00]',
  3: 'bg-linear-to-r from-[#105F2D] to-[#22C55E]',
}

const TIER_BORDER_TOP: Record<number, string> = {
  0: 'border-t-[#808EA3]',
  1: 'border-t-[#D2BB6B]',
  2: 'border-t-[#D40D00]',
  3: 'border-t-[#22C55E]',
}

const TIER_PRICE_COLOR: Record<number, string> = {
  0: 'text-slate-600',
  1: 'text-yellow-700',
  2: 'text-red-700',
  3: 'text-emerald-700',
}

const TIER_CHECK_COLOR: Record<number, string> = {
  0: 'text-slate-500',
  1: 'text-yellow-600',
  2: 'text-red-600',
  3: 'text-emerald-600',
}

const TIER_ICONS: Record<number, React.ReactNode> = {
  0: <User className='h-4 w-4' />,
  1: <Star className='h-4 w-4' />,
  2: <Crown className='h-4 w-4' />,
  3: <Sparkles className='h-4 w-4' />,
}

// const TIER_GRID_COLS: Record<number, string> = {
//   1: 'grid-cols-1',
//   2: 'grid-cols-2',
//   3: 'grid-cols-3',
//   4: 'grid-cols-4',
//   5: 'grid-cols-5',
// }
const TIER_GRID_COLS: Record<number, string> = {
  1: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
}

const SCOPES = [
  'all',
  'hotels',
  'beaches',
  'gastronomy',
  'real_estate',
  'activities',
]

const EMPTY_PRICING_FORM: PricingForm = {
  monthly_price: 0,
  yearly_price: 0,
  yearly_discount_percent: 0,
  status: 'active',
}

let _keyCounter = 0
const nextKey = () => `k-${++_keyCounter}`

// ── Component ──────────────────────────────────────────────────────────────────

export default function TierPricingPanel() {
  // ── Data state ──────────────────────────────────────────────────────────────
  const [tiers, setTiers] = useState<Tier[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [allFeatures, setAllFeatures] = useState<Feature[]>([])
  const [pricingRecords, setPricingRecords] = useState<TierPricingRecord[]>([])
  // Map: tier_pricing.id → Feature[]
  const [pricingFeaturesMap, setPricingFeaturesMap] = useState<
    Record<string, Feature[]>
  >({})
  const [loading, setLoading] = useState(true)

  // ── Configuration Sheet ────────────────────────────────────────────────────
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetCategory, setSheetCategory] = useState<Category | null>(null)
  const [sheetTier, setSheetTier] = useState<Tier | null>(null)
  // null = creating new record; non-null = editing existing
  const [sheetRecord, setSheetRecord] = useState<TierPricingRecord | null>(null)
  const [saving, setSaving] = useState(false)
  const [pricingForm, setPricingForm] =
    useState<PricingForm>(EMPTY_PRICING_FORM)
  const [linkedFeatureIds, setLinkedFeatureIds] = useState<Set<string>>(
    new Set()
  )
  const [customFeatures, setCustomFeatures] = useState<CustomFeature[]>([])
  const [newCustom, setNewCustom] = useState({
    label: '',
    slug: '',
    category_scope: 'all',
  })
  const [openSections, setOpenSections] = useState({
    pricing: true,
    features: true,
  })

  // ── Tier Management Dialog ─────────────────────────────────────────────────
  const [tiersDialogOpen, setTiersDialogOpen] = useState(false)
  const [tierForm, setTierForm] = useState({
    name: '',
    tier_order: 0,
    is_admin_free: false,
  })
  const [editingTierId, setEditingTierId] = useState<string | null>(null)

  useEffect(() => {
    loadAll()
  }, [])

  // ── Data loading ────────────────────────────────────────────────────────────

  async function loadAll() {
    setLoading(true)
    await Promise.all([
      fetchTiers(),
      fetchCategories(),
      fetchAllFeatures(),
      fetchPricingRecords(),
      fetchPricingFeaturesMap(),
    ])
    setLoading(false)
  }

  async function fetchTiers() {
    const { data } = await supabase
      .from('subscription_tiers')
      .select('*')
      .order('tier_order')
    if (data) setTiers(data as Tier[])
  }

  async function fetchCategories() {
    const { data } = await supabase
      .from('categories')
      .select('id, name, type')
      .order('name')
    if (data) setCategories(data)
  }

  async function fetchAllFeatures() {
    const { data } = await supabase
      .from('features')
      .select('id, slug, label, category_scope')
      .order('label')
    if (data) setAllFeatures(data as Feature[])
  }

  async function fetchPricingRecords() {
    const { data } = await supabase.from('tier_pricing').select('*')
    if (data) setPricingRecords(data as TierPricingRecord[])
  }

  async function fetchPricingFeaturesMap() {
    const { data } = await supabase
      .from('tier_pricing_features')
      .select('tier_pricing_id, features(id, slug, label, category_scope)')
    if (!data) return
    const map: Record<string, Feature[]> = {}
    data.forEach((row: any) => {
      if (!map[row.tier_pricing_id]) map[row.tier_pricing_id] = []
      if (row.features) map[row.tier_pricing_id].push(row.features as Feature)
    })
    setPricingFeaturesMap(map)
  }

  // ── Computed ────────────────────────────────────────────────────────────────

  function getPricingRecord(categoryId: string, tierId: string) {
    return pricingRecords.find(
      (p) => p.category_id === categoryId && p.tier_id === tierId
    )
  }

  // ── Configuration Sheet handlers ────────────────────────────────────────────

  function toggleSection(key: keyof typeof openSections) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  async function openSheet(category: Category, tier: Tier) {
    const record = getPricingRecord(category.id, tier.id)
    setSheetCategory(category)
    setSheetTier(tier)
    setSheetRecord(record ?? null)
    setCustomFeatures([])
    setNewCustom({ label: '', slug: '', category_scope: 'all' })
    setOpenSections({ pricing: true, features: true })

    if (record) {
      setPricingForm({
        monthly_price: Number(record.monthly_price),
        yearly_price: Number(record.yearly_price),
        yearly_discount_percent: Number(record.yearly_discount_percent),
        status: record.status,
      })
      const { data } = await supabase
        .from('tier_pricing_features')
        .select('feature_id')
        .eq('tier_pricing_id', record.id)
      setLinkedFeatureIds(new Set((data ?? []).map((r: any) => r.feature_id)))
    } else {
      setPricingForm(EMPTY_PRICING_FORM)
      setLinkedFeatureIds(new Set())
    }
    setSheetOpen(true)
  }

  async function toggleStatus(record: TierPricingRecord) {
    const newStatus = record.status === 'active' ? 'inactive' : 'active'
    const { error } = await supabase
      .from('tier_pricing')
      .update({ status: newStatus })
      .eq('id', record.id)
    if (error) {
      toast.error('Failed to toggle status', { description: error.message })
      return
    }
    setPricingRecords((prev) =>
      prev.map((p) => (p.id === record.id ? { ...p, status: newStatus } : p))
    )
    toast.success(`Tier marked as ${newStatus}`)
  }

  async function deleteRecord(id: string) {
    const { error } = await supabase.from('tier_pricing').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete pricing record', {
        description: error.message,
      })
      return
    }
    setPricingRecords((prev) => prev.filter((p) => p.id !== id))
    setPricingFeaturesMap((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    toast.success('Pricing configuration removed')
  }

  // ── Feature helpers ─────────────────────────────────────────────────────────

  function toggleFeature(featureId: string) {
    setLinkedFeatureIds((prev) => {
      const next = new Set(prev)
      next.has(featureId) ? next.delete(featureId) : next.add(featureId)
      return next
    })
  }

  function addCustomFeature() {
    if (!newCustom.label.trim() || !newCustom.slug.trim()) return
    const slugTrimmed = newCustom.slug.trim()
    const labelTrimmed = newCustom.label.trim()

    // Check against existing features in DB
    const existingSlug = allFeatures.find((f) => f.slug === slugTrimmed)
    if (existingSlug) {
      toast.error('Duplicate slug', {
        description: `A feature with slug "${slugTrimmed}" already exists in the library.`,
      })
      return
    }
    // Check against existing feature labels
    const existingLabel = allFeatures.find(
      (f) => f.label.toLowerCase() === labelTrimmed.toLowerCase()
    )
    if (existingLabel) {
      toast.error('Duplicate feature', {
        description: `A feature named "${labelTrimmed}" already exists in the library.`,
      })
      return
    }
    // Check against pending custom features
    const pendingSlug = customFeatures.find((f) => f.slug === slugTrimmed)
    if (pendingSlug) {
      toast.error('Duplicate slug', {
        description: `You already added a custom feature with slug "${slugTrimmed}".`,
      })
      return
    }
    const pendingLabel = customFeatures.find(
      (f) => f.label.toLowerCase() === labelTrimmed.toLowerCase()
    )
    if (pendingLabel) {
      toast.error('Duplicate feature', {
        description: `You already added a custom feature named "${labelTrimmed}".`,
      })
      return
    }

    setCustomFeatures((prev) => [...prev, { _key: nextKey(), ...newCustom }])
    setNewCustom({ label: '', slug: '', category_scope: 'all' })
  }

  function removeCustomFeature(key: string) {
    setCustomFeatures((prev) => prev.filter((f) => f._key !== key))
  }

  // ── Save configuration ──────────────────────────────────────────────────────

  async function save() {
    if (!sheetCategory || !sheetTier) return

    // Prevent duplicate: same tier cannot be configured twice for the same category
    if (!sheetRecord) {
      const existingRecord = pricingRecords.find(
        (p) => p.category_id === sheetCategory.id && p.tier_id === sheetTier.id
      )
      if (existingRecord) {
        toast.error('Duplicate configuration', {
          description: `${sheetTier.name} is already configured for ${sheetCategory.name}. Edit the existing one instead.`,
        })
        return
      }
    }

    setSaving(true)
    try {
      let recordId: string

      if (sheetRecord) {
        // Update existing
        const { error } = await supabase
          .from('tier_pricing')
          .update({
            monthly_price: pricingForm.monthly_price,
            yearly_price: pricingForm.yearly_price,
            yearly_discount_percent: pricingForm.yearly_discount_percent,
            status: pricingForm.status,
          })
          .eq('id', sheetRecord.id)
        if (error) {
          toast.error('Failed to update pricing', {
            description: error.message,
          })
          return
        }
        recordId = sheetRecord.id
      } else {
        // Create new
        const { data, error } = await supabase
          .from('tier_pricing')
          .insert({
            category_id: sheetCategory.id,
            tier_id: sheetTier.id,
            monthly_price: pricingForm.monthly_price,
            yearly_price: pricingForm.yearly_price,
            yearly_discount_percent: pricingForm.yearly_discount_percent,
            status: pricingForm.status,
          })
          .select('id')
          .single()
        if (error || !data) {
          toast.error('Failed to create pricing', {
            description: error?.message,
          })
          return
        }
        recordId = data.id
      }

      // Insert custom features into features table
      const customFeatureIds: string[] = []
      for (const cf of customFeatures) {
        const { data, error } = await supabase
          .from('features')
          .insert({
            label: cf.label,
            slug: cf.slug,
            category_scope: cf.category_scope,
          })
          .select('id')
          .single()
        if (error) {
          toast.error(`Failed to create feature "${cf.label}"`, {
            description: error.message,
          })
        }
        if (data) customFeatureIds.push(data.id)
      }

      // Sync tier_pricing_features (delete all → re-insert)
      await supabase
        .from('tier_pricing_features')
        .delete()
        .eq('tier_pricing_id', recordId)

      const allLinked = [...Array.from(linkedFeatureIds), ...customFeatureIds]
      if (allLinked.length > 0) {
        const { error: linkError } = await supabase
          .from('tier_pricing_features')
          .insert(
            allLinked.map((fid) => ({
              tier_pricing_id: recordId,
              feature_id: fid,
            }))
          )
        if (linkError) {
          toast.error('Failed to link some features', {
            description: linkError.message,
          })
        }
      }

      await loadAll()
      setSheetOpen(false)
      toast.success(sheetRecord ? 'Pricing updated' : 'Pricing created', {
        description: `${sheetCategory.name} — ${sheetTier.name}`,
      })
    } finally {
      setSaving(false)
    }
  }

  // ── Tier management handlers ────────────────────────────────────────────────

  function openEditTier(tier: Tier) {
    setEditingTierId(tier.id)
    setTierForm({
      name: tier.name,
      tier_order: tier.tier_order,
      is_admin_free: tier.is_admin_free,
    })
  }

  async function saveTier() {
    if (!tierForm.name.trim()) return
    // Prevent duplicate tier names (case-insensitive)
    const duplicate = tiers.find(
      (t) =>
        t.name.toLowerCase() === tierForm.name.trim().toLowerCase() &&
        t.id !== editingTierId
    )
    if (duplicate) {
      toast.error('Duplicate tier name', {
        description: `A tier named "${duplicate.name}" already exists.`,
      })
      return
    }
    if (editingTierId) {
      const { error } = await supabase
        .from('subscription_tiers')
        .update(tierForm)
        .eq('id', editingTierId)
      if (error) {
        toast.error('Failed to update tier', { description: error.message })
        return
      }
      toast.success('Tier updated')
    } else {
      const { error } = await supabase
        .from('subscription_tiers')
        .insert(tierForm)
      if (error) {
        toast.error('Failed to create tier', { description: error.message })
        return
      }
      toast.success('Tier created', { description: tierForm.name })
    }
    setEditingTierId(null)
    setTierForm({
      name: '',
      tier_order: tiers.length + 1,
      is_admin_free: false,
    })
    await fetchTiers()
  }

  async function deleteTierDef(id: string) {
    const { error } = await supabase
      .from('subscription_tiers')
      .delete()
      .eq('id', id)
    if (error) {
      toast.error('Failed to delete tier', { description: error.message })
      return
    }
    toast.success('Tier deleted')
    await loadAll()
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section className='my-4 space-y-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='font-antigua flex items-center text-xl font-semibold'>
          <Tag className='mr-2 h-5 w-5 text-muted-foreground' />
          Tiers &amp; Pricing
        </h2>
        <Button variant='outline' onClick={() => setTiersDialogOpen(true)}>
          <Settings className='mr-2 h-4 w-4' />
          Manage Tiers
        </Button>
      </div>

      {/* Main matrix */}
      {loading ? (
        <p className='text-sm text-muted-foreground'>Loading…</p>
      ) : tiers.length === 0 ? (
        <div className='rounded-xl border border-dashed p-8 text-center text-muted-foreground'>
          <p className='text-sm'>No tiers defined yet.</p>
          <Button
            variant='outline'
            size='sm'
            className='mt-3'
            onClick={() => setTiersDialogOpen(true)}
          >
            <Plus className='mr-1 h-3 w-3' />
            Add your first tier
          </Button>
        </div>
      ) : categories.length === 0 ? (
        <p className='text-sm text-muted-foreground'>
          No categories found. Add categories first.
        </p>
      ) : (
        <div className='space-y-6'>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              tiers={tiers}
              getPricingRecord={getPricingRecord}
              pricingFeaturesMap={pricingFeaturesMap}
              onConfigure={(cat, tier) => openSheet(cat, tier)}
              onToggleStatus={toggleStatus}
              onRemove={(id) => deleteRecord(id)}
            />
          ))}
        </div>
      )}

      {/* ── Configuration Sheet ──────────────────────────────────────────────── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side='right'
          className='flex w-full flex-col overflow-hidden sm:max-w-xl'
        >
          <SheetHeader className='border-b pb-3'>
            <div
              className={`-mx-4 -mt-4 mb-2 px-5 py-4 ${
                TIER_GRADIENTS[sheetTier?.tier_order ?? 0] ??
                'bg-linear-to-r from-slate-400 to-slate-500'
              }`}
            >
              <div className='flex items-center gap-3 text-white'>
                <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md'>
                  {TIER_ICONS[sheetTier?.tier_order ?? 0] ?? (
                    <User className='h-5 w-5' />
                  )}
                </span>
                <div>
                  <SheetTitle className='font-antigua text-white'>
                    {sheetCategory?.name} — {sheetTier?.name}
                  </SheetTitle>
                  <p className='text-xs text-white/70 capitalize'>
                    {sheetCategory?.type} ·{' '}
                    {sheetRecord ? 'Edit configuration' : 'New configuration'}
                  </p>
                </div>
              </div>
            </div>
          </SheetHeader>

          <div className='flex-1 overflow-y-auto'>
            {/* Section 1: Pricing & Status */}
            <SectionBlock
              title='Pricing & Status'
              open={openSections.pricing}
              onToggle={() => toggleSection('pricing')}
            >
              <div className='space-y-4'>
                {/* Status toggle */}
                <div className='flex items-center justify-between rounded-lg border px-4 py-3'>
                  <div>
                    <p className='text-sm font-medium'>Status</p>
                    <p className='text-xs text-muted-foreground'>
                      {pricingForm.status === 'active'
                        ? 'Visible and purchasable by users'
                        : 'Hidden — not available to users'}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant='outline'
                      className={
                        pricingForm.status === 'active'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-slate-50 text-slate-500'
                      }
                    >
                      {pricingForm.status}
                    </Badge>
                    <Switch
                      checked={pricingForm.status === 'active'}
                      onCheckedChange={(v) =>
                        setPricingForm({
                          ...pricingForm,
                          status: v ? 'active' : 'inactive',
                        })
                      }
                    />
                  </div>
                </div>

                {/* Prices */}
                <div className='space-y-1'>
                  <Label>Monthly Price ($)</Label>
                  <Input
                    type='number'
                    min={0}
                    step='0.01'
                    value={pricingForm.monthly_price}
                    onChange={(e) => {
                      const monthly = parseFloat(e.target.value) || 0
                      const discount = pricingForm.yearly_discount_percent
                      const yearly =
                        Math.round(monthly * 12 * (1 - discount / 100) * 100) /
                        100
                      setPricingForm({
                        ...pricingForm,
                        monthly_price: monthly,
                        yearly_price: yearly,
                      })
                    }}
                  />
                </div>

                <div className='grid grid-cols-2 gap-3'>
                  <div className='space-y-1'>
                    <Label>Yearly Discount (%)</Label>
                    <Input
                      type='number'
                      min={0}
                      max={100}
                      step='0.01'
                      placeholder='e.g. 10, 15, 20'
                      value={pricingForm.yearly_discount_percent}
                      onChange={(e) => {
                        const discount = parseFloat(e.target.value) || 0
                        const monthly = pricingForm.monthly_price
                        const yearly =
                          Math.round(
                            monthly * 12 * (1 - discount / 100) * 100
                          ) / 100
                        setPricingForm({
                          ...pricingForm,
                          yearly_discount_percent: discount,
                          yearly_price: yearly,
                        })
                      }}
                    />
                    {pricingForm.yearly_discount_percent > 0 && (
                      <p className='text-xs text-emerald-600'>
                        Users save {pricingForm.yearly_discount_percent}% with
                        yearly billing
                      </p>
                    )}
                  </div>
                  <div className='space-y-1'>
                    <Label>Yearly Price ($)</Label>
                    <Input
                      type='number'
                      min={0}
                      step='0.01'
                      value={pricingForm.yearly_price}
                      onChange={(e) =>
                        setPricingForm({
                          ...pricingForm,
                          yearly_price: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                    <p className='text-xs text-muted-foreground'>
                      Auto-calculated from monthly × 12 minus discount.
                      Editable.
                    </p>
                  </div>
                </div>
              </div>
            </SectionBlock>

            {/* Section 2: Features */}
            <SectionBlock
              title='Features'
              open={openSections.features}
              onToggle={() => toggleSection('features')}
            >
              <div className='space-y-5'>
                {/* Predefined features from library */}
                <div className='space-y-2'>
                  <p className='text-[11px] font-semibold tracking-wide text-muted-foreground uppercase'>
                    Predefined Features
                    <span className='ml-2 font-normal normal-case'>
                      ({linkedFeatureIds.size} selected)
                    </span>
                  </p>
                  {allFeatures.length === 0 ? (
                    <p className='text-xs text-muted-foreground italic'>
                      No predefined features yet — add them in the Feature
                      Library below.
                    </p>
                  ) : (
                    <div className='grid grid-cols-1 gap-1.5 sm:grid-cols-2'>
                      {allFeatures.map((f) => (
                        <label
                          key={f.id}
                          className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
                            linkedFeatureIds.has(f.id)
                              ? 'border-emerald-300 bg-emerald-50'
                              : 'hover:bg-muted/40'
                          }`}
                        >
                          <Checkbox
                            checked={linkedFeatureIds.has(f.id)}
                            onCheckedChange={() => toggleFeature(f.id)}
                          />
                          <span className='flex-1 truncate'>{f.label}</span>
                          <Badge
                            variant='outline'
                            className='shrink-0 text-[10px] capitalize'
                          >
                            {f.category_scope}
                          </Badge>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom features exclusive to this category+tier */}
                <div className='space-y-2'>
                  <p className='text-[11px] font-semibold tracking-wide text-muted-foreground uppercase'>
                    Custom — Exclusive to {sheetCategory?.name}{' '}
                    {sheetTier?.name}
                  </p>

                  {customFeatures.length > 0 && (
                    <div className='mb-2 space-y-1'>
                      {customFeatures.map((cf) => (
                        <div
                          key={cf._key}
                          className='flex items-center justify-between rounded-lg border border-dashed bg-emerald-50 px-3 py-2 text-sm'
                        >
                          <div className='flex items-center gap-2'>
                            <Check className='h-3.5 w-3.5 text-emerald-600' />
                            <span className='font-medium'>{cf.label}</span>
                            <code className='text-xs text-muted-foreground'>
                              {cf.slug}
                            </code>
                          </div>
                          <button
                            onClick={() => removeCustomFeature(cf._key)}
                            className='text-muted-foreground hover:text-destructive'
                          >
                            <X className='h-3.5 w-3.5' />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline add form */}
                  <div className='space-y-3 rounded-xl border border-dashed p-3'>
                    <p className='text-xs text-muted-foreground'>
                      Saved to feature library and linked exclusively to this
                      configuration.
                    </p>
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='space-y-1'>
                        <Label className='text-xs'>Label *</Label>
                        <Input
                          className='h-8 text-xs'
                          placeholder='e.g. Priority Support'
                          value={newCustom.label}
                          onChange={(e) =>
                            setNewCustom({
                              ...newCustom,
                              label: e.target.value,
                              slug: e.target.value
                                .toLowerCase()
                                .replace(/\s+/g, '-')
                                .replace(/[^a-z0-9-]/g, '')
                                .replace(/-+$/g, ''),
                            })
                          }
                        />
                      </div>
                      <div className='space-y-1'>
                        <Label className='text-xs'>Slug *</Label>
                        <Input
                          className='h-8 text-xs'
                          placeholder='priority-support'
                          value={newCustom.slug}
                          onChange={(e) =>
                            setNewCustom({
                              ...newCustom,
                              slug: e.target.value
                                .toLowerCase()
                                .replace(/\s+/g, '-')
                                .replace(/[^a-z0-9-]/g, '')
                                .replace(/-+$/g, ''),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className='space-y-1'>
                      <Label className='text-xs'>Scope</Label>
                      <Select
                        value={newCustom.category_scope}
                        onValueChange={(v) =>
                          setNewCustom({ ...newCustom, category_scope: v })
                        }
                      >
                        <SelectTrigger className='h-8 text-xs'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SCOPES.map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className='text-xs capitalize'
                            >
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      size='sm'
                      variant='outline'
                      className='w-full border-dashed'
                      disabled={
                        !newCustom.label.trim() || !newCustom.slug.trim()
                      }
                      onClick={addCustomFeature}
                    >
                      <Plus className='mr-1 h-3 w-3' />
                      Add to {sheetCategory?.name} — {sheetTier?.name}
                    </Button>
                  </div>
                </div>
              </div>
            </SectionBlock>
          </div>

          <SheetFooter className='border-t pt-3'>
            {sheetRecord && (
              <Button
                variant='outline'
                className='mr-auto border-red-200 text-destructive hover:bg-red-50 hover:text-destructive'
                onClick={() => {
                  deleteRecord(sheetRecord.id)
                  setSheetOpen(false)
                }}
              >
                <Trash2 className='mr-1 h-3 w-3' />
                Remove
              </Button>
            )}
            <Button variant='outline' onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
            <Button
              className='bg-linear-to-r from-[#CF9921] to-[#D2BB6B] text-white'
              disabled={saving}
              onClick={save}
            >
              {saving ? 'Saving…' : sheetRecord ? 'Save Changes' : 'Create'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* ── Tier Management Dialog ───────────────────────────────────────────── */}
      <Dialog open={tiersDialogOpen} onOpenChange={setTiersDialogOpen}>
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle className='font-antigua'>Manage Tiers</DialogTitle>
            <p className='text-xs text-muted-foreground'>
              Define global tier levels (Free, Standard, Premium, Elite). Each
              category can then be configured with any of these tiers.
            </p>
          </DialogHeader>

          <div className='space-y-4'>
            {/* Tier list */}
            <div className='overflow-hidden rounded-xl border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-12'>Order</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Admin Free</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tiers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className='py-6 text-center text-muted-foreground'
                      >
                        No tiers yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    tiers.map((tier) => (
                      <TableRow key={tier.id}>
                        <TableCell>
                          <span
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                              TIER_GRADIENTS[tier.tier_order] ?? 'bg-slate-400'
                            }`}
                          >
                            {tier.tier_order}
                          </span>
                        </TableCell>
                        <TableCell className='font-medium'>
                          {tier.name}
                        </TableCell>
                        <TableCell>
                          {tier.is_admin_free ? (
                            <Badge className='border-emerald-200 bg-emerald-100 text-emerald-700'>
                              Yes
                            </Badge>
                          ) : (
                            <span className='text-xs text-muted-foreground'>
                              No
                            </span>
                          )}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end gap-1'>
                            <Button
                              size='icon'
                              variant='ghost'
                              className='h-7 w-7'
                              onClick={() => openEditTier(tier)}
                            >
                              <Pencil className='h-3.5 w-3.5' />
                            </Button>
                            <Button
                              size='icon'
                              variant='ghost'
                              className='h-7 w-7 text-destructive hover:text-destructive'
                              onClick={() => deleteTierDef(tier.id)}
                            >
                              <Trash2 className='h-3.5 w-3.5' />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Add / Edit form */}
            <div className='space-y-3 rounded-xl border p-4'>
              <p className='text-sm font-semibold'>
                {editingTierId ? 'Edit Tier' : 'Add New Tier'}
              </p>
              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-1'>
                  <Label>Name *</Label>
                  <Input
                    placeholder='e.g. Standard'
                    value={tierForm.name}
                    onChange={(e) =>
                      setTierForm({ ...tierForm, name: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-1'>
                  <Label>Order</Label>
                  <Input
                    type='number'
                    min={0}
                    value={tierForm.tier_order}
                    onChange={(e) =>
                      setTierForm({
                        ...tierForm,
                        tier_order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                  <p className='text-xs text-muted-foreground'>
                    0 = Free · 1 = Standard · 2 = Premium · 3 = Elite
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='admin_free_dlg'
                  checked={tierForm.is_admin_free}
                  onCheckedChange={(v) =>
                    setTierForm({ ...tierForm, is_admin_free: v === true })
                  }
                />
                <Label htmlFor='admin_free_dlg'>Admin Free tier</Label>
              </div>
              <div className='flex gap-2'>
                {editingTierId && (
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      setEditingTierId(null)
                      setTierForm({
                        name: '',
                        tier_order: tiers.length,
                        is_admin_free: false,
                      })
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  size='sm'
                  className='bg-linear-to-r from-[#CF9921] to-[#D2BB6B] text-white'
                  disabled={!tierForm.name.trim()}
                  onClick={saveTier}
                >
                  {editingTierId ? 'Save Changes' : 'Add Tier'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

// ── CategoryCard ───────────────────────────────────────────────────────────────

function CategoryCard({
  category,
  tiers,
  getPricingRecord,
  pricingFeaturesMap,
  onConfigure,
  onToggleStatus,
  onRemove,
}: {
  category: Category
  tiers: Tier[]
  getPricingRecord: (
    catId: string,
    tierId: string
  ) => TierPricingRecord | undefined
  pricingFeaturesMap: Record<string, Feature[]>
  onConfigure: (cat: Category, tier: Tier) => void
  onToggleStatus: (record: TierPricingRecord) => void
  onRemove: (id: string) => void
}) {
  const configuredCount = tiers.filter(
    (t) => !!getPricingRecord(category.id, t.id)
  ).length

  return (
    <div className='space-y-3'>
      {/* Category header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <h3 className='font-antigua text-base font-semibold'>
            {category.name}
          </h3>
          <Badge variant='outline' className='text-xs capitalize'>
            {category.type}
          </Badge>
        </div>
        <span className='text-xs text-muted-foreground'>
          {configuredCount}/{tiers.length} tiers configured
        </span>
      </div>

      {/* Tier cards grid */}
      {/* <div
        className={`grid gap-4 ${TIER_GRID_COLS[tiers.length] ?? 'md:grid-cols-2 lg:grid-cols-4'}`}
      > */}
      <div
        className={`grid gap-4 ${TIER_GRID_COLS[tiers.length] ?? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}
      >
        {tiers.map((tier) => {
          const record = getPricingRecord(category.id, tier.id)
          const features = record ? (pricingFeaturesMap[record.id] ?? []) : []

          if (!record) {
            return (
              <UnconfiguredCell
                key={tier.id}
                tier={tier}
                onConfigure={() => onConfigure(category, tier)}
              />
            )
          }

          return (
            <ConfiguredCell
              key={tier.id}
              tier={tier}
              record={record}
              features={features}
              onEdit={() => onConfigure(category, tier)}
              onToggleStatus={() => onToggleStatus(record)}
              onRemove={() => onRemove(record.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

// ── UnconfiguredCell ───────────────────────────────────────────────────────────

function UnconfiguredCell({
  tier,
  onConfigure,
}: {
  tier: Tier
  onConfigure: () => void
}) {
  const gradient =
    TIER_GRADIENTS[tier.tier_order] ??
    'bg-linear-to-r from-slate-400 to-slate-500'

  return (
    <Card className='flex h-full flex-col overflow-hidden rounded-sm border p-0'>
      {/* Header */}
      <div
        className={`overflow-hidden rounded-t-sm px-4 py-4 text-white shadow-inner ${gradient}`}
      >
        <div className='flex items-center gap-3'>
          <span className='flex shrink-0 items-center justify-center rounded-md bg-white/20 p-2 backdrop-blur-md'>
            {TIER_ICONS[tier.tier_order] ?? <User className='h-5 w-5' />}
          </span>
          <span className='truncate text-base font-semibold'>{tier.name}</span>
        </div>
      </div>

      {/* Empty state */}
      <button
        onClick={onConfigure}
        className='group flex flex-1 flex-col items-center justify-center gap-3 px-4 py-12 text-muted-foreground transition-colors hover:bg-muted/30'
      >
        <div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30 transition-colors group-hover:border-[#CF9921] group-hover:text-[#CF9921]'>
          <Plus className='h-5 w-5' />
        </div>
        <span className='text-sm font-medium group-hover:text-[#CF9921]'>
          Configure Tier
        </span>
        <span className='text-xs'>Set pricing, features &amp; status</span>
      </button>
    </Card>
  )
}

// ── ConfiguredCell ─────────────────────────────────────────────────────────────

function ConfiguredCell({
  tier,
  record,
  features,
  onEdit,
  onToggleStatus,
  onRemove,
}: {
  tier: Tier
  record: TierPricingRecord
  features: Feature[]
  onEdit: () => void
  onToggleStatus: () => void
  onRemove: () => void
}) {
  const gradient =
    TIER_GRADIENTS[tier.tier_order] ??
    'bg-linear-to-r from-slate-400 to-slate-500'
  const isActive = record.status === 'active'

  return (
    <Card className='flex h-full flex-col overflow-hidden rounded-sm border p-0'>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div
        className={`overflow-hidden rounded-t-sm px-4 py-4 text-white shadow-inner ${gradient}`}
      >
        <div className='flex items-start gap-3 sm:items-center'>
          {/* Icon */}
          <span className='flex shrink-0 items-center justify-center rounded-md bg-white/20 p-2 backdrop-blur-md'>
            {TIER_ICONS[tier.tier_order] ?? <User className='h-5 w-5' />}
          </span>

          {/* Title + badges */}
          <div className='flex flex-col gap-1.5'>
            <span className='text-base leading-tight font-semibold'>
              {tier.name}
            </span>
            <div className='flex items-center gap-1.5'>
              <Badge
                className={`w-fit cursor-pointer rounded-full px-3 text-[10px] font-medium ${
                  isActive
                    ? 'bg-white text-slate-700'
                    : 'bg-white/30 text-white'
                }`}
                onClick={onToggleStatus}
              >
                {isActive ? 'Active' : 'Inactive'}
              </Badge>
              {tier.is_admin_free && (
                <Badge className='cursor-pointer rounded-full bg-white/20 px-2 text-[10px] text-white'>
                  Admin
                </Badge>
              )}
            </div>
          </div>

          {/* Three dot menu */}
          <button
            onClick={onEdit}
            className='ml-auto flex h-6 w-6 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/20 hover:text-white'
            title='Edit configuration'
          >
            <Settings className='h-4 w-4' />
          </button>
        </div>
      </div>

      <CardContent className='px-6 sm:px-3'>
        {/* ── Price ──────────────────────────────────────────────── */}
        <div>
          <div className='flex items-end'>
            <span className='text-3xl font-bold text-slate-900'>
              ${Number(record.monthly_price).toFixed(0)}
            </span>
            <span className='mb-0.5 text-xs text-slate-500'>/month</span>
          </div>
          <div className='mt-1 flex items-center gap-2'>
            <span className='text-xs text-muted-foreground'>
              ${Number(record.yearly_price).toFixed(0)}/year
            </span>
            {record.yearly_discount_percent > 0 && (
              <Badge className='rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700'>
                {record.yearly_discount_percent}%
              </Badge>
            )}
          </div>
          <hr className='-mx-10 my-2 border-slate-200' />
        </div>

        {/* ── Features ───────────────────────────────────────────── */}
        <div className='space-y-3 text-sm text-slate-700'>
          <p className='text-xs tracking-wide text-muted-foreground uppercase'>
            Key Features
          </p>

          {features.length === 0 ? (
            <p className='text-xs text-muted-foreground italic'>
              No features linked
            </p>
          ) : (
            <ul className='space-y-2'>
              {features.map((f) => (
                <li key={f.id} className='flex items-start gap-3 text-xs'>
                  <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
      {/* ── Footer ─────────────────────────────────────────────── */}
      <div className='flex items-center gap-2 px-4 py-3'>
        {/* <Button
          variant='outline'
          className='flex-1 rounded-lg border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
          size='sm'
          onClick={onEdit}
        >
          <Pencil className='mr-1.5 h-3 w-3' />
          Edit
        </Button> */}
        <Button
          size='sm'
          className='flex-1 rounded-md bg-linear-to-r from-[#CF9921] to-[#D2BB6B] text-xs text-white hover:from-yellow-600 hover:to-yellow-700'
          onClick={onEdit}
        >
          Manage
        </Button>
        <Button
          size='icon'
          variant='ghost'
          className='h-8 w-8 shrink-0 text-destructive hover:bg-red-50 hover:text-destructive'
          onClick={onRemove}
          title='Remove pricing configuration'
        >
          <Trash2 className='h-3.5 w-3.5' />
        </Button>
      </div>
    </Card>
  )
}

// ── SectionBlock ───────────────────────────────────────────────────────────────

function SectionBlock({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className='border-b'>
      <button
        onClick={onToggle}
        className='flex w-full items-center justify-between px-4 py-3 text-left hover:bg-muted/30'
      >
        <span className='font-antigua text-sm font-semibold'>{title}</span>
        {open ? (
          <ChevronUp className='h-4 w-4 text-muted-foreground' />
        ) : (
          <ChevronDown className='h-4 w-4 text-muted-foreground' />
        )}
      </button>
      {open && <div className='px-4 pt-1 pb-5'>{children}</div>}
    </div>
  )
}
