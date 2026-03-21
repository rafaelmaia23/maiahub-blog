import { cn } from '@/lib/utils'
import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
  className?: string
  onPageChange?: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  className,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <nav
      className={cn('bg-card flex items-center justify-center gap-0 rounded-sm', className)}
      aria-label="Paginação"
    >
      <PaginationItem
        href={!onPageChange && hasPrev ? `${basePath}/page/${currentPage - 1}` : undefined}
        disabled={!hasPrev}
        onClick={onPageChange && hasPrev ? () => onPageChange(currentPage - 1) : undefined}
      >
        {'< ANT'}
      </PaginationItem>

      {pages.map((page) => (
        <PaginationItem
          key={page}
          href={!onPageChange && page !== currentPage ? `${basePath}/page/${page}` : undefined}
          active={page === currentPage}
          onClick={onPageChange && page !== currentPage ? () => onPageChange(page) : undefined}
        >
          {page}
        </PaginationItem>
      ))}

      <PaginationItem
        href={!onPageChange && hasNext ? `${basePath}/page/${currentPage + 1}` : undefined}
        disabled={!hasNext}
        onClick={onPageChange && hasNext ? () => onPageChange(currentPage + 1) : undefined}
      >
        {'PRÓX >'}
      </PaginationItem>
    </nav>
  )
}

interface PaginationItemProps {
  href?: string
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

function PaginationItem({ href, active, disabled, children, onClick }: PaginationItemProps) {
  const classes = cn(
    'inline-flex items-center px-4 py-2.5 font-body text-xs font-semibold transition-colors',
    active && 'bg-accent-green text-[#0D0D0D]',
    !active && !disabled && 'text-text-secondary hover:text-accent-green',
    disabled && 'cursor-default text-text-muted'
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    )
  }

  if (!href || disabled) {
    return (
      <span className={classes} aria-disabled={disabled}>
        {children}
      </span>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
