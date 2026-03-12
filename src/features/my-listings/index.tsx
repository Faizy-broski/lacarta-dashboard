import { Building2, MapPin, Eye, Star, TrendingUp, TrendingDown, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

const listings = [
  {
    id: 1,
    name: 'La Terraza Boutique Hotel',
    location: 'Barcelona, Spain',
    plan: 'Gold',
    status: 'Active',
    views: 3240,
    rating: 4.8,
    trend: 'up',
    trendValue: '12%',
    discount: '15% off peak rates',
  },
  {
    id: 2,
    name: 'Casa del Mar Restaurant',
    location: 'Malaga, Spain',
    plan: 'Silver',
    status: 'Active',
    views: 1870,
    rating: 4.5,
    trend: 'up',
    trendValue: '7%',
    discount: '10% off bookings',
  },
  {
    id: 3,
    name: 'Sunset Rooftop Bar',
    location: 'Valencia, Spain',
    plan: 'Bronze',
    status: 'Pending Review',
    views: 420,
    rating: 0,
    trend: 'down',
    trendValue: '3%',
    discount: 'No active discount',
  },
]

const planColors: Record<string, string> = {
  Gold: 'bg-[#CF9921]/10 text-[#CF9921] border-[#CF9921]/30',
  Silver: 'bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-300',
  Bronze: 'bg-orange-50 text-orange-600 border-orange-200',
}

const statusColors: Record<string, string> = {
  Active: 'bg-green-50 text-green-700 border-green-200',
  'Pending Review': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Inactive: 'bg-red-50 text-red-700 border-red-200',
}

export function MyListingsPage() {
  return (
    <>
      <Header />

      <Main>
        <div className='mb-6 flex h-20 items-center justify-between'>
          <div>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>
              My Listings
            </h1>
            <p className='text-xs text-muted-foreground'>
              Manage your individual listings, discounts, and events.
            </p>
          </div>
          <Badge variant='secondary' className='gap-1'>
            <Building2 className='h-3 w-3' />
            {listings.length} listings
          </Badge>
        </div>

        <div className='grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
          {listings.map((listing) => (
            <Card key={listing.id} className='group cursor-pointer transition-shadow hover:shadow-md'>
              <CardHeader className='pb-2'>
                <div className='flex items-start justify-between gap-2'>
                  <div className='flex flex-col gap-1.5'>
                    <div className='flex items-center gap-2'>
                      <Badge className={`border text-[10px] ${planColors[listing.plan] ?? ''}`} variant='outline'>
                        {listing.plan} Plan
                      </Badge>
                      <Badge className={`border text-[10px] ${statusColors[listing.status] ?? ''}`} variant='outline'>
                        {listing.status}
                      </Badge>
                    </div>
                    <h2 className='font-antigua text-base font-semibold leading-snug tracking-tight'>
                      {listing.name}
                    </h2>
                  </div>
                </div>
                <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                  <MapPin className='h-3 w-3' />
                  {listing.location}
                </div>
              </CardHeader>
              <CardContent className='space-y-3 pt-0'>
                <div className='grid grid-cols-3 gap-2 rounded-lg bg-muted/40 p-3 text-center'>
                  <div>
                    <div className='flex items-center justify-center gap-1 text-xs font-semibold'>
                      <Eye className='h-3 w-3' />
                      {listing.views.toLocaleString()}
                    </div>
                    <p className='text-[10px] text-muted-foreground'>Views</p>
                  </div>
                  <div>
                    <div className='flex items-center justify-center gap-1 text-xs font-semibold'>
                      <Star className='h-3 w-3 fill-[#CF9921] text-[#CF9921]' />
                      {listing.rating > 0 ? listing.rating : '—'}
                    </div>
                    <p className='text-[10px] text-muted-foreground'>Rating</p>
                  </div>
                  <div>
                    <div className='flex items-center justify-center gap-1 text-xs font-semibold'>
                      {listing.trend === 'up' ? (
                        <TrendingUp className='h-3 w-3 text-green-500' />
                      ) : (
                        <TrendingDown className='h-3 w-3 text-red-500' />
                      )}
                      {listing.trendValue}
                    </div>
                    <p className='text-[10px] text-muted-foreground'>Trend</p>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                    <Clock className='h-3 w-3' />
                    {listing.discount}
                  </div>
                  <Button
                    size='sm'
                    variant='outline'
                    className='h-7 px-3 text-xs hover:border-[#CF9921] hover:text-[#CF9921]'
                  >
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Main>
    </>
  )
}
