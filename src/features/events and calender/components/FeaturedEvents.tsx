import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import img from '/images/shadcn-admin.png'

export default function FeaturedEvents() {
  return (
    <div>
      <div className='mb-3 flex justify-between'>
        <div>
          <h2 className='font-bold'>Featured Events</h2>
          <p className='text-sm text-muted-foreground'>
            Drag to reorder homepage placements
          </p>
        </div>
        <Button className='text-dark border bg-white text-sm'>
          Manage Featured
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
        {[1, 2, 3, 4].map((_, i) => (
          <Card key={i} className='gap-0 overflow-hidden p-0'>
            <CardHeader className='p-0'>
              <div className='h-30 w-full bg-muted'>
                <img className='h-full w-full bg-muted' src={img} alt='alt' />
              </div>
            </CardHeader>
            <CardContent className='space-y-1 py-3'>
              <p className='font-bold'>Event Name</p>
              <p className='text-sm text-muted-foreground'>Jan 4, 2026</p>
              <hr className='my-2'></hr>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-muted-foreground'>Homepage</span>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
