'use client'

import { useState } from 'react'
import {
  Bell,
  Plus,
  Search,
  Menu,
  X,
  ChevronRight,
  Edit,
  Eye,
  MoreVertical,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const articles = [
  {
    title: 'The Hidden Courtyards of Getsemani',
    image: '/images/getsemani.jpg',
    category: 'Architecture',
    author: 'María Santos',
    status: 'Published',
    views: '3,420',
  },
  {
    title: "Cartagena's Best Cevicherías: A Local's Guide",
    image: '/images/ceviche.jpg',
    category: 'Food & Drink',
    author: 'Carlos Mendoza',
    status: 'Published',
    views: '2,891',
  },
  {
    title: 'Sunset Sessions: Rooftop Bars in the Old City',
    image: '/images/rooftop.jpg',
    category: 'Nightlife',
    author: 'Ana Lucia Reyes',
    status: 'Scheduled',
    views: '0',
  },
  {
    title: 'Artisan Markets of Cartagena',
    image: '/images/market.jpg',
    category: 'Shopping',
    author: 'Diego Herrera',
    status: 'Published',
    views: '1,567',
  },
]

export default function ArticleTable() {
  return (
    <Card>
      <CardHeader className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <CardTitle className='font-antigua text-xl'>Articles</CardTitle>
        <Button variant='link' className='self-start text-red sm:self-auto'>
          View All →
        </Button>
      </CardHeader>

      <CardContent className='px-5'>
        <div className='overflow-x-auto'>
          <Table className='min-w-[800px]'>
            <TableHeader className='hidden md:table-header-group'>
              <TableRow className='text-gray-600'>
                <TableHead className='w-[250px] text-gray-600'>
                  ARTICLE
                </TableHead>
                <TableHead className='text-gray-600'>CATEGORY</TableHead>
                <TableHead className='text-gray-600'>AUTHOR</TableHead>
                <TableHead className='text-gray-600'>STATUS</TableHead>
                <TableHead className='text-gray-600'>VIEWS</TableHead>
                <TableHead className='text-gray-600'>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {articles.map((article, i) => (
                <TableRow
                  key={i}
                  className='flex flex-col border-b text-gray-600 md:table-row'
                >
                  {/* ARTICLE */}
                  <TableCell className='flex items-center gap-3'>
                    <div className='h-12 w-12 overflow-hidden rounded-lg bg-gray-800' />
                    <div className='font-normal text-gray-800'>
                      {article.title}
                    </div>
                  </TableCell>

                  {/* Mobile Layout */}
                  <div className='flex flex-col gap-2 px-4 pb-4 text-sm md:hidden'>
                    <span>
                      <strong>Category:</strong> {article.category}
                    </span>
                    <span>
                      <strong>Author:</strong> {article.author}
                    </span>
                    <span className='flex items-center gap-2'>
                      <strong>Status:</strong>
                      <Badge
                        className={cn(
                          'rounded-full',
                          article.status === 'Published' &&
                            'bg-green/20 text-green',
                          article.status === 'Scheduled' &&
                            'bg-gold/20 text-gold'
                        )}
                      >
                        {article.status}
                      </Badge>
                    </span>
                    <span>
                      <strong>Views:</strong> {article.views}
                    </span>
                  </div>

                  {/* Desktop Only Cells */}
                  <TableCell className='hidden md:table-cell'>
                    {article.category}
                  </TableCell>

                  <TableCell className='hidden md:table-cell'>
                    {article.author}
                  </TableCell>

                  <TableCell className='hidden md:table-cell'>
                    <Badge
                      className={cn(
                        article.status === 'Published' &&
                          'bg-green/20 text-green',
                        article.status === 'Scheduled' && 'bg-gold/20 text-gold'
                      )}
                    >
                      {article.status}
                    </Badge>
                  </TableCell>

                  <TableCell className='hidden md:table-cell'>
                    {article.views}
                  </TableCell>

                  <TableCell className='flex justify-end gap-2 p-4 md:table-cell md:text-right'>
                    <Button variant='ghost' size='icon'>
                      <Eye className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon'>
                      <Edit className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    // <Card>
    //   <CardHeader className='flex flex-row items-center justify-between'>
    //     <CardTitle className='font-antigua text-xl'>Articles</CardTitle>
    //     <Button variant='link' className='text-red'>
    //       View All →
    //     </Button>
    //   </CardHeader>
    //   <CardContent>
    //     // Desktop Table
    //     <div className='hidden overflow-x-auto lg:block'>
    //       <Table>
    //         <TableHeader>
    //           <TableRow className='border-gray-800 text-gray-600'>
    //             <TableHead className='w-[300px] text-gray-600'>
    //               ARTICLE
    //             </TableHead>
    //             <TableHead className='text-gray-600'>CATEGORY</TableHead>
    //             <TableHead className='text-gray-600'>AUTHOR</TableHead>
    //             <TableHead className='text-gray-600'>STATUS</TableHead>
    //             <TableHead className='text-gray-600'>VIEWS</TableHead>
    //             <TableHead className='text-right text-gray-600'>
    //               ACTIONS
    //             </TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           {articles.map((article, i) => (
    //             <TableRow key={i} className='border-gray-800 text-gray-600'>
    //               <TableCell>
    //                 <div className='flex items-center gap-3'>
    //                   <div className='h-12 w-12 overflow-hidden rounded-lg bg-gray-800'></div>
    //                   <span className='font-normal text-gray-800'>
    //                     {article.title}
    //                   </span>
    //                 </div>
    //               </TableCell>
    //               <TableCell>{article.category}</TableCell>
    //               <TableCell>{article.author}</TableCell>
    //               <TableCell>
    //                 <Badge
    //                   variant={
    //                     article.status === 'Published' ? 'default' : 'secondary'
    //                   }
    //                   className={cn(
    //                     article.status === 'Published' &&
    //                       'bg-green/20 text-green hover:bg-green/20',
    //                     article.status === 'Scheduled' &&
    //                       'bg-gold/20 text-gold hover:bg-gold/20'
    //                   )}
    //                 >
    //                   {article.status}
    //                 </Badge>
    //               </TableCell>
    //               <TableCell>{article.views}</TableCell>
    //               <TableCell className='text-right'>
    //                 <div className='flex justify-end gap-2'>
    //                   <Button variant='ghost' size='icon'>
    //                     <Eye className='h-4 w-4' />
    //                   </Button>
    //                   <Button variant='ghost' size='icon'>
    //                     <Edit className='h-4 w-4' />
    //                   </Button>
    //                 </div>
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </div>
    //     // Mobile Cards
    //     <div className='space-y-4 lg:hidden'>
    //       {articles.map((article, i) => (
    //         <Card key={i}>
    //           <CardContent className='p-4'>
    //             <div className='flex gap-4'>
    //               <div className='h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-800'></div>
    //               <div className='min-w-0 flex-1'>
    //                 <h3 className='line-clamp-2 font-medium'>
    //                   {article.title}
    //                 </h3>
    //                 <p className='mt-1 text-sm text-gray-400'>
    //                   {article.category}
    //                 </p>
    //                 <div className='mt-2 flex items-center gap-4 text-sm text-gray-300'>
    //                   <span>{article.author}</span>
    //                   <Badge
    //                     variant={
    //                       article.status === 'Published'
    //                         ? 'default'
    //                         : 'secondary'
    //                     }
    //                     className={cn(
    //                       article.status === 'Published' && 'bg-green-600',
    //                       article.status === 'Scheduled' && 'bg-yellow-600'
    //                     )}
    //                   >
    //                     {article.status}
    //                   </Badge>
    //                 </div>
    //                 <div className='mt-3 flex items-center justify-between'>
    //                   <span className='text-sm text-gray-400'>
    //                     {article.views} views
    //                   </span>
    //                   <div className='flex gap-2'>
    //                     <Button variant='ghost' size='icon' className='h-8 w-8'>
    //                       <Eye className='h-4 w-4' />
    //                     </Button>
    //                     <Button variant='ghost' size='icon' className='h-8 w-8'>
    //                       <Edit className='h-4 w-4' />
    //                     </Button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>
    //   </CardContent>
    // </Card>
  )
}
