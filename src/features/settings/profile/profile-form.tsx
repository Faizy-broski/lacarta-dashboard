import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuthStore } from '@/lib/auth/auth.store'
// import { Link } from '@tanstack/react-router'
// import { Link } from 'react-router-dom'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { supabase } from '@/lib/supabase/supabase.ts'
// import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import ProfilePicUpload from '@/components/profile-avatar-upload'

// const languages = [
//   { label: 'English', value: 'en' },
//   { label: 'French', value: 'fr' },
//   { label: 'German', value: 'de' },
//   { label: 'Spanish', value: 'es' },
//   { label: 'Portuguese', value: 'pt' },
//   { label: 'Russian', value: 'ru' },
//   { label: 'Japanese', value: 'ja' },
//   { label: 'Korean', value: 'ko' },
//   { label: 'Chinese', value: 'zh' },
// ] as const

const profileFormSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Please enter your name.')
    .min(2, 'Name must be at least 2 characters.')
    .max(30, 'Name must not be longer than 30 characters.'),

  // username: z
  //   .string('Please enter your username.')
  //   .min(2, 'Username must be at least 2 characters.')
  //   .max(30, 'Username must not be longer than 30 characters.'),
  email: z.string().email({
    error: (iss) =>
      iss.input === undefined
        ? 'Please select an email to display.'
        : undefined,
  }),
  // bio: z.string().max(200).min(4).optional(),
  bio: z.preprocess(
    (v) => (v === '' ? undefined : v),
    z.string().min(4).max(200).optional()
  ),

  // dob: z.date('Please select your date of birth.'),
  // language: z.string('Please select a language.'),
  // urls: z
  //   .array(
  //     z.object({
  //       value: z.url('Please enter a valid URL.'),
  //     })
  //   )
  //   .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//   full_name: '',
//   email: '',
//   bio: '',
// urls: [
//   { value: 'https://shadcn.com' },
//   { value: 'http://twitter.com/shadcn' },
// ],
// }

export function ProfileForm() {
  const user = useAuthStore((state) => state.user)
  const [avatar, setAvatar] = useState<string | undefined>()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: '',
      email: '',
      bio: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (!user) return

    form.reset({
      full_name: user.name ?? '',
      email: user.email ?? '',
      bio: user.bio ?? '',
    })

    setAvatar(user.profile_photo_url ?? undefined)
  }, [user])

  const handleAvatarUpdate = async (url: string) => {
    try {
      setAvatar(url)

      const { error } = await supabase
        .from('users')
        .update({
          profile_photo_url: url,
        })
        .eq('id', user?.accountNo)

      if (error) throw error
      useAuthStore.getState().updateUser({
        profile_photo_url: url,
      })
      toast.success('Profile pic updated successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update profile pic')
    }
  }

  const updateProfile = async (data: ProfileFormValues) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: data.full_name,
          bio: data.bio,
        })
        .eq('id', user?.accountNo)
        .select()
        .single()

      if (error) throw error
      useAuthStore.getState().updateUser({
        name: data.full_name,
        bio: data.bio,
      })
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update profile')
    }
  }

  // const { fields, append } = useFieldArray({
  //   name: 'urls',
  //   control: form.control,
  // })

  return (
    // <div className="mx-auto w-full max-w-2xl space-y-8">
    //   {/* <ProfilePicUpload
    //     user={user}
    //     value={avatar}
    //     onChange={handleAvatarUpdate}
    //   /> */}
    //   <div className="flex justify-center">
    //   <ProfilePicUpload
    //     user={user}
    //     value={avatar}
    //     onChange={handleAvatarUpdate}
    //   />
    // </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => updateProfile(data))}
          // className='space-y-8'
          className="w-full  mt-8"
        >
          <div className="grid gap-10 md:grid-cols-[200px_1fr]">

        {/* Avatar */}
        <div className="flex justify-center md:justify-start">
          <ProfilePicUpload
            user={user}
            value={avatar}
            onChange={handleAvatarUpdate}
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name='full_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
          control={form.control}
          full_name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='example@gmail.com' disabled {...field} />
                </FormControl>
                <FormDescription>
                  Email cannot be changed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us a little bit about yourself'
                    // className='resize-none'
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
                  control={form.control}
                  name='dob'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Date of birth</FormLabel>
                      <DatePicker selected={field.value} onSelect={field.onChange} />
                      <FormDescription>
                        Your date of birth is used to calculate your age.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='language'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Language</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn(
                                'w-[200px] justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? languages.find(
                                    (language) => language.value === field.value
                                  )?.label
                                : 'Select language'}
                              <CaretSortIcon className='ms-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search language...' />
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {languages.map((language) => (
                                  <CommandItem
                                    value={language.label}
                                    key={language.value}
                                    onSelect={() => {
                                      form.setValue('language', language.value)
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        'size-4',
                                        language.value === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    {language.label}
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        This is the language that will be used in the dashboard.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
          {/* <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl className={cn(index !== 0 && 'mt-1.5')}>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            Add URL
          </Button>
        </div> */}
        <div className="flex justify-end">
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Updating...' : 'Update profile'}
          </Button>
          </div>
          </div>
          </div>
        </form>
      </Form>
    // </div>
  )
}
