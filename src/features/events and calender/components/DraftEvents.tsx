import { NotebookPen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import img from '/images/shadcn-admin.png'

export default function DraftEvents() {
  return (
    <div>
      <h2 className='mb-3 font-bold'>Drafts & Pending</h2>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {['Coffee Tasting', 'Sunset Boat Tour', 'Salsa Dancing'].map(
          (title, i) => (
            <Card key={i} className='gap-0 py-3'>
              <CardContent className='space-y-2 py-0'>
                <div className='flex items-center gap-2'>
                  <NotebookPen
                    size={18}
                    className='bg-yellow-100 text-yellow-500'
                  />
                  <p className='font-medium'>{title}</p>
                </div>
                <div className='mb-2 flex items-center gap-2'>
                  <div className='mb-2 flex h-10 w-10 gap-2 overflow-hidden rounded-full'>
                    <img src={img} className='h-full w-full'></img>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    created by maria Garcia
                  </p>
                </div>
                <hr className='py-2'></hr>
              </CardContent>
              <CardFooter>
                <div className='flex w-full items-center justify-between'>
                  <div className='flex gap-2'>
                    <span className='text-xs text-muted-foreground'>
                      Homepage
                    </span>
                    <Badge variant='outline'>Needs Review</Badge>
                  </div>
                  <Button className='bg-white text-sm text-yellow-500 shadow-none'>
                    Continue
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  )
}
