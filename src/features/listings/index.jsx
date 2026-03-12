import { useEffect, useState, useCallback } from 'react'
import {
  Plus, Pencil, Trash2, MapPin, Globe, Phone, Mail, Star, Eye,
  BookOpen, Tag, Clock, DollarSign, Search, RefreshCw,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { supabase } from '@/lib/supabase'

const STATUSES = ['active', 'inactive', 'pending', 'featured']

const statusBadgeColor = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-red-100 text-red-700 border-red-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  featured: 'bg-amber-100 text-amber-700 border-amber-200',
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className='flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm'>
      <div className={`rounded-lg p-2 ${color}`}>{icon}</div>
      <div>
        <p className='text-2xl font-bold text-gray-900'>{value}</p>
        <p className='mt-0.5 text-xs text-gray-500'>{label}</p>
      </div>
    </div>
  )
}

function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}

function StarRating({ rating }) {
  if (!rating) return <span className='text-xs text-gray-400'>No rating</span>
  return (
    <div className='flex items-center gap-1'>
      <Star className='h-3.5 w-3.5 fill-amber-400 text-amber-400' />
      <span className='text-sm font-medium text-gray-700'>{rating}</span>
    </div>
  )
}

function Dialog({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' onClick={onClose} />
      <div className='relative mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl'>
        <div className='flex items-center justify-between border-b px-6 py-4'>
          <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
          <button onClick={onClose} className='text-xl leading-none text-gray-400 hover:text-gray-600'>×</button>
        </div>
        <div className='px-6 py-4'>{children}</div>
      </div>
    </div>
  )
}

export function ListingsPage() {
  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const [{ data: listingsData }, { data: categoriesData }] = await Promise.all([
      supabase
        .from('listings')
        .select('*, categories(name), "sub-categories"(name)')
        .order('created_at', { ascending: false }),
      supabase.from('categories').select('id, name').order('name'),
    ])
    setListings(listingsData || [])
    setCategories(categoriesData || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const filtered = listings.filter((l) => {
    const q = search.toLowerCase()
    const matchSearch =
      l.title?.toLowerCase().includes(q) ||
      l.address?.toLowerCase().includes(q) ||
      l.city?.toLowerCase().includes(q)
    const matchCat = filterCategory === 'all' || l.category_id === filterCategory
    const matchStatus = filterStatus === 'all' || l.status === filterStatus
    return matchSearch && matchCat && matchStatus
  })

  async function handleDelete(id) {
    setDeleting(true)
    await supabase.from('listings').delete().eq('id', id)
    setListings((prev) => prev.filter((l) => l.id !== id))
    setDeleteConfirm(null)
    setDeleting(false)
  }

  const stats = {
    total: listings.length,
    active: listings.filter((l) => l.status === 'active').length,
    featured: listings.filter((l) => l.status === 'featured').length,
    pending: listings.filter((l) => l.status === 'pending').length,
  }

  return (
    <>
      <Header />
      <Main>
        <div className='min-h-screen bg-gray-50 font-sans'>
          <div className='border-b bg-white px-6 py-4'>
            <div className='mx-auto flex max-w-7xl items-center justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>Listings</h1>
                <p className='mt-0.5 text-sm text-gray-500'>Manage all La Carta directory listings</p>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={fetchData}
                  className='rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50'
                  title='Refresh'
                >
                  <RefreshCw className='h-4 w-4' />
                </button>
                <button
                  onClick={() => navigate('/listings/create')}
                  className='flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90'
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96A)' }}
                >
                  <Plus className='h-4 w-4' />
                  Add Listing
                </button>
              </div>
            </div>
          </div>

          <div className='mx-auto max-w-7xl space-y-6 px-6 py-6'>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              <StatCard label='Total Listings' value={stats.total} icon={<BookOpen className='h-5 w-5 text-blue-600' />} color='bg-blue-50' />
              <StatCard label='Active' value={stats.active} icon={<Eye className='h-5 w-5 text-green-600' />} color='bg-green-50' />
              <StatCard label='Featured' value={stats.featured} icon={<Star className='h-5 w-5 text-amber-500' />} color='bg-amber-50' />
              <StatCard label='Pending Review' value={stats.pending} icon={<Clock className='h-5 w-5 text-orange-500' />} color='bg-orange-50' />
            </div>

            <div className='flex flex-wrap gap-3 rounded-xl border bg-white p-4'>
              <div className='relative min-w-[200px] flex-1'>
                <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
                <input
                  className='w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 focus:outline-none'
                  placeholder='Search listings...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className='rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400/40 focus:outline-none'
              >
                <option value='all'>All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className='rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm capitalize focus:ring-2 focus:ring-amber-400/40 focus:outline-none'
              >
                <option value='all'>All Statuses</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s} className='capitalize'>{s}</option>
                ))}
              </select>
            </div>

            <div className='overflow-hidden rounded-xl border bg-white shadow-sm'>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b bg-gray-50'>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>Listing</th>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>Category</th>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>Location</th>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>Price Range</th>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>Rating</th>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>Status</th>
                      <th className='px-4 py-3 text-left font-semibold text-gray-600'>Contact</th>
                      <th className='px-4 py-3 text-right font-semibold text-gray-600'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: 4 }).map((_, i) => (
                        <tr key={i} className='border-b'>
                          {Array.from({ length: 8 }).map((_, j) => (
                            <td key={j} className='px-4 py-3'>
                              <div className='h-4 animate-pulse rounded bg-gray-100' />
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : filtered.length === 0 ? (
                      <tr>
                        <td colSpan={8} className='py-12 text-center text-gray-400'>
                          <div className='flex flex-col items-center gap-2'>
                            <BookOpen className='h-8 w-8 text-gray-300' />
                            <p>No listings found.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((listing) => (
                        <tr key={listing.id} className='border-b transition-colors last:border-0 hover:bg-gray-50'>
                          <td className='px-4 py-3'>
                            <div>
                              <p className='font-semibold text-gray-900'>{listing.title}</p>
                              {listing.subtitle && (
                                <p className='mt-0.5 max-w-[180px] truncate text-xs text-gray-400'>{listing.subtitle}</p>
                              )}
                              <p className='mt-0.5 text-xs text-gray-400'>
                                Added {new Date(listing.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </td>
                          <td className='px-4 py-3'>
                            <div className='space-y-1'>
                              {listing.categories && (
                                <Badge className='bg-blue-50 text-blue-700 border-blue-200'>
                                  {listing.categories.name}
                                </Badge>
                              )}
                              {listing['sub-categories'] && (
                                <p className='text-xs text-gray-400'>{listing['sub-categories'].name}</p>
                              )}
                            </div>
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex max-w-[160px] items-start gap-1.5 text-gray-600'>
                              <MapPin className='mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400' />
                              <span className='text-xs leading-snug'>
                                {[listing.address, listing.city, listing.country].filter(Boolean).join(', ')}
                              </span>
                            </div>
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex items-center gap-1 text-gray-700'>
                              <DollarSign className='h-3.5 w-3.5 text-gray-400' />
                              {!listing.price_from && !listing.price_to ? (
                                <span className='text-xs text-gray-400'>Free</span>
                              ) : (
                                <span className='text-xs font-medium'>
                                  ${Number(listing.price_from).toLocaleString()} – ${Number(listing.price_to).toLocaleString()}
                                  {listing.price_unit && (
                                    <span className='text-gray-400'> /{listing.price_unit}</span>
                                  )}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className='px-4 py-3'>
                            <div className='space-y-0.5'>
                              <StarRating rating={listing.rating} />
                              {listing.review_count > 0 && (
                                <p className='text-xs text-gray-400'>{listing.review_count} reviews</p>
                              )}
                            </div>
                          </td>
                          <td className='px-4 py-3'>
                            <Badge className={statusBadgeColor[listing.status] || 'bg-gray-100 text-gray-600'}>
                              {listing.status}
                            </Badge>
                          </td>
                          <td className='px-4 py-3'>
                            <div className='space-y-1'>
                              {listing.email && (
                                <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                                  <Mail className='h-3 w-3 text-gray-400' />
                                  <span className='max-w-[120px] truncate'>{listing.email}</span>
                                </div>
                              )}
                              {listing.phone && (
                                <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                                  <Phone className='h-3 w-3 text-gray-400' />
                                  {listing.phone}
                                </div>
                              )}
                              {listing.website && (
                                <div className='flex items-center gap-1.5 text-xs text-gray-500'>
                                  <Globe className='h-3 w-3 text-gray-400' />
                                  {listing.website}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex items-center justify-end gap-1'>
                              <button
                                onClick={() => navigate(`/listings/${listing.id}`)}
                                className='rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700'
                                title='View'
                              >
                                <Eye className='h-4 w-4' />
                              </button>
                              <button
                                onClick={() => navigate(`/listings/${listing.id}/edit`)}
                                className='rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700'
                                title='Edit'
                              >
                                <Pencil className='h-4 w-4' />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(listing.id)}
                                className='rounded-lg p-1.5 text-gray-500 transition hover:bg-red-50 hover:text-red-600'
                                title='Delete'
                              >
                                <Trash2 className='h-4 w-4' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {filtered.length > 0 && (
                <div className='border-t bg-gray-50 px-4 py-3 text-xs text-gray-500'>
                  Showing {filtered.length} of {listings.length} listings
                </div>
              )}
            </div>
          </div>

          <Dialog open={deleteConfirm !== null} onClose={() => setDeleteConfirm(null)} title='Delete Listing'>
            <p className='mb-6 text-gray-600'>
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className='flex justify-end gap-2'>
              <button
                onClick={() => setDeleteConfirm(null)}
                className='rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className='rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60'
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </Dialog>
        </div>
      </Main>
    </>
  )
}

export default ListingsPage
