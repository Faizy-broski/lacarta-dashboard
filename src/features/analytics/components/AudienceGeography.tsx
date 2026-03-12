// // components/dashboard/AudienceGeography.tsx
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// const countries = [
//   { name: "Colombia", value: 42 },
//   { name: "United States", value: 28 },
//   { name: "Spain", value: 12 },
//   { name: "Mexico", value: 8 },
//   { name: "Argentina", value: 6 },
//   { name: "Other", value: 4 },
// ]
// export function AudienceGeography() {
//   return (
//     <Card>
//       <CardHeader>
//         <h3 className="font-semibold">Audience Geography</h3>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {countries.map((country) => (
//           <div key={country.name} className="space-y-1">
//             <div className="flex justify-between text-sm">
//               <span>{country.name}</span>
//               <span className="text-muted-foreground">{country.value}%</span>
//             </div>
//             <Progress value={country.value} />
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   )
// }
// components/dashboard/AudienceGeography.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const countries = [
  { name: 'Colombia', users: '52,489', value: 42 },
  { name: 'United States', users: '34,982', value: 28 },
  { name: 'Spain', users: '14,987', value: 12 },
  { name: 'Mexico', users: '9,991', value: 8 },
  { name: 'Argentina', users: '7,493', value: 6 },
  { name: 'Other', users: '4,950', value: 4 },
]

export function AudienceGeography() {
  return (
    <Card className='rounded-xl bg-[#F9FAFB] shadow-sm'>
      <CardHeader className='pb-2'>
        <h3 className='font-antigua text-lg font-semibold'>
          Audience Geography
        </h3>
      </CardHeader>

      <CardContent className='space-y-5'>
        {countries.map((country) => (
          <div key={country.name} className='space-y-2'>
            {/* TOP ROW */}
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-900'>{country.name}</span>

              <div className='flex items-center gap-2'>
                <span className='text-muted-foreground'>{country.users}</span>
                <span className='font-semibold text-gray-900'>
                  {country.value}%
                </span>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className='h-2 w-full rounded-full bg-gray-200'>
              <div
                className='h-2 rounded-full bg-[#C9A227]'
                style={{ width: `${country.value}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
