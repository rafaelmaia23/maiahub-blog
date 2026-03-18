import { cn } from '@/lib/utils'

interface StatItemProps {
  value: string
  label: string
  color?: 'green' | 'blue' | 'purple'
  className?: string
}

const colorMap = {
  green: 'text-accent-green',
  blue: 'text-accent-blue',
  purple: 'text-accent-purple',
}

export function StatItem({ value, label, color = 'green', className }: StatItemProps) {
  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      <span className={cn('font-heading text-lg font-bold', colorMap[color])}>{value}</span>
      <span className="font-body text-text-muted text-[9px] font-semibold tracking-wider uppercase">
        {label}
      </span>
    </div>
  )
}
