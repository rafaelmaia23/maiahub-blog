import { cn } from '@/lib/utils'
import { getCategoryConfig } from '@/data/categories'

interface CategoryBadgeProps {
  category: string
  className?: string
  onClick?: () => void
}

export function CategoryBadge({ category, className, onClick }: CategoryBadgeProps) {
  const config = getCategoryConfig(category)
  const classes = cn(
    'font-body inline-block rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase',
    config.color,
    onClick && 'cursor-pointer',
    className
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {config.label}
      </button>
    )
  }
  return <span className={classes}>{config.label}</span>
}
