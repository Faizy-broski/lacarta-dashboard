// import { createFileRoute } from '@tanstack/react-router'
// export const Route = createFileRoute('/protected/routes')({
//   component: RouteComponent,
// })
// function RouteComponent() {
//   return <div>Hello "/protected/routes"!</div>
// }
import ProtectedLayout from '@/layouts/ProtectedLayout'
import { Route, useParams } from 'react-router-dom'
import { ComingSoon } from '@/components/coming-soon'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Apps } from '@/features/apps/index'
import { Chats } from '@/features/chats/index'
import { Dashboard } from '@/features/dashboard/index'
import { ForbiddenError } from '@/features/errors/forbidden'
import { GeneralError } from '@/features/errors/general-error'
import { MaintenanceError } from '@/features/errors/maintenance-error'
import { NotFoundError } from '@/features/errors/not-found-error'
import { UnauthorisedError } from '@/features/errors/unauthorized-error'
import { SettingsAccount } from '@/features/settings/account'
import { SettingsAppearance } from '@/features/settings/appearance'
import { SettingsDisplay } from '@/features/settings/display'
import { Settings } from '@/features/settings/index'
import { SettingsNotifications } from '@/features/settings/notifications'
import { SettingsProfile } from '@/features/settings/profile'
import { Tasks } from '@/features/tasks/index'
import { Users } from '@/features/users/index'
import { Subscription } from '@/features/subscription/index'
import { Events } from '@/features/events and calender/index'
import {DealsPage} from '@/features/deals-page/index'
import {ActiveDealsPage} from '@/features/deals-page/activeDealsPage'
import {ContentPage} from '@/features/content/index'

function ErrorComponent() {
  const { error } = useParams<{ error?: string }>()

  const errorMap: Record<string, React.ComponentType> = {
    unauthorized: UnauthorisedError,
    forbidden: ForbiddenError,
    'not-found': NotFoundError,
    'internal-server-error': GeneralError,
    'maintenance-error': MaintenanceError,
  }
  const ErrorComponent = errorMap[error ?? ''] || NotFoundError

  return (
    <>
      <Header fixed className='border-b'>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <div className='flex-1 [&>div]:h-full'>
        <ErrorComponent />
      </div>
    </>
  )
}

export default (
  <Route element={<ProtectedLayout />}>
    <Route index element={<Dashboard />} />
    <Route path='/users' element={<Users />} />
    <Route path='/tasks' element={<Tasks />} />
    <Route path='/chats' element={<Chats />} />
    <Route path='/apps' element={<Apps />} />
    <Route path='/help-center' element={<ComingSoon />} />
    <Route path='/subscriptions' element={<Subscription />} />
    <Route path='/events-&-calenders' element={<Events />} />
    <Route path='/deals/all-deals' element={<DealsPage />} />
    <Route path='/deals/active-deals' element={<ActiveDealsPage />} />

    <Route path='/content' element={<ContentPage />}>
      {/* <Route path='/content/articles' element={<SettingsAppearance />} />
      <Route path='/content/articles' element={<SettingsAccount />} />
      <Route path='/content/articles' element={<SettingsDisplay />} />
      <Route path='/content/articles' element={<SettingsNotifications />} />
      <Route path='/content/articles' element={<SettingsNotifications />} /> */}
    </Route>

    <Route path='/settings' element={<Settings />}>
      <Route index element={<SettingsProfile />} />
      <Route path='appearance' element={<SettingsAppearance />} />
      <Route path='account' element={<SettingsAccount />} />
      <Route path='display' element={<SettingsDisplay />} />
      <Route path='notifications' element={<SettingsNotifications />} />
    </Route>

    <Route path='/errors/:error' element={<ErrorComponent />} />
  </Route>
)
