// // // components/dashboard/WishlistOverview.tsx
// // import { Card, CardContent, CardHeader } from "@/components/ui/card"
// // import { Heart } from "lucide-react"
// // const items = [
// //   {
// //     title: "10 Things to Do in Cartagena Old Town",
// //     count: 342,
// //   },
// //   {
// //     title: "Complete Guide to Rosario Islands",
// //     count: 287,
// //   },
// //   {
// //     title: "Street Food Walking Tour Guide",
// //     count: 198,
// //   },
// //   {
// //     title: "Sunset Photography Spots in Cartagena",
// //     count: 156,
// //   },
// // ]
// // export function WishlistOverview() {
// //   return (
// //     <Card className="my-10">
// //       <CardHeader>
// //         <h3 className="font-semibold">Wishlist Overview</h3>
// //         <p className="text-sm text-muted-foreground">
// //           Most popular items across all categories
// //         </p>
// //       </CardHeader>
// //       <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
// //         {items.map((item, index) => (
// //           <div
// //             key={index}
// //             className="rounded-xl border p-4 space-y-2 hover:bg-muted/40 transition"
// //           >
// //             <p className="text-sm font-medium leading-snug line-clamp-2">
// //               {item.title}
// //             </p>
// //             <div className="flex items-center gap-1 text-xs text-muted-foreground">
// //               <Heart className="h-3.5 w-3.5" />
// //               {item.count} saves
// //             </div>
// //           </div>
// //         ))}
// //       </CardContent>
// //     </Card>
// //   )
// // }
// // components/dashboard/WishlistOverview.tsx
// import { Heart, ChevronUp } from 'lucide-react'
// import { Card } from '@/components/ui/card'
// const posts = [
//   {
//     title: "10 Things to Do in Cartagena's Old Town",
//     image: '/images/post1.jpg',
//     count: 342,
//     category: 'Posts',
//   },
//   {
//     title: 'Complete Guide to Rosario Islands',
//     image: '/images/post2.jpg',
//     count: 287,
//     category: 'Posts',
//   },
//   {
//     title: 'Street Food Walking Tour Guide',
//     image: '/images/post3.jpg',
//     count: 198,
//     category: 'Posts',
//   },
//   {
//     title: 'Sunset Photography Spots in Cartagena',
//     image: '/images/post4.jpg',
//     count: 156,
//     category: 'Posts',
//   },
// ]
// const realEstate = [
//   {
//     title: 'Casa Colonial Centro - 5BR Historic Home',
//     image: '/images/re1.jpg',
//     count: 423,
//     category: 'Real Estate',
//   },
//   {
//     title: 'Penthouse Bocagrande with Ocean View',
//     image: '/images/re2.jpg',
//     count: 312,
//     category: 'Real Estate',
//   },
//   {
//     title: 'Villa Getsemaní - Modern Colonial Fusion',
//     image: '/images/re3.jpg',
//     count: 245,
//     category: 'Real Estate',
//   },
//   {
//     title: 'Apartment San Diego - 2BR Renovated',
//     image: '/images/re4.jpg',
//     count: 189,
//     category: 'Real Estate',
//   },
// ]
// export function WishlistOverview() {
//   return (
//     <div className='my-10 space-y-8'>
//       {/* HEADER */}
//       <div>
//         <h2 className='font-antigua text-xl font-semibold'>
//           Wishlist Overview
//         </h2>
//         <p className='text-sm text-muted-foreground'>
//           Most popular items across all categories
//         </p>
//       </div>
//       {/* POSTS SECTION */}
//       <Section
//         title='Posts'
//         items={posts}
//         badgeColor='bg-red-100 text-red-600'
//       />
//       {/* REAL ESTATE SECTION */}
//       <Section
//         title='Real Estate'
//         items={realEstate}
//         badgeColor='bg-green-100 text-green-600'
//       />
//     </div>
//   )
// }
// function Section({
//   title,
//   items,
//   badgeColor,
// }: {
//   title: string
//   items: any[]
//   badgeColor: string
// }) {
//   return (
//     <Card className='rounded-xl bg-[#F9FAFB] p-6 shadow-sm'>
//       <div className='mb-6 flex items-center justify-between'>
//         <h3 className='font-antigua text-lg font-semibold'>{title}</h3>
//         <div className='flex items-center gap-2 text-sm text-muted-foreground'>
//           {items.length} items
//           <ChevronUp className='h-4 w-4' />
//         </div>
//       </div>
//       <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
//         {items.map((item, i) => (
//           <div
//             key={i}
//             className='overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md'
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className='h-44 w-full object-cover'
//             />
//             <div className='space-y-2 p-4'>
//               <p className='line-clamp-2 text-sm leading-snug font-medium'>
//                 {item.title}
//               </p>
//               <div className='flex items-center justify-between'>
//                 <span
//                   className={`rounded-full px-3 py-0.5 text-xs font-medium ${badgeColor}`}
//                 >
//                   {item.category}
//                 </span>
//                 <div className='flex items-center gap-1 text-sm font-medium text-red-600'>
//                   <Heart className='h-4 w-4 fill-red-600' />
//                   {item.count}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Card>
//   )
// }
// components/dashboard/WishlistOverview.tsx
import { Heart } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const sections = [
  {
    id: 'posts',
    title: 'Posts',
    badgeColor: 'bg-red-100 text-red-600',
    items: [
      {
        title: "10 Things to Do in Cartagena's Old Town",
        image: '/images/post1.jpg',
        count: 342,
      },
      {
        title: 'Complete Guide to Rosario Islands',
        image: '/images/post2.jpg',
        count: 287,
      },
      {
        title: 'Street Food Walking Tour Guide',
        image: '/images/post3.jpg',
        count: 198,
      },
      {
        title: 'Sunset Photography Spots in Cartagena',
        image: '/images/post4.jpg',
        count: 156,
      },
    ],
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    badgeColor: 'bg-green-100 text-green-600',
    items: [
      {
        title: 'Casa Colonial Centro - 5BR Historic Home',
        image: '/images/re1.jpg',
        count: 423,
      },
      {
        title: 'Penthouse Bocagrande with Ocean View',
        image: '/images/re2.jpg',
        count: 312,
      },
      {
        title: 'Villa Getsemaní - Modern Colonial Fusion',
        image: '/images/re3.jpg',
        count: 245,
      },
      {
        title: 'Apartment San Diego - 2BR Renovated',
        image: '/images/re4.jpg',
        count: 189,
      },
    ],
  },
  {
    id: 'gast',
    title: 'Gastronomy',
    badgeColor: 'bg-red-100 text-red-600',
    items: [
      {
        title: "10 Things to Do in Cartagena's Old Town",
        image: '/images/post1.jpg',
        count: 342,
      },
      {
        title: 'Complete Guide to Rosario Islands',
        image: '/images/post2.jpg',
        count: 287,
      },
      {
        title: 'Street Food Walking Tour Guide',
        image: '/images/post3.jpg',
        count: 198,
      },
      {
        title: 'Sunset Photography Spots in Cartagena',
        image: '/images/post4.jpg',
        count: 156,
      },
    ],
  },
  {
    id: 'accom',
    title: 'Accomodation',
    badgeColor: 'bg-green-100 text-green-600',
    items: [
      {
        title: 'Casa Colonial Centro - 5BR Historic Home',
        image: '/images/re1.jpg',
        count: 423,
      },
      {
        title: 'Penthouse Bocagrande with Ocean View',
        image: '/images/re2.jpg',
        count: 312,
      },
      {
        title: 'Villa Getsemaní - Modern Colonial Fusion',
        image: '/images/re3.jpg',
        count: 245,
      },
      {
        title: 'Apartment San Diego - 2BR Renovated',
        image: '/images/re4.jpg',
        count: 189,
      },
    ],
  },
  {
    id: 'pages',
    title: 'Pages',
    badgeColor: 'bg-red-100 text-red-600',
    items: [
      {
        title: "10 Things to Do in Cartagena's Old Town",
        image: '/images/post1.jpg',
        count: 342,
      },
      {
        title: 'Complete Guide to Rosario Islands',
        image: '/images/post2.jpg',
        count: 287,
      },
      {
        title: 'Street Food Walking Tour Guide',
        image: '/images/post3.jpg',
        count: 198,
      },
      {
        title: 'Sunset Photography Spots in Cartagena',
        image: '/images/post4.jpg',
        count: 156,
      },
    ],
  },
  {
    id: 'beaches',
    title: 'Beaches',
    badgeColor: 'bg-green-100 text-green-600',
    items: [
      {
        title: 'Casa Colonial Centro - 5BR Historic Home',
        image: '/images/re1.jpg',
        count: 423,
      },
      {
        title: 'Penthouse Bocagrande with Ocean View',
        image: '/images/re2.jpg',
        count: 312,
      },
      {
        title: 'Villa Getsemaní - Modern Colonial Fusion',
        image: '/images/re3.jpg',
        count: 245,
      },
      {
        title: 'Apartment San Diego - 2BR Renovated',
        image: '/images/re4.jpg',
        count: 189,
      },
    ],
  },
]

export function WishlistOverview() {
  return (
    <div className='my-10 space-y-6'>
      <div>
        <h2 className='font-antigua text-xl font-semibold'>
          Wishlist Overview
        </h2>
        <p className='text-sm text-muted-foreground'>
          Most popular items across all categories
        </p>
      </div>

      <Accordion type='multiple' defaultValue={['posts', 'realestate']}>
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className='mb-6 rounded-xl border-none bg-[#F9FAFB] px-6 py-4 shadow-sm'
          >
            <AccordionTrigger className='py-2 hover:no-underline'>
              <div className='flex w-full items-center justify-between pr-4'>
                <span className='font-antigua text-lg font-semibold'>
                  {section.title}
                </span>

                <span className='text-sm text-muted-foreground'>
                  {section.items.length} items
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className='pt-6'>
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className='overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-md'
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className='h-44 w-full object-cover'
                    />

                    <div className='space-y-2 p-4'>
                      <p className='line-clamp-2 text-sm leading-snug font-medium'>
                        {item.title}
                      </p>

                      <div className='flex items-center justify-between'>
                        <span
                          className={`rounded-full px-3 py-0.5 text-xs font-medium ${section.badgeColor}`}
                        >
                          {section.title}
                        </span>

                        <div className='flex items-center gap-1 text-sm font-medium text-red-600'>
                          <Heart className='h-4 w-4 fill-red-600' />
                          {item.count}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
