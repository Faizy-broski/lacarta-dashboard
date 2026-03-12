import z from 'zod'

export const usersSearchSchema = z.object({
  page: z.coerce.number().optional().catch(1),
  pageSize: z.coerce.number().optional().catch(10),
  role: z.string().optional().catch(''),
  query: z.string().optional().catch(''),
})

export type UsersSearchParams = z.infer<typeof usersSearchSchema>