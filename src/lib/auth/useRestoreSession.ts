import { useEffect } from "react"
import { getSession, isSessionExpired, clearSession } from "./auth.session"
import { useAuthStore } from "./auth.store"

export function useRestoreSession() {
  const setSession = useAuthStore((s) => s.setSession)

  useEffect(() => {
    const session = getSession()

    if (!session) return

    if (isSessionExpired(session.user.exp)) {
      clearSession()
      return
    }

    setSession(session)
  }, [])
}