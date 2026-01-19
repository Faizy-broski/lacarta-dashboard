// import { createFileRoute } from '@tanstack/react-router'
// export const Route = createFileRoute('/auth/routes')({
//   component: RouteComponent,
// })
// function RouteComponent() {
//   return <div>Hello "/auth/routes"!</div>
// }
import AuthLayout from '@/layouts/AuthLayout'
import { Route } from 'react-router-dom'
import { ForgotPassword } from '@/features/auth/forgot-password/index'
import { Otp } from '@/features/auth/otp/index'
import { SignIn } from '@/features/auth/sign-in/index'
import { SignUp } from '@/features/auth/sign-up/index'

export default (
  <Route element={<AuthLayout />}>
    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/otp' element={<Otp />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
  </Route>
)
