import { cn } from '@/lib/utils'
import { resolveColor } from '@/lib/colorUtils'
import Image from 'next/image'

interface StatusItemProps {
  label: string
  value: string
  color?: string
  imageSrc?: string
  className?: string
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
          className="font-body text-[9px] font-semibold tracking-wider uppercase"
          style={{ color: resolveColor(color) }}
        >
          {label}
        </span>
        <span className="font-body text-text-primary text-xs">{value}</span>
      </div>
      {imageSrc && (
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-sm">
          <Image src={imageSrc} alt={value} fill className="object-cover" />
        </div>
      )}
    </div>
  )
}
