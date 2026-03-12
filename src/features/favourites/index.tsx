import { Heart, BookOpen, MapPin, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

const savedArticles = [
  {
    id: 1,
    title: 'Top 10 Hidden Gems in Barcelona',
    category: 'Travel',
    readTime: '5 min read',
    location: 'Barcelona, Spain',
    savedOn: 'Mar 8, 2026',
  },
  {
    id: 2,
    title: 'A Weekend Guide to the Amalfi Coast',
    category: 'Guides',
    readTime: '8 min read',
    location: 'Amalfi, Italy',
    savedOn: 'Mar 6, 2026',
  },
  {
    id: 3,
    title: 'Best Rooftop Restaurants in Dubai',
    category: 'Food & Drink',
    readTime: '4 min read',
    location: 'Dubai, UAE',
    savedOn: 'Mar 3, 2026',
  },
  {
    id: 4,
    title: 'Exploring the Temples of Kyoto',
    category: 'Culture',
    readTime: '6 min read',
    location: 'Kyoto, Japan',
    savedOn: 'Feb 28, 2026',
  },
  {
    id: 5,
    title: 'Safari Planning: Everything You Need to Know',
    category: 'Guides',
    readTime: '10 min read',
    location: 'Nairobi, Kenya',
    savedOn: 'Feb 25, 2026',
  },
  {
    id: 6,
    title: 'Luxury Stays in the Maldives',
    category: 'Hotels',
    readTime: '5 min read',
    location: 'Maldives',
    savedOn: 'Feb 20, 2026',
  },
]

export function FavouritesPage() {
  return (
    <>
      <Header />

      <Main>
        <div className='mb-6 flex h-20 items-center justify-between'>
          <div>
            <h1 className='font-antigua text-3xl font-bold tracking-tight'>
              Favourites
            </h1>
            <p className='text-xs text-muted-foreground'>
              Articles and stories you have saved.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary' className='gap-1'>
              <Heart className='h-3 w-3' />
              {savedArticles.length} saved
            </Badge>
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {savedArticles.map((article) => (
            <Card key={article.id} className='group cursor-pointer transition-shadow hover:shadow-md'>
              <CardHeader className='pb-2'>
                <div className='flex items-start justify-between gap-2'>
                  <Badge variant='outline' className='text-[10px]'>
                    {article.category}
                  </Badge>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7 shrink-0 text-[#CF9921] hover:text-[#CF9921]/80'
                  >
                    <Heart className='h-4 w-4 fill-current' />
                  </Button>
                </div>
                <h2 className='font-antigua pt-1 text-base font-semibold leading-snug tracking-tight'>
                  {article.title}
                </h2>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='flex flex-col gap-1.5 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-3 w-3' />
                    {article.location}
                  </div>
                  <div className='flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    {article.readTime}
                  </div>
                  <div className='flex items-center gap-1'>
                    <BookOpen className='h-3 w-3' />
                    Saved on {article.savedOn}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Main>
    </>
  )
}
