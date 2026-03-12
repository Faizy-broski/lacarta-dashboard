import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Globe, Phone, Mail, Star, Clock, DollarSign,
  Tag, ExternalLink, Pencil, Trash2, CheckCircle2, Map, Lightbulb,
  Loader2, Calendar, ChevronRight,
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { supabase } from '@/lib/supabase'

const statusBadgeColor = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-red-100 text-red-700 border-red-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  featured: 'bg-amber-100 text-amber-700 border-amber-200',
}

function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}

function Section({ icon, title, children }) {
  return (
    <div className='rounded-2xl border bg-white p-6 shadow-sm'>
      <div className='mb-4 flex items-center gap-2 border-b pb-3'>
        <div className='rounded-lg bg-amber-50 p-1.5 text-amber-600'>{icon}</div>
        <h3 className='font-semibold text-gray-900'>{title}</h3>
      </div>
      {children}
    </div>
  )
}

function InfoRow({ icon, label, value, href }) {
  if (!value) return null
  const inner = (
    <div className='flex items-start gap-3 py-2'>
      <div className='mt-0.5 text-gray-400'>{icon}</div>
      <div>
        <p className='text-xs text-gray-400'>{label}</p>
        <p className='text-sm text-gray-800'>{value}</p>
      </div>
    </div>
  )
  if (href) return <a href={href} target='_blank' rel='noopener noreferrer' className='block -mx-2 rounded-lg px-2 transition hover:bg-gray-50'>{inner}</a>
  return <div className='-mx-2 px-2'>{inner}</div>
}

function ChipList({ items, color = 'bg-gray-100 text-gray-700' }) {
  if (!items || items.length === 0) return <p className='text-sm text-gray-400'>None specified</p>
  return (
    <div className='flex flex-wrap gap-2'>
      {items.map((item, i) => (
        <span key={i} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${color}`}>
          <CheckCircle2 className='h-3 w-3' /> {item}
        </span>
      ))}
    </div>
  )
}

function Dialog({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' onClick={onClose} />
      <div className='relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl'>{children}</div>
    </div>
  )
}

export function ListingDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    supabase
      .from('listings')
      .select('*, categories(name), "sub-categories"(name)')
      .eq('id', id)
      .single()
      .then(({ data }) => { setListing(data); setLoading(false) })
  }, [id])

  async function handleDelete() {
    setDeleting(true)
    await supabase.from('listings').delete().eq('id', id)
    navigate('/listings')
  }

  if (loading) {
    return (
      <>
        <Header />
        <Main>
          <div className='flex h-96 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-amber-500' />
          </div>
        </Main>
      </>
    )
  }

  if (!listing) {
    return (
      <>
        <Header />
        <Main>
          <div className='flex h-96 flex-col items-center justify-center gap-3 text-gray-500'>
            <p className='text-lg font-medium'>Listing not found</p>
            <button onClick={() => navigate('/listings')} className='text-sm text-amber-600 hover:underline'>← Back to listings</button>
          </div>
        </Main>
      </>
    )
  }

  const allImages = [listing.cover_image, ...(listing.images || [])].filter(Boolean)

  return (
    <>
      <Header />
      <Main>
        <div className='min-h-screen bg-gray-50 font-sans'>
          <div className='sticky top-0 z-10 border-b bg-white px-6 py-4 shadow-sm'>
            <div className='mx-auto flex max-w-5xl items-center justify-between'>
              <div className='flex items-center gap-3'>
                <button onClick={() => navigate('/listings')} className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100'>
                  <ArrowLeft className='h-4 w-4' />
                </button>
                <div>
                  <div className='flex items-center gap-2'>
                    <h1 className='text-xl font-bold text-gray-900'>{listing.title}</h1>
                    <Badge className={statusBadgeColor[listing.status] || 'bg-gray-100 text-gray-600'}>{listing.status}</Badge>
                  </div>
                  <div className='mt-0.5 flex items-center gap-2'>
                    {listing.categories && <span className='text-xs text-gray-500'>{listing.categories.name}</span>}
                    {listing['sub-categories'] && (
                      <>
                        <ChevronRight className='h-3 w-3 text-gray-400' />
                        <span className='text-xs text-gray-500'>{listing['sub-categories'].name}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => navigate(`/listings/${id}/edit`)}
                  className='flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50'
                >
                  <Pencil className='h-4 w-4' /> Edit
                </button>
                <button
                  onClick={() => setDeleteOpen(true)}
                  className='flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 transition hover:bg-red-100'
                >
                  <Trash2 className='h-4 w-4' /> Delete
                </button>
              </div>
            </div>
          </div>

          <div className='mx-auto max-w-5xl space-y-6 px-6 py-6'>
            {allImages.length > 0 && (
              <div className='overflow-hidden rounded-2xl border bg-white shadow-sm'>
                <div className='relative h-72 w-full bg-gray-100'>
                  <img
                    src={allImages[activeImage]} alt={listing.title}
                    className='h-full w-full object-cover'
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/800x300?text=No+Image' }}
                  />
                </div>
                {allImages.length > 1 && (
                  <div className='flex gap-2 overflow-x-auto p-3'>
                    {allImages.map((img, i) => (
                      <button
                        key={i} onClick={() => setActiveImage(i)}
                        className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${i === activeImage ? 'border-amber-400' : 'border-transparent'}`}
                      >
                        <img src={img} alt='' className='h-full w-full object-cover' />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className='grid grid-cols-3 gap-6'>
              <div className='col-span-2 space-y-6'>
                {(listing.subtitle || listing.description) && (
                  <Section icon={<Tag className='h-4 w-4' />} title='About'>
                    {listing.subtitle && <p className='mb-2 text-base font-medium text-gray-700'>{listing.subtitle}</p>}
                    {listing.description && <p className='text-sm leading-relaxed text-gray-600'>{listing.description}</p>}
                  </Section>
                )}

                {listing.road_map && listing.road_map.length > 0 && (
                  <Section icon={<Map className='h-4 w-4' />} title='Road Map / Itinerary'>
                    <div className='space-y-4'>
                      {listing.road_map.map((day, i) => (
                        <div key={i} className='overflow-hidden rounded-xl border border-amber-100 bg-amber-50/40'>
                          <div className='flex items-center gap-3 bg-amber-100/60 px-4 py-2.5'>
                            <span className='flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white'>{day.day}</span>
                            <span className='text-sm font-semibold text-gray-800'>{day.title || `Day ${day.day}`}</span>
                          </div>
                          {day.items && day.items.length > 0 && (
                            <div className='divide-y divide-amber-100/60 px-4'>
                              {day.items.map((item, j) => (
                                <div key={j} className='flex items-start gap-3 py-2'>
                                  {item.time && <span className='w-20 flex-shrink-0 text-xs font-medium text-amber-600'>{item.time}</span>}
                                  <span className='text-sm text-gray-700'>{item.activity}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {listing.travel_tips && listing.travel_tips.length > 0 && (
                  <Section icon={<Lightbulb className='h-4 w-4' />} title='Travel Tips'>
                    <div className='space-y-3'>
                      {listing.travel_tips.map((tip, i) => (
                        <div key={i} className='flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3'>
                          <Lightbulb className='mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500' />
                          <div>
                            <p className='text-sm font-semibold text-gray-800'>{tip.title}</p>
                            {tip.subtitle && <p className='mt-0.5 text-xs text-gray-500'>{tip.subtitle}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {listing.deals && listing.deals.length > 0 && (
                  <Section icon={<Tag className='h-4 w-4' />} title='Deals & Promotions'>
                    <div className='space-y-3'>
                      {listing.deals.map((deal, i) => (
                        <div key={i} className='flex items-start justify-between rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3'>
                          <div>
                            <p className='text-sm font-semibold text-gray-800'>{deal.title}</p>
                            {deal.subtitle && <p className='mt-0.5 text-xs text-gray-500'>{deal.subtitle}</p>}
                            {deal.validity && (
                              <p className='mt-1 flex items-center gap-1 text-xs text-gray-400'>
                                <Calendar className='h-3 w-3' /> Valid: {deal.validity}
                              </p>
                            )}
                          </div>
                          {deal.link && (
                            <a href={deal.link} target='_blank' rel='noopener noreferrer' className='ml-3 flex-shrink-0 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700'>
                              View
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                <Section icon={<CheckCircle2 className='h-4 w-4' />} title='Services & Amenities'>
                  <div className='space-y-5'>
                    <div>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500'>Key Features</p>
                      <ChipList items={listing.key_features} color='bg-blue-50 text-blue-700 border border-blue-100' />
                    </div>
                    <div>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500'>Services</p>
                      <ChipList items={listing.services} color='bg-purple-50 text-purple-700 border border-purple-100' />
                    </div>
                    <div>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500'>Amenities</p>
                      <ChipList items={listing.amenities} color='bg-emerald-50 text-emerald-700 border border-emerald-100' />
                    </div>
                    <div>
                      <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500'>Neighbourhoods</p>
                      <ChipList items={listing.neighbourhoods} color='bg-orange-50 text-orange-700 border border-orange-100' />
                    </div>
                  </div>
                </Section>
              </div>

              <div className='space-y-6'>
                <div className='rounded-2xl border bg-white p-5 shadow-sm'>
                  <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500'>Pricing</p>
                  {!listing.price_from && !listing.price_to ? (
                    <p className='text-lg font-bold text-green-600'>Free</p>
                  ) : (
                    <div>
                      <p className='text-2xl font-bold text-gray-900'>
                        ${Number(listing.price_from).toLocaleString()}
                        {listing.price_to > listing.price_from && (
                          <span className='text-lg text-gray-500'> – ${Number(listing.price_to).toLocaleString()}</span>
                        )}
                      </p>
                      <p className='text-xs text-gray-400'>per {listing.price_unit || 'night'}</p>
                    </div>
                  )}
                  {(listing.start_time || listing.end_time) && (
                    <div className='mt-3 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600'>
                      <Clock className='h-4 w-4 text-gray-400' />
                      {listing.start_time && listing.end_time ? `${listing.start_time} – ${listing.end_time}` : listing.start_time || listing.end_time}
                    </div>
                  )}
                  {listing.rating > 0 && (
                    <div className='mt-3 flex items-center gap-2'>
                      <Star className='h-4 w-4 fill-amber-400 text-amber-400' />
                      <span className='font-semibold text-gray-800'>{listing.rating}</span>
                      {listing.review_count > 0 && <span className='text-xs text-gray-400'>({listing.review_count} reviews)</span>}
                    </div>
                  )}
                </div>

                <div className='rounded-2xl border bg-white p-5 shadow-sm'>
                  <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500'>Contact</p>
                  <div className='divide-y'>
                    <InfoRow icon={<MapPin className='h-4 w-4' />} label='Address'
                      value={[listing.address, listing.city, listing.province, listing.country].filter(Boolean).join(', ')} />
                    <InfoRow icon={<Mail className='h-4 w-4' />} label='Email' value={listing.email} href={`mailto:${listing.email}`} />
                    <InfoRow icon={<Phone className='h-4 w-4' />} label='Phone' value={listing.phone} href={`tel:${listing.phone}`} />
                    <InfoRow icon={<Globe className='h-4 w-4' />} label='Website' value={listing.website}
                      href={listing.website ? (listing.website.startsWith('http') ? listing.website : `https://${listing.website}`) : null} />
                  </div>
                </div>

                {(listing.booking_url || listing.airbnb_url || listing.expedia_url) && (
                  <div className='rounded-2xl border bg-white p-5 shadow-sm'>
                    <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500'>Book Online</p>
                    <div className='space-y-2'>
                      {listing.booking_url && (
                        <a href={listing.booking_url} target='_blank' rel='noopener noreferrer' className='flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100'>
                          Booking.com <ExternalLink className='h-3.5 w-3.5' />
                        </a>
                      )}
                      {listing.airbnb_url && (
                        <a href={listing.airbnb_url} target='_blank' rel='noopener noreferrer' className='flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-100'>
                          Airbnb <ExternalLink className='h-3.5 w-3.5' />
                        </a>
                      )}
                      {listing.expedia_url && (
                        <a href={listing.expedia_url} target='_blank' rel='noopener noreferrer' className='flex items-center justify-between rounded-xl border border-yellow-100 bg-yellow-50 px-4 py-2.5 text-sm font-medium text-yellow-700 transition hover:bg-yellow-100'>
                          Expedia <ExternalLink className='h-3.5 w-3.5' />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className='rounded-2xl border bg-white p-5 shadow-sm space-y-1 text-xs text-gray-400'>
                  <p>ID: <span className='font-mono text-gray-500'>{listing.id}</span></p>
                  <p>Created: {new Date(listing.created_at).toLocaleString()}</p>
                  <p>Updated: {new Date(listing.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
            <h2 className='mb-4 text-lg font-semibold text-gray-900'>Delete Listing</h2>
            <p className='mb-5 text-sm text-gray-600'>
              Are you sure you want to delete <strong>{listing.title}</strong>? This cannot be undone.
            </p>
            <div className='flex justify-end gap-2'>
              <button onClick={() => setDeleteOpen(false)} className='rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50'>
                Cancel
              </button>
              <button
                onClick={handleDelete} disabled={deleting}
                className='flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60'
              >
                {deleting ? <Loader2 className='h-4 w-4 animate-spin' /> : <Trash2 className='h-4 w-4' />}
                Delete
              </button>
            </div>
          </Dialog>
        </div>
      </Main>
    </>
  )
}

export default ListingDetailPage
