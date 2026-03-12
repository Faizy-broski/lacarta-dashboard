'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, Tag } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
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

// ─── Types ───────────────────────────────────────────────────────────────────

export type AttributeType =
  | 'neighborhood'
  | 'key_feature'
  | 'service'
  | 'amenity'
  | 'atmosphere'
  | 'menu'

type AttrStatus = 'active' | 'inactive'

export type CategoryAttribute = {
  id: string
  name: string
  description: string | null
  type: AttributeType
  status: AttrStatus
  created_at: string
  // Joined data
  assigned_categories?: { id: string; name: string }[]
}

type Category = {
  id: string
  name: string
  description: string | null
  type: string
  status: string
  created_at: string
}

const statusBadgeColor: Record<AttrStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  inactive: 'bg-slate-100 text-slate-500 border-slate-200',
}

const STATUSES: AttrStatus[] = ['active', 'inactive']

// ─── Component ───────────────────────────────────────────────────────────────

interface AttributeTabProps {
  attrType: AttributeType
  label: string
  categories: Category[]
}

export function AttributeTab({
  attrType,
  label,
  categories,
}: AttributeTabProps) {
  const [items, setItems] = useState<CategoryAttribute[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [initialFetched, setInitialFetched] = useState(false)

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'active' as AttrStatus,
    categoryIds: [] as string[],
  })

  // Delete dialog
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    id: string
    name: string
  }>({ open: false, id: '', name: '' })

  // ── Fetch ──────────────────────────────────────────────────────────────────

  async function fetchItems() {
    setLoading(true)
    try {
      // Fetch attributes of this type
      const { data: attrs } = await supabase
        .from('category_attributes')
        .select('*')
        .eq('type', attrType)
        .order('created_at', { ascending: false })

      if (!attrs) {
        setItems([])
        return
      }

      // Fetch assignments for these attributes
      const attrIds = attrs.map((a) => a.id)
      let assignments: any[] = []
      if (attrIds.length > 0) {
        const { data: assignData } = await supabase
          .from('category_attribute_assignments')
          .select('attribute_id, category_id, categories(id, name)')
          .in('attribute_id', attrIds)
        assignments = assignData ?? []
      }

      // Merge assignments into attributes
      const merged: CategoryAttribute[] = attrs.map((attr) => ({
        ...attr,
        assigned_categories: assignments
          .filter((a) => a.attribute_id === attr.id)
          .map((a) => ({
            id: a.categories?.id ?? a.category_id,
            name: a.categories?.name ?? 'Unknown',
          })),
      }))

      setItems(merged)
    } finally {
      setLoading(false)
    }
  }

  // Auto-fetch on first render
  if (!initialFetched) {
    setInitialFetched(true)
    fetchItems()
  }

  // ── CRUD ───────────────────────────────────────────────────────────────────

  function openCreate() {
    setEditingId(null)
    setForm({ name: '', description: '', status: 'active', categoryIds: [] })
    setDialogOpen(true)
  }

  function openEdit(item: CategoryAttribute) {
    setEditingId(item.id)
    setForm({
      name: item.name,
      description: item.description ?? '',
      status: item.status,
      categoryIds: item.assigned_categories?.map((c) => c.id) ?? [],
    })
    setDialogOpen(true)
  }

  async function saveItem() {
    if (!form.name.trim()) return
    if (form.categoryIds.length === 0) {
      toast.error('Please select at least one category')
      return
    }

    const nameTrimmed = form.name.trim()

    // Uniqueness check within this type
    const duplicate = items.find(
      (i) =>
        i.name.toLowerCase() === nameTrimmed.toLowerCase() && i.id !== editingId
    )
    if (duplicate) {
      toast.error(`Duplicate ${label.toLowerCase()}`, {
        description: `"${nameTrimmed}" already exists.`,
      })
      return
    }

    setSaving(true)
    try {
      const payload = {
        name: nameTrimmed,
        description: form.description || null,
        type: attrType,
        status: form.status,
      }

      let attrId = editingId

      if (editingId) {
        const { error } = await supabase
          .from('category_attributes')
          .update(payload)
          .eq('id', editingId)
        if (error) {
          toast.error(`Failed to update ${label.toLowerCase()}`, {
            description: error.message,
          })
          return
        }
      } else {
        const { data, error } = await supabase
          .from('category_attributes')
          .insert(payload)
          .select('id')
          .single()
        if (error || !data) {
          toast.error(`Failed to create ${label.toLowerCase()}`, {
            description: error?.message,
          })
          return
        }
        attrId = data.id
      }

      // Sync category assignments
      // Delete existing assignments for this attribute
      if (attrId) {
        await supabase
          .from('category_attribute_assignments')
          .delete()
          .eq('attribute_id', attrId)

        // Insert new assignments
        if (form.categoryIds.length > 0) {
          const assignPayloads = form.categoryIds.map((catId) => ({
            attribute_id: attrId!,
            category_id: catId,
          }))
          const { error: assignErr } = await supabase
            .from('category_attribute_assignments')
            .insert(assignPayloads)
          if (assignErr) {
            toast.error('Failed to assign categories', {
              description: assignErr.message,
            })
          }
        }
      }

      toast.success(editingId ? `${label} updated` : `${label} created`, {
        description: nameTrimmed,
      })
      setDialogOpen(false)
      fetchItems()
    } finally {
      setSaving(false)
    }
  }

  async function confirmDelete() {
    const { id } = deleteDialog
    const { error } = await supabase
      .from('category_attributes')
      .delete()
      .eq('id', id)
    if (error) {
      toast.error(`Failed to delete ${label.toLowerCase()}`, {
        description: error.message,
      })
    } else {
      toast.success(`${label} deleted`)
      fetchItems()
    }
    setDeleteDialog({ ...deleteDialog, open: false })
  }

  // ── Filtered data ─────────────────────────────────────────────────────────

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      (i.description ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (i.assigned_categories ?? []).some((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
  )

  // ── Toggle category in multi-select ────────────────────────────────────────

  function toggleCategory(catId: string) {
    setForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(catId)
        ? prev.categoryIds.filter((id) => id !== catId)
        : [...prev.categoryIds, catId],
    }))
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Card>
        <CardContent className='space-y-4 p-4 sm:p-6'>
          {/* Toolbar */}
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='relative flex-1 sm:max-w-xs'>
              <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                placeholder={`Search ${label.toLowerCase()}…`}
                className='pl-9'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              className='bg-gradient-to-r from-gold to-gold-light text-white'
              onClick={openCreate}
            >
              <Plus className='mr-2 h-4 w-4' />
              Add {label}
            </Button>
          </div>

          {/* Desktop Table */}
          <div className='hidden overflow-hidden rounded-lg border md:block'>
            <Table>
              <TableHeader>
                <TableRow className='bg-muted/30'>
                  <TableHead className='font-semibold'>Name</TableHead>
                  <TableHead className='font-semibold'>
                    Assigned Categories
                  </TableHead>
                  <TableHead className='font-semibold'>Description</TableHead>
                  <TableHead className='font-semibold'>Status</TableHead>
                  <TableHead className='text-right font-semibold'>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className='py-12 text-center text-muted-foreground'
                    >
                      <div className='flex flex-col items-center gap-2'>
                        <div className='h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent' />
                        <span className='text-sm'>Loading…</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className='py-12 text-center text-muted-foreground'
                    >
                      <div className='flex flex-col items-center gap-2'>
                        <Tag className='h-8 w-8 text-muted-foreground/40' />
                        <p className='text-sm'>
                          {search
                            ? `No ${label.toLowerCase()} match your search.`
                            : `No ${label.toLowerCase()} found. Create your first one.`}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((item) => (
                    <TableRow
                      key={item.id}
                      className='transition-colors hover:bg-muted/30'
                    >
                      <TableCell className='font-medium'>{item.name}</TableCell>
                      <TableCell>
                        <div className='flex flex-wrap gap-1'>
                          {(item.assigned_categories ?? []).length === 0 ? (
                            <span className='text-xs text-muted-foreground italic'>
                              Unassigned
                            </span>
                          ) : (
                            (item.assigned_categories ?? []).map((c) => (
                              <Badge
                                key={c.id}
                                variant='outline'
                                className='border-blue-200 bg-blue-50 text-[10px] text-blue-700'
                              >
                                {c.name}
                              </Badge>
                            ))
                          )}
                        </div>
                      </TableCell>
                      <TableCell className='max-w-[200px] truncate text-xs text-muted-foreground'>
                        {item.description ?? (
                          <span className='italic'>No description</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant='outline'
                          className={`text-[11px] capitalize ${statusBadgeColor[item.status]}`}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-1'>
                          <Button
                            size='icon'
                            variant='ghost'
                            className='h-8 w-8'
                            onClick={() => openEdit(item)}
                          >
                            <Pencil className='h-3.5 w-3.5' />
                          </Button>
                          <Button
                            size='icon'
                            variant='ghost'
                            className='h-8 w-8 text-destructive hover:text-destructive'
                            onClick={() =>
                              setDeleteDialog({
                                open: true,
                                id: item.id,
                                name: item.name,
                              })
                            }
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

          {/* Mobile Cards */}
          <div className='space-y-3 md:hidden'>
            {loading ? (
              <div className='flex flex-col items-center gap-2 py-12 text-muted-foreground'>
                <div className='h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent' />
                <span className='text-sm'>Loading…</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className='flex flex-col items-center gap-2 py-12 text-muted-foreground'>
                <Tag className='h-8 w-8 text-muted-foreground/40' />
                <p className='text-sm'>
                  {search
                    ? `No ${label.toLowerCase()} match.`
                    : `No ${label.toLowerCase()} yet.`}
                </p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className='rounded-lg border p-4 transition-colors hover:bg-muted/20'
                >
                  <div className='mb-2 flex items-start justify-between'>
                    <div>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {item.description ?? 'No description'}
                      </p>
                    </div>
                    <div className='flex gap-1'>
                      <Button
                        size='icon'
                        variant='ghost'
                        className='h-7 w-7'
                        onClick={() => openEdit(item)}
                      >
                        <Pencil className='h-3 w-3' />
                      </Button>
                      <Button
                        size='icon'
                        variant='ghost'
                        className='h-7 w-7 text-destructive hover:text-destructive'
                        onClick={() =>
                          setDeleteDialog({
                            open: true,
                            id: item.id,
                            name: item.name,
                          })
                        }
                      >
                        <Trash2 className='h-3 w-3' />
                      </Button>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-1.5'>
                    {(item.assigned_categories ?? []).map((c) => (
                      <Badge
                        key={c.id}
                        variant='outline'
                        className='border-blue-200 bg-blue-50 text-[10px] text-blue-700'
                      >
                        {c.name}
                      </Badge>
                    ))}
                    {item.status && (
                      <Badge
                        variant='outline'
                        className={`text-[10px] capitalize ${statusBadgeColor[item.status]}`}
                      >
                        {item.status}
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Count footer */}
          {!loading && filtered.length > 0 && (
            <p className='text-xs text-muted-foreground'>
              Showing {filtered.length} of {items.length} {label.toLowerCase()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* ── Create/Edit Dialog ────────────────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='font-antigua'>
              {editingId ? `Edit ${label}` : `Create ${label}`}
            </DialogTitle>
            <DialogDescription className='text-xs'>
              {editingId
                ? `Update the ${label.toLowerCase()} details below.`
                : `Fill in the details to create a new ${label.toLowerCase()}. Assign it to one or more categories.`}
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            <div className='space-y-1.5'>
              <Label>Name *</Label>
              <Input
                placeholder={`e.g. ${
                  attrType === 'neighborhood'
                    ? 'Downtown, Beachfront'
                    : attrType === 'key_feature'
                      ? 'Ocean View, Rooftop'
                      : attrType === 'service'
                        ? 'Concierge, Valet'
                        : attrType === 'amenity'
                          ? 'WiFi, Pool, Gym'
                          : attrType === 'atmosphere'
                            ? 'Romantic, Family-Friendly'
                            : 'Italian, Seafood, Sushi'
                }`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className='space-y-1.5'>
              <Label>Description</Label>
              <Textarea
                placeholder='Optional description'
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={2}
              />
            </div>

            <div className='space-y-1.5'>
              <Label>Assign to Categories *</Label>
              <div className='max-h-40 space-y-2 overflow-y-auto rounded-md border p-3'>
                {categories.length === 0 ? (
                  <p className='text-xs text-muted-foreground italic'>
                    No categories available. Create a category first.
                  </p>
                ) : (
                  categories.map((cat) => (
                    <label
                      key={cat.id}
                      className='flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 hover:bg-muted/40'
                    >
                      <Checkbox
                        checked={form.categoryIds.includes(cat.id)}
                        onCheckedChange={() => toggleCategory(cat.id)}
                      />
                      <span className='text-sm'>{cat.name}</span>
                      <Badge
                        variant='outline'
                        className='ml-auto text-[10px] capitalize opacity-60'
                      >
                        {cat.type}
                      </Badge>
                    </label>
                  ))
                )}
              </div>
              {form.categoryIds.length > 0 && (
                <p className='text-[11px] text-muted-foreground'>
                  {form.categoryIds.length} categor
                  {form.categoryIds.length === 1 ? 'y' : 'ies'} selected
                </p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm({ ...form, status: v as AttrStatus })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s} className='capitalize'>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className='bg-gradient-to-r from-gold to-gold-light text-white'
              onClick={saveItem}
              disabled={
                !form.name.trim() || form.categoryIds.length === 0 || saving
              }
            >
              {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation ──────────────────────────────────────────────── */}
      <Dialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
      >
        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle className='font-antigua text-destructive'>
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className='text-sm'>
              Are you sure you want to delete{' '}
              <strong>{deleteDialog.name}</strong>?
              <br />
              <span className='text-xs text-destructive'>
                This action cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setDeleteDialog({ ...deleteDialog, open: false })}
            >
              Cancel
            </Button>
            <Button variant='destructive' onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
