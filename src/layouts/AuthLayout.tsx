import { Outlet } from 'react-router-dom'
import { Logo } from '@/assets/logo'

export default function AuthLayout() {
  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <Logo className='me-2' />
          <h1 className='text-xl font-medium'>Lacarta Admin</h1>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
