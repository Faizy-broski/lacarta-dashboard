'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

// ─── Types ───────────────────────────────────────────────────────────────────

type CategoryType = 'listing' | 'event' | 'blog' | 'resource'
type CategoryStatus = 'active' | 'inactive'
type SubCategoryStatus = 'active' | 'inactive'

type Category = {
  id: string
  name: string
  description: string | null
  type: CategoryType
  status: CategoryStatus
  created_at: string
}

type SubCategory = {
  id: number
  name: string
  created_at: string
  category: string | null
  description: string | null
  status: SubCategoryStatus | null
  categories?: { name: string } | null
}

const CATEGORY_TYPES: CategoryType[] = ['listing', 'event', 'blog', 'resource']
const STATUSES: CategoryStatus[] = ['active', 'inactive']

const typeBadgeColor: Record<CategoryType, string> = {
  listing: 'bg-blue-100 text-blue-700 border-blue-200',
  event: 'bg-purple-100 text-purple-700 border-purple-200',
  blog: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  resource: 'bg-cyan-100 text-cyan-700 border-cyan-200',
}

const statusBadgeColor: Record<CategoryStatus, string> = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-red-100 text-red-700 border-red-200',
}

// ─── Empty form defaults ─────────────────────────────────────────────────────

const emptyCategoryForm = {
  name: '',
  description: '',
  type: 'listing' as CategoryType,
  status: 'active' as CategoryStatus,
}

const emptySubForm = {
  name: '',
  category: '',
  description: '',
  status: 'active' as SubCategoryStatus,
}

// ─── Component ───────────────────────────────────────────────────────────────

export function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<SubCategory[]>([])
  const [loading, setLoading] = useState(true)

  // Category dialog
  const [catDialogOpen, setCatDialogOpen] = useState(false)
  const [catForm, setCatForm] = useState(emptyCategoryForm)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)

  // Sub-category dialog
  const [subDialogOpen, setSubDialogOpen] = useState(false)
  const [subForm, setSubForm] = useState(emptySubForm)
  const [editingSubId, setEditingSubId] = useState<number | null>(null)

  useEffect(() => {
    Promise.all([fetchCategories(), fetchSubcategories()]).finally(() =>
      setLoading(false)
    )
  }, [])

  // ── Fetch ──────────────────────────────────────────────────────────────────

  async function fetchCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setCategories(data as Category[])
  }

  async function fetchSubcategories() {
    const { data } = await supabase
      .from('sub-categories')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })
    if (data) setSubcategories(data as SubCategory[])
  }

  // ── Category CRUD ──────────────────────────────────────────────────────────

  function openCreateCategory() {
    setEditingCatId(null)
    setCatForm(emptyCategoryForm)
    setCatDialogOpen(true)
  }

  function openEditCategory(cat: Category) {
    setEditingCatId(cat.id)
    setCatForm({
      name: cat.name,
      description: cat.description ?? '',
      type: cat.type,
      status: cat.status,
    })
    setCatDialogOpen(true)
  }

  async function saveCategory() {
    if (!catForm.name.trim()) return

    if (editingCatId) {
      await supabase
        .from('categories')
        .update({
          name: catForm.name,
          description: catForm.description || null,
          type: catForm.type,
          status: catForm.status,
        })
        .eq('id', editingCatId)
    } else {
      await supabase.from('categories').insert({
        name: catForm.name,
        description: catForm.description || null,
        type: catForm.type,
        status: catForm.status,
      })
    }

    setCatDialogOpen(false)
    fetchCategories()
  }

  async function deleteCategory(id: string) {
    await supabase.from('categories').delete().eq('id', id)
    fetchCategories()
  }

  // ── Sub-category CRUD ──────────────────────────────────────────────────────

  function openCreateSub() {
    setEditingSubId(null)
    setSubForm(emptySubForm)
    setSubDialogOpen(true)
  }

  function openEditSub(sub: SubCategory) {
    setEditingSubId(sub.id)
    setSubForm({
      name: sub.name ?? '',
      category: sub.category ?? '',
      description: sub.description ?? '',
      status: sub.status ?? 'active',
    })
    setSubDialogOpen(true)
  }

  async function saveSub() {
    if (editingSubId !== null) {
      await supabase
        .from('sub-categories')
        .update({
          name: subForm.name || null,
          category: subForm.category || null,
          description: subForm.description || null,
          status: subForm.status,
        })
        .eq('id', editingSubId)
    } else {
      await supabase.from('sub-categories').insert({
        name: subForm.name || null,
        category: subForm.category || null,
        description: subForm.description || null,
        status: subForm.status,
      })
    }

    setSubDialogOpen(false)
    fetchSubcategories()
  }

  async function deleteSub(id: number) {
    await supabase.from('sub-categories').delete().eq('id', id)
    fetchSubcategories()
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Header />

      <Main>
        <div className='mb-6'>
          <h2 className='text-2xl font-bold tracking-tight'>Categories</h2>
          <p className='text-muted-foreground'>
            Manage categories and sub-categories for listings, events, blogs,
            and resources.
          </p>
        </div>

        <Tabs defaultValue='categories'>
          <TabsList className='mb-4'>
            <TabsTrigger value='categories' >Categories</TabsTrigger>
            <TabsTrigger value='subcategories'>Sub-categories</TabsTrigger>
          </TabsList>

          {/* ── Categories Tab ─────────────────────────────────────────────── */}
          <TabsContent value='categories'>
            <div className='mb-4 flex justify-end'>
              <Button className='bg-gradient-to-r from-gold to-gold-light' onClick={openCreateCategory}>
                <Plus className='mr-2 h-4 w-4' />
                Add Category
              </Button>
            </div>

            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className='py-8 text-center text-muted-foreground'
                      >
                        Loading…
                      </TableCell>
                    </TableRow>
                  ) : categories.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className='py-8 text-center text-muted-foreground'
                      >
                        No categories found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((cat) => (
                      <TableRow key={cat.id}>
                        <TableCell className='font-medium'>
                          {cat.name}
                        </TableCell>
                        <TableCell className='max-w-xs truncate text-muted-foreground'>
                          {cat.description ?? '—'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant='outline'
                            className={typeBadgeColor[cat.type]}
                          >
                            {cat.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant='outline'
                            className={statusBadgeColor[cat.status]}
                          >
                            {cat.status}
                          </Badge>
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end gap-2'>
                            <Button
                              size='icon'
                              variant='ghost'
                              onClick={() => openEditCategory(cat)}
                            >
                              <Pencil className='h-4 w-4' />
                            </Button>
                            <Button
                              size='icon'
                              variant='ghost'
                              className='text-destructive hover:text-destructive'
                              onClick={() => deleteCategory(cat.id)}
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
          </TabsContent>

          {/* ── Sub-categories Tab ─────────────────────────────────────────── */}
          <TabsContent value='subcategories'>
            <div className='mb-4 flex justify-end'>
              <Button className='bg-gradient-to-r from-gold to-gold-light' onClick={openCreateSub}>
                <Plus className='mr-2 h-4 w-4' />
                Add Sub-category
              </Button>
            </div>

            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Parent Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className='py-8 text-center text-muted-foreground'
                      >
                        Loading…
                      </TableCell>
                    </TableRow>
                  ) : subcategories.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className='py-8 text-center text-muted-foreground'
                      >
                        No sub-categories found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    subcategories.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className='text-muted-foreground'>
                          {sub.name}
                        </TableCell>
                        <TableCell className='font-medium'>
                          {sub.categories?.name ?? '—'}
                        </TableCell>
                        <TableCell className='max-w-xs truncate text-muted-foreground'>
                          {sub.description ?? '—'}
                        </TableCell>
                        <TableCell>
                          {sub.status ? (
                            <Badge
                              variant='outline'
                              className={statusBadgeColor[sub.status]}
                            >
                              {sub.status}
                            </Badge>
                          ) : (
                            <span className='text-muted-foreground'>—</span>
                          )}
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end gap-2'>
                            <Button
                              size='icon'
                              variant='ghost'
                              onClick={() => openEditSub(sub)}
                            >
                              <Pencil className='h-4 w-4' />
                            </Button>
                            <Button
                              size='icon'
                              variant='ghost'
                              className='text-destructive hover:text-destructive'
                              onClick={() => deleteSub(sub.id)}
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
          </TabsContent>
        </Tabs>
      </Main>

      {/* ── Category Dialog ──────────────────────────────────────────────────── */}
      <Dialog open={catDialogOpen} onOpenChange={setCatDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>
              {editingCatId ? 'Edit Category' : 'Create Category'}
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            <div className='space-y-1'>
              <label className='text-sm font-medium'>Name *</label>
              <Input
                placeholder='Category name'
                value={catForm.name}
                onChange={(e) =>
                  setCatForm({ ...catForm, name: e.target.value })
                }
              />
            </div>

            <div className='space-y-1'>
              <label className='text-sm font-medium'>Description</label>
              <Textarea
                placeholder='Optional description'
                value={catForm.description}
                onChange={(e) =>
                  setCatForm({ ...catForm, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className='space-y-1'>
              <label className='text-sm font-medium'>Type *</label>
              <Select
                value={catForm.type}
                onValueChange={(v) =>
                  setCatForm({ ...catForm, type: v as CategoryType })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_TYPES.map((t) => (
                    <SelectItem key={t} value={t} className='capitalize'>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-1'>
              <label className='text-sm font-medium'>Status *</label>
              <Select
                value={catForm.status}
                onValueChange={(v) =>
                  setCatForm({ ...catForm, status: v as CategoryStatus })
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
            <Button variant='outline' onClick={() => setCatDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveCategory} disabled={!catForm.name.trim()}>
              {editingCatId ? 'Save Changes' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Sub-category Dialog ──────────────────────────────────────────────── */}
      <Dialog open={subDialogOpen} onOpenChange={setSubDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>
              {editingSubId !== null
                ? 'Edit Sub-category'
                : 'Create Sub-category'}
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            <div className='space-y-1'>
              <label className='text-sm font-medium'>Parent Category</label>
              <Select
                value={subForm.category}
                onValueChange={(v) => setSubForm({ ...subForm, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-1'>
              <label className='text-sm font-medium'>Name *</label>
              <Input
                placeholder='SubCategory name'
                value={subForm.name}
                onChange={(e) =>
                  setSubForm({ ...subForm, name: e.target.value })
                }
              />
            </div>

            <div className='space-y-1'>
              <label className='text-sm font-medium'>Description</label>
              <Textarea
                placeholder='Optional description'
                value={subForm.description}
                onChange={(e) =>
                  setSubForm({ ...subForm, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className='space-y-1'>
              <label className='text-sm font-medium'>Status</label>
              <Select
                value={subForm.status}
                onValueChange={(v) =>
                  setSubForm({ ...subForm, status: v as SubCategoryStatus })
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
            <Button variant='outline' onClick={() => setSubDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveSub}>
              {editingSubId !== null ? 'Save Changes' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
