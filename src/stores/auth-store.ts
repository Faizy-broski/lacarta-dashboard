import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies/cookies'

const AUTH_COOKIE = 'auth_session'

const ACCESS_TOKEN = 'thisisjustarandomstring'

interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

interface AuthState {
  user: AuthUser | null
  accessToken: string
  setSession: (user: AuthUser, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => {
  // const cookieState = getCookie(ACCESS_TOKEN)
  // const initToken = cookieState ? JSON.parse(cookieState) : ''

  const cookie = getCookie(AUTH_COOKIE)
  const initial = cookie ? JSON.parse(cookie) : null
  return {
    user: initial?.user ?? null,
    accessToken: initial?.accessToken ?? '',

    setSession: (user, token) => {
      const session = { user, accessToken: token }
      setCookie(AUTH_COOKIE, JSON.stringify(session))

      set({
        user,
        accessToken: token,
      })
    },

    logout: () => {
      removeCookie(AUTH_COOKIE)
      set({
        user: null,
        accessToken: '',
      })
    },
    // auth: {
    //   user: null,
    //   setUser: (user) =>
    //     set((state) => ({ ...state, auth: { ...state.auth, user } })),
    //   accessToken: initToken,
    //   setAccessToken: (accessToken) =>
    //     set((state) => {
    //       setCookie(ACCESS_TOKEN, JSON.stringify(accessToken))
    //       return { ...state, auth: { ...state.auth, accessToken } }
    //     }),
    //   resetAccessToken: () =>
    //     set((state) => {
    //       removeCookie(ACCESS_TOKEN)
    //       return { ...state, auth: { ...state.auth, accessToken: '' } }
    //     }),
    //   reset: () =>
    //     set((state) => {
    //       removeCookie(ACCESS_TOKEN)
    //       return {
    //         ...state,
    //         auth: { ...state.auth, user: null, accessToken: '' },
    //       }
    //     }),
    // },
  }
})
