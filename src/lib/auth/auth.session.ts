import { getCookie, removeCookie } from "../cookies/cookies"
import { AUTH_COOKIE } from "./auth.constants"

export function getSession() {
  const cookie = getCookie(AUTH_COOKIE)
  if (!cookie) return null

  return JSON.parse(cookie)
}

export function isSessionExpired(exp: number) {
  return Date.now() > exp
}

export function clearSession() {
  removeCookie(AUTH_COOKIE)
}