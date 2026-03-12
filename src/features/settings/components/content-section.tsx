import { Separator } from '@/components/ui/separator'

type ContentSectionProps = {
  title: string
  desc: string
  separator?: boolean
  children: React.JSX.Element
}

export function ContentSection({ title, desc, children, separator=true }: ContentSectionProps) {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex-none'>
        <h3 className='text-lg font-medium font-antigua'>{title}</h3>
        <p className='text-sm text-muted-foreground'>{desc}</p>
      </div>
      {separator && (
        <Separator className='my-4 flex-none' />

      )}
      <div className='h-full w-full overflow-y-auto scroll-smooth pe-4 pb-12'>
        {/* <div className='-mx-1 px-1.5 lg:max-w-xl'>{children}</div> */}
        <div className='-mx-1 px-1.5'>{children}</div>
      </div>
    </div>
  )
}
