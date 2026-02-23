import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function PaymentForm() {
  return (
    <Card className='my-4 border-0 px-0 shadow-none'>
      <CardContent className='space-y-4 px-0 py-6'>
        <h3 className='font-antigua text-lg font-semibold'>Payment</h3>

        <Label className='mb-1 ml-3 font-bold'>Email</Label>
        <Input
          placeholder='Email address'
          className='rounded-none border-x-0 border-t-0 shadow-none'
        />
        <Label className='mb-1 ml-3 font-bold'>Card Number</Label>
        <Input
          placeholder='1234 1234 1234 1234'
          className='rounded-none border-x-0 border-t-0 shadow-none'
        />
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label className='mb-1 ml-3 font-bold'>Expiration</Label>
            <Input
              placeholder='MM / YY'
              className='rounded-none border-x-0 border-t-0 shadow-none'
            />
          </div>
          <div>
            <Label className='mb-1 ml-3 font-bold'>CVC</Label>
            <Input
              placeholder='CVC'
              className='rounded-none border-x-0 border-t-0 shadow-none'
            />
          </div>
        </div>

        <Label className='mb-1 ml-3 font-bold'>Country</Label>
        <Input
          placeholder='Hong Kong SAR China'
          className='rounded-none border-x-0 border-t-0 shadow-none'
        />

        <div className='flex items-center gap-2 text-sm'>
          <Checkbox id='save' />
          <label htmlFor='save'>
            Securely save my information for one-click checkout
          </label>
        </div>

        <Button className='w-full bg-gradient-to-r from-[#CF9921] to-[#D2BB6B]'>
          Done
        </Button>
      </CardContent>
    </Card>
  )
}
