import { useState, useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  List,
  LayoutGrid,
  Clock,
} from 'lucide-react'
import moment from 'moment'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// ─── Types ───────────────────────────────────────────────────────────────────

export type CalendarEvent = {
  id: string
  title: string
  date: string // YYYY-MM-DD
  time?: string // HH:mm
  color?: string // hex color
  category?: string
}

type ViewMode = 'month' | 'week' | 'list'

interface CalendarGridProps {
  events: CalendarEvent[]
  currentMonth: Date
  onMonthChange: (date: Date) => void
}

// ─── Category color map ──────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Music: '#8B5CF6', // purple
  Art: '#3B82F6', // blue
  Food: '#10B981', // green
  Culture: '#F59E0B', // amber / gold
  Festivals: '#EF4444', // red
}

const FALLBACK_COLOR = '#94A3B8' // slate for unknown categories

function getCategoryColor(category?: string): string {
  if (!category) return FALLBACK_COLOR
  return CATEGORY_COLORS[category] || FALLBACK_COLOR
}

// ─── Category Legend ─────────────────────────────────────────────────────────

function CategoryLegend({ events }: { events: CalendarEvent[] }) {
  // Show all defined categories (in the order they appear in the map)
  const categories = Object.keys(CATEGORY_COLORS)
  return (
    <div className='flex flex-wrap items-center gap-x-5 gap-y-1 px-1'>
      {categories.map((cat) => (
        <div key={cat} className='flex items-center gap-1.5'>
          <span
            className='inline-block h-2.5 w-2.5 rounded-full'
            style={{ backgroundColor: CATEGORY_COLORS[cat] }}
          />
          <span className='text-xs font-medium text-muted-foreground'>
            {cat}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function CalendarGrid({
  events,
  currentMonth,
  onMonthChange,
}: CalendarGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('month')
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)

  // ── Navigation ─────────────────────────────────────────────────────────────

  const goPrev = () => {
    if (viewMode === 'week') {
      onMonthChange(moment(currentMonth).subtract(1, 'week').toDate())
    } else {
      onMonthChange(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      )
    }
  }

  const goNext = () => {
    if (viewMode === 'week') {
      onMonthChange(moment(currentMonth).add(1, 'week').toDate())
    } else {
      onMonthChange(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      )
    }
  }

  const goToday = () => onMonthChange(new Date())

  // ── Generate days ──────────────────────────────────────────────────────────

  type DayInfo = {
    date: moment.Moment
    dateKey: string
    dayNumber: number
    isCurrentMonth: boolean
    isToday: boolean
  }

  const monthDays = useMemo<DayInfo[]>(() => {
    const start = moment(currentMonth).startOf('month').startOf('week')
    const end = moment(currentMonth).endOf('month').endOf('week')
    const days: DayInfo[] = []
    const d = start.clone()
    while (d.isSameOrBefore(end)) {
      days.push({
        date: d.clone(),
        dateKey: d.format('YYYY-MM-DD'),
        dayNumber: d.date(),
        isCurrentMonth: d.month() === moment(currentMonth).month(),
        isToday: d.isSame(moment(), 'day'),
      })
      d.add(1, 'day')
    }
    return days
  }, [currentMonth])

  const weekDays = useMemo<DayInfo[]>(() => {
    const start = moment(currentMonth).startOf('week')
    const days: DayInfo[] = []
    for (let i = 0; i < 7; i++) {
      const d = start.clone().add(i, 'day')
      days.push({
        date: d,
        dateKey: d.format('YYYY-MM-DD'),
        dayNumber: d.date(),
        isCurrentMonth: d.month() === moment(currentMonth).month(),
        isToday: d.isSame(moment(), 'day'),
      })
    }
    return days
  }, [currentMonth])

  // ── Event helpers ──────────────────────────────────────────────────────────

  const eventsForDate = (dateKey: string) =>
    events.filter((e) => e.date === dateKey)

  // Events in the visible range for list view
  const listEvents = useMemo(() => {
    const start = moment(currentMonth).startOf('month')
    const end = moment(currentMonth).endOf('month')
    return events
      .filter((e) => {
        const d = moment(e.date)
        return d.isSameOrAfter(start, 'day') && d.isSameOrBefore(end, 'day')
      })
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [events, currentMonth])

  // ── Header label ───────────────────────────────────────────────────────────

  const headerLabel =
    viewMode === 'week'
      ? `${moment(currentMonth).startOf('week').format('MMM D')} – ${moment(currentMonth).endOf('week').format('MMM D, YYYY')}`
      : moment(currentMonth).format('MMMM YYYY')

  const WEEK_HEADER = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className='space-y-4'>
      {/* ── Toolbar ──────────────────────────────────── */}

      {/* ── Month View ───────────────────────────────── */}
      {viewMode === 'month' && (
        <Card>
          <div className='flex flex-col gap-3 px-3 sm:flex-row sm:items-center sm:justify-between'>
            {/* Left: navigation */}
            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='icon'
                onClick={goPrev}
                // className='h-8 w-8'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <h2 className='font-antigua min-w-[180px] text-center text-lg font-semibold tracking-tight sm:text-xl'>
                {headerLabel}
              </h2>
              <Button
                variant='ghost'
                size='icon'
                onClick={goNext}
                // className='h-8 w-8'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
              {/* <Button
                variant='outline'
                size='sm'
                onClick={goToday}
                className='ml-1 text-xs'
              >
                Today
              </Button> */}
            </div>

            {/* Right: view toggle */}
            <div className='flex items-center rounded-lg border bg-accent p-0.5'>
              {(
                [
                  {
                    mode: 'month' as ViewMode,
                    icon: LayoutGrid,
                    label: 'Month',
                  },
                  {
                    mode: 'week' as ViewMode,
                    icon: CalendarIcon,
                    label: 'Week',
                  },
                  { mode: 'list' as ViewMode, icon: List, label: 'List' },
                ] as const
              ).map(({ mode, icon: Icon, label }) => (
                <Button
                  key={mode}
                  variant={'ghost'}
                  size='sm'
                  className={cn(
                    'gap-1.5 rounded-md text-xs text-muted-foreground',
                    viewMode === mode && 'bg-white text-black hover:bg-white'
                  )}
                  onClick={() => setViewMode(mode)}
                >
                  <Icon className='h-3.5 w-3.5' />
                  <span className='hidden sm:inline'>{label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Category legend */}
          <div className='px-4 pt-2'>
            <CategoryLegend events={events} />
          </div>

          <CardContent className='px-2 pb-2 sm:px-4 sm:pb-4'>
            {/* Week header */}
            <div className='grid grid-cols-7 rounded-t-lg bg-accent'>
              {WEEK_HEADER.map((d) => (
                <div
                  key={d}
                  className='p-2 text-center text-[11px] font-semibold tracking-wider text-muted-foreground uppercase'
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className='grid grid-cols-7 gap-px overflow-hidden rounded-b-lg border bg-border'>
              {monthDays.map((day) => {
                const dayEvents = eventsForDate(day.dateKey)
                return (
                  <div
                    key={day.dateKey}
                    className={cn(
                      'min-h-[50px] bg-background p-1.5 transition-colors sm:min-h-[70px] sm:p-2',
                      !day.isCurrentMonth && 'text-background',
                      // day.isToday && 'bg-blue-50/50 dark:bg-blue-950/20',
                      hoveredDate === day.dateKey &&
                        day.isCurrentMonth &&
                        'bg-muted/40'
                    )}
                    onMouseEnter={() => setHoveredDate(day.dateKey)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    {/* Day number */}
                    <div className='mb-1 flex items-center justify-between'>
                      <span
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                          day.isToday &&
                            'bg-gradient-to-r from-gold to-gold-light text-white dark:bg-blue-500'
                        )}
                      >
                        {day.dayNumber}
                      </span>
                      {day.isCurrentMonth && dayEvents.length > 0 && (
                        <span className='text-[10px] text-muted-foreground'>
                          {dayEvents.length}
                        </span>
                      )}
                    </div>

                    {/* Events */}
                    {day.isCurrentMonth && (
                      <div className='space-y-0.5'>
                        {dayEvents.slice(0, 2).map((event) => {
                          const color = getCategoryColor(event.category)
                          return (
                            <div
                              key={event.id}
                              className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] leading-tight font-medium sm:text-xs border-[${color}]`}
                              style={{
                                backgroundColor: color + '18',
                                borderColor: color,
                                borderWidth: '1px',
                                color: color,
                              }}
                              title={`${event.title}${event.time ? ` at ${event.time}` : ''}`}
                            >
                              <span
                                className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full`}
                                style={{ backgroundColor: color }}
                              />
                              <span className='truncate'>{event.title}</span>
                            </div>
                          )
                        })}
                        {dayEvents.length > 2 && (
                          <span className='pl-1 text-[10px] text-muted-foreground'>
                            +{dayEvents.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Week View ────────────────────────────────── */}
      {viewMode === 'week' && (
        <Card>
          <div className='flex flex-col gap-3 px-3 sm:flex-row sm:items-center sm:justify-between'>
            {/* Left: navigation */}
            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='icon'
                onClick={goPrev}
                // className='h-8 w-8'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <h2 className='font-antigua min-w-[180px] text-center text-lg font-semibold tracking-tight sm:text-xl'>
                {headerLabel}
              </h2>
              <Button
                variant='ghost'
                size='icon'
                onClick={goNext}
                // className='h-8 w-8'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
              {/* <Button
                variant='outline'
                size='sm'
                onClick={goToday}
                className='ml-1 text-xs'
              >
                Today
              </Button> */}
            </div>

            {/* Right: view toggle */}
            <div className='flex items-center rounded-lg border bg-accent p-0.5'>
              {(
                [
                  {
                    mode: 'month' as ViewMode,
                    icon: LayoutGrid,
                    label: 'Month',
                  },
                  {
                    mode: 'week' as ViewMode,
                    icon: CalendarIcon,
                    label: 'Week',
                  },
                  { mode: 'list' as ViewMode, icon: List, label: 'List' },
                ] as const
              ).map(({ mode, icon: Icon, label }) => (
                <Button
                  key={mode}
                  variant={'ghost'}
                  size='sm'
                  className={cn(
                    'gap-1.5 rounded-md text-xs text-muted-foreground',
                    viewMode === mode && 'bg-white text-black hover:bg-white'
                  )}
                  onClick={() => setViewMode(mode)}
                >
                  <Icon className='h-3.5 w-3.5' />
                  <span className='hidden sm:inline'>{label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Category legend */}
          <div className='px-4 pt-2'>
            <CategoryLegend events={events} />
          </div>

          <CardContent className='p-2 sm:p-4'>
            <div className='grid grid-cols-7 gap-px overflow-hidden rounded-lg border bg-border'>
              {weekDays.map((day) => {
                const dayEvents = eventsForDate(day.dateKey)
                return (
                  <div
                    key={day.dateKey}
                    className={cn(
                      'min-h-[200px] bg-background p-2 sm:min-h-[280px]',
                      day.isToday && 'bg-blue-50/50 dark:bg-blue-950/20'
                    )}
                  >
                    {/* Header */}
                    <div className='mb-2 text-center'>
                      <p className='text-[10px] font-semibold tracking-wider text-muted-foreground uppercase'>
                        {day.date.format('ddd')}
                      </p>
                      <p
                        className={cn(
                          'mx-auto mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                          day.isToday &&
                            'bg-gradient-to-r from-gold to-gold-light text-white dark:bg-blue-500'
                        )}
                      >
                        {day.dayNumber}
                      </p>
                    </div>

                    {/* Events stacked */}
                    <div className='space-y-1'>
                      {dayEvents.map((event) => {
                        const color = getCategoryColor(event.category)
                        return (
                          <div
                            key={event.id}
                            className='flex items-start gap-1.5 rounded-md px-2 py-1.5 text-[11px] leading-tight font-medium'
                            style={{
                              backgroundColor: color + '18',
                              color: color,
                            }}
                          >
                            <span
                              className='mt-1 inline-block h-2 w-2 shrink-0 rounded-full'
                              style={{ backgroundColor: color }}
                            />
                            <div>
                              {event.time && (
                                <span className='mb-0.5 block text-[9px] opacity-70'>
                                  {event.time}
                                </span>
                              )}
                              {event.title}
                            </div>
                          </div>
                        )
                      })}
                      {dayEvents.length === 0 && (
                        <p className='pt-4 text-center text-[10px] text-muted-foreground/40'>
                          No events
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── List View ────────────────────────────────── */}
      {viewMode === 'list' && (
        <Card>
          <div className='flex flex-col gap-3 px-3 sm:flex-row sm:items-center sm:justify-between'>
            {/* Left: navigation */}
            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='icon'
                onClick={goPrev}
                // className='h-8 w-8'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <h2 className='font-antigua min-w-[180px] text-center text-lg font-semibold tracking-tight sm:text-xl'>
                {headerLabel}
              </h2>
              <Button
                variant='ghost'
                size='icon'
                onClick={goNext}
                // className='h-8 w-8'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
              {/* <Button
                variant='outline'
                size='sm'
                onClick={goToday}
                className='ml-1 text-xs'
              >
                Today
              </Button> */}
            </div>

            {/* Right: view toggle */}
            <div className='flex items-center rounded-lg border bg-accent p-0.5'>
              {(
                [
                  {
                    mode: 'month' as ViewMode,
                    icon: LayoutGrid,
                    label: 'Month',
                  },
                  {
                    mode: 'week' as ViewMode,
                    icon: CalendarIcon,
                    label: 'Week',
                  },
                  { mode: 'list' as ViewMode, icon: List, label: 'List' },
                ] as const
              ).map(({ mode, icon: Icon, label }) => (
                <Button
                  key={mode}
                  variant={'ghost'}
                  size='sm'
                  className={cn(
                    'gap-1.5 rounded-md text-xs text-muted-foreground',
                    viewMode === mode && 'bg-white text-black hover:bg-white'
                  )}
                  onClick={() => setViewMode(mode)}
                >
                  <Icon className='h-3.5 w-3.5' />
                  <span className='hidden sm:inline'>{label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Category legend */}
          <div className='px-4 pt-2'>
            <CategoryLegend events={events} />
          </div>

          <CardContent className='p-4 sm:p-6'>
            {listEvents.length === 0 ? (
              <div className='flex flex-col items-center gap-2 py-12 text-muted-foreground'>
                <CalendarIcon className='h-8 w-8 opacity-30' />
                <p className='text-sm'>No events this month</p>
              </div>
            ) : (
              <div className='space-y-2'>
                {listEvents.map((event) => {
                  const color = getCategoryColor(event.category)
                  const eventDate = moment(event.date)
                  return (
                    <div
                      key={event.id}
                      className='flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/30'
                      style={{ borderLeftColor: color, borderLeftWidth: 3 }}
                    >
                      {/* Date badge */}
                      <div className='flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-muted/40'>
                        <span className='text-[10px] font-semibold text-muted-foreground uppercase'>
                          {eventDate.format('MMM')}
                        </span>
                        <span className='text-lg leading-tight font-bold'>
                          {eventDate.format('D')}
                        </span>
                      </div>

                      {/* Details */}
                      <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-medium'>
                          {event.title}
                        </p>
                        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                          <span>{eventDate.format('dddd')}</span>
                          {event.time && (
                            <>
                              <span>·</span>
                              <span className='flex items-center gap-1'>
                                <Clock className='h-3 w-3' />
                                {event.time}
                              </span>
                            </>
                          )}
                          {event.category && (
                            <>
                              <span>·</span>
                              <Badge variant='outline' className='text-[10px]'>
                                {event.category}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Color dot */}
                      <div
                        className='h-3 w-3 shrink-0 rounded-full'
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
