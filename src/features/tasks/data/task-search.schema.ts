import z from 'zod'
import { priorities, statuses } from '@/features/tasks/data/data'

export const taskSearchSchema = z.object({
  page: z.coerce.number().optional().catch(1),
  pageSize: z.coerce.number().optional().catch(10),
  status: z
    .array(z.enum(statuses.map((s) => s.value)))
    .optional()
    .catch([]),
  priority: z
    .array(z.enum(priorities.map((p) => p.value)))
    .optional()
    .catch([]),
  filter: z.string().optional().catch(''),
})

export type TaskSearchParams = z.infer<typeof taskSearchSchema>