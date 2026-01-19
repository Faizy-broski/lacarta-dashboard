import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import AuthRoutes from '@/routes/auth.routes'
import ProtectedRoutes from '@/routes/protected.routes'
import ErrorRoutes from '@/routes/error.routes'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {ProtectedRoutes}
        {AuthRoutes}
        {ErrorRoutes}
      </Route>
    </Routes>
  )
}
