'use client'

import { useState } from 'react'
import {
  Bell,
  Plus,
  Search,
  Menu,
  X,
  ChevronRight,
  NotebookPen,
  Edit,
  ArrowRight,
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

const categories = [
  { letter: 'A', name: 'Activities', count: 42, color: 'yellow' },
  { letter: 'A', name: 'Accommodations', count: 38, color: 'red' },
  { letter: 'B', name: 'Beaches', count: 24, color: 'purple' },
  { letter: 'B', name: 'Boating', count: 19, color: 'green' },
  { letter: 'R', name: 'Real Estate', count: 31, color: 'blue' },
  { letter: 'G', name: 'Gastronomy', count: 27, color: 'gray' },
]

export default function CategoryCard() {
  return (
    <Card className='border-0 px-0 shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between px-0 pb-2'>
        <CardTitle className='font-antigua text-xl'>Categories</CardTitle>
        <div className='flex gap-3'>
          <Button
            variant='outline'
            size='sm'
            className='border font-normal text-muted-foreground'
          >
            + Add Category
          </Button>
          <Button
            className='flex items-center justify-center bg-gradient-to-r from-gold to-gold-light font-normal text-white'
            variant='outline'
            size='sm'
          >
            Reorder <ArrowRight />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='px-0'>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
          {categories.map((cat, i) => (
            <Card key={i} className='py-5'>
              <CardContent className='space-y-2 px-3'>
                <span
                  className={`h-min w-fit text-lg font-semibold bg-${cat.color}-100 rounded-lg px-3 py-2 text-black`}
                >
                  {cat.letter}
                </span>
                <h3 className='font-antigua mt-3 mb-0 pb-0 font-bold'>
                  {cat.name}
                </h3>
                <p className='text-sm text-gray-400'>{cat.count} articles</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
