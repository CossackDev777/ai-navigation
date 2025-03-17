/* eslint-disable react/button-has-type */
import type { ButtonProps } from '@/components/ui/button'

import { buttonVariants } from '@/components/ui/button'
import { cn } from 'src/utilities/cn'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    role="navigation"
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul className={cn('flex flex-row items-center gap-1 md:gap-2', className)} ref={ref} {...props} />
  ),
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li className={cn('', className)} ref={ref} {...props} />,
)
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'button'>

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        size,
        variant: isActive ? 'outline' : 'ghost',
      }),
      pagNavClass,
      isActive ? 'border-transparent text-slate-400' : 'hover:text-primary hover:border-primary',
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'
const pagNavClass = 'bg-white p-0 w-10 h-10 border border-border rounded-full flex items-center justify-center'
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn('pgn__nav pgn__nav_prev', pagNavClass, className)}
    size="default"
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    {/* <span className="pgn__nav pgn__nav_prev">前へ</span> */}
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn('pgn__nav pgn__nav_next', pagNavClass, className)}
    size="default"
    {...props}
  >
    {/* <span className="pgn__next">Next</span> */}
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only pgn__nav_readmore">もっと見る</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
