import React, { useEffect, useState } from 'react'
import { Plus, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
// import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
// import { Header } from '@/components/layout/header'
// import { ConfigDrawer } from '@/components/config-drawer'
// import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Header({ className, fixed, children, ...props }: HeaderProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    // Add scroll listener to the body
    document.addEventListener('scroll', onScroll, { passive: true })

    // Clean up the event listener on unmount
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'z-50 h-14 sm:h-16',
        fixed && 'sticky top-0',
        offset > 10 && fixed ? 'shadow' : 'shadow-none',
        className
      )}
      {...props}
    >
      <div className='flex h-full items-center justify-between gap-2 px-2 sm:gap-4 sm:px-4'>
        {/* LEFT SIDE */}
        <div className='flex min-w-0 flex-1 items-center gap-2 sm:gap-4'>
          <SidebarTrigger variant='ghost' className='shrink-0 md:hidden' />
          <Search className='w-8 sm:w-1/3' />
        </div>

        {/* RIGHT SIDE */}
        <div className='flex shrink-0 items-center gap-1 sm:gap-2'>
          {/* New Article – icon only on mobile, full on sm+ */}
          <Button
            size='icon'
            className='bg-gradient-to-r from-[#105F2D] to-[#22C55E] sm:hidden'
          >
            <Plus className='h-4 w-4' />
          </Button>
          <Button className='hidden bg-gradient-to-r from-[#105F2D] to-[#22C55E] sm:inline-flex'>
            <Plus className='mr-1 h-4 w-4' />
            New Article
          </Button>

          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 rounded-full sm:h-9 sm:w-9'
          >
            <Bell className='h-4 w-4' />
          </Button>
          <div className='hidden sm:block'>
            <ThemeSwitch />
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}

// const topNav = [
//   {
//     title: 'Overview',
//     href: 'dashboard/overview',
//     isActive: true,
//     disabled: false,
//   },
//   {
//     title: 'Customers',
//     href: 'dashboard/customers',
//     isActive: false,
//     disabled: true,
//   },
//   {
//     title: 'Products',
//     href: 'dashboard/products',
//     isActive: false,
//     disabled: true,
//   },
//   {
//     title: 'Settings',
//     href: 'dashboard/settings',
//     isActive: false,
//     disabled: true,
//   },
// ]
