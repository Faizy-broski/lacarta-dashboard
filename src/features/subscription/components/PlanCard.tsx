import {
  Check,
  Crown,
  Eye,
  EllipsisVertical,
  Sparkles,
  Star,
  CircleDollarSign,
  Banknote,
  Coins,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

// ── Constants ────────────────────────────────────────────────────────────────

const TIER_BG: Record<number, string> = {
  0: 'bg-gradient-to-r from-[#65758B] to-[#808EA3]',
  1: 'bg-gradient-to-r from-[#CF9921] to-[#D2BB6B]',
  2: 'bg-gradient-to-r from-[#980001] to-[#D40D00]',
  3: 'bg-gradient-to-r from-[#22C55E] to-[#105F2D]',
}

const TIER_ICONS: Record<number, React.ReactNode> = {
  0: <User className='h-5 w-5' />,
  1: <Star className='h-5 w-5' />,
  2: <Crown className='h-5 w-5' />,
  3: <Sparkles className='h-5 w-5' />,
}

const TIER_PRICE_COLOR: Record<number, string> = {
  0: 'text-slate-900',
  1: 'text-yellow-700',
  2: 'text-red-700',
  3: 'text-emerald-700',
}

// ── Props ────────────────────────────────────────────────────────────────────

interface PlanCardProps {
  tierName: string
  tierOrder: number
  monthlyPrice: number
  yearlyPrice: number
  yearlyDiscount: number
  status: 'active' | 'inactive'
  features: string[]
  isAdminFree: boolean
}

// ── Component ────────────────────────────────────────────────────────────────

export default function PlanCard({
  tierName,
  tierOrder,
  monthlyPrice,
  yearlyPrice,
  yearlyDiscount,
  status,
  features,
  isAdminFree,
}: PlanCardProps) {
  const bg =
    TIER_BG[tierOrder] ?? 'bg-gradient-to-r from-slate-400 to-slate-500'
  const icon = TIER_ICONS[tierOrder] ?? <User className='h-5 w-5' />
  const priceColor = TIER_PRICE_COLOR[tierOrder] ?? 'text-slate-900'
  const isActive = status === 'active'

  return (
    <Card className='flex h-full flex-col overflow-hidden rounded-sm border p-0'>
      {/* HEADER */}
      <div
        className={`overflow-hidden rounded-t-sm px-3 py-4 text-white shadow-inner ${bg}`}
      >
        <div className='flex items-start gap-3 sm:items-center'>
          {/* ICON */}
          <span className='flex shrink-0 items-center justify-center rounded-md bg-white/20 p-2 backdrop-blur-md'>
            {icon}
          </span>

          {/* TITLE + BADGES */}
          <div className='flex flex-col gap-1'>
            <h3 className='text-base font-semibold sm:text-lg'>{tierName}</h3>
            <div className='flex gap-1.5'>
              <Badge
                className={cn(
                  'w-fit rounded-full px-3 text-xs font-medium',
                  isActive
                    ? 'bg-white text-slate-700'
                    : 'bg-white/30 text-white'
                )}
              >
                {isActive ? 'Active' : 'Inactive'}
              </Badge>
              {/* {isAdminFree && (
                <Badge className='rounded-full bg-white/20 px-2 text-[10px] text-white'>
                  Admin Free
                </Badge>
              )} */}
            </div>
          </div>
          <EllipsisVertical className='ml-auto' />
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className='px-6 sm:px-3'>
        {/* PRICE */}
        <div>
          <div className='flex items-end'>
            <span>
              <span className='text-xs text-slate-500 sm:text-sm'>COP </span>
              <span className={`text-3xl font-bold`}>
                {Number(monthlyPrice).toFixed(0)}
              </span>
            </span>
            <span className='text-xs text-slate-500 sm:text-sm'>/month</span>
          </div>
          <div className='mt-1 flex items-center gap-2'>
            <span className='text-xs text-muted-foreground'>
              COP {Number(yearlyPrice).toFixed(0)}/year
            </span>
            {yearlyDiscount > 0 && (
              <Badge className='rounded-full bg-emerald-100 px-1.5 py-0 text-[10px] text-emerald-700'>
                Save {yearlyDiscount}%
              </Badge>
            )}
          </div>
          <hr className='-mx-10 my-2 border-slate-200' />
        </div>

        {/* FEATURES */}
        <div className='space-y-3 text-sm text-slate-700'>
          <p className='text-xs tracking-wide text-muted-foreground uppercase'>
            Key Features
          </p>

          {features.length === 0 ? (
            <p className='text-xs text-muted-foreground italic'>
              No features configured
            </p>
          ) : (
            <ul className='space-y-2'>
              {features.map((item) => (
                <li key={item} className='flex items-start gap-3 text-xs'>
                  <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className='mt-auto flex flex-col gap-2 px-6 pb-4 sm:px-3 md:flex-row lg:flex-row'>
        <Button
          variant='outline'
          className='w-full items-center rounded-md border-slate-200 bg-slate-100 text-xs font-normal text-slate-700 hover:bg-slate-200 sm:flex-1'
        >
          <Eye className='h-4 w-4' />
          <span>View</span>
        </Button>

        <Button
          className={cn(
            'w-full rounded-md text-xs text-white sm:flex-1',
            'bg-gradient-to-r from-[#CF9921] to-[#D2BB6B] font-normal hover:from-yellow-600 hover:to-yellow-700'
          )}
        >
          {isActive ? 'Manage' : 'Upgrade'}
        </Button>
      </CardFooter>
    </Card>
  )
}
