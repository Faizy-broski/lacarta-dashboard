import React from 'react'
import {
  LayoutDashboard,
  ListTodo,
  FileText,
  FilePen,
  FolderTree,
  Star,
  Compass,
  CalendarDays,
  BarChart3,
  CreditCard,
  Tags,
  ShoppingBag,
  Flame,
  Settings,
  UserCog,
  Wrench,
  Palette,
  Bell,
  Monitor,
  Sun,
  Moon,
  Laptop,
  Plus,
  Search,
  Layers,
  Users,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '@/context/search-provider'
import { useTheme } from '@/context/theme-provider'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { ScrollArea } from './ui/scroll-area'

// ─── Global search index ─────────────────────────────────────────────────────
// Each entry has: title (searchable), subtitle (secondary keywords), url, icon,
// and an optional `keywords` string for hidden search terms.

type SearchEntry = {
  title: string
  subtitle?: string
  url: string
  icon: React.ReactNode
  keywords?: string
}

type SearchGroup = {
  heading: string
  entries: SearchEntry[]
}

const SEARCH_INDEX: SearchGroup[] = [
  {
    heading: 'Pages',
    entries: [
      {
        title: 'Dashboard',
        subtitle: 'Overview, metrics, charts',
        url: '/',
        icon: <LayoutDashboard className='h-4 w-4' />,
        keywords: 'home main overview stats metrics kpi',
      },
      {
        title: 'Articles',
        subtitle: 'Content → Articles',
        url: '/content',
        icon: <FileText className='h-4 w-4' />,
        keywords: 'posts blog write publish content',
      },
      {
        title: 'Drafts',
        subtitle: 'Content → Drafts',
        url: '/content/drafts',
        icon: <FilePen className='h-4 w-4' />,
        keywords: 'unpublished pending review',
      },
      {
        title: 'Content Categories',
        subtitle: 'Content → Categories',
        url: '/content/categories',
        icon: <FolderTree className='h-4 w-4' />,
        keywords: 'article categories tags organize',
      },
      {
        title: 'Featured Stories',
        subtitle: 'Content → Featured',
        url: '/content/featured-stories',
        icon: <Star className='h-4 w-4' />,
        keywords: 'highlight spotlight featured',
      },
      {
        title: 'Travel Tools',
        subtitle: 'Content → Travel Tools',
        url: '/content/travel-tools',
        icon: <Compass className='h-4 w-4' />,
        keywords: 'guides packing currency converter',
      },
      {
        title: 'Events & Calendars',
        subtitle: 'Event management',
        url: '/events-&-calenders',
        icon: <CalendarDays className='h-4 w-4' />,
        keywords: 'schedule meetings appointments calendar',
      },
      {
        title: 'Admin Analytics',
        subtitle: 'Analytics → Admin',
        url: '/analytics/admin-analytics',
        icon: <BarChart3 className='h-4 w-4' />,
        keywords: 'data reports performance statistics admin',
      },
      {
        title: 'User Analytics',
        subtitle: 'Analytics → Users',
        url: '/analytics/user-analytics',
        icon: <Users className='h-4 w-4' />,
        keywords: 'user engagement activity tracking visitors',
      },
      {
        title: 'Owner Analytics',
        subtitle: 'Analytics → Owners',
        url: '/analytics/owner-analytics',
        icon: <BarChart3 className='h-4 w-4' />,
        keywords: 'owner listing performance revenue',
      },
      {
        title: 'Subscriptions',
        subtitle: 'Tiers, pricing, features',
        url: '/subscriptions',
        icon: <CreditCard className='h-4 w-4' />,
        keywords: 'plans pricing tiers billing payment features subscription',
      },
      {
        title: 'Categories',
        subtitle: 'Category management',
        url: '/categories',
        icon: <Tags className='h-4 w-4' />,
        keywords:
          'listing event blog resource categories subcategories taxonomy',
      },
      {
        title: 'All Deals',
        subtitle: 'Deals → All',
        url: '/deals/all-deals',
        icon: <ShoppingBag className='h-4 w-4' />,
        keywords: 'promotions offers discounts coupons deals',
      },
      {
        title: 'Active Deals',
        subtitle: 'Deals → Active',
        url: '/deals/active-deals',
        icon: <Flame className='h-4 w-4' />,
        keywords: 'live running promotions hot deals',
      },
      // {
      //   title: 'Users',
      //   subtitle: 'User management',
      //   url: '/users',
      //   icon: <Users className='h-4 w-4' />,
      //   keywords: 'members accounts roles permissions people',
      // },
      // {
      //   title: 'Chats',
      //   subtitle: 'Messages & conversations',
      //   url: '/chats',
      //   icon: <MessageSquare className='h-4 w-4' />,
      //   keywords: 'messages inbox support conversations',
      // },
      // {
      //   title: 'Apps',
      //   subtitle: 'App integrations',
      //   url: '/apps',
      //   icon: <Layers className='h-4 w-4' />,
      //   keywords: 'integrations plugins extensions apps',
      // },
    ],
  },
  {
    heading: 'Settings',
    entries: [
      {
        title: 'Profile',
        subtitle: 'Settings → Profile',
        url: '/settings',
        icon: <UserCog className='h-4 w-4' />,
        keywords: 'account name avatar bio personal',
      },
      {
        title: 'Account',
        subtitle: 'Settings → Account',
        url: '/settings/account',
        icon: <Wrench className='h-4 w-4' />,
        keywords: 'password email security two-factor',
      },
      {
        title: 'Appearance',
        subtitle: 'Settings → Appearance',
        url: '/settings/appearance',
        icon: <Palette className='h-4 w-4' />,
        keywords: 'theme colors font dark light mode',
      },
      {
        title: 'Notifications',
        subtitle: 'Settings → Notifications',
        url: '/settings/notifications',
        icon: <Bell className='h-4 w-4' />,
        keywords: 'alerts email push sms notifications',
      },
      {
        title: 'Display',
        subtitle: 'Settings → Display',
        url: '/settings/display',
        icon: <Monitor className='h-4 w-4' />,
        keywords: 'layout columns density display',
      },
    ],
  },
  {
    heading: 'Quick Actions',
    entries: [
      {
        title: 'New Article',
        subtitle: 'Create a new article',
        url: '/new-article',
        icon: <Plus className='h-4 w-4' />,
        keywords: 'write compose create post new article',
      },
      {
        title: 'Listing from First Tier',
        subtitle: 'Tier-based listing',
        url: '/listing-tier',
        icon: <Sparkles className='h-4 w-4' />,
        keywords: 'add listing tier premium',
      },
      {
        title: 'Upload Resources',
        subtitle: 'Upload files & assets',
        url: '/upload-resourses',
        icon: <ListTodo className='h-4 w-4' />,
        keywords: 'upload files images media assets resources',
      },
    ],
  },
]

export function CommandMenu() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Search pages, settings, actions…' />
      <CommandList>
        <ScrollArea type='hover' className='h-80 pe-1'>
          <CommandEmpty>
            <div className='flex flex-col items-center gap-2 py-6'>
              <Search className='h-8 w-8 text-muted-foreground/40' />
              <p className='text-sm text-muted-foreground'>No results found.</p>
              <p className='text-xs text-muted-foreground/60'>
                Try different keywords
              </p>
            </div>
          </CommandEmpty>

          {SEARCH_INDEX.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.entries.map((entry) => (
                <CommandItem
                  key={entry.url}
                  value={`${entry.title} ${entry.subtitle ?? ''} ${entry.keywords ?? ''}`}
                  onSelect={() => runCommand(() => navigate(entry.url))}
                  className='gap-3'
                >
                  <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-muted/40'>
                    {entry.icon}
                  </span>
                  <div className='flex min-w-0 flex-col'>
                    <span className='truncate text-sm font-medium'>
                      {entry.title}
                    </span>
                    {entry.subtitle && (
                      <span className='truncate text-xs text-muted-foreground'>
                        {entry.subtitle}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          <CommandSeparator />

          <CommandGroup heading='Theme'>
            <CommandItem
              value='theme light mode'
              onSelect={() => runCommand(() => setTheme('light'))}
              className='gap-3'
            >
              <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-muted/40'>
                <Sun className='h-4 w-4' />
              </span>
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>Light</span>
                <span className='text-xs text-muted-foreground'>
                  Switch to light theme
                </span>
              </div>
            </CommandItem>
            <CommandItem
              value='theme dark mode'
              onSelect={() => runCommand(() => setTheme('dark'))}
              className='gap-3'
            >
              <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-muted/40'>
                <Moon className='h-4 w-4' />
              </span>
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>Dark</span>
                <span className='text-xs text-muted-foreground'>
                  Switch to dark theme
                </span>
              </div>
            </CommandItem>
            <CommandItem
              value='theme system auto mode'
              onSelect={() => runCommand(() => setTheme('system'))}
              className='gap-3'
            >
              <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-muted/40'>
                <Laptop className='h-4 w-4' />
              </span>
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>System</span>
                <span className='text-xs text-muted-foreground'>
                  Follow OS settings
                </span>
              </div>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
