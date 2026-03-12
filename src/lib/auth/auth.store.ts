import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '../cookies/cookies'
import { AUTH_COOKIE } from './auth.constants'
import { AuthSession } from './auth.types'

interface AuthState {
  user: AuthSession['user'] | null
  accessToken: string

  setSession: (session: AuthSession) => void
  updateUser: (patch: Partial<AuthSession['user']>) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => {
  const cookie = getCookie(AUTH_COOKIE)
  const initial = cookie ? JSON.parse(cookie) : null

  return {
    user: initial?.user ?? null,
    accessToken: initial?.accessToken ?? '',

    setSession: (session) => {
      setCookie(AUTH_COOKIE, JSON.stringify(session))

      set({
        user: session.user,
        accessToken: session.accessToken,
      })
    },

    updateUser: (patch) => {
      set((state) => {
        if (!state.user) return state

        const updatedUser = {
          ...state.user,
          ...patch,
        }

        const session = {
          user: updatedUser,
          accessToken: state.accessToken,
        }

        // keep cookie in sync
        setCookie(AUTH_COOKIE, JSON.stringify(session))

        return { user: updatedUser }
      })
    },

    logout: () => {
      removeCookie(AUTH_COOKIE)

      set({
        user: null,
        accessToken: '',
      })
    },
  }
})
