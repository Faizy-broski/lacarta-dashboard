import {
  Construction,
  LayoutDashboard,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Package,
  ServerOff,
  Settings,
  UserCog,
  UserX,
  Users,
  MessagesSquare,
  ShieldCheck,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Heart,
  Download,
  Building2,
  MessageSquare,
  BarChart2,
} from 'lucide-react'

export type UserRole =
  | 'owner'
  | 'admin'
  | 'assistant'
  | 'editor'
  | 'client'
  | 'subscriber'

export function getSidebarNavForRole(role: UserRole | string | undefined) {
  switch (role) {
    case 'owner':
      return [
        {
          items: [
            {
              title: 'Dashboard',
              url: '/owner/dashboard',
              icon: LayoutDashboard,
            },
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/content' },
                { title: 'Drafts', url: '/content/drafts' },
                { title: 'Categories', url: '/content/categories' },
                { title: 'Featured Stories', url: '/content/featured-stories' },
                { title: 'Travel Tools', url: '/content/travel-tools' },
              ],
            },
            {
              title: 'Events & Calendars',
              url: '/events-&-calenders',
              icon: Package,
            },
            {
              title: 'Analytics',
              icon: MessagesSquare,
              items: [
                { title: 'Admin Analytics', url: '/analytics/admin-analytics' },
                { title: 'Owner Analytics', url: '/analytics/owner-analytics' },
              ],
            },
            { title: 'Subscriptions', url: '/subscriptions', icon: Package },
            {
              title: 'Deals',
              icon: Users,
              items: [
                { title: 'All Deals', url: '/deals/all-deals' },
                { title: 'Active Deals', url: '/deals/active-deals' },
              ],
            },
            { title: 'Filters', url: '/filters', icon: Package },
            // { title: 'Users', url: '/users', icon: Users },
            // { title: 'Tasks', url: '/tasks', icon: ListTodo },
            // { title: 'Chats', url: '/chats', icon: MessageSquare },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/settings', icon: UserCog }],
            },
          ],
        },
      ]

    case 'admin':
      return [
        {
          items: [
            {
              title: 'Dashboard',
              url: '/admin/dashboard',
              icon: LayoutDashboard,
            },
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/content' },
                { title: 'Drafts', url: '/content/drafts' },
                { title: 'Categories', url: '/content/categories' },
                { title: 'Featured Stories', url: '/content/featured-stories' },
                { title: 'Travel Tools', url: '/content/travel-tools' },
              ],
            },
            {
              title: 'Events & Calendars',
              url: '/events-&-calenders',
              icon: Package,
            },
            {
              title: 'Analytics',
              icon: MessagesSquare,
              items: [
                { title: 'Admin Analytics', url: '/analytics/admin-analytics' },
              ],
            },
            { title: 'Subscriptions', url: '/subscriptions', icon: Package },
            {
              title: 'Deals',
              icon: Users,
              items: [
                { title: 'All Deals', url: '/deals/all-deals' },
                { title: 'Active Deals', url: '/deals/active-deals' },
              ],
            },
            { title: 'Filters', url: '/filters', icon: Package },
            // { title: 'Users', url: '/users', icon: Users },
            // { title: 'Tasks', url: '/tasks', icon: ListTodo },
            // { title: 'Chats', url: '/chats', icon: MessageSquare },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/settings', icon: UserCog }],
            },
          ],
        },
      ]

    case 'assistant':
      return [
        {
          items: [
            {
              title: 'Dashboard',
              url: '/assistant/dashboard',
              icon: LayoutDashboard,
            },
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/content' },
                { title: 'Drafts', url: '/content/drafts' },
                { title: 'Categories', url: '/content/categories' },
                { title: 'Featured Stories', url: '/content/featured-stories' },
                { title: 'Travel Tools', url: '/content/travel-tools' },
              ],
            },
            {
              title: 'Events & Calendars',
              url: '/events-&-calenders',
              icon: Package,
            },
            {
              title: 'Analytics',
              icon: BarChart2,
              items: [
                { title: 'Admin Analytics', url: '/analytics/admin-analytics' },
              ],
            },
            {
              title: 'Deals',
              icon: Users,
              items: [
                { title: 'All Deals', url: '/deals/all-deals' },
                { title: 'Active Deals', url: '/deals/active-deals' },
              ],
            },
            // { title: 'Users', url: '/users', icon: Users },
            // { title: 'Chats', url: '/chats', icon: MessageSquare },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/settings', icon: UserCog }],
            },
          ],
        },
      ]

    case 'editor':
      return [
        {
          items: [
            {
              title: 'Dashboard',
              url: '/editor/dashboard',
              icon: LayoutDashboard,
            },
            {
              title: 'Content',
              icon: ListTodo,
              items: [
                { title: 'Articles', url: '/content' },
                { title: 'Drafts', url: '/content/drafts' },
                { title: 'Categories', url: '/content/categories' },
                { title: 'Featured Stories', url: '/content/featured-stories' },
                { title: 'Travel Tools', url: '/content/travel-tools' },
              ],
            },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/settings', icon: UserCog }],
            },
          ],
        },
      ]

    case 'client':
      return [
        {
          items: [
            {
              title: 'Dashboard',
              url: '/client/dashboard',
              icon: LayoutDashboard,
            },
            { title: 'My Listings', url: '/my-listings', icon: Building2 },
            {
              title: 'Events & Calendars',
              url: '/events-&-calenders',
              icon: Package,
            },
            {
              title: 'Deals',
              icon: Users,
              items: [{ title: 'Active Deals', url: '/deals/active-deals' }],
            },
            { title: 'Subscriptions', url: '/subscriptions', icon: Package },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/settings', icon: UserCog }],
            },
          ],
        },
      ]

    case 'subscriber':
      return [
        {
          items: [
            {
              title: 'Dashboard',
              url: '/subscriber/dashboard',
              icon: LayoutDashboard,
            },
            {
              title: 'Content',
              icon: ListTodo,
              items: [{ title: 'Articles', url: '/content' }],
            },
            { title: 'Favourites', url: '/favourites', icon: Heart },
            { title: 'Resources', url: '/resources', icon: Download },
            {
              title: 'Settings',
              icon: Settings,
              items: [{ title: 'Profile', url: '/settings', icon: UserCog }],
            },
          ],
        },
      ]

    default:
      return []
  }
}

// import { ClerkLogo } from '@/assets/clerk-logo'
// import { type SidebarData } from '../types'

export const sidebarData: any = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  // navGroups: [
  //   {
  //     title: 'General',
  //     items: [
  //       {
  //         title: 'Dashboard',
  //         url: '/',
  //         icon: LayoutDashboard,
  //       },
  //       {
  //         title: 'Content',
  //         icon: ListTodo,
  //          items: [
  //           {
  //             title: 'Articles',
  //             url: '/content/articles',
  //           },
  //           {
  //             title: 'Drafts',
  //             url: '/content/drafts',
  //           },
  //           {
  //             title: 'Categories',
  //             url: '/content/categories',
  //           },
  //           {
  //             title: 'Featured Stories',
  //             url: '/content/featured-stories',
  //           },
  //           {
  //             title: 'Travel Tools',
  //             url: '/content/travel-tools',
  //           },
  //         ],
  //       },
  //       {
  //         title: 'Events & Calendars',
  //         url: '/events-&-calenders',
  //         icon: Package,
  //       },
  //       {
  //         title: 'Analytics',
  //         icon: MessagesSquare,
  //         items: [
  //           {
  //             title: 'Admin Analytics',
  //             url: '/analytics/admin-analytics',
  //           },
  //           {
  //             title: 'User Analytics',
  //             url: '/analytics/user-analytics',
  //           },
  //           {
  //             title: 'Owner Analytics',
  //             url: '/analytics/owner-analytics',
  //           },
  //         ],
  //       },
  //       {
  //         title: 'Subscriptions',
  //         url: '/subscriptions',
  //         icon: Package,
  //       },
  //       {
  //         title: 'Deals',
  //         icon: Users,
  //         items: [
  //           {
  //             title: 'New Deals',
  //             url: '/deals/new-deals',
  //           },
  //           {
  //             title: 'Hot Deals',
  //             url: '/deals/hot-deals',
  //           },
  //         ],
  //       },
  //     ],
  //   },

  //   {
  //     title: 'Pages',
  //     items: [
  //       {
  //         title: 'Auth',
  //         icon: ShieldCheck,
  //         items: [
  //           {
  //             title: 'Sign In',
  //             url: '/sign-in',
  //           },
  //           {
  //             title: 'Sign In (2 Col)',
  //             url: '/sign-in-2',
  //           },
  //           {
  //             title: 'Sign Up',
  //             url: '/sign-up',
  //           },
  //           {
  //             title: 'Forgot Password',
  //             url: '/forgot-password',
  //           },
  //           {
  //             title: 'OTP',
  //             url: '/otp',
  //           },
  //         ],
  //       },
  //       {
  //         title: 'Errors',
  //         icon: Bug,
  //         items: [
  //           {
  //             title: 'Unauthorized',
  //             url: '/errors/unauthorized',
  //             icon: Lock,
  //           },
  //           {
  //             title: 'Forbidden',
  //             url: '/errors/forbidden',
  //             icon: UserX,
  //           },
  //           {
  //             title: 'Not Found',
  //             url: '/errors/not-found',
  //             icon: FileX,
  //           },
  //           {
  //             title: 'Internal Server Error',
  //             url: '/errors/internal-server-error',
  //             icon: ServerOff,
  //           },
  //           {
  //             title: 'Maintenance Error',
  //             url: '/errors/maintenance-error',
  //             icon: Construction,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     title: 'QUICK ACTIONS',
  //     items: [
  //       {
  //         title: 'Settings',
  //         icon: Settings,
  //         items: [
  //           {
  //             title: 'Profile',
  //             url: '/settings',
  //             icon: UserCog,
  //           },
  //           {
  //             title: 'Account',
  //             url: '/settings/account',
  //             icon: Wrench,
  //           },
  //           {
  //             title: 'Appearance',
  //             url: '/settings/appearance',
  //             icon: Palette,
  //           },
  //           {
  //             title: 'Notifications',
  //             url: '/settings/notifications',
  //             icon: Bell,
  //           },
  //           {
  //             title: 'Display',
  //             url: '/settings/display',
  //             icon: Monitor,
  //           },
  //         ],
  //       },
  //       {
  //         title: 'New Article',
  //         url: '/new-article',
  //         icon: HelpCircle,
  //       },
  //        {
  //         title: 'Listing from First Tier',
  //         url: '/listing-tier',
  //         icon: HelpCircle,
  //       },
  //        {
  //         title: 'Upload Resourses',
  //         url: '/upload-resourses',
  //         icon: HelpCircle,
  //       },
  //     ],
  //   },
  // ],
  navGroups: [
    {
      // title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Content',
          icon: ListTodo,
          items: [
            {
              title: 'Articles',
              url: '/content',
            },
            {
              title: 'Drafts',
              url: '/content/drafts',
            },
            {
              title: 'Categories',
              url: '/content/categories',
            },
            {
              title: 'Featured Stories',
              url: '/content/featured-stories',
            },
            {
              title: 'Travel Tools',
              url: '/content/travel-tools',
            },
          ],
        },
        {
          title: 'Events & Calendars',
          url: '/events-&-calenders',
          icon: Package,
        },
        {
          title: 'Analytics',
          icon: MessagesSquare,
          items: [
            {
              title: 'Admin Analytics',
              url: '/analytics/admin-analytics',
            },
            {
              title: 'User Analytics',
              url: '/analytics/user-analytics',
            },
            {
              title: 'Owner Analytics',
              url: '/analytics/owner-analytics',
            },
          ],
        },
        {
          title: 'Subscriptions',
          url: '/subscriptions',
          icon: Package,
        },
        {
          title: 'Deals',
          icon: Users,
          items: [
            {
              title: 'All Deals',
              url: '/deals/all-deals',
            },
            {
              title: 'Active Deals',
              url: '/deals/active-deals',
            },
          ],
        },
        {
          title: 'Filters',
          url: '/filters',
          icon: Package,
        },
        // ],
        // },

        // {
        //   title: 'Pages',
        // items: [
        {
          title: 'Auth',
          icon: ShieldCheck,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: Bug,
          items: [
            {
              title: 'Unauthorized',
              url: '/errors/unauthorized',
              icon: Lock,
            },
            {
              title: 'Forbidden',
              url: '/errors/forbidden',
              icon: UserX,
            },
            {
              title: 'Not Found',
              url: '/errors/not-found',
              icon: FileX,
            },
            {
              title: 'Internal Server Error',
              url: '/errors/internal-server-error',
              icon: ServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/errors/maintenance-error',
              icon: Construction,
            },
          ],
        },
        //   ],
        // },
        // {
        //   title: 'QUICK ACTIONS',
        //   items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            // {
            //   title: 'Account',
            //   url: '/settings/account',
            //   icon: Wrench,
            // },
            // {
            //   title: 'Appearance',
            //   url: '/settings/appearance',
            //   icon: Palette,
            // },
            // {
            //   title: 'Notifications',
            //   url: '/settings/notifications',
            //   icon: Bell,
            // },
            // {
            //   title: 'Display',
            //   url: '/settings/display',
            //   icon: Monitor,
            // },
          ],
        },
        {
          title: 'New Article',
          url: '/new-article',
          icon: HelpCircle,
        },
        {
          title: 'Listing from First Tier',
          url: '/listing-tier',
          icon: HelpCircle,
        },
        {
          title: 'Upload Resourses',
          url: '/upload-resourses',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
