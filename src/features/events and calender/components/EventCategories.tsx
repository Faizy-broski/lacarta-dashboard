import {
  Music,
  Palette,
  PartyPopper,
  Settings,
  Church,
  UtensilsCrossed,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function EventCategories() {
  return (
    <div className='space-y-3'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='font-antigua font-semibold'>Event Categories</h2>

        <Button
          variant={'outline'}
          className='flex items-center justify-center text-sm font-medium text-primary hover:underline'
        >
          <Settings />
          Manage
        </Button>
      </div>

      {/* Categories */}
      <div className='flex flex-wrap gap-2'>
        {/* Music */}
        <div className='flex items-center gap-2 rounded-full border border-purple-500 bg-purple-100 px-3 py-1.5 text-sm text-purple-600'>
          <Music size={14} className='shrink-0' />

          <span>Music</span>

          <span className='flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-xs font-medium'>
            24
          </span>
        </div>

        {/* Art */}
        <div className='flex items-center gap-2 rounded-full border border-blue-500 bg-blue-100 px-3 py-1.5 text-sm text-blue-600'>
          <Palette size={14} className='shrink-0' />

          <span>Art</span>

          <span className='flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-xs font-medium'>
            18
          </span>
        </div>

        {/* Food */}
        <div className='flex items-center gap-2 rounded-full border border-green-500 bg-green-100 px-3 py-1.5 text-sm text-green-600'>
          <UtensilsCrossed size={14} className='shrink-0' />

          <span>Food</span>

          <span className='flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-xs font-medium'>
            32
          </span>
        </div>

        {/* Culture */}
        <div className='flex items-center gap-2 rounded-full border border-yellow-500 bg-yellow-100 px-3 py-1.5 text-sm text-yellow-600'>
          <Church size={14} className='shrink-0' />

          <span>Culture</span>

          <span className='flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-xs font-medium'>
            15
          </span>
        </div>

        {/* Festivals */}
        <div className='flex items-center gap-2 rounded-full border border-red-500 bg-red-100 px-3 py-1.5 text-sm text-red-600'>
          <PartyPopper size={14} className='shrink-0' />

          <span>Festivals</span>

          <span className='flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-xs font-medium'>
            8
          </span>
        </div>
      </div>
    </div>
    // <div>
    //   <div className='mb-3 flex justify-between'>
    //     <h2 className='font-bold'>Event Categories</h2>
    //     <span className='text-sm text-primary'>Manage</span>
    //   </div>

    //   <div className='flex flex-wrap gap-2'>
    //     <Badge className='flex items-center justify-between rounded-full border border-purple-600 bg-purple-100 px-4 sm:py-2 font-normal text-purple-600'>
    //       <div className='flex items-center gap-2'>
    //         <Music size={13} /> Music{' '}
    //       </div>
    //       <span className='rounded-full bg-white p-1 text-purple-600 '>
    //         24
    //       </span>
    //     </Badge>
    //     <Badge className='flex items-center justify-between rounded-full border border-blue-600 bg-blue-100 px-4 sm:py-2 font-normal text-blue-600'>
    //       <div className='flex items-center gap-2'>
    //         <Palette size={13} /> Art{' '}
    //       </div>
    //       <span className='rounded-full bg-white w-1 p-1 text-blue-600'>
    //         18
    //       </span>
    //     </Badge>
    //     <Badge className='flex items-center justify-between rounded-full border border-green-600 bg-green-100 px-4   sm:py-2 font-normal text-green-600'>
    //       <div className='flex items-center gap-2'>
    //         <UtensilsCrossed size={13} /> Food{' '}
    //       </div>
    //       <span className='rounded-full bg-white w-1 p-1 text-green-600'>
    //         32
    //       </span>
    //     </Badge>
    //     <Badge className='flex items-center justify-between rounded-full border border-yellow-600 bg-yellow-100 px-4 sm:py-2 font-normal text-yellow-600'>
    //       <div className='flex items-center gap-2'>
    //         <Church size={13} /> Culture{' '}
    //       </div>
    //       <span className='rounded-full bg-white w-1 p-1 text-yellow-600'>
    //         15
    //       </span>
    //     </Badge>
    //     <Badge className='flex items-center justify-between rounded-full border border-red-600 bg-red-100 px-4 sm:py-2 font-normal text-red-600'>
    //       <div className='flex items-center gap-2'>
    //         <PartyPopper size={13} /> Festivals{' '}
    //       </div>
    //       <span className='rounded-full bg-white w-1 p-1 text-red-600'>
    //         8
    //       </span>
    //     </Badge>
    //   </div>
    // </div>
  )
}
