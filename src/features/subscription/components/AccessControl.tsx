import { Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

const items = [
  { title: 'Require email verification', subtitle: 'Users must verify email' },
  { title: 'Allow package switching', subtitle: 'Users can change plans' },
  { title: 'Auto-downgrade on expiry', subtitle: 'Fallback to free tier' },
]

export default function AccessControl() {
  return (
    <Card>
      <CardContent className='space-y-4 px-6 py-2'>
        <h3 className='font-antigua flex items-center gap-2 text-lg font-semibold'>
          <Lock className='h-4 w-4' />
          Access Control Settings
        </h3>

        <div className='grid grid-cols-1 gap-2 lg:grid-cols-3'>
          {items.map((item) => (
            <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
              <div>
                <p className='text-sm'>{item.title}</p>
                <p className='text-xs text-muted-foreground'>{item.subtitle}</p>
              </div>
              <Switch className='bg-danger' />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
