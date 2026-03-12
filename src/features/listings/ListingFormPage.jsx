import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, Plus, Trash2, Tag, MapPin, DollarSign,
  Image, Link as LinkIcon, Map, Lightbulb, CheckSquare, Save, Loader2,
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { supabase } from '@/lib/supabase'

const STATUSES = ['active', 'inactive', 'pending', 'featured']
const PRICE_UNITS = ['night', 'person', 'hour', 'day', 'tour', 'item']

const EMPTY_FORM = {
  title: '', subtitle: '', description: '',
  category_id: '', sub_category_id: '', status: 'pending',
  address: '', city: '', province: '', country: '',
  latitude: '', longitude: '',
  email: '', phone: '', website: '',
  price_from: '', price_to: '', price_unit: 'night',
  start_time: '', end_time: '',
  cover_image: '', images: [],
  deals: [],
  booking_url: '', airbnb_url: '', expedia_url: '',
  road_map: [], travel_tips: [],
  key_features: [], services: [], amenities: [], neighbourhoods: [],
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className='mb-4 flex items-start gap-3 border-b pb-3'>
      <div className='rounded-lg bg-amber-50 p-2 text-amber-600'>{icon}</div>
      <div>
        <h3 className='font-semibold text-gray-900'>{title}</h3>
        {subtitle && <p className='mt-0.5 text-xs text-gray-500'>{subtitle}</p>}
      </div>
    </div>
  )
}

function Field({ label, required, children, hint }) {
  return (
    <div className='space-y-1'>
      <label className='text-sm font-medium text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      {children}
      {hint && <p className='text-xs text-gray-400'>{hint}</p>}
    </div>
  )
}

function Input({ ...props }) {
  return (
    <input
      className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 focus:outline-none disabled:bg-gray-50'
      {...props}
    />
  )
}

function Textarea({ ...props }) {
  return (
    <textarea
      className='w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 focus:outline-none'
      rows={4}
      {...props}
    />
  )
}

function Select({ value, onChange, children, disabled }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className='w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 focus:outline-none disabled:bg-gray-50'
    >
      {children}
    </select>
  )
}

function TagInput({ values, onChange, placeholder }) {
  const [input, setInput] = useState('')
  function add() {
    const val = input.trim()
    if (val && !values.includes(val)) onChange([...values, val])
    setInput('')
  }
  return (
    <div className='space-y-2'>
      <div className='flex gap-2'>
        <input
          className='flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 focus:outline-none'
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
        />
        <button type='button' onClick={add} className='rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-700 transition hover:bg-amber-100'>
          <Plus className='h-4 w-4' />
        </button>
      </div>
      {values.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {values.map((v, i) => (
            <span key={i} className='inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700'>
              {v}
              <button type='button' onClick={() => onChange(values.filter((_, idx) => idx !== i))} className='ml-1 text-gray-400 hover:text-red-500'>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function DealsEditor({ deals, onChange }) {
  function add() { onChange([...deals, { title: '', subtitle: '', validity: '', link: '' }]) }
  function update(i, field, value) { onChange(deals.map((d, idx) => idx === i ? { ...d, [field]: value } : d)) }
  function remove(i) { onChange(deals.filter((_, idx) => idx !== i)) }
  return (
    <div className='space-y-3'>
      {deals.map((deal, i) => (
        <div key={i} className='rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-gray-700'>Deal #{i + 1}</span>
            <button type='button' onClick={() => remove(i)} className='text-gray-400 hover:text-red-500'><Trash2 className='h-4 w-4' /></button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Input placeholder='Deal title' value={deal.title} onChange={(e) => update(i, 'title', e.target.value)} />
            <Input placeholder='Subtitle' value={deal.subtitle} onChange={(e) => update(i, 'subtitle', e.target.value)} />
            <Input placeholder='Validity (e.g. Dec 2025)' value={deal.validity} onChange={(e) => update(i, 'validity', e.target.value)} />
            <Input placeholder='Link URL' value={deal.link} onChange={(e) => update(i, 'link', e.target.value)} />
          </div>
        </div>
      ))}
      <button type='button' onClick={add} className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm text-gray-500 transition hover:border-amber-300 hover:text-amber-600'>
        <Plus className='h-4 w-4' /> Add Deal
      </button>
    </div>
  )
}

function RoadMapEditor({ roadMap, onChange }) {
  function addDay() { onChange([...roadMap, { day: roadMap.length + 1, title: '', items: [] }]) }
  function updateDay(i, field, value) { onChange(roadMap.map((d, idx) => idx === i ? { ...d, [field]: value } : d)) }
  function removeDay(i) { onChange(roadMap.filter((_, idx) => idx !== i).map((d, idx) => ({ ...d, day: idx + 1 }))) }
  function addItem(dayIdx) { onChange(roadMap.map((d, i) => i === dayIdx ? { ...d, items: [...d.items, { time: '', activity: '' }] } : d)) }
  function updateItem(dayIdx, itemIdx, field, value) {
    onChange(roadMap.map((d, i) => i === dayIdx ? { ...d, items: d.items.map((item, j) => j === itemIdx ? { ...item, [field]: value } : item) } : d))
  }
  function removeItem(dayIdx, itemIdx) {
    onChange(roadMap.map((d, i) => i === dayIdx ? { ...d, items: d.items.filter((_, j) => j !== itemIdx) } : d))
  }
  return (
    <div className='space-y-4'>
      {roadMap.map((day, dayIdx) => (
        <div key={dayIdx} className='overflow-hidden rounded-xl border border-amber-100 bg-amber-50/40'>
          <div className='flex items-center justify-between bg-amber-100/60 px-4 py-2.5'>
            <div className='flex items-center gap-3'>
              <span className='flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white'>{day.day}</span>
              <input
                className='bg-transparent text-sm font-semibold text-gray-800 focus:outline-none placeholder:text-gray-400'
                placeholder={`Day ${day.day} title`}
                value={day.title}
                onChange={(e) => updateDay(dayIdx, 'title', e.target.value)}
              />
            </div>
            <button type='button' onClick={() => removeDay(dayIdx)} className='text-gray-400 hover:text-red-500'><Trash2 className='h-4 w-4' /></button>
          </div>
          <div className='space-y-2 px-4 py-3'>
            {day.items.map((item, itemIdx) => (
              <div key={itemIdx} className='flex items-center gap-2'>
                <input
                  className='w-32 flex-shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 focus:outline-none'
                  placeholder='Time'
                  value={item.time}
                  onChange={(e) => updateItem(dayIdx, itemIdx, 'time', e.target.value)}
                />
                <input
                  className='flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 focus:outline-none'
                  placeholder='Activity description'
                  value={item.activity}
                  onChange={(e) => updateItem(dayIdx, itemIdx, 'activity', e.target.value)}
                />
                <button type='button' onClick={() => removeItem(dayIdx, itemIdx)} className='flex-shrink-0 text-gray-400 hover:text-red-500'><Trash2 className='h-4 w-4' /></button>
              </div>
            ))}
            <button type='button' onClick={() => addItem(dayIdx)} className='flex items-center gap-1.5 text-xs text-amber-600 transition hover:text-amber-700'>
              <Plus className='h-3.5 w-3.5' /> Add activity
            </button>
          </div>
        </div>
      ))}
      <button type='button' onClick={addDay} className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm text-gray-500 transition hover:border-amber-300 hover:text-amber-600'>
        <Plus className='h-4 w-4' /> Add Day
      </button>
    </div>
  )
}

function TravelTipsEditor({ tips, onChange }) {
  function add() { onChange([...tips, { title: '', subtitle: '' }]) }
  function update(i, field, value) { onChange(tips.map((t, idx) => idx === i ? { ...t, [field]: value } : t)) }
  function remove(i) { onChange(tips.filter((_, idx) => idx !== i)) }
  return (
    <div className='space-y-3'>
      {tips.map((tip, i) => (
        <div key={i} className='flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3'>
          <div className='flex-1 grid grid-cols-2 gap-2'>
            <Input placeholder='Tip title' value={tip.title} onChange={(e) => update(i, 'title', e.target.value)} />
            <Input placeholder='Subtitle / details' value={tip.subtitle} onChange={(e) => update(i, 'subtitle', e.target.value)} />
          </div>
          <button type='button' onClick={() => remove(i)} className='mt-2 text-gray-400 hover:text-red-500'><Trash2 className='h-4 w-4' /></button>
        </div>
      ))}
      <button type='button' onClick={add} className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm text-gray-500 transition hover:border-amber-300 hover:text-amber-600'>
        <Plus className='h-4 w-4' /> Add Travel Tip
      </button>
    </div>
  )
}

export function ListingFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id
  const [form, setForm] = useState(EMPTY_FORM)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  const set = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  useEffect(() => {
    supabase.from('categories').select('id, name').order('name').then(({ data }) => setCategories(data || []))
  }, [])

  useEffect(() => {
    if (!form.category_id) { setSubCategories([]); return }
    supabase.from('sub-categories').select('id, name').eq('category_id', form.category_id).order('name')
      .then(({ data }) => setSubCategories(data || []))
  }, [form.category_id])

  useEffect(() => {
    if (!isEdit) return
    setLoading(true)
    supabase.from('listings').select('*').eq('id', id).single().then(({ data }) => {
      if (data) setForm({
        title: data.title || '', subtitle: data.subtitle || '', description: data.description || '',
        category_id: data.category_id || '', sub_category_id: data.sub_category_id || '',
        status: data.status || 'pending',
        address: data.address || '', city: data.city || '', province: data.province || '', country: data.country || '',
        latitude: data.latitude || '', longitude: data.longitude || '',
        email: data.email || '', phone: data.phone || '', website: data.website || '',
        price_from: data.price_from || '', price_to: data.price_to || '', price_unit: data.price_unit || 'night',
        start_time: data.start_time || '', end_time: data.end_time || '',
        cover_image: data.cover_image || '', images: data.images || [],
        deals: data.deals || [],
        booking_url: data.booking_url || '', airbnb_url: data.airbnb_url || '', expedia_url: data.expedia_url || '',
        road_map: data.road_map || [], travel_tips: data.travel_tips || [],
        key_features: data.key_features || [], services: data.services || [],
        amenities: data.amenities || [], neighbourhoods: data.neighbourhoods || [],
      })
      setLoading(false)
    })
  }, [isEdit, id])

  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.category_id) errs.category_id = 'Category is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSave() {
    if (!validate()) return
    setSaving(true)
    const payload = {
      title: form.title.trim(), subtitle: form.subtitle.trim() || null, description: form.description.trim() || null,
      category_id: form.category_id || null, sub_category_id: form.sub_category_id || null, status: form.status,
      address: form.address.trim() || null, city: form.city.trim() || null, province: form.province.trim() || null, country: form.country.trim() || null,
      latitude: form.latitude ? Number(form.latitude) : null, longitude: form.longitude ? Number(form.longitude) : null,
      email: form.email.trim() || null, phone: form.phone.trim() || null, website: form.website.trim() || null,
      price_from: form.price_from !== '' ? Number(form.price_from) : 0,
      price_to: form.price_to !== '' ? Number(form.price_to) : 0,
      price_unit: form.price_unit, start_time: form.start_time || null, end_time: form.end_time || null,
      cover_image: form.cover_image.trim() || null, images: form.images.filter(Boolean),
      deals: form.deals, booking_url: form.booking_url.trim() || null,
      airbnb_url: form.airbnb_url.trim() || null, expedia_url: form.expedia_url.trim() || null,
      road_map: form.road_map, travel_tips: form.travel_tips,
      key_features: form.key_features, services: form.services, amenities: form.amenities, neighbourhoods: form.neighbourhoods,
    }
    let error
    if (isEdit) {
      const res = await supabase.from('listings').update(payload).eq('id', id)
      error = res.error
    } else {
      const res = await supabase.from('listings').insert(payload)
      error = res.error
    }
    setSaving(false)
    if (!error) navigate('/listings')
    else alert('Error: ' + error.message)
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

  return (
    <>
      <Header />
      <Main>
        <div className='min-h-screen bg-gray-50 font-sans'>
          <div className='sticky top-0 z-10 border-b bg-white px-6 py-4 shadow-sm'>
            <div className='mx-auto flex max-w-4xl items-center justify-between'>
              <div className='flex items-center gap-3'>
                <button onClick={() => navigate('/listings')} className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100'>
                  <ArrowLeft className='h-4 w-4' />
                </button>
                <div>
                  <h1 className='text-xl font-bold text-gray-900'>{isEdit ? 'Edit Listing' : 'Create New Listing'}</h1>
                  <p className='text-xs text-gray-500'>{isEdit ? 'Update listing details' : 'Fill in the details for the new listing'}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <button onClick={() => navigate('/listings')} className='rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50'>
                  Cancel
                </button>
                <button
                  onClick={handleSave} disabled={saving}
                  className='flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60'
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96A)' }}
                >
                  {saving ? <Loader2 className='h-4 w-4 animate-spin' /> : <Save className='h-4 w-4' />}
                  {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Listing'}
                </button>
              </div>
            </div>
          </div>

          <div className='mx-auto max-w-4xl space-y-6 px-6 py-6'>
            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <SectionHeader icon={<Tag className='h-5 w-5' />} title='Basic Information' subtitle='Core details about the listing' />
              <div className='grid gap-4'>
                <Field label='Title' required>
                  <Input placeholder='e.g. Eco Aventura Snorkeling' value={form.title} onChange={(e) => set('title', e.target.value)} />
                  {errors.title && <p className='mt-1 text-xs text-red-500'>{errors.title}</p>}
                </Field>
                <Field label='Subtitle'>
                  <Input placeholder='Short catchy tagline' value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} />
                </Field>
                <Field label='Description'>
                  <Textarea placeholder='Detailed description...' value={form.description} onChange={(e) => set('description', e.target.value)} />
                </Field>
                <div className='grid grid-cols-2 gap-4'>
                  <Field label='Category' required>
                    <Select value={form.category_id} onChange={(v) => { set('category_id', v); set('sub_category_id', '') }}>
                      <option value=''>Select category...</option>
                      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Select>
                    {errors.category_id && <p className='mt-1 text-xs text-red-500'>{errors.category_id}</p>}
                  </Field>
                  <Field label='Sub-Category'>
                    <Select value={form.sub_category_id} onChange={(v) => set('sub_category_id', v)} disabled={!form.category_id || subCategories.length === 0}>
                      <option value=''>{!form.category_id ? 'Select category first' : subCategories.length === 0 ? 'No sub-categories' : 'Select sub-category...'}</option>
                      {subCategories.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </Select>
                  </Field>
                </div>
                <Field label='Status'>
                  <Select value={form.status} onChange={(v) => set('status', v)}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </Select>
                </Field>
              </div>
            </div>

            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <SectionHeader icon={<MapPin className='h-5 w-5' />} title='Location & Contact' subtitle='Where is this listing and how to reach them' />
              <div className='grid gap-4'>
                <Field label='Address'>
                  <Input placeholder='Street address' value={form.address} onChange={(e) => set('address', e.target.value)} />
                </Field>
                <div className='grid grid-cols-3 gap-3'>
                  <Field label='City'><Input placeholder='City' value={form.city} onChange={(e) => set('city', e.target.value)} /></Field>
                  <Field label='Province'><Input placeholder='Province' value={form.province} onChange={(e) => set('province', e.target.value)} /></Field>
                  <Field label='Country'><Input placeholder='Country' value={form.country} onChange={(e) => set('country', e.target.value)} /></Field>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <Field label='Latitude'><Input type='number' step='any' placeholder='10.391049' value={form.latitude} onChange={(e) => set('latitude', e.target.value)} /></Field>
                  <Field label='Longitude'><Input type='number' step='any' placeholder='-75.479426' value={form.longitude} onChange={(e) => set('longitude', e.target.value)} /></Field>
                </div>
                <div className='grid grid-cols-3 gap-3'>
                  <Field label='Email'><Input type='email' placeholder='info@example.com' value={form.email} onChange={(e) => set('email', e.target.value)} /></Field>
                  <Field label='Phone'><Input placeholder='+57 300 000 0000' value={form.phone} onChange={(e) => set('phone', e.target.value)} /></Field>
                  <Field label='Website'><Input placeholder='example.com' value={form.website} onChange={(e) => set('website', e.target.value)} /></Field>
                </div>
              </div>
            </div>

            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <SectionHeader icon={<DollarSign className='h-5 w-5' />} title='Pricing & Hours' subtitle='Price range and operating hours' />
              <div className='grid gap-4'>
                <div className='grid grid-cols-3 gap-3'>
                  <Field label='Price From ($)'><Input type='number' placeholder='0' min='0' value={form.price_from} onChange={(e) => set('price_from', e.target.value)} /></Field>
                  <Field label='Price To ($)'><Input type='number' placeholder='0' min='0' value={form.price_to} onChange={(e) => set('price_to', e.target.value)} /></Field>
                  <Field label='Price Unit'>
                    <Select value={form.price_unit} onChange={(v) => set('price_unit', v)}>
                      {PRICE_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                    </Select>
                  </Field>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <Field label='Start Time'><Input type='time' value={form.start_time} onChange={(e) => set('start_time', e.target.value)} /></Field>
                  <Field label='End Time'><Input type='time' value={form.end_time} onChange={(e) => set('end_time', e.target.value)} /></Field>
                </div>
              </div>
            </div>

            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <SectionHeader icon={<Image className='h-5 w-5' />} title='Images' subtitle='Cover image and gallery (paste URLs)' />
              <div className='grid gap-4'>
                <Field label='Cover Image URL'>
                  <Input placeholder='https://example.com/cover.jpg' value={form.cover_image} onChange={(e) => set('cover_image', e.target.value)} />
                  {form.cover_image && (
                    <div className='mt-2 h-32 w-full overflow-hidden rounded-lg border'>
                      <img src={form.cover_image} alt='Cover' className='h-full w-full object-cover' onError={(e) => { e.target.style.display = 'none' }} />
                    </div>
                  )}
                </Field>
                <Field label='Gallery Images' hint='Press Enter or click + to add each URL'>
                  <TagInput values={form.images} onChange={(v) => set('images', v)} placeholder='https://example.com/photo.jpg' />
                </Field>
              </div>
            </div>

            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <SectionHeader icon={<Tag className='h-5 w-5' />} title='Deals & Promotions' subtitle='Special offers and promotions' />
              <DealsEditor deals={form.deals} onChange={(v) => set('deals', v)} />
            </div>

            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <SectionHeader icon={<LinkIcon className='h-5 w-5' />} title='Third-Party Reservation Links' subtitle='External booking platform links' />
              <div className='grid gap-4'>
                <Field label='Booking.com URL'><Input placeholder='https://booking.com/...' value={form.booking_url} onChange={(e) => set('booking_url', e.target.value)} /></Field>
                <Field label='Airbnb URL'><Input placeholder='https://airbnb.com/...' value={form.airbnb_url} onChange={(e) => set('airbnb_url', e.target.value)} /></Field>
                <Field label='Expedia URL'><Input placeholder='https://expedia.com/...' value={form.expedia_url} onChange={(e) => set('expedia_url', e.target.value)} /></Field>
              </div>
            </div>

            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <SectionHeader icon={<Map className='h-5 w-5' />} title='Road Map / Itinerary' subtitle='Day-by-day schedule or itinerary' />
              <RoadMapEditor roadMap={form.road_map} onChange={(v) => set('road_map', v)} />
            </div>

            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <SectionHeader icon={<Lightbulb className='h-5 w-5' />} title='Travel Tips' subtitle='Helpful tips for visitors' />
              <TravelTipsEditor tips={form.travel_tips} onChange={(v) => set('travel_tips', v)} />
            </div>

            <div className='rounded-2xl border bg-white p-6 shadow-sm'>
              <SectionHeader icon={<CheckSquare className='h-5 w-5' />} title='Features & Amenities' subtitle='What this listing offers' />
              <div className='grid gap-5'>
                <Field label='Key Features'><TagInput values={form.key_features} onChange={(v) => set('key_features', v)} placeholder='e.g. Ocean View' /></Field>
                <Field label='Services'><TagInput values={form.services} onChange={(v) => set('services', v)} placeholder='e.g. Free WiFi' /></Field>
                <Field label='Amenities'><TagInput values={form.amenities} onChange={(v) => set('amenities', v)} placeholder='e.g. Swimming Pool' /></Field>
                <Field label='Neighbourhoods'><TagInput values={form.neighbourhoods} onChange={(v) => set('neighbourhoods', v)} placeholder='e.g. Centro Histórico' /></Field>
              </div>
            </div>

            <div className='flex justify-end gap-3 pb-8'>
              <button onClick={() => navigate('/listings')} className='rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50'>
                Cancel
              </button>
              <button
                onClick={handleSave} disabled={saving}
                className='flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60'
                style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96A)' }}
              >
                {saving ? <Loader2 className='h-4 w-4 animate-spin' /> : <Save className='h-4 w-4' />}
                {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Listing'}
              </button>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}

export default ListingFormPage
