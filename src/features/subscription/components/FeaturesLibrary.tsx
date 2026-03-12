import { useEffect, useState } from 'react'
import { Sparkles, Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'

// ── Types ──────────────────────────────────────────────────────────────────────

type CategoryScope =
  | 'all'
  | 'hotels'
  | 'beaches'
  | 'gastronomy'
  | 'real_estate'
  | 'activities'

type Feature = {
  id: string
  slug: string
  label: string
  // description: string | null
  category_scope: CategoryScope
  created_at: string
}

type TierFeatureCount = { feature_id: string; count: number }

const SCOPES: CategoryScope[] = [
  'all',
  'hotels',
  'beaches',
  'gastronomy',
  'real_estate',
  'activities',
]

const scopeColors: Record<CategoryScope, string> = {
  all: 'bg-slate-100 text-slate-600 border-slate-200',
  hotels: 'bg-blue-100 text-blue-600 border-blue-200',
  beaches: 'bg-cyan-100 text-cyan-600 border-cyan-200',
  gastronomy: 'bg-orange-100 text-orange-600 border-orange-200',
  real_estate: 'bg-purple-100 text-purple-600 border-purple-200',
  activities: 'bg-green-100 text-green-600 border-green-200',
}

const emptyForm = {
  label: '',
  slug: '',
  // description: '',
  category_scope: 'all' as CategoryScope,
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function FeaturesLibrary() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [tierCounts, setTierCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    Promise.all([fetchFeatures(), fetchTierCounts()]).finally(() =>
      setLoading(false)
    )
  }, [])

  async function fetchFeatures() {
    const { data } = await supabase.from('features').select('*').order('label')
    if (data) setFeatures(data as Feature[])
  }

  async function fetchTierCounts() {
    // Count how many tier-pricing configs each feature is linked to
    const { data } = await supabase
      .from('tier_pricing_features')
      .select('feature_id')
    if (!data) return
    const counts: Record<string, number> = {}
    data.forEach((row: { feature_id: string }) => {
      counts[row.feature_id] = (counts[row.feature_id] ?? 0) + 1
    })
    setTierCounts(counts)
  }

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(f: Feature) {
    setEditingId(f.id)
    setForm({
      label: f.label,
      slug: f.slug,
      // description: f.description ?? '',
      category_scope: f.category_scope,
    })
    setDialogOpen(true)
  }

  async function save() {
    if (!form.slug.trim() || !form.label.trim()) return

    const slugTrimmed = form.slug.trim()
    const labelTrimmed = form.label.trim()

    // Check slug uniqueness
    const { data: slugDups } = await supabase
      .from('features')
      .select('id')
      .eq('slug', slugTrimmed)
      .neq('id', editingId ?? '')
      .limit(1)
    if (slugDups && slugDups.length > 0) {
      toast.error('Duplicate slug', {
        description: `A feature with slug "${slugTrimmed}" already exists.`,
      })
      return
    }

    // Check label uniqueness
    const { data: labelDups } = await supabase
      .from('features')
      .select('id')
      .ilike('label', labelTrimmed)
      .neq('id', editingId ?? '')
      .limit(1)
    if (labelDups && labelDups.length > 0) {
      toast.error('Duplicate feature', {
        description: `A feature named "${labelTrimmed}" already exists.`,
      })
      return
    }

    const payload = {
      slug: slugTrimmed,
      label: labelTrimmed,
      // description: form.description || null,
      category_scope: form.category_scope,
    }
    if (editingId) {
      const { error } = await supabase
        .from('features')
        .update(payload)
        .eq('id', editingId)
      if (error) {
        toast.error('Failed to update feature', { description: error.message })
        return
      }
      toast.success('Feature updated')
    } else {
      const { error } = await supabase.from('features').insert(payload)
      if (error) {
        toast.error('Failed to create feature', { description: error.message })
        return
      }
      toast.success('Feature created', { description: labelTrimmed })
    }
    setDialogOpen(false)
    fetchFeatures()
    fetchTierCounts()
  }

  async function remove(id: string) {
    // tier_features rows cascade delete via FK ON DELETE CASCADE
    await supabase.from('features').delete().eq('id', id)
    fetchFeatures()
    fetchTierCounts()
  }

  return (
    <section className='my-4 space-y-4'>
      <div>
        <h2 className='font-antigua flex items-center text-xl font-semibold'>
          <Sparkles className='mr-2 h-5 w-5 text-muted-foreground' />
          Feature Library
        </h2>
        <p className='mt-0.5 text-xs text-muted-foreground'>
          Define your default features pool. Link them to tiers in the Tiers
          &amp; Pricing panel above.
        </p>
      </div>

      <Card>
        <CardContent className='space-y-4 px-4 py-4'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-muted-foreground'>
              {features.length} feature{features.length !== 1 ? 's' : ''}{' '}
              defined
            </p>
            <Button
              className='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white'
              onClick={openCreate}
            >
              <Plus className='mr-2 h-4 w-4' />
              Add Feature
            </Button>
          </div>

          <div className='overflow-hidden rounded-xl border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Scope</TableHead>
                  <TableHead>Used by</TableHead>
                  {/* <TableHead className='max-w-[200px]'>Description</TableHead> */}
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='py-8 text-center text-muted-foreground'
                    >
                      Loading…
                    </TableCell>
                  </TableRow>
                ) : features.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='py-8 text-center text-muted-foreground'
                    >
                      No features yet. Add your first default feature.
                    </TableCell>
                  </TableRow>
                ) : (
                  features.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className='font-medium'>{f.label}</TableCell>
                      <TableCell>
                        <code className='rounded bg-muted px-1.5 py-0.5 text-xs'>
                          {f.slug}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant='outline'
                          className={scopeColors[f.category_scope]}
                        >
                          {f.category_scope}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {(tierCounts[f.id] ?? 0) > 0 ? (
                          <Badge
                            variant='outline'
                            className='border-emerald-200 bg-emerald-50 text-emerald-700'
                          >
                            {tierCounts[f.id]} tier
                            {tierCounts[f.id] !== 1 ? 's' : ''}
                          </Badge>
                        ) : (
                          <span className='text-xs text-muted-foreground'>
                            —
                          </span>
                        )}
                      </TableCell>
                      {/* <TableCell className='max-w-[200px] truncate text-xs text-muted-foreground'>
                        {f.description ?? '—'}
                      </TableCell> */}
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-1'>
                          <Button
                            size='icon'
                            variant='ghost'
                            onClick={() => openEdit(f)}
                          >
                            <Pencil className='h-4 w-4' />
                          </Button>
                          <Button
                            size='icon'
                            variant='ghost'
                            className='text-destructive hover:text-destructive'
                            onClick={() => remove(f.id)}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ── Dialog ───────────────────────────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Edit Feature' : 'Add Feature'}
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            <div className='space-y-1'>
              <Label>Label *</Label>
              <Input
                placeholder='e.g. FAQ Section'
                value={form.label}
                onChange={(e) =>
                  setForm({
                    ...form,
                    label: e.target.value,
                    // Auto-fill slug only when creating
                    slug: editingId
                      ? form.slug
                      : e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, '-')
                          .replace(/[^a-z0-9-]/g, '')
                          .replace(/-+$/g, ''),
                  })
                }
              />
            </div>

            <div className='space-y-1'>
              <Label>Slug *</Label>
              <Input
                placeholder='faq-section'
                value={form.slug}
                onChange={(e) =>
                  setForm({
                    ...form,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^a-z0-9-]/g, '')
                      .replace(/-+$/g, ''),
                  })
                }
              />
              <p className='text-xs text-muted-foreground'>
                Unique identifier — lowercase and hyphens only.
              </p>
            </div>

            <div className='space-y-1'>
              <Label>Category Scope</Label>
              <Select
                value={form.category_scope}
                onValueChange={(v) =>
                  setForm({ ...form, category_scope: v as CategoryScope })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SCOPES.map((s) => (
                    <SelectItem key={s} value={s} className='capitalize'>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <div className='space-y-1'>
              <Label>Description</Label>
              <Textarea
                placeholder='Optional — describe what this feature enables'
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
              />
            </div> */}
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] text-white'
              onClick={save}
              disabled={!form.slug.trim() || !form.label.trim()}
            >
              {editingId ? 'Save Changes' : 'Add Feature'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
