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

const travelTools = [
  {
    title: 'Cartagena City Guide',
    type: 'City Guide',
    updated: 'Dec 28, 2024',
    icon: <Calendar size={40} className='h-5 w-5 rounded text-gold' />,
    color: 'bg-gold/20',
  },
  {
    title: '5 Day Itinerary',
    type: 'Itinerary',
    updated: 'Dec 20, 2024',
    icon: <ChartNoAxesGantt size={40} className='h-5 w-5 rounded text-green' />,
    color: 'bg-green/20',
  },
  {
    title: 'Local Experiences',
    type: 'Experience',
    updated: 'Dec 15, 2024',
    icon: <Sparkles size={40} className='h-5 w-5 rounded text-red' />,
    color: 'bg-red/20',
  },
  {
    title: 'Weekend in Getsemani',
    type: 'City Guide',
    updated: 'Dec 5, 2024',
    icon: <Calendar size={40} className='h-5 w-5 rounded text-gold' />,
    color: 'bg-gold/20',
  },
  {
    title: 'Beach Day Planner',
    type: 'City Guide',
    updated: 'Dec 5, 2024',
    icon: <ChartNoAxesGantt size={40} className='h-5 w-5 rounded text-green' />,
    color: 'bg-green/20',
  },
  {
    title: 'Food Tours Guide',
    type: 'Experience',
    updated: 'Nov 30, 2024',
    icon: <Sparkles size={40} className='h-5 w-5 rounded text-red' />,
    color: 'bg-red/20',
  },
]

export default function TravelToolCard() {
  return (
    <Card className='border-0 px-0 shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between px-0 pb-2'>
        <CardTitle className='font-antigua text-xl'>Travel Tools</CardTitle>
        <Button variant='link' className='text-red/70'>
          View All →
        </Button>
      </CardHeader>
      <CardContent className='px-0'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {travelTools.map((tool, i) => (
            <Card key={i} className='shadow-xs transition-colors'>
              <CardContent className='space-y-3'>
                <div>
                  <div className={`w-fit rounded-lg p-2 ${tool.color}`}>
                    {tool.icon}
                  </div>
                  <h3 className='font-antigua my-2 text-sm font-normal'>
                    {tool.title}
                  </h3>
                  <div className='flex justify-between'>
                    {/* <p className={`text-sm ${tool.color} mt-1 rounded p-1`}>
                      {tool.type}
                    </p> */}
                    <Badge
                      className={cn(
                        'mt-1 rounded-full px-3 font-normal',
                        tool.type === 'City Guide' && 'bg-gold/20 text-gold',
                        tool.type === 'Itinerary' && 'bg-green/20 text-green',
                        tool.type === 'Experience' && 'bg-gold/20 text-gold'
                      )}
                    >
                      {tool.type}
                    </Badge>
                    <p className='mt-2 text-xs text-gray-500'>
                      Updated {tool.updated}
                    </p>
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
