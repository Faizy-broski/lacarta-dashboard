// import { useNavigate, useSearchParams } from 'react-router-dom'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TasksDialogs } from './components/tasks-dialogs'
import { TasksPrimaryButtons } from './components/tasks-primary-buttons'
import { TasksProvider } from './components/tasks-provider'
// import { TasksTable } from './components/tasks-table'
// import { taskSearchSchema } from './data/task-search.schema'
// import { tasks } from './data/tasks'

export function Tasks() {
  // const [searchParams] = useSearchParams()
  // const navigate = useNavigate()

  // const parsed = taskSearchSchema.safeParse(Object.fromEntries(searchParams))

  // const search = parsed.success ? parsed.data : taskSearchSchema.parse({})

  return (
    <TasksProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <TasksPrimaryButtons />
        </div>
        {/* <TasksTable data={tasks} search={search} navigate={navigate} /> */}
      </Main>

      <TasksDialogs />
    </TasksProvider>
  )
}
