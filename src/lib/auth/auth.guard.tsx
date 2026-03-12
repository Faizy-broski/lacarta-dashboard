import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "./auth.store"

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export default function AuthGuard( {children}: AuthenticatedLayoutProps ) {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.accessToken)

  const expired = user?.exp ? Date.now() > user.exp : true

  if (!token || !user || expired) {
    return <Navigate to="/sign-in" replace />
  }

  return children ?? <Outlet />
}