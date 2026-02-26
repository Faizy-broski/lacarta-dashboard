'use client'

import { useState } from 'react'
import {
  Bell,
  Plus,
  Search,
  Menu,
  X,
  ChevronRight,
  FilePen,
  NotebookPen,
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

const drafts = [
  {
    title: 'Weekend Getaways from Cartagena',
    status: 'Needs Review',
    author: 'María Santos',
    time: '2 hours ago',
  },
  {
    title: 'The Complete Guide to Islas del Rosario',
    status: 'In Progress',
    author: 'Carlos Mendoza',
    time: 'Yesterday',
  },
  {
    title: 'Street Art Walking Tour',
    status: 'Needs Review',
    author: 'Ana Lucia Reyes',
    time: '3 days ago',
  },
  {
    title: 'Best Coffee Shops for Digital Nomads',
    status: 'In Progress',
    author: 'Diego Herrera',
    time: '1 week ago',
  },
]

export default function DraftCard() {
  return (
    <Card className='mt-5 border-0 p-0 shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between px-0'>
        <CardTitle className='font-antigua text-xl'>Drafts</CardTitle>
        <Button variant='link' className='text-amber-400'>
          View All →
        </Button>
      </CardHeader>
      <CardContent className='px-0'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
          {drafts.map((draft, i) => (
            <Card key={i}>
              <CardHeader className='mb-0 pb-0'>
                <div className='mb-0 flex items-center justify-between pb-0'>
                  <div className='rounded-lg bg-gold/20 p-2'>
                    <FilePen className='h-5 w-5 text-gold' />
                  </div>
                  <div>
                    <Badge
                      variant='outline'
                      className={cn(
                        'rounded-full px-2 text-red-600',
                        draft.status === 'Needs Review'
                          ? 'bg-red/10 text-red/80'
                          : 'bg-green/10 text-green/80'
                      )}
                    >
                      {draft.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='mt-0 pt-0'>
                <div className='mt-0 flex items-start justify-between pt-0'>
                  <div>
                    <h3 className='text-md'>{draft.title}</h3>
                    <p className='mt-1 text-xs text-gray-400'>
                      {draft.author} • {draft.time}
                    </p>
                  </div>
                </div>
                <Button className='mt-3 w-full bg-gradient-to-r from-green to-green-light hover:bg-green-800'>
                  Continue Editing
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
