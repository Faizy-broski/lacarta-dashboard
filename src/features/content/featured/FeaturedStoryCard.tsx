'use client'

import { useState } from 'react'
import {
  Bell,
  Plus,
  Search,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  NotebookPen,
  Edit,
  Eye,
  MoreVertical,
} from 'lucide-react'
import img from '@/assets/images/featured.png'
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

const featuredStories = [
  {
    title: "Cartagena's Colonial Architecture: A Walking Tour",
    image: '/images/colonial.jpg',
    position: 1,
    featured: true,
  },
  {
    title: 'The Best Seafood Restaurants in the Walled City',
    image: '/images/seafood.jpg',
    position: 2,
    featured: true,
  },
  {
    title: 'Sunset at Café del Mar: The Ultimate Guide',
    image: '/images/sunset.jpg',
    position: 3,
    featured: true,
  },
  {
    title: 'Hidden Beaches of the Rosario Islands',
    image: '/images/rosario.jpg',
    position: 4,
    featured: false,
  },
]

export default function FeaturedStoryCard() {
  return (
    <Card className='mt-5 border-0 px-0 shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between px-0 pb-2'>
        <CardTitle className='font-antigua text-xl'>Featured Stories</CardTitle>
        <Button variant='link' className='text-amber-400'>
          Manage All <ArrowRight />
        </Button>
      </CardHeader>
      <CardContent className='px-0'>
        {/* <div className='grid grid-cols-1 gap-3 overflow-hidden sm:grid-cols-2 lg:grid-cols-3'> */}
        <div className='flex gap-3 overflow-x-auto pb-2'>
          {featuredStories.map((story, i) => (
            <Card key={i} className='min-w-[280px] overflow-hidden p-0'>
              <div className='relative aspect-[3.5/1.5] w-full bg-gray-100'>
                {/* <img src={story.image} alt={story.title} className="absolute inset-0 w-full h-full object-cover" /> */}
              </div>
              <CardContent className='px-2 pb-3'>
                <h3 className='mb-3 text-xs font-semibold'>{story.title}</h3>
                <div className='flex items-center justify-between'>
                  <div className='text-sm text-muted-foreground'>
                    Position #{story.position}
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-muted-foreground'>
                      Featured
                    </span>
                    <Switch checked={story.featured} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
