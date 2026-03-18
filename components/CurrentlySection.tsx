import { cn } from '@/lib/utils'
import { SectionLabel } from './ui/SectionLabel'
import { StatusItem } from './ui/StatusItem'

export interface CurrentlyItem {
  label: string
  value: string
  color: 'green' | 'blue' | 'purple'
  imageSrc?: string
}

interface CurrentlySectionProps {
  items: CurrentlyItem[]
  className?: string
}

export function CurrentlySection({ items, className }: CurrentlySectionProps) {
  return (
    <div
      className={cn(
        'border-border-line bg-card flex flex-col gap-4 rounded-sm border p-6',
        className
      )}
    >
      <SectionLabel>STATUS // CURRENTLY</SectionLabel>

      {items.map((item) => (
        <StatusItem
          key={item.label}
          label={item.label}
          value={item.value}
          color={item.color}
          imageSrc={item.imageSrc}
        />
      ))}
    </div>
  )
}
