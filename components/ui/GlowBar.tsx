import { cn } from '@/lib/utils'

interface GlowBarProps {
  className?: string
}

export function GlowBar({ className }: GlowBarProps) {
  return (
    <div
      className={cn(
        'h-[2px] w-full',
        'via-accent-green bg-gradient-to-r from-transparent to-transparent',
        className
      )}
      aria-hidden="true"
    />
  )
}
