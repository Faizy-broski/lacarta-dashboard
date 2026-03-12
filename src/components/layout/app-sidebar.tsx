import { Bell, LogOut } from 'lucide-react'
// import { useLayout } from '@/context/layout-provider'
// import { NavUser } from './nav-user'
// import { TeamSwitcher } from './team-switcher'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { SignOutDialog } from '@/components/sign-out-dialog'
import { AppTitle } from './app-title'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'

export function AppSidebar() {
  const [open, setOpen] = useDialogState()
  // const { collapsible, variant } = useLayout()
  return (
    // <Sidebar collapsible={collapsible} variant={variant}>
    <Sidebar>
      <SidebarHeader className='mb-4 border-b border-b-muted-foreground/50 py-4'>
        {/* <TeamSwitcher teams={sidebarData.teams} /> */}

        {/* Replace <TeamSwitch /> with the following <AppTitle />
         /* if you want to use the normal app title instead of TeamSwitch dropdown */}
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props: any) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={sidebarData.user} /> */}
        <div className='flex'>
          <Button
            variant='outline'
            className='bg-dark hover:bg-dark border-0 text-muted-foreground hover:text-gold'
          >
            <Bell />
          </Button>
          <Button
            variant='outline'
            onClick={() => setOpen(true)}
            className='bg-dark hover:bg-dark border-0 text-muted-foreground hover:text-gold'
          >
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </Sidebar>
  )
}
