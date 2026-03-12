import { Download, FileText, Map, BookOpen, Camera, Bookmark } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

const resources = [
  {
    id: 1,
    title: 'Ultimate Travel Packing Checklist',
    type: 'PDF',
    size: '1.2 MB',
    category: 'Travel Tools',
    icon: FileText,
    downloads: 4820,
  },
  {
    id: 2,
    title: 'Europe City Guides Bundle',
    type: 'PDF',
    size: '8.4 MB',
    category: 'Guides',
    icon: Map,
    downloads: 3210,
  },
  {
    id: 3,
    title: 'Restaurant Discovery Handbook',
    type: 'PDF',
    size: '3.1 MB',
    category: 'Food & Drink',
    icon: BookOpen,
    downloads: 2650,
  },
  {
    id: 4,
    title: 'Photography Spots: Top 50 Locations',
    type: 'PDF',
    size: '5.7 MB',
    category: 'Photography',
    icon: Camera,
    downloads: 1980,
  },
  {
    id: 5,
    title: 'Budget Travel Planner Template',
    type: 'PDF',
    size: '0.8 MB',
    category: 'Planning',
    icon: Bookmark,
    downloads: 6100,
  },
  {
    id: 6,
    title: 'Asia Travel Essentials Guide',
    type: 'PDF',
    size: '4.3 MB',
    category: 'Guides',
    icon: Map,
    downloads: 2940,
  },
]

export function ResourcesPage() {
  return (
    <>
      <Header />

      <Main>
        <div className='mb-6 flex h-20 items-center justify-between'>
          <div>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>
              Resources
            </h1>
            <p className='text-xs text-muted-foreground'>
              Download guides, planners and travel tools.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary' className='gap-1'>
              <Download className='h-3 w-3' />
              {resources.length} available
            </Badge>
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <Card key={resource.id} className='group cursor-pointer transition-shadow hover:shadow-md'>
                <CardHeader className='pb-2'>
                  <div className='flex items-start justify-between gap-2'>
                    <div className='flex items-center gap-2'>
                      <div className='rounded-lg bg-[#CF9921]/10 p-2'>
                        <Icon className='h-4 w-4 text-[#CF9921]' />
                      </div>
                      <Badge variant='outline' className='text-[10px]'>
                        {resource.category}
                      </Badge>
                    </div>
                    <span className='text-[10px] text-muted-foreground'>
                      {resource.size}
                    </span>
                  </div>
                  <h2 className='font-antigua pt-2 text-base font-semibold leading-snug tracking-tight'>
                    {resource.title}
                  </h2>
                </CardHeader>
                <CardContent className='pt-0'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-muted-foreground'>
                      {resource.downloads.toLocaleString()} downloads
                    </span>
                    <Button
                      size='sm'
                      className='h-7 gap-1.5 bg-[#CF9921] px-3 text-xs text-white hover:bg-[#CF9921]/90'
                    >
                      <Download className='h-3 w-3' />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Main>
    </>
  )
}
