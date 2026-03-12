import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <span className={cn(
    'inline-flex rounded-full p-[1px] transition-all',
    // 'data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-gold data-[state=checked]:to-gold-light',
    // 'data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
    // 'data-[state=unchecked]:border-l-input data-[state=unchecked]:pl-px data-[state=unchecked]:bg-l-input dark:data-[state=unchecked]:bg-input/80',
  )}
  // forward the data-state from props so the span reacts too
  data-state={props.checked ? 'checked' : 'unchecked'}
  >
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full shadow-xs transition-all outline-none data-[state=unchecked]:pl-px',
        // 'border border-input',
        // 'data-[state=checked]:[border-image:linear-gradient(to_bottom,theme(colors.gold.DEFAULT),theme(colors.gold.light))_1] data-[state=unchecked]:border-input',
        // 'data-[state=checked]:border-t-gold data-[state=checked]:border-b-gold-light data-[state=checked]:border-x-linear-to-b data-[state=checked]:from-gold data-[state=checked]:to-gold-light data-[state=unchecked]:border-input',
        // 'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-gold data-[state=checked]:to-gold-light',
        'data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground'
        )}
      />
    </SwitchPrimitive.Root>
    </span>
  )
}

export { Switch }
