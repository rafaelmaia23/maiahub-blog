import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'font-body text-text-muted text-[11px] font-semibold tracking-wider uppercase',
        className
      )}
    >
      {children}
    </span>
  )
}
