// import { createFileRoute } from '@tanstack/react-router'
// export const Route = createFileRoute('/error/routes')({
//   component: RouteComponent,
// })
// function RouteComponent() {
//   return <div>Hello "/error/routes"!</div>
// }
import { Route } from 'react-router-dom'
import { ForbiddenError } from '@/features/errors/forbidden'
import { GeneralError } from '@/features/errors/general-error'
import { MaintenanceError } from '@/features/errors/maintenance-error'
import { NotFoundError } from '@/features/errors/not-found-error'
import { UnauthorisedError } from '@/features/errors/unauthorized-error'

export default (
  <>
    <Route path='/401' element={<UnauthorisedError />} />
    <Route path='/403' element={<ForbiddenError />} />
    <Route path='/500' element={<GeneralError />} />
    <Route path='/503' element={<MaintenanceError />} />
    <Route path='*' element={<NotFoundError />} />
  </>
)
