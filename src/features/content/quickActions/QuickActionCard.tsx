'use client'

import { useState } from 'react'
import {
  Bell,
  Plus,
  Search,
  Menu,
  X,
  ChevronRight,
  Calendar,
  Edit,
  Eye,
  ArrowRight,
  MoreVertical,
  Sparkles,
  ChartNoAxesGantt,
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

const quickActions = [
  {
    title: 'Create Article',
    type: 'City Guide',
    updated: 'Dec 28, 2024',
    icon: <Calendar size={40} className='h-5 w-5 rounded text-gold' />,
    color: 'bg-gold/20',
  },
  {
    title: 'Review Drafts',
    type: 'Itinerary',
    updated: 'Dec 20, 2024',
    icon: <ChartNoAxesGantt size={40} className='h-5 w-5 rounded text-gold' />,
    color: 'bg-green/20',
  },
  {
    title: 'Manage Categories',
    type: 'Experience',
    updated: 'Dec 15, 2024',
    icon: <Sparkles size={40} className='h-5 w-5 rounded text-gold' />,
    color: 'bg-red/20',
  },
  {
    title: 'Update Featured',
    type: 'City Guide',
    updated: 'Dec 5, 2024',
    icon: <Calendar size={40} className='h-5 w-5 rounded text-gold' />,
    color: 'bg-gold/20',
  },
  {
    title: 'Add Travel Tool',
    type: 'City Guide',
    updated: 'Dec 5, 2024',
    icon: <ChartNoAxesGantt size={40} className='h-5 w-5 rounded text-gold' />,
    color: 'bg-green/20',
  },
]

export default function QuickActionsCard() {
  return (
    <Card className='border-0 px-0 shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between px-0 pb-2'>
        <CardTitle className='font-antigua text-xl'>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className='px-0'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'>
          {quickActions.map((action, i) => (
            <Card
              key={i}
              className='group transition-color cursor-pointer p-0 shadow-xs duration-300 hover:bg-gradient-to-l hover:from-gold hover:to-gold-light'
            >
              <CardContent className='p-4'>
                <div
                  className={`w-fit rounded-lg bg-gold/20 p-2 backdrop-blur transition-colors group-hover:bg-white/20`}
                >
                  {action.icon}
                </div>

                <h3 className='font-antigua mt-2 text-sm font-normal transition-colors duration-300 group-hover:text-white'>
                  {action.title}
                </h3>

                <div className='flex justify-between'>
                  <p className='text-xs text-gray-500 transition-colors duration-300 group-hover:text-white'>
                    Updated {action.updated}
                  </p>
                </div>

                <div className='mt-3'>
                  <ArrowRight className='h-5 w-5 transition-colors duration-300 group-hover:text-white' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
