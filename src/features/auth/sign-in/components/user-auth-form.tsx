import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

type UserRole = 'owner' | 'admin' | 'assistant' | 'editor' | 'client' | 'subscriber'

const ROLE_REDIRECT: Record<UserRole, string> = {
  owner: '/owner/dashboard',
  admin: '/admin/dashboard',
  assistant: '/assistant/dashboard',
  editor: '/editor/dashboard',
  client: '/client/dashboard',
  subscriber: '/subscriber/dashboard',
}

function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'invalid_credentials':
      return 'Invalid email or password. Please try again.'
    case 'email_not_confirmed':
      return 'Please verify your email before signing in.'
    case 'user_not_found':
      return 'No account found with this email.'
    case 'too_many_requests':
      return 'Too many attempts. Please try again later.'
    default:
      return 'Sign in failed. Please try again.'
  }
}

const formSchema = z.object({
  email: z.string().min(1, 'Please enter your email').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Please enter your password')
    .min(7, 'Password must be at least 7 characters long'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({ className, redirectTo, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (signInError || !signInData.user) {
      const code = (signInError as any)?.code ?? ''
      toast.error(getAuthErrorMessage(code))
      setIsLoading(false)
      return
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', signInData.user.id)
      .single()

    if (userError || !userData) {
      toast.error('Could not fetch user role. Please contact support.')
      await supabase.auth.signOut()
      setIsLoading(false)
      return
    }

    const role = userData.role as UserRole
    const redirectPath = ROLE_REDIRECT[role]

    if (!redirectPath) {
      toast.error('Unknown role assigned. Please contact support.')
      await supabase.auth.signOut()
      setIsLoading(false)
      return
    }

    auth.setUser({
      accountNo: signInData.user.id,
      email: signInData.user.email ?? '',
      role: [role],
      exp: Date.now() + 24 * 60 * 60 * 1000,
    })

    auth.setAccessToken(signInData.session?.access_token ?? '')

    toast.success(`Welcome back, ${signInData.user.email}!`)

    setIsLoading(false)

    navigate(redirectTo || redirectPath, { replace: true })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='absolute end-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        <Button
          className='mt-2 bg-gradient-to-r from-[#CF9921] to-[#D2BB6B]'
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
          Sign in
        </Button>
      </form>
    </Form>
  )
}