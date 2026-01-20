// import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  links: {
    title: string
    href: string
    isActive: boolean
    disabled?: boolean
  }[]
}

export function TopNav({ className, links, ...props }: TopNavProps) {
  return (
    <>
      <div className='lg:hidden'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='outline' className='md:size-7'>
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start'>
            {links.map(({ title, href, 
            // isActive, 
            disabled }) => (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <NavLink
                  to={href}
                  onClick={(e) => disabled && e.preventDefault()}
                  className={({ isActive }) =>
                    cn(
                      isActive ? '' : 'text-muted-foreground',
                      disabled && 'pointer-events-none opacity-50'
                    )
                  }
                >
                  {title}
                </NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          'hidden items-center space-x-4 lg:flex lg:space-x-4 xl:space-x-6',
          className
        )}
        {...props}
      >
        {links.map(({ title, href, 
        // isActive, 
        disabled }) => (
          <NavLink
            to={href}
            onClick={(e) => disabled && e.preventDefault()}
            className={({ isActive }) =>
              cn(
                'text-sm font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground',
                disabled && 'pointer-events-none opacity-50'
              )
            }
          >
            {title}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
