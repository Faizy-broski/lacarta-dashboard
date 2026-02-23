import { Check, Eye, EllipsisVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface PlanCardProps {
  title: string
  price: string
  icon: React.ReactNode
  bg: string
  subtitle?: string
  text: string
  features: string[]
  active?: boolean
  accent?: 'gray' | 'gold' | 'red' | 'green'
}

const accentMap = {
  gray: 'from-slate-500 to-slate-600',
  gold: 'from-yellow-500 to-yellow-600',
  red: 'from-red-500 to-red-600',
  green: 'from-emerald-500 to-emerald-600',
}

export default function PlanCard({
  title,
  price,
  icon,
  subtitle,
  bg,
  features,
  text,
  active,
  accent,
}: PlanCardProps) {
  return (
    // <Card
    //   className={cn(
    //     'relative overflow-hidden border p-0',
    //     active && 'shadow-xl ring-2 ring-primary'
    //   )}
    // >
    //   {/* Header */}
    //   <CardHeader
    //     className={cn(
    //       'bg-gradient-to-r px-4 py-3 text-white',
    //       accentMap[accent]
    //     )}
    //   >
    //     <div className='flex items-center justify-between'>
    //       <h3 className='flex items-center gap-2 font-semibold'>
    //         <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md'>
    //           {icon}
    //         </span>
    //         {title}
    //       </h3>
    //       {active && (
    //         <span className='rounded bg-white/20 px-2 py-0.5 text-xs'>
    //           Active
    //         </span>
    //       )}
    //     </div>
    //   </CardHeader>

    //   <CardContent className='space-b-4 px-4'>
    //     <div>
    //       <span className='text-3xl font-bold'>{price}</span>
    //       <span className='text-sm text-muted-foreground'> /month</span>
    //       {subtitle && (
    //         <p className='mt-1 text-xs text-muted-foreground'>{subtitle}</p>
    //       )}
    //       <hr className='my-2'></hr>
    //     </div>

    //     <ul className='space-b-2 text-sm'>
    //       {features.map((item) => (
    //         <li key={item} className='flex items-center gap-2'>
    //           <Check className='h-4 w-4 text-green-500' />
    //           {item}
    //         </li>
    //       ))}
    //     </ul>
    //   </CardContent>

    //   <CardFooter className='m-auto flex gap-2 p-2'>
    //     <Button variant='outline'>View</Button>
    //     <Button
    //       className={cn(
    //         active
    //           ? 'bg-emerald-600 hover:bg-emerald-700'
    //           : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:bg-yellow-300'
    //       )}
    //     >
    //       {active ? 'Manage' : 'Upgrade'}
    //     </Button>
    //   </CardFooter>
    // </Card>
    //
    <Card className='flex h-full flex-col overflow-hidden rounded-2xl border p-0'>
      {/* HEADER */}
      <div
        className={`overflow-hidden rounded-t-2xl px-3 py-4 text-white shadow-inner ${bg}`}
      >
        <div className='flex items-start gap-3 sm:items-center'>
          {/* ICON */}
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md sm:h-11 sm:w-11'>
            {icon}
          </span>

          {/* TITLE + BADGE */}
          <div className='flex flex-col gap-1'>
            <h3 className='text-base font-semibold sm:text-lg'>{title}</h3>

            <Badge className='w-fit rounded-full bg-white px-3 text-xs font-medium text-slate-700'>
              Active
            </Badge>
          </div>
          <EllipsisVertical className='ml-auto' />
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className='px-6 sm:px-3'>
        {/* PRICE */}
        <div>
          <div className='flex items-end gap-1'>
            <span className='text-3xl font-bold text-slate-900 sm:text-4xl'>
              {price}
            </span>
            <span className='text-xs text-slate-500 sm:text-sm'>/month</span>
          </div>
          {subtitle && (
            <p className='mt-1 text-xs text-muted-foreground'>{subtitle}</p>
          )}

          <hr className='-mx-10 my-2 border-slate-200' />
        </div>

        {/* FEATURES */}
        <div className='space-y-3 text-sm text-slate-700'>
          <p className='text-xs tracking-wide text-muted-foreground uppercase'>
            Key Features
          </p>

          <ul className='space-y-2'>
            {features.map((item) => (
              <li key={item} className='flex items-start gap-3'>
                <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className='mt-auto flex flex-col gap-2 px-6 pb-4 sm:px-3 md:flex-row lg:flex-row'>
        <Button
          variant='outline'
          className='w-full rounded-lg border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 sm:flex-1'
        >
          <Eye className='mr-2 h-4 w-4' />
          View
        </Button>

        <Button
          className={cn(
            'w-full rounded-lg text-white hover:from-yellow-600 hover:to-yellow-700 sm:flex-1',
            text === 'Manage'
              ? 'bg-gradient-to-r from-[#22C55E] to-[#105F2D]'
              : 'bg-gradient-to-r from-[#CF9921] to-[#D2BB6B]'
          )}
        >
          {text}
        </Button>
      </CardFooter>
    </Card>
  )
}
