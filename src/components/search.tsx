import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-provider'
import { Button } from './ui/button'

type SearchProps = {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export function Search({
  className = '',
  placeholder = 'Search articles, users, compaigns...',
}: SearchProps) {
  const { setOpen } = useSearch()
  return (
    <>
      {/* 📱 Mobile – Icon Only */}
      <button
        onClick={() => setOpen(true)}
        className='p-2 md:hidden'
        aria-label='Open search'
      >
        <SearchIcon size={20} />
      </button>

      {/* 💻 Desktop – Full Search Button */}
      <Button
        variant='outline'
        onClick={() => setOpen(true)}
        className={cn(
          'group relative hidden h-8 w-full min-w-0 flex-1 justify-start rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-accent md:flex',
          className
        )}
      >
        <SearchIcon
          aria-hidden='true'
          className='absolute start-1.5 top-1/2 -translate-y-1/2'
          size={16}
        />
        <span className='ms-4 truncate'>{placeholder}</span>

        <kbd className='pointer-events-none absolute end-[0.3rem] top-[0.3rem] hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium select-none group-hover:bg-accent sm:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </Button>
    </>
    // <Button
    //   variant='outline'
    //   className={cn(
    //     'group relative h-8 w-8 justify-center rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-accent sm:w-full sm:flex-1 sm:justify-start',
    //     className
    //   )}
    //   onClick={() => setOpen(true)}
    // >
    //   <SearchIcon
    //     aria-hidden='true'
    //     className='sm:absolute sm:start-1.5 sm:top-1/2 sm:-translate-y-1/2'
    //     size={16}
    //   />

    //   {/* Hide text on mobile */}
    //   <span className='hidden truncate sm:ms-4 sm:block'>{placeholder}</span>

    //   {/* Hide shortcut on mobile */}
    //   <kbd className='pointer-events-none absolute end-[0.3rem] top-[0.3rem] hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none group-hover:bg-accent sm:flex'>
    //     <span className='text-xs'>⌘</span>K
    //   </kbd>
    // </Button>

    // <Button
    //   variant='outline'
    //   className={cn(
    //     'group relative h-8 w-full min-w-0 flex-1 justify-start rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-accent',
    //     className
    //   )}
    //   onClick={() => setOpen(true)}
    // >
    //   <SearchIcon
    //     aria-hidden='true'
    //     // className='absolute start-1.5 top-1/2 -translate-y-1/2'
    //     className='sm:absolute sm:start-1.5 sm:top-1/2 sm:-translate-y-1/2'
    //     size={16}
    //   />
    //   {/* <span className='ms-4 truncate'>{placeholder}</span> */}
    //   <span className='hidden truncate sm:ms-4 sm:block'>{placeholder}</span>
    //   <kbd className='pointer-events-none absolute end-[0.3rem] top-[0.3rem] hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none group-hover:bg-accent sm:flex'>
    //     <span className='text-xs'>⌘</span>K
    //   </kbd>
    // </Button>
  )
}

// import { SearchIcon } from 'lucide-react'
// import { cn } from '@/lib/utils'
// import { useSearch } from '@/context/search-provider'
// import { Button } from './ui/button'

// type SearchProps = {
//   className?: string
//   type?: React.HTMLInputTypeAttribute
//   placeholder?: string
// }

// export function Search({
//   className = '',
//   placeholder = 'Search articles, users, compaigns',
// }: SearchProps) {
//   const { setOpen } = useSearch()
//   return (
//     <Button
//       variant='outline'
//       className={cn(
//         'group relative h-8 w-full flex-1 justify-start rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-accent sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64',
//         className
//       )}
//       onClick={() => setOpen(true)}
//     >
//       <SearchIcon
//         aria-hidden='true'
//         className='absolute start-1.5 top-1/2 -translate-y-1/2'
//         size={16}
//       />
//       <span className='ms-4'>{placeholder}</span>
//       {/* <kbd className='pointer-events-none absolute end-[0.3rem] top-[0.3rem] hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none group-hover:bg-accent sm:flex'>
//         <span className='text-xs'>⌘</span>K
//       </kbd> */}
//     </Button>
//   )
// }
