// src/components/dashboard/QuickActions.tsx
import {
  FilePlus,
  Download,
  Upload,
  Calendar,
  UserPlus,
  Users,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function QuickActions() {
  return (
    <Card className='h-max shadow-sm lg:col-span-3'>
      <CardHeader className='pb-3'>
        <CardTitle className='font-antigua text-lg'>Quick Actions</CardTitle>
        <p className='text-sm font-semibold text-muted-foreground'>
          Common tasks at your fingertips
        </p>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3'>
          <Button className='flex h-24 flex-col items-center justify-center gap-2 rounded-xl border bg-[#a81c1c] bg-gradient-to-b from-[#980001] to-[#D40D00] text-white hover:bg-[#851616]'>
            <FilePlus className='h-6 w-5' />
            <span className='text-xs'>New Article</span>
          </Button>

          <Button className='flex h-24 flex-col items-center justify-center gap-2 rounded-xl border bg-[#1b9a47] bg-gradient-to-l from-[#105F2D] to-[#22C55E] text-white hover:bg-[#137635]'>
            <Download className='h-6 w-5' />
            <span className='text-xs'>Download Report</span>
          </Button>

          <Button
            variant='outline'
            className='flex h-24 flex-col items-center justify-center gap-2 rounded-xl border'
          >
            <Upload className='h-6 w-6' />
            <span className='text-xs'>Upload Media</span>
          </Button>

          <Button
            variant='outline'
            className='flex h-24 flex-col items-center justify-center gap-2 rounded-xl border'
          >
            <Calendar className='h-6 w-6' />
            <span className='text-xs'>Schedule Post</span>
          </Button>

          <Button
            variant='outline'
            className='flex h-24 flex-col items-center justify-center gap-2 rounded-xl border'
          >
            <Users className='h-6 w-6' />
            <span className='text-xs'>Invite User</span>
          </Button>

          <Button
            variant='outline'
            className='flex h-24 flex-col items-center justify-center gap-2 rounded-xl border'
          >
            <BarChart3 className='h-6 w-6' />
            <span className='text-xs'>View Reports</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
