import { Package, User, Star, Crown, Sparkles } from 'lucide-react'
import PlanCard from './PlanCard'

export default function PlanGrid() {
  return (
    <section className='my-4 space-y-4'>
      <h2 className='font-antigua flex items-center text-xl font-semibold'>
        <Package className='mr-2 h-5 w-5 text-muted-foreground' /> Plan Overview
      </h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <PlanCard
          title='Free'
          price='$0'
          icon={<User />}
          features={[
            '5 posts per month',
            '1 real estate listing',
            'Basic support',
            '2 images per listing',
            'Comunity access',
          ]}
          bg='bg-gradient-to-r from-[#65758B] to-[#808EA3]'
          text='Downgrade'
        />

        <PlanCard
          title='Standard'
          price='$19'
          subtitle='7 days free trial'
          icon={<Star />}
          features={[
            '25 posts per month',
            '10 real estate listings',
            'Email support',
            '10 images per listing',
            'Basic analytics',
          ]}
          bg='bg-gradient-to-r from-[#CF9921] to-[#D2BB6B]'
          text='Downgrade'
        />

        <PlanCard
          title='Premium'
          price='$49'
          icon={<Crown />}
          subtitle='14 days free trial'
          features={[
            '100 posts per month',
            'Priority support',
            'Advanced analytics',
          ]}
          bg='bg-gradient-to-r from-[#980001] to-[#D40D00]'
          active
          text='Manage'
        />

        <PlanCard
          title='Elite'
          price='$99'
          icon={<Sparkles />}
          subtitle='30 days free trial'
          features={[
            'Unlimited posts',
            'Dedicated support',
            'Full analytics suite',
          ]}
          bg='bg-gradient-to-r from-[#22C55E] to-[#105F2D]'
          text='Upgrade'
        />
      </div>
    </section>
  )
}
