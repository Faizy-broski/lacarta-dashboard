// import { createFileRoute } from '@tanstack/react-router'
// export const Route = createFileRoute('/protected/routes')({
//   component: RouteComponent,
// })
// function RouteComponent() {
//   return <div>Hello "/protected/routes"!</div>
// }
import ProtectedLayout from '@/layouts/ProtectedLayout'
import { Route, useParams } from 'react-router-dom'
import RoleGuard from '@/lib/auth/role.guard'
import { ComingSoon } from '@/components/coming-soon'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CategoryPage } from '@/features/Filters/index'
import { OwnerListingEditorPage } from '@/features/Owner-Page/index'
import { AnalyticsPage } from '@/features/analytics/index'
import { Apps } from '@/features/apps/index'
import { Chats } from '@/features/chats/index'
import { ArticleContent } from '@/features/content/article'
import { CategoryContent } from '@/features/content/category'
import { DraftContent } from '@/features/content/draft'
import { FeatureContent } from '@/features/content/featured'
import { ContentPage } from '@/features/content/index'
import { TravelToolContent } from '@/features/content/travelTool'
import { Dashboard } from '@/features/dashboard/index'
import { ActiveDealsPage } from '@/features/deals-page/activeDealsPage'
import { DealsPage } from '@/features/deals-page/index'
import { ForbiddenError } from '@/features/errors/forbidden'
import { GeneralError } from '@/features/errors/general-error'
import { MaintenanceError } from '@/features/errors/maintenance-error'
import { NotFoundError } from '@/features/errors/not-found-error'
import { UnauthorisedError } from '@/features/errors/unauthorized-error'
import { Events } from '@/features/events and calender/index'
import { FavouritesPage } from '@/features/favourites/index'
import { MyListingsPage } from '@/features/my-listings/index'
import { ResourcesPage } from '@/features/resources/index'
import { SettingsAccount } from '@/features/settings/account'
import { SettingsAppearance } from '@/features/settings/appearance'
import { SettingsDisplay } from '@/features/settings/display'
import { Settings } from '@/features/settings/index'
import { SettingsNotifications } from '@/features/settings/notifications'
import { SettingsProfile } from '@/features/settings/profile'
import { Subscription } from '@/features/subscription/index'
import { Tasks } from '@/features/tasks/index'
import { Users } from '@/features/users/index'

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
    {/* Default redirect — auth guard redirects to role-specific dashboard */}
    <Route index element={<Dashboard />} />

    {/* Role-specific dashboards */}
    <Route
      path='/owner/dashboard'
      element={
        <RoleGuard allowed={['owner']}>
          <Dashboard />
        </RoleGuard>
      }
    />
    <Route
      path='/admin/dashboard'
      element={
        <RoleGuard allowed={['admin']}>
          <Dashboard />
        </RoleGuard>
      }
    />
    <Route
      path='/assistant/dashboard'
      element={
        <RoleGuard allowed={['assistant']}>
          <Dashboard />
        </RoleGuard>
      }
    />
    <Route
      path='/editor/dashboard'
      element={
        <RoleGuard allowed={['editor']}>
          <Dashboard />
        </RoleGuard>
      }
    />
    <Route
      path='/client/dashboard'
      element={
        <RoleGuard allowed={['client']}>
          <Dashboard />
        </RoleGuard>
      }
    />
    <Route
      path='/subscriber/dashboard'
      element={
        <RoleGuard allowed={['subscriber']}>
          <Dashboard />
        </RoleGuard>
      }
    />

    {/* Owner + Admin + Assistant */}
    <Route
      path='/users'
      element={
        <RoleGuard allowed={['owner', 'admin', 'assistant']}>
          <Users />
        </RoleGuard>
      }
    />
    <Route
      path='/tasks'
      element={
        <RoleGuard allowed={['owner', 'admin', 'assistant']}>
          <Tasks />
        </RoleGuard>
      }
    />
    <Route
      path='/filters'
      element={
        <RoleGuard allowed={['owner', 'admin']}>
          <CategoryPage />
        </RoleGuard>
      }
    />
    <Route
      path='/apps'
      element={
        <RoleGuard allowed={['owner', 'admin']}>
          <Apps />
        </RoleGuard>
      }
    />

    {/* Owner + Admin + Assistant + Editor */}
    {/* <Route
      path='/chats'
      element={
        <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
          <Chats />
        </RoleGuard>
      }
    /> */}

    {/* Subscriptions: owner, admin, client */}
    <Route
      path='/subscriptions'
      element={
        <RoleGuard allowed={['owner', 'admin', 'client']}>
          <Subscription />
        </RoleGuard>
      }
    />

    {/* Events: owner, admin, assistant, client */}
    <Route
      path='/events-&-calenders'
      element={
        <RoleGuard allowed={['owner', 'admin', 'assistant', 'client']}>
          <Events />
        </RoleGuard>
      }
    />

    {/* Deals */}
    <Route
      path='/deals/all-deals'
      element={
        <RoleGuard allowed={['owner', 'admin', 'assistant']}>
          <DealsPage />
        </RoleGuard>
      }
    />
    <Route
      path='/deals/active-deals'
      element={
        <RoleGuard allowed={['owner', 'admin', 'assistant', 'client']}>
          <ActiveDealsPage />
        </RoleGuard>
      }
    />

    {/* Analytics */}
    <Route
      path='/analytics/admin-analytics'
      element={
        <RoleGuard allowed={['owner', 'admin', 'assistant']}>
          <AnalyticsPage />
        </RoleGuard>
      }
    />
    <Route
      path='/analytics/owner-analytics'
      element={
        <RoleGuard allowed={['owner']}>
          <OwnerListingEditorPage />
        </RoleGuard>
      }
    />

    {/* Content — owner, admin, assistant, editor get full access; subscriber gets articles only */}
    <Route path='/content' element={<ContentPage />}>
      <Route index element={<ArticleContent />} />
      <Route
        path='drafts'
        element={
          <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
            <DraftContent />
          </RoleGuard>
        }
      />
      <Route
        path='categories'
        element={
          <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
            <CategoryContent />
          </RoleGuard>
        }
      />
      <Route
        path='featured-stories'
        element={
          <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
            <FeatureContent />
          </RoleGuard>
        }
      />
      <Route
        path='travel-tools'
        element={
          <RoleGuard allowed={['owner', 'admin', 'assistant', 'editor']}>
            <TravelToolContent />
          </RoleGuard>
        }
      />
    </Route>

    {/* Client-specific */}
    <Route
      path='/my-listings'
      element={
        <RoleGuard allowed={['owner', 'client']}>
          <MyListingsPage />
        </RoleGuard>
      }
    />

    {/* Subscriber-specific */}
    <Route
      path='/favourites'
      element={
        <RoleGuard allowed={['subscriber']}>
          <FavouritesPage />
        </RoleGuard>
      }
    />
    <Route
      path='/resources'
      element={
        <RoleGuard allowed={['subscriber', 'owner', 'admin']}>
          <ResourcesPage />
        </RoleGuard>
      }
    />

    {/* Settings — all roles */}
    <Route path='/settings' element={<Settings />}>
      <Route index element={<SettingsProfile />} />
      <Route path='appearance' element={<SettingsAppearance />} />
      <Route path='account' element={<SettingsAccount />} />
      <Route path='display' element={<SettingsDisplay />} />
      <Route path='notifications' element={<SettingsNotifications />} />
    </Route>

    <Route path='/help-center' element={<ComingSoon />} />
    <Route path='/errors/:error' element={<ErrorComponent />} />
  </Route>
)
