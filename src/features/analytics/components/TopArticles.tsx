// // components/dashboard/TopArticles.tsx
// import { Eye, Heart, MessageCircle } from 'lucide-react'
// import { Badge } from '@/components/ui/badge'
// import { Card, CardContent, CardHeader } from '@/components/ui/card'
// const articles = [
//   {
//     title: 'Best Beaches in Cartagena for 2024',
//     category: 'Travel',
//     views: '12.4k',
//     likes: 982,
//     comments: 134,
//   },
//   {
//     title: 'Top 10 Restaurants in the Walled City',
//     category: 'Gastronomy',
//     views: '9.8k',
//     likes: 654,
//     comments: 89,
//   },
//   {
//     title: 'Luxury Hotels with Ocean Views',
//     category: 'Hotels',
//     views: '8.2k',
//     likes: 521,
//     comments: 67,
//   },
//   {
//     title: 'Colonial Houses for Rent: Monthly Guide',
//     category: 'Real Estate',
//     views: '7.1k',
//     likes: 445,
//     comments: 53,
//   },
// ]
// export function TopArticles({ className }: { className?: string }) {
//   return (
//     <Card className={className}>
//       <CardHeader>
//         <h3 className='font-antigua font-semibold'>Top Performing Articles</h3>
//       </CardHeader>
//       <CardContent className='space-y-4'>
//         {articles.map((article, index) => (
//           <div
//             key={index}
//             className='flex items-start justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0'
//           >
//             <div className='space-y-1'>
//               <p className='leading-tight font-medium'>{article.title}</p>
//               <Badge variant='secondary' className='text-xs'>
//                 {article.category}
//               </Badge>
//             </div>
//             <div className='flex items-center gap-4 text-xs text-muted-foreground'>
//               <div className='flex items-center gap-1'>
//                 <Eye className='h-3.5 w-3.5' />
//                 {article.views}
//               </div>
//               <div className='flex items-center gap-1'>
//                 <Heart className='h-3.5 w-3.5' />
//                 {article.likes}
//               </div>
//               <div className='flex items-center gap-1'>
//                 <MessageCircle className='h-3.5 w-3.5' />
//                 {article.comments}
//               </div>
//             </div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   )
// }
// components/dashboard/TopArticles.tsx
import { Eye, Heart, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const articles = [
  {
    title: 'Best Beaches in Cartagena for 2024',
    category: 'Beaches',
    categoryColor: 'bg-yellow-100 text-yellow-700',
    views: '12,453',
    likes: 892,
    comments: 134,
    image: '/images/beach.jpg',
  },
  {
    title: 'Top 10 Restaurants in the Walled City',
    category: 'Gastronomy',
    categoryColor: 'bg-orange-100 text-orange-700',
    views: '9,872',
    likes: 654,
    comments: 89,
    image: '/images/restaurant.jpg',
  },
  {
    title: 'Luxury Hotels with Ocean Views',
    category: 'Hotels',
    categoryColor: 'bg-red-100 text-red-600',
    views: '8,234',
    likes: 521,
    comments: 67,
    image: '/images/hotel.jpg',
  },
  {
    title: 'Colonial Houses for Rent: Monthly Guide',
    category: 'Activities',
    categoryColor: 'bg-green-100 text-green-700',
    views: '7,156',
    likes: 445,
    comments: 52,
    image: '/images/house.jpg',
  },
]

export function TopArticles({ className }: { className?: string }) {
  return (
    <Card className={`rounded-xl bg-[#F9FAFB] shadow-sm ${className}`}>
      <CardHeader className='pb-2'>
        <h3 className='font-antigua text-lg font-semibold'>
          Top Performing Articles
        </h3>
      </CardHeader>

      <CardContent className='space-y-6'>
        {articles.map((article, index) => (
          <div key={index} className='flex items-center justify-between'>
            {/* LEFT SIDE */}
            <div className='flex items-center gap-4'>
              <img
                src={article.image}
                alt={article.title}
                className='h-14 w-14 rounded-xl object-cover'
              />

              <div>
                <p className='text-sm font-normal text-gray-900'>
                  {article.title}
                </p>

                <Badge
                  className={`mt-1 rounded-full px-3 py-0.5 text-xs font-medium ${article.categoryColor}`}
                >
                  {article.category}
                </Badge>
              </div>
            </div>

            {/* RIGHT SIDE METRICS */}
            <div className='flex items-center gap-6 text-sm text-gray-500'>
              <div className='flex items-center gap-1'>
                <Eye className='h-4 w-4' />
                {article.views}
              </div>

              <div className='flex items-center gap-1'>
                <Heart className='h-4 w-4' />
                {article.likes}
              </div>

              <div className='flex items-center gap-1'>
                <MessageCircle className='h-4 w-4' />
                {article.comments}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
