import { cn } from '@/lib/utils'
import Image from 'next/image'

interface StatusItemProps {
  label: string
  value: string
  color?: 'green' | 'blue' | 'purple'
  imageSrc?: string
  className?: string
}

const colorMap = {
  green: 'text-accent-green',
  blue: 'text-accent-blue',
  purple: 'text-accent-purple',
}

export function StatusItem({
  label,
  value,
  color = 'green',
  imageSrc,
  className,
}: StatusItemProps) {
  return (
    <div className={cn('flex w-full flex-col gap-2.5', className)}>
      <div className="flex flex-col gap-0.5">
        <span
          className={cn(
            'font-body text-[9px] font-semibold tracking-wider uppercase',
            colorMap[color]
          )}
        >
          {label}
        </span>
        <span className="font-body text-text-primary text-xs">{value}</span>
      </div>
      {imageSrc && (
        <div className="relative h-[140px] w-full overflow-hidden rounded-sm">
          <Image src={imageSrc} alt={value} fill className="object-cover" />
        </div>
      )}
    </div>
  )
}
