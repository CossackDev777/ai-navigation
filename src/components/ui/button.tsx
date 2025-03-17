import { cn } from 'src/utilities/cn'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const bfafCls = 'relative overflow-hidden before:-z-[1] after:-z-[2] before:absolute after:absolute before:inset-0 after:inset-0 before:left-0 before:top-0 after:left-0 after:top-0 before:size-full after:size-full'
const gradientCls =`text-primary-foreground before:content-[''] after:conent-[''] before:bg-gradient-to-bl after:bg-gradient-to-bl before:from-primary before:to-third ${bfafCls} hover:before:opacity-0 after:from-secondary after:to-primary`
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2 text-sm',
        icon: 'h-10 w-10 text-sm',
        lg: 'h-11 rounded px-8 text-sm',
        xl: 'h-14 rounded px-10 text-btn-xl',
        sm: 'h-9 rounded px-3 text-sm',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-full btn__primary',
        primaryex: `rounded-full btn__primaryex ${gradientCls}`,
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
