import { cn } from '@/lib/utils'

interface TagProps {
  text: string
  className?: string
  onClick?: () => void
  isActive?: boolean
}

export function Tag({ text, className, onClick, isActive }: TagProps) {
  const classes = cn(
    'bg-accent-purple/[0.13] inline-block rounded-sm px-2.5 py-1',
    'font-body text-text-primary text-[11px] font-semibold',
    'transition-colors',
    isActive && 'bg-accent-purple/40 ring-accent-purple ring-1',
    !onClick && 'hover:bg-accent-purple/25',
    onClick && 'hover:bg-accent-purple/25 cursor-pointer',
    className
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} aria-pressed={isActive}>
        #{text}
      </button>
    )
  }

  return <span className={classes}>#{text}</span>
}
