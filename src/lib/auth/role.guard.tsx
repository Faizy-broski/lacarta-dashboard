import { Navigate } from "react-router-dom"
import { useAuthStore } from "./auth.store"

interface Props {
  allowed: string[]
  children: React.ReactNode
}

export default function RoleGuard({ allowed, children }: Props) {
  const user = useAuthStore((s) => s.user)

  if (!user || !allowed.includes(user.role[0])) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}