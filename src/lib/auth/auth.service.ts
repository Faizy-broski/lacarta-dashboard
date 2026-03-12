import { StringColorFormat } from '@faker-js/faker'
import { toast } from 'sonner'
import { supabase } from '../supabase/supabase'
import { ROLE_REDIRECT, getAuthErrorMessage } from './auth.constants'
import { useAuthStore } from './auth.store'
import { AuthUser } from './auth.types'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // if (error || !data.user) throw error
  if (error || !data.user) {
    const code = (error as any)?.code ?? ''
    toast.error(getAuthErrorMessage(code))
    return
  }

  const { data: userData } = await supabase
    .from('users')
    .select('full_name, role, bio, profile_photo_url')
    .eq('id', data.user.id)
    .single()

  const role = userData?.role
  const name = userData?.full_name
  const profile_photo_url = userData?.profile_photo_url
  const bio = userData?.bio

  const user: AuthUser = {
    accountNo: data.user.id,
    email: data.user.email ?? '',
    name: name ?? '',
    bio: bio ?? '',
    profile_photo_url: profile_photo_url ?? '',
    role: [role],
    exp: Date.now() + 24 * 60 * 60 * 1000,
  }

  useAuthStore.getState().setSession({
    user,
    accessToken: data.session?.access_token ?? '',
  })

  return ROLE_REDIRECT[role]
}

export async function logout() {
  await supabase.auth.signOut()
  useAuthStore.getState().logout()
}

export async function signUp(
  email: string,
  password: string,
  full_name: string,
  user_role: string
) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: ROLE_REDIRECT[user_role],
      data: {
        full_name: full_name,
        role: user_role,
        profile_photo_url: 'asda',
      },
    },
  })

  if (error || !data.user) {
    const code = (error as any)?.code ?? ''
    toast.error(getAuthErrorMessage(code))
    return
  }

  const { data: userData } = await supabase
    .from('users')
    .select('full_name, role, bio, profile_photo_url')
    .eq('id', data.user.id)
    .single()

  const role = userData?.role
  const name = userData?.full_name
  const profile_photo_url = userData?.profile_photo_url
  const bio = userData?.bio

  const user: AuthUser = {
    accountNo: data.user.id,
    email: data.user.email ?? '',
    name: name ?? '',
    bio: bio ?? '',
    profile_photo_url: profile_photo_url ?? '',
    role: [role],
    exp: Date.now() + 24 * 60 * 60 * 1000,
  }

  useAuthStore.getState().setSession({
    user,
    accessToken: data.session?.access_token ?? '',
  })

  return ROLE_REDIRECT[role]
}
