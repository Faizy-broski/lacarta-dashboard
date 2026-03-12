'use client'

import { useEffect, useState } from 'react'
import {
  FolderTree,
  Layers,
  Plus,
  Pencil,
  Trash2,
  Search,
  FolderOpen,
  MapPin,
  Star,
  Wrench,
  Gem,
  CloudSun,
  UtensilsCrossed,
  Tag,
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { AttributeTab } from './AttributeTab'

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
  listing: 'bg-blue-50 text-blue-700 border-blue-200',
  event: 'bg-purple-50 text-purple-700 border-purple-200',
  blog: 'bg-amber-50 text-amber-700 border-amber-200',
  resource: 'bg-cyan-50 text-cyan-700 border-cyan-200',
}

// const typeIcon: Record<CategoryType, string> = {
//   listing: '🏠',
//   event: '📅',
//   blog: '📝',
//   resource: '📦',
// }

const statusBadgeColor: Record<CategoryStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  inactive: 'bg-slate-100 text-slate-500 border-slate-200',
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
  const [searchCat, setSearchCat] = useState('')
  const [searchSub, setSearchSub] = useState('')

  // Category dialog
  const [catDialogOpen, setCatDialogOpen] = useState(false)
  const [catForm, setCatForm] = useState(emptyCategoryForm)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [catSaving, setCatSaving] = useState(false)

  // Sub-category dialog
  const [subDialogOpen, setSubDialogOpen] = useState(false)
  const [subForm, setSubForm] = useState(emptySubForm)
  const [editingSubId, setEditingSubId] = useState<number | null>(null)
  const [subSaving, setSubSaving] = useState(false)

  // Delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    type: 'category' | 'subcategory'
    id: string | number
    name: string
  }>({ open: false, type: 'category', id: '', name: '' })

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

    const nameTrimmed = catForm.name.trim()

    // Uniqueness check: name + type combo must be unique
    const duplicate = categories.find(
      (c) =>
        c.name.toLowerCase() === nameTrimmed.toLowerCase() &&
        c.type === catForm.type &&
        c.id !== editingCatId
    )
    if (duplicate) {
      toast.error('Duplicate category', {
        description: `A "${catForm.type}" category named "${nameTrimmed}" already exists.`,
      })
      return
    }

    setCatSaving(true)
    try {
      const payload = {
        name: nameTrimmed,
        description: catForm.description || null,
        type: catForm.type,
        status: catForm.status,
      }

      if (editingCatId) {
        const { error } = await supabase
          .from('categories')
          .update(payload)
          .eq('id', editingCatId)
        if (error) {
          toast.error('Failed to update category', {
            description: error.message,
          })
          return
        }
        toast.success('Category updated', { description: nameTrimmed })
      } else {
        const { error } = await supabase.from('categories').insert(payload)
        if (error) {
          toast.error('Failed to create category', {
            description: error.message,
          })
          return
        }
        toast.success('Category created', { description: nameTrimmed })
      }

      setCatDialogOpen(false)
      fetchCategories()
    } finally {
      setCatSaving(false)
    }
  }

  async function confirmDelete() {
    const { type, id } = deleteDialog
    if (type === 'category') {
      const { error } = await supabase.from('categories').delete().eq('id', id)
      if (error) {
        toast.error('Failed to delete category', {
          description: error.message,
        })
      } else {
        toast.success('Category deleted')
        fetchCategories()
        fetchSubcategories() // refresh in case orphaned
      }
    } else {
      const { error } = await supabase
        .from('sub-categories')
        .delete()
        .eq('id', id)
      if (error) {
        toast.error('Failed to delete sub-category', {
          description: error.message,
        })
      } else {
        toast.success('Sub-category deleted')
        fetchSubcategories()
      }
    }
    setDeleteDialog({ ...deleteDialog, open: false })
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
    if (!subForm.name?.trim()) {
      toast.error('Name is required')
      return
    }
    if (!subForm.category) {
      toast.error('Please select a parent category')
      return
    }

    const nameTrimmed = subForm.name.trim()

    // Uniqueness check: sub-category name must be unique within the same parent category
    const duplicate = subcategories.find(
      (s) =>
        s.name?.toLowerCase() === nameTrimmed.toLowerCase() &&
        s.category === subForm.category &&
        s.id !== editingSubId
    )
    if (duplicate) {
      const parentName =
        categories.find((c) => c.id === subForm.category)?.name ??
        'this category'
      toast.error('Duplicate sub-category', {
        description: `"${nameTrimmed}" already exists under "${parentName}".`,
      })
      return
    }

    setSubSaving(true)
    try {
      const payload = {
        name: nameTrimmed,
        category: subForm.category || null,
        description: subForm.description || null,
        status: subForm.status,
      }

      if (editingSubId !== null) {
        const { error } = await supabase
          .from('sub-categories')
          .update(payload)
          .eq('id', editingSubId)
        if (error) {
          toast.error('Failed to update sub-category', {
            description: error.message,
          })
          return
        }
        toast.success('Sub-category updated', { description: nameTrimmed })
      } else {
        const { error } = await supabase.from('sub-categories').insert(payload)
        if (error) {
          toast.error('Failed to create sub-category', {
            description: error.message,
          })
          return
        }
        toast.success('Sub-category created', { description: nameTrimmed })
      }

      setSubDialogOpen(false)
      fetchSubcategories()
    } finally {
      setSubSaving(false)
    }
  }

  // ── Filtered data ─────────────────────────────────────────────────────────

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchCat.toLowerCase()) ||
      (c.description ?? '').toLowerCase().includes(searchCat.toLowerCase()) ||
      c.type.includes(searchCat.toLowerCase())
  )

  const filteredSubs = subcategories.filter(
    (s) =>
      (s.name ?? '').toLowerCase().includes(searchSub.toLowerCase()) ||
      (s.categories?.name ?? '')
        .toLowerCase()
        .includes(searchSub.toLowerCase()) ||
      (s.description ?? '').toLowerCase().includes(searchSub.toLowerCase())
  )

  // ── Computed stats ────────────────────────────────────────────────────────

  const activeCategories = categories.filter(
    (c) => c.status === 'active'
  ).length
  const activeSubs = subcategories.filter((s) => s.status === 'active').length

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Header />

      <Main>
        {/* ── Page Header ──────────────────────────────────── */}
        <div className='mb-6 space-y-1'>
          <h1 className='font-antigua text-3xl font-bold tracking-tight'>
            Categories
          </h1>
          <p className='text-xs text-muted-foreground'>
            Manage categories and sub-categories for listings, events, blogs,
            and resources.
          </p>
        </div>

        {/* ── Stats Overview ──────────────────────────────── */}
        <div className='mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
          <Card className='border-0 shadow-md'>
            <CardContent className='flex items-center gap-3 p-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#CF9921]/10'>
                <Layers className='h-5 w-5 text-[#CF9921]' />
              </div>
              <div>
                <p className='text-[11px] text-muted-foreground'>
                  Total Categories
                </p>
                <p className='text-2xl font-bold'>{categories.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className='border-0 shadow-md'>
            <CardContent className='flex items-center gap-3 p-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#22C55E]/10'>
                <FolderOpen className='h-5 w-5 text-[#22C55E]' />
              </div>
              <div>
                <p className='text-[11px] text-muted-foreground'>Active</p>
                <p className='text-2xl font-bold'>{activeCategories}</p>
              </div>
            </CardContent>
          </Card>
          <Card className='border-0 shadow-md'>
            <CardContent className='flex items-center gap-3 p-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#D40D00]/10'>
                <FolderTree className='h-5 w-5 text-[#D40D00]' />
              </div>
              <div>
                <p className='text-[11px] text-muted-foreground'>
                  Sub-categories
                </p>
                <p className='text-2xl font-bold'>{subcategories.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className='border-0 shadow-md'>
            <CardContent className='flex items-center gap-3 p-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#CF9921]/10'>
                <FolderOpen className='h-5 w-5 text-[#CF9921]' />
              </div>
              <div>
                <p className='text-[11px] text-muted-foreground'>Active Subs</p>
                <p className='text-2xl font-bold'>{activeSubs}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Tabs ────────────────────────────────────────── */}
        <Tabs defaultValue='categories'>
          <TabsList className='mb-4 h-auto flex-wrap gap-1'>
            <TabsTrigger value='categories' className='gap-1.5'>
              <Layers className='h-3.5 w-3.5' />
              Categories
            </TabsTrigger>
            <TabsTrigger value='subcategories' className='gap-1.5'>
              <FolderTree className='h-3.5 w-3.5' />
              Types
            </TabsTrigger>
            <TabsTrigger value='neighborhoods' className='gap-1.5'>
              <MapPin className='h-3.5 w-3.5' />
              Neighborhoods
            </TabsTrigger>
            <TabsTrigger value='key_features' className='gap-1.5'>
              <Star className='h-3.5 w-3.5' />
              Key Features
            </TabsTrigger>
            <TabsTrigger value='services' className='gap-1.5'>
              <Wrench className='h-3.5 w-3.5' />
              Services
            </TabsTrigger>
            <TabsTrigger value='amenities' className='gap-1.5'>
              <Gem className='h-3.5 w-3.5' />
              Amenities
            </TabsTrigger>
            <TabsTrigger value='atmosphere' className='gap-1.5'>
              <CloudSun className='h-3.5 w-3.5' />
              Atmosphere
            </TabsTrigger>
            <TabsTrigger value='menu' className='gap-1.5'>
              <UtensilsCrossed className='h-3.5 w-3.5' />
              Menu
            </TabsTrigger>
          </TabsList>

          {/* ── Categories Tab ─────────────────────────────── */}
          <TabsContent value='categories'>
            <Card>
              <CardContent className='space-y-4 p-4 sm:p-6'>
                {/* Toolbar */}
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                  <div className='relative flex-1 sm:max-w-xs'>
                    <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      placeholder='Search categories…'
                      className='pl-9'
                      value={searchCat}
                      onChange={(e) => setSearchCat(e.target.value)}
                    />
                  </div>
                  <Button
                    className='bg-gradient-to-r from-gold to-gold-light text-white'
                    onClick={openCreateCategory}
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Add Category
                  </Button>
                </div>

                {/* Desktop Table */}
                <div className='hidden overflow-hidden rounded-lg border md:block'>
                  <Table>
                    <TableHeader>
                      <TableRow className='bg-muted/30'>
                        <TableHead className='font-semibold'>Name</TableHead>
                        <TableHead className='font-semibold'>
                          Description
                        </TableHead>
                        <TableHead className='font-semibold'>Type</TableHead>
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
                      ) : filteredCategories.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className='py-12 text-center text-muted-foreground'
                          >
                            <div className='flex flex-col items-center gap-2'>
                              <Layers className='h-8 w-8 text-muted-foreground/40' />
                              <p className='text-sm'>
                                {searchCat
                                  ? 'No categories match your search.'
                                  : 'No categories found. Create your first one.'}
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredCategories.map((cat) => (
                          <TableRow
                            key={cat.id}
                            className='transition-colors hover:bg-muted/30'
                          >
                            <TableCell>
                              <div className='flex items-center gap-2'>
                                <span className='text-base'>
                                  {/* {typeIcon[cat.type]} */}
                                </span>
                                <span className='font-medium'>{cat.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className='max-w-[200px] truncate text-xs text-muted-foreground'>
                              {cat.description ?? (
                                <span className='italic'>No description</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant='outline'
                                className={`text-[11px] capitalize ${typeBadgeColor[cat.type]}`}
                              >
                                {cat.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant='outline'
                                className={`text-[11px] capitalize ${statusBadgeColor[cat.status]}`}
                              >
                                {cat.status}
                              </Badge>
                            </TableCell>
                            <TableCell className='text-right'>
                              <div className='flex justify-end gap-1'>
                                <Button
                                  size='icon'
                                  variant='ghost'
                                  className='h-8 w-8'
                                  onClick={() => openEditCategory(cat)}
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
                                      type: 'category',
                                      id: cat.id,
                                      name: cat.name,
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
                  ) : filteredCategories.length === 0 ? (
                    <div className='flex flex-col items-center gap-2 py-12 text-muted-foreground'>
                      <Layers className='h-8 w-8 text-muted-foreground/40' />
                      <p className='text-sm'>
                        {searchCat
                          ? 'No categories match.'
                          : 'No categories yet.'}
                      </p>
                    </div>
                  ) : (
                    filteredCategories.map((cat) => (
                      <div
                        key={cat.id}
                        className='rounded-lg border p-4 transition-colors hover:bg-muted/20'
                      >
                        <div className='mb-2 flex items-start justify-between'>
                          <div className='flex items-center gap-2'>
                            {/* <span className='text-lg'>
                              {typeIcon[cat.type]}
                            </span> */}
                            <div>
                              <p className='font-medium'>{cat.name}</p>
                              <p className='text-xs text-muted-foreground'>
                                {cat.description ?? 'No description'}
                              </p>
                            </div>
                          </div>
                          <div className='flex gap-1'>
                            <Button
                              size='icon'
                              variant='ghost'
                              className='h-7 w-7'
                              onClick={() => openEditCategory(cat)}
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
                                  type: 'category',
                                  id: cat.id,
                                  name: cat.name,
                                })
                              }
                            >
                              <Trash2 className='h-3 w-3' />
                            </Button>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <Badge
                            variant='outline'
                            className={`text-[10px] capitalize ${typeBadgeColor[cat.type]}`}
                          >
                            {cat.type}
                          </Badge>
                          <Badge
                            variant='outline'
                            className={`text-[10px] capitalize ${statusBadgeColor[cat.status]}`}
                          >
                            {cat.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Count footer */}
                {!loading && filteredCategories.length > 0 && (
                  <p className='text-xs text-muted-foreground'>
                    Showing {filteredCategories.length} of {categories.length}{' '}
                    categories
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Sub-categories Tab ─────────────────────────── */}
          <TabsContent value='subcategories'>
            <Card>
              <CardContent className='space-y-4 p-4 sm:p-6'>
                {/* Toolbar */}
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                  <div className='relative flex-1 sm:max-w-xs'>
                    <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      placeholder='Search sub-categories…'
                      className='pl-9'
                      value={searchSub}
                      onChange={(e) => setSearchSub(e.target.value)}
                    />
                  </div>
                  <Button
                    className='bg-gradient-to-r from-gold to-gold-light text-white'
                    onClick={openCreateSub}
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Add Sub-category
                  </Button>
                </div>

                {/* Desktop Table */}
                <div className='hidden overflow-hidden rounded-lg border md:block'>
                  <Table>
                    <TableHeader>
                      <TableRow className='bg-muted/30'>
                        <TableHead className='font-semibold'>Name</TableHead>
                        <TableHead className='font-semibold'>
                          Parent Category
                        </TableHead>
                        <TableHead className='font-semibold'>
                          Description
                        </TableHead>
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
                      ) : filteredSubs.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className='py-12 text-center text-muted-foreground'
                          >
                            <div className='flex flex-col items-center gap-2'>
                              <FolderTree className='h-8 w-8 text-muted-foreground/40' />
                              <p className='text-sm'>
                                {searchSub
                                  ? 'No sub-categories match your search.'
                                  : 'No sub-categories found. Create your first one.'}
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredSubs.map((sub) => (
                          <TableRow
                            key={sub.id}
                            className='transition-colors hover:bg-muted/30'
                          >
                            <TableCell className='font-medium'>
                              {sub.name}
                            </TableCell>
                            <TableCell>
                              {sub.categories?.name ? (
                                <Badge
                                  variant='outline'
                                  className='bg-slate-50 text-[11px]'
                                >
                                  {sub.categories.name}
                                </Badge>
                              ) : (
                                <span className='text-xs text-muted-foreground italic'>
                                  Unassigned
                                </span>
                              )}
                            </TableCell>
                            <TableCell className='max-w-[200px] truncate text-xs text-muted-foreground'>
                              {sub.description ?? (
                                <span className='italic'>No description</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {sub.status ? (
                                <Badge
                                  variant='outline'
                                  className={`text-[11px] capitalize ${statusBadgeColor[sub.status]}`}
                                >
                                  {sub.status}
                                </Badge>
                              ) : (
                                <span className='text-xs text-muted-foreground'>
                                  —
                                </span>
                              )}
                            </TableCell>
                            <TableCell className='text-right'>
                              <div className='flex justify-end gap-1'>
                                <Button
                                  size='icon'
                                  variant='ghost'
                                  className='h-8 w-8'
                                  onClick={() => openEditSub(sub)}
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
                                      type: 'subcategory',
                                      id: sub.id,
                                      name: sub.name,
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
                  ) : filteredSubs.length === 0 ? (
                    <div className='flex flex-col items-center gap-2 py-12 text-muted-foreground'>
                      <FolderTree className='h-8 w-8 text-muted-foreground/40' />
                      <p className='text-sm'>
                        {searchSub
                          ? 'No sub-categories match.'
                          : 'No sub-categories yet.'}
                      </p>
                    </div>
                  ) : (
                    filteredSubs.map((sub) => (
                      <div
                        key={sub.id}
                        className='rounded-lg border p-4 transition-colors hover:bg-muted/20'
                      >
                        <div className='mb-2 flex items-start justify-between'>
                          <div>
                            <p className='font-medium'>{sub.name}</p>
                            <p className='text-xs text-muted-foreground'>
                              {sub.description ?? 'No description'}
                            </p>
                          </div>
                          <div className='flex gap-1'>
                            <Button
                              size='icon'
                              variant='ghost'
                              className='h-7 w-7'
                              onClick={() => openEditSub(sub)}
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
                                  type: 'subcategory',
                                  id: sub.id,
                                  name: sub.name,
                                })
                              }
                            >
                              <Trash2 className='h-3 w-3' />
                            </Button>
                          </div>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {sub.categories?.name && (
                            <Badge
                              variant='outline'
                              className='bg-slate-50 text-[10px]'
                            >
                              {sub.categories.name}
                            </Badge>
                          )}
                          {sub.status && (
                            <Badge
                              variant='outline'
                              className={`text-[10px] capitalize ${statusBadgeColor[sub.status]}`}
                            >
                              {sub.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Count footer */}
                {!loading && filteredSubs.length > 0 && (
                  <p className='text-xs text-muted-foreground'>
                    Showing {filteredSubs.length} of {subcategories.length}{' '}
                    sub-categories
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Attribute Tabs ─────────────────────────────── */}
          <TabsContent value='neighborhoods'>
            <AttributeTab
              attrType='neighborhood'
              label='Neighborhood'
              categories={categories}
            />
          </TabsContent>
          <TabsContent value='key_features'>
            <AttributeTab
              attrType='key_feature'
              label='Key Feature'
              categories={categories}
            />
          </TabsContent>
          <TabsContent value='services'>
            <AttributeTab
              attrType='service'
              label='Service'
              categories={categories}
            />
          </TabsContent>
          <TabsContent value='amenities'>
            <AttributeTab
              attrType='amenity'
              label='Amenity'
              categories={categories}
            />
          </TabsContent>
          <TabsContent value='atmosphere'>
            <AttributeTab
              attrType='atmosphere'
              label='Atmosphere'
              categories={categories}
            />
          </TabsContent>
          <TabsContent value='menu'>
            <AttributeTab
              attrType='menu'
              label='Menu'
              categories={categories}
            />
          </TabsContent>
        </Tabs>
      </Main>

      {/* ── Category Dialog ──────────────────────────────────────────────────── */}
      <Dialog open={catDialogOpen} onOpenChange={setCatDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='font-antigua'>
              {editingCatId ? 'Edit Category' : 'Create Category'}
            </DialogTitle>
            <DialogDescription className='text-xs'>
              {editingCatId
                ? 'Update the category details below.'
                : 'Fill in the details to create a new category. Name + type must be unique.'}
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            <div className='space-y-1.5'>
              <Label>Name *</Label>
              <Input
                placeholder='e.g. Hotels, Events, Blog Posts'
                value={catForm.name}
                onChange={(e) =>
                  setCatForm({ ...catForm, name: e.target.value })
                }
              />
            </div>

            <div className='space-y-1.5'>
              <Label>Description</Label>
              <Textarea
                placeholder='Optional – describe what this category covers'
                value={catForm.description}
                onChange={(e) =>
                  setCatForm({ ...catForm, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div className='space-y-1.5'>
                <Label>Type *</Label>
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
                        {/* <span className='mr-1.5'>{typeIcon[t]}</span> */}
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-1.5'>
                <Label>Status *</Label>
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
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setCatDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className='bg-gradient-to-r from-gold to-gold-light text-white'
              onClick={saveCategory}
              disabled={!catForm.name.trim() || catSaving}
            >
              {catSaving ? 'Saving…' : editingCatId ? 'Save Changes' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Sub-category Dialog ──────────────────────────────────────────────── */}
      <Dialog open={subDialogOpen} onOpenChange={setSubDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='font-antigua'>
              {editingSubId !== null
                ? 'Edit Sub-category'
                : 'Create Sub-category'}
            </DialogTitle>
            <DialogDescription className='text-xs'>
              {editingSubId !== null
                ? 'Update the sub-category details.'
                : 'Sub-category name must be unique within the same parent category.'}
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-2'>
            <div className='space-y-1.5'>
              <Label>Parent Category *</Label>
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
                      {/* <span className='mr-1.5'>{typeIcon[cat.type]}</span> */}
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-1.5'>
              <Label>Name *</Label>
              <Input
                placeholder='e.g. Luxury Hotels, Music Events'
                value={subForm.name}
                onChange={(e) =>
                  setSubForm({ ...subForm, name: e.target.value })
                }
              />
            </div>

            <div className='space-y-1.5'>
              <Label>Description</Label>
              <Textarea
                placeholder='Optional description'
                value={subForm.description}
                onChange={(e) =>
                  setSubForm({ ...subForm, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className='space-y-1.5'>
              <Label>Status</Label>
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
            <Button
              className='bg-gradient-to-r from-gold to-gold-light text-white'
              onClick={saveSub}
              disabled={!subForm.name?.trim() || !subForm.category || subSaving}
            >
              {subSaving
                ? 'Saving…'
                : editingSubId !== null
                  ? 'Save Changes'
                  : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ───────────────────────────────────────── */}
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
              {deleteDialog.type === 'category' &&
                ' This may also remove associated sub-categories.'}
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
