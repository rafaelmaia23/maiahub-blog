import { cn } from '@/lib/utils'
import { resolveColor } from '@/lib/colorUtils'

interface StatItemProps {
  value: string
  label: string
  color?: string
  className?: string
}

export function StatItem({ value, label, color = 'green', className }: StatItemProps) {
  return (
    <div className={cn('flex flex-col items-center gap-0.5', className)}>
      <span className="font-heading text-lg font-bold" style={{ color: resolveColor(color) }}>
        {value}
      </span>
      <span className="font-body text-text-muted text-[9px] font-semibold tracking-wider uppercase">
        {label}
      </span>
    </div>
  )
}
